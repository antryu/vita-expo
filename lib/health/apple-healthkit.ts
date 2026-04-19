import type { VitalReading } from "@/lib/types/health";

// TODO: Install react-native-health for production use
// npm install react-native-health
// cd ios && pod install
// import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

export async function requestHealthKitPermissions(): Promise<boolean> {
  // const permissions: HealthKitPermissions = {
  //   permissions: {
  //     read: [
  //       AppleHealthKit.Constants.Permissions.HeartRate,
  //       AppleHealthKit.Constants.Permissions.HeartRateVariability,
  //       AppleHealthKit.Constants.Permissions.OxygenSaturation,
  //       AppleHealthKit.Constants.Permissions.BodyTemperature,
  //       AppleHealthKit.Constants.Permissions.SleepAnalysis,
  //       AppleHealthKit.Constants.Permissions.StepCount,
  //       AppleHealthKit.Constants.Permissions.RespiratoryRate,
  //     ],
  //     write: [],
  //   },
  // };
  // return new Promise((resolve) => {
  //   AppleHealthKit.initHealthKit(permissions, (err) => resolve(!err));
  // });
  console.log("[HealthKit] Stub — permissions would be requested here");
  return false;
}

export async function fetchAppleHealthData(since?: string): Promise<VitalReading[]> {
  // const options = { startDate: since || new Date(Date.now() - 86400000).toISOString() };
  // AppleHealthKit.getHeartRateSamples(options, (err, results) => ...);

  return [
    {
      source: "apple_watch",
      measured_at: new Date().toISOString(),
      heart_rate: 72,
      hrv: 42,
      spo2: 98,
      steps: 5200,
    },
  ];
}

export async function isHealthKitAvailable(): Promise<boolean> {
  // iOS only
  return false;
}
