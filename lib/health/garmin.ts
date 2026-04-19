import type { VitalReading } from "@/lib/types/health";

// Garmin Health API — OAuth 1.0a
// https://developer.garmin.com/gc-developer-program/health-api/

const GARMIN_API_BASE = "https://apis.garmin.com";

export interface GarminOAuthConfig {
  consumerKey: string;
  consumerSecret: string;
  userAccessToken?: string;
  userAccessTokenSecret?: string;
}

export async function initiateGarminOAuth(config: GarminOAuthConfig): Promise<string> {
  // TODO: Request token + authorization URL
  // const requestToken = await fetch(`${GARMIN_API_BASE}/oauth-service/oauth/request_token`, {
  //   method: "POST",
  //   headers: { Authorization: buildOAuthHeader(config) },
  // });
  return `${GARMIN_API_BASE}/oauth-service/oauth/authorize?oauth_token=stub`;
}

export async function fetchGarminHealthData(
  config: GarminOAuthConfig,
  uploadStartTime?: number,
  uploadEndTime?: number
): Promise<VitalReading[]> {
  // TODO: Garmin Health API calls
  // GET /wellness-api/rest/dailies
  // GET /wellness-api/rest/pulseOx
  // GET /wellness-api/rest/stressDetails
  // GET /wellness-api/rest/sleep

  return [
    {
      source: "garmin",
      measured_at: new Date().toISOString(),
      heart_rate: 66,
      hrv: 48,
      spo2: 96,
      stress_score: 28,
      steps: 6100,
    },
  ];
}

export async function requestGarminPartnership(): Promise<string> {
  return "https://developer.garmin.com/gc-developer-program/health-api/";
}
