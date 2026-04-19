import type { VitalReading } from "@/lib/types/health";

const VITALRING_API_BASE =
  process.env.EXPO_PUBLIC_VITALRING_API_URL ?? "https://api.vitalring.example";

export interface VitalRingConfig {
  ringId: string;
  apiKey: string;
}

export async function fetchVitalRingData(
  config: VitalRingConfig,
  since?: string
): Promise<VitalReading[]> {
  // TODO: Replace with actual ZTAcom API when available
  // const url = `${VITALRING_API_BASE}/vitals?ring_id=${config.ringId}${since ? `&since=${since}` : ""}`;
  // const res = await fetch(url, { headers: { Authorization: `Bearer ${config.apiKey}` } });

  return [
    {
      source: "vitalring",
      measured_at: new Date().toISOString(),
      heart_rate: 68,
      hrv: 45.2,
      spo2: 97.3,
      skin_temp: 36.4,
      stress_score: 32,
      steps: 4328,
    },
  ];
}

export async function registerRing(ringSerial: string, apiKey: string) {
  return { success: true, ringId: ringSerial };
}
