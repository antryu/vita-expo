import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/colors";
import { GlowCard } from "@/components/GlowCard";

const members = [
  { name: "김영수", age: 78, score: 42, status: "critical", hr: 142, spo2: 91 },
  { name: "박순자", age: 82, score: 38, status: "critical", hr: 58, spo2: 88 },
  { name: "이정호", age: 71, score: 61, status: "warning", hr: 78, spo2: 96 },
  { name: "최미경", age: 75, score: 55, status: "warning", hr: 82, spo2: 95 },
  { name: "정대식", age: 69, score: 68, status: "warning", hr: 71, spo2: 97 },
  { name: "한옥순", age: 80, score: 87, status: "normal", hr: 66, spo2: 98 },
  { name: "오병호", age: 74, score: 91, status: "normal", hr: 64, spo2: 98 },
  { name: "윤정숙", age: 77, score: 84, status: "normal", hr: 70, spo2: 97 },
];

const alerts = [
  { severity: "critical", name: "김영수", msg: "심박수 142bpm — 평소 대비 2배", time: "15분 전" },
  { severity: "critical", name: "박순자", msg: "SpO2 88% — 위험 수준", time: "8분 전" },
  { severity: "warning", name: "이정호", msg: "수면 점수 3일 연속 저하", time: "오늘 06:00" },
  { severity: "warning", name: "최미경", msg: "스트레스 상승 추세 (5일)", time: "오늘 07:00" },
];

function scoreColor(s: number) {
  if (s >= 80) return Colors.emerald;
  if (s >= 60) return Colors.gold;
  return Colors.coral;
}

export default function OrgScreen() {
  const normal = members.filter((m) => m.status === "normal").length;
  const warning = members.filter((m) => m.status === "warning").length;
  const critical = members.filter((m) => m.status === "critical").length;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Ionicons name="business" size={24} color={Colors.teal} />
            <Text style={styles.title}>화성시 통합돌봄센터</Text>
          </View>
          <Text style={styles.subtitle}>2026.04.20 · 전체 {members.length}명 관리</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { label: "전체", value: members.length, color: Colors.foreground },
              { label: "정상", value: normal, color: Colors.emerald },
              { label: "주의", value: warning, color: Colors.gold },
              { label: "위험", value: critical, color: Colors.coral },
            ].map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Alerts */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="warning" size={16} color={Colors.coral} />
              <Text style={styles.sectionTitle}>실시간 알림</Text>
              <View style={{ flex: 1 }} />
              <View style={styles.alertCountBadge}>
                <Text style={styles.alertCountText}>{alerts.length}건</Text>
              </View>
            </View>
            <View style={{ gap: 8, marginTop: 12 }}>
              {alerts.map((a, i) => (
                <View key={i} style={[styles.alertItem, a.severity === "critical" ? styles.alertCritical : styles.alertWarning]}>
                  <View style={[styles.alertDot, { backgroundColor: a.severity === "critical" ? Colors.coral : Colors.gold }]} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={styles.alertName}>{a.name}</Text>
                      <Text style={styles.alertTime}>{a.time}</Text>
                    </View>
                    <Text style={styles.alertMsg}>{a.msg}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Member list */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="people" size={16} color={Colors.muted} />
              <Text style={styles.sectionTitle}>대상자 현황</Text>
            </View>
            <View style={{ marginTop: 12 }}>
              {members.map((m, i) => (
                <View key={m.name} style={[styles.memberRow, i === members.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.memberName}>{m.name}</Text>
                    <Text style={styles.memberAge}>{m.age}세</Text>
                  </View>
                  <Text style={[styles.memberScore, { color: scoreColor(m.score), flex: 1 }]}>{m.score}</Text>
                  <Text style={[styles.memberVital, { color: m.hr > 100 || m.hr < 50 ? Colors.coral : Colors.foreground, flex: 1 }]}>{m.hr}bpm</Text>
                  <Text style={[styles.memberVital, { color: m.spo2 < 92 ? Colors.coral : Colors.foreground, flex: 1 }]}>{m.spo2}%</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, paddingBottom: 80 },
  header: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 18, fontWeight: "700", color: Colors.foreground },
  subtitle: { fontSize: 11, color: Colors.muted, marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 8, marginTop: 16 },
  statCard: { flex: 1, padding: 12, backgroundColor: Colors.card, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.04)" },
  statValue: { fontSize: 22, fontWeight: "900", fontVariant: ["tabular-nums"] },
  statLabel: { fontSize: 10, color: Colors.muted, marginTop: 2 },
  section: { padding: 16, backgroundColor: Colors.card, borderRadius: 16, marginTop: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.04)" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  sectionTitle: { fontSize: 13, fontWeight: "600", color: Colors.foreground },
  alertCountBadge: { paddingHorizontal: 8, paddingVertical: 2, backgroundColor: "rgba(244,63,94,0.15)", borderRadius: 6 },
  alertCountText: { fontSize: 10, color: Colors.coral, fontWeight: "600" },
  alertItem: { flexDirection: "row", alignItems: "flex-start", gap: 10, padding: 10, borderRadius: 10, borderWidth: 1 },
  alertCritical: { backgroundColor: "rgba(244,63,94,0.06)", borderColor: "rgba(244,63,94,0.12)" },
  alertWarning: { backgroundColor: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.12)" },
  alertDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  alertName: { fontSize: 12, fontWeight: "600", color: Colors.foreground },
  alertTime: { fontSize: 10, color: Colors.muted },
  alertMsg: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  memberRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  memberName: { fontSize: 13, color: Colors.foreground, fontWeight: "500" },
  memberAge: { fontSize: 10, color: Colors.muted },
  memberScore: { fontSize: 14, fontWeight: "800", fontVariant: ["tabular-nums"] },
  memberVital: { fontSize: 11, fontVariant: ["tabular-nums"] },
});
