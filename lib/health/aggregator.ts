import type { DataSource, VitalReading } from "@/lib/types/health";
import { fetchVitalRingData } from "./vitalring";
import { fetchAppleHealthData } from "./apple-healthkit";
import { fetchSamsungHealthData } from "./samsung-health";
import { fetchGarminHealthData } from "./garmin";

// Priority order: when multiple sources have data for same timestamp,
// prefer the source with highest accuracy/frequency
const SOURCE_PRIORITY: DataSource[] = [
  "vitalring",    // Most frequent (every 10min), clinical-grade
  "apple_watch",  // High quality
  "garmin",       // High quality, especially HRV
  "galaxy_watch", // Good quality
  "manual",       // Lowest priority
];

export interface AggregatorConfig {
  vitalring?: { ringId: string; apiKey: string };
  appleEnabled?: boolean;
  samsungEnabled?: boolean;
  garmin?: { consumerKey: string; consumerSecret: string };
}

export async function aggregateHealthData(
  config: AggregatorConfig,
  since?: string
): Promise<VitalReading[]> {
  const results = await Promise.allSettled([
    config.vitalring ? fetchVitalRingData(config.vitalring, since) : Promise.resolve([]),
    config.appleEnabled ? fetchAppleHealthData(since) : Promise.resolve([]),
    config.samsungEnabled ? fetchSamsungHealthData(since) : Promise.resolve([]),
    config.garmin ? fetchGarminHealthData(config.garmin) : Promise.resolve([]),
  ]);

  const allReadings: VitalReading[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") allReadings.push(...r.value);
  }

  return mergeByPriority(allReadings);
}

function mergeByPriority(readings: VitalReading[]): VitalReading[] {
  const buckets: Record<string, VitalReading> = {};

  for (const r of readings) {
    const bucket = bucketKey(r.measured_at);
    const existing = buckets[bucket];

    if (!existing) {
      buckets[bucket] = r;
      continue;
    }

    if (priorityOf(r.source) < priorityOf(existing.source)) {
      buckets[bucket] = {
        ...r,
        heart_rate: r.heart_rate ?? existing.heart_rate,
        hrv: r.hrv ?? existing.hrv,
        spo2: r.spo2 ?? existing.spo2,
        skin_temp: r.skin_temp ?? existing.skin_temp,
        stress_score: r.stress_score ?? existing.stress_score,
        steps: r.steps ?? existing.steps,
      };
    } else {
      buckets[bucket] = {
        ...existing,
        heart_rate: existing.heart_rate ?? r.heart_rate,
        hrv: existing.hrv ?? r.hrv,
        spo2: existing.spo2 ?? r.spo2,
        skin_temp: existing.skin_temp ?? r.skin_temp,
        stress_score: existing.stress_score ?? r.stress_score,
        steps: existing.steps ?? r.steps,
      };
    }
  }

  return Object.values(buckets).sort((a, b) =>
    a.measured_at.localeCompare(b.measured_at)
  );
}

function priorityOf(source: DataSource): number {
  return SOURCE_PRIORITY.indexOf(source);
}

function bucketKey(iso: string): string {
  const d = new Date(iso);
  d.setMinutes(Math.floor(d.getMinutes() / 10) * 10, 0, 0);
  return d.toISOString();
}
