import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/theme/colors";
import { GlowCard } from "@/components/GlowCard";

const familyMembers = [
  { id: "member-001", name: "안종현", relation: "아버지", age: 72, avatar: "JH", vitaScore: 87, status: "normal", hr: 68, spo2: 97.3, sleep: "6h 42m", stress: "낮음", lastSeen: "3분 전", alerts: 0 },
  { id: "member-002", name: "박순자", relation: "어머니", age: 70, avatar: "SJ", vitaScore: 62, status: "caution", hr: 78, spo2: 95.8, sleep: "5h 10m", stress: "보통", lastSeen: "8분 전", alerts: 1 },
  { id: "member-003", name: "이범수", relation: "삼촌", age: 78, avatar: "BS", vitaScore: 38, status: "critical", hr: 142, spo2: 91, sleep: "3h 20m", stress: "높음", lastSeen: "15분 전", alerts: 2 },
];

function statusConfig(status: string) {
  if (status === "normal") return { label: "양호", color: Colors.emerald };
  if (status === "caution") return { label: "주의", color: Colors.gold };
  return { label: "위험", color: Colors.coral };
}

function scoreColor(s: number) {
  if (s >= 80) return Colors.emerald;
  if (s >= 60) return Colors.gold;
  return Colors.coral;
}

export default function GuardianScreen() {
  const criticalCount = familyMembers.filter((m) => m.status === "critical").length;
  const totalAlerts = familyMembers.reduce((s, m) => s + m.alerts, 0);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="people" size={24} color={Colors.teal} />
              <Text style={styles.title}>가족 건강</Text>
            </View>
            {totalAlerts > 0 && (
              <View style={styles.alertBadge}>
                <Ionicons name="warning" size={10} color={Colors.coral} />
                <Text style={styles.alertBadgeText}>{totalAlerts}건</Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitle}>{familyMembers.length}명 모니터링 중</Text>

          {criticalCount > 0 && (
            <View style={[styles.alert, { marginTop: 16 }]}>
              <View style={styles.alertDot} />
              <Text style={styles.alertText}>
                {criticalCount}명의 가족에게 긴급 주의가 필요합니다
              </Text>
            </View>
          )}

          <View style={{ gap: 12, marginTop: 16 }}>
            {familyMembers.map((m) => {
              const sc = statusConfig(m.status);
              return (
                <TouchableOpacity
                  key={m.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/guardian/${m.id}` as never)}
                >
                  <GlowCard accentColor={m.status === "critical" ? Colors.coral : Colors.teal} opacity={m.status === "critical" ? 0.06 : 0.03}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                      <View style={{ alignItems: "center" }}>
                        <View style={[styles.avatar, m.status === "critical" && { backgroundColor: Colors.surface }]}>
                          <Text style={styles.avatarText}>{m.avatar}</Text>
                        </View>
                        <Text style={[styles.scoreText, { color: scoreColor(m.vitaScore) }]}>{m.vitaScore}</Text>
                        <Text style={styles.scoreLabel}>VITA</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <Text style={styles.memberName}>{m.name}</Text>
                          <Text style={styles.memberMeta}>{m.relation} / {m.age}세</Text>
                          <View style={[styles.statusPill, { backgroundColor: `${sc.color}26`, borderColor: `${sc.color}33` }]}>
                            <Text style={[styles.statusPillText, { color: sc.color }]}>{sc.label}</Text>
                          </View>
                        </View>
                        <View style={styles.vitalsRow}>
                          <View style={styles.vitalItem}>
                            <Ionicons name="heart" size={12} color={Colors.coral} />
                            <Text style={styles.vitalText}>{m.hr}bpm</Text>
                          </View>
                          <View style={styles.vitalItem}>
                            <Ionicons name="water" size={12} color={Colors.blue} />
                            <Text style={styles.vitalText}>{m.spo2}%</Text>
                          </View>
                          <View style={styles.vitalItem}>
                            <Ionicons name="moon" size={12} color={Colors.purple} />
                            <Text style={styles.vitalText}>{m.sleep}</Text>
                          </View>
                          <View style={styles.vitalItem}>
                            <Ionicons name="flash" size={12} color={Colors.gold} />
                            <Text style={styles.vitalText}>{m.stress}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
                          <Text style={styles.minorText}>
                            <Ionicons name="time" size={10} color={Colors.muted} /> {m.lastSeen}
                          </Text>
                        </View>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={Colors.mutedLight} />
                    </View>
                  </GlowCard>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, paddingBottom: 80 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: Colors.foreground },
  subtitle: { fontSize: 12, color: Colors.muted, marginTop: 4 },
  alertBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: "rgba(244,63,94,0.15)", borderRadius: 6 },
  alertBadgeText: { fontSize: 10, color: Colors.coral, fontWeight: "600" },
  alert: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, backgroundColor: "rgba(244,63,94,0.08)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(244,63,94,0.2)" },
  alertDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.coral },
  alertText: { fontSize: 12, color: Colors.coral, fontWeight: "500" },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.surface, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 14, fontWeight: "700", color: Colors.foreground },
  scoreText: { fontSize: 18, fontWeight: "900", marginTop: 4, fontVariant: ["tabular-nums"] },
  scoreLabel: { fontSize: 8, color: Colors.muted },
  memberName: { fontSize: 14, fontWeight: "700", color: Colors.foreground },
  memberMeta: { fontSize: 10, color: Colors.muted },
  statusPill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1 },
  statusPillText: { fontSize: 9, fontWeight: "600" },
  vitalsRow: { flexDirection: "row", gap: 12, marginTop: 8, flexWrap: "wrap" },
  vitalItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  vitalText: { fontSize: 11, color: Colors.foreground },
  minorText: { fontSize: 10, color: Colors.muted },
});
