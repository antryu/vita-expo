import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { type ThemeColors } from "@/theme/colors";
import { GlowCard } from "@/components/GlowCard";
import { useTheme } from "@/lib/theme/ThemeContext";

const familyMembers = [
  { id: "member-001", name: "안종현", relation: "아버지", age: 72, avatar: "JH", vitaScore: 87, status: "normal", hr: 68, spo2: 97.3, sleep: "6h 42m", stress: "낮음", lastSeen: "3분 전", alerts: 0 },
  { id: "member-002", name: "박순자", relation: "어머니", age: 70, avatar: "SJ", vitaScore: 62, status: "caution", hr: 78, spo2: 95.8, sleep: "5h 10m", stress: "보통", lastSeen: "8분 전", alerts: 1 },
  { id: "member-003", name: "이범수", relation: "삼촌", age: 78, avatar: "BS", vitaScore: 38, status: "critical", hr: 142, spo2: 91, sleep: "3h 20m", stress: "높음", lastSeen: "15분 전", alerts: 2 },
];

export default function GuardianScreen() {
  const { colors } = useTheme();
  const s = makeStyles(colors);

  const statusConfig = (status: string) => {
    if (status === "normal") return { label: "양호", color: colors.emerald };
    if (status === "caution") return { label: "주의", color: colors.gold };
    return { label: "위험", color: colors.coral };
  };

  const scoreColor = (n: number) => {
    if (n >= 80) return colors.emerald;
    if (n >= 60) return colors.gold;
    return colors.coral;
  };

  const criticalCount = familyMembers.filter((m) => m.status === "critical").length;
  const totalAlerts = familyMembers.reduce((sum, m) => sum + m.alerts, 0);

  return (
    <View style={s.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={s.header}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Ionicons name="people" size={24} color={colors.teal} />
              <Text style={s.title}>가족 건강</Text>
            </View>
            {totalAlerts > 0 && (
              <View style={s.alertBadge}>
                <Ionicons name="warning" size={10} color={colors.coral} />
                <Text style={s.alertBadgeText}>{totalAlerts}건</Text>
              </View>
            )}
          </View>
          <Text style={s.subtitle}>{familyMembers.length}명 모니터링 중</Text>

          {criticalCount > 0 && (
            <View style={[s.alert, { marginTop: 16 }]}>
              <View style={s.alertDot} />
              <Text style={s.alertText}>
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
                  <GlowCard accentColor={m.status === "critical" ? colors.coral : colors.teal} opacity={m.status === "critical" ? 0.06 : 0.03}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                      <View style={{ alignItems: "center" }}>
                        <View style={[s.avatar, m.status === "critical" && { backgroundColor: colors.surface }]}>
                          <Text style={s.avatarText}>{m.avatar}</Text>
                        </View>
                        <Text style={[s.scoreText, { color: scoreColor(m.vitaScore) }]}>{m.vitaScore}</Text>
                        <Text style={s.scoreLabel}>VITA</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <Text style={s.memberName}>{m.name}</Text>
                          <Text style={s.memberMeta}>{m.relation} / {m.age}세</Text>
                          <View style={[s.statusPill, { backgroundColor: `${sc.color}26`, borderColor: `${sc.color}33` }]}>
                            <Text style={[s.statusPillText, { color: sc.color }]}>{sc.label}</Text>
                          </View>
                        </View>
                        <View style={s.vitalsRow}>
                          <View style={s.vitalItem}>
                            <Ionicons name="heart" size={12} color={colors.coral} />
                            <Text style={s.vitalText}>{m.hr}bpm</Text>
                          </View>
                          <View style={s.vitalItem}>
                            <Ionicons name="water" size={12} color={colors.blue} />
                            <Text style={s.vitalText}>{m.spo2}%</Text>
                          </View>
                          <View style={s.vitalItem}>
                            <Ionicons name="moon" size={12} color={colors.purple} />
                            <Text style={s.vitalText}>{m.sleep}</Text>
                          </View>
                          <View style={s.vitalItem}>
                            <Ionicons name="flash" size={12} color={colors.gold} />
                            <Text style={s.vitalText}>{m.stress}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
                          <Text style={s.minorText}>
                            <Ionicons name="time" size={10} color={colors.muted} /> {m.lastSeen}
                          </Text>
                        </View>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={colors.mutedLight} />
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

function makeStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.background },
    scroll: { padding: 16, paddingBottom: 80 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    title: { fontSize: 22, fontWeight: "700", color: c.foreground },
    subtitle: { fontSize: 12, color: c.muted, marginTop: 4 },
    alertBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: `${c.coral}26`, borderRadius: 6 },
    alertBadgeText: { fontSize: 10, color: c.coral, fontWeight: "600" },
    alert: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, backgroundColor: `${c.coral}14`, borderRadius: 12, borderWidth: 1, borderColor: `${c.coral}33` },
    alertDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.coral },
    alertText: { fontSize: 12, color: c.coral, fontWeight: "500" },
    avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: c.surface, justifyContent: "center", alignItems: "center" },
    avatarText: { fontSize: 14, fontWeight: "700", color: c.foreground },
    scoreText: { fontSize: 18, fontWeight: "900", marginTop: 4, fontVariant: ["tabular-nums"] },
    scoreLabel: { fontSize: 8, color: c.muted },
    memberName: { fontSize: 14, fontWeight: "700", color: c.foreground },
    memberMeta: { fontSize: 10, color: c.muted },
    statusPill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1 },
    statusPillText: { fontSize: 9, fontWeight: "600" },
    vitalsRow: { flexDirection: "row", gap: 12, marginTop: 8, flexWrap: "wrap" },
    vitalItem: { flexDirection: "row", alignItems: "center", gap: 3 },
    vitalText: { fontSize: 11, color: c.foreground },
    minorText: { fontSize: 10, color: c.muted },
  });
}
