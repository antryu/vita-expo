export type RiskLevel = "normal" | "caution" | "warning" | "critical";
export type DataSource = "vitalring" | "apple_watch" | "galaxy_watch" | "garmin" | "manual";

export interface VitalReading {
  id?: string;
  source: DataSource;
  measured_at: string;
  heart_rate?: number | null;
  hrv?: number | null;
  spo2?: number | null;
  skin_temp?: number | null;
  respiration_rate?: number | null;
  stress_score?: number | null;
  steps?: number | null;
  sleep_stage?: string | null;
  battery?: number | null;
}

export interface HealthSourceConnection {
  source: DataSource;
  connected: boolean;
  last_sync?: string;
  device_name?: string;
  user_consent: boolean;
}
