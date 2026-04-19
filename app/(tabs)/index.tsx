import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { type ThemeColors } from "@/theme/colors";
import { GlowCard } from "@/components/GlowCard";
import { VitaScoreRing } from "@/components/VitaScoreRing";
import { useTheme } from "@/lib/theme/ThemeContext";

const vitaScore = 87;
const weeklyScores = [78, 81, 84, 82, 85, 84, 87];
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

export default function DashboardScreen() {
  const { colors, mode } = useTheme();
  const s = makeStyles(colors);

  return (
    <View style={[s.container]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      <LinearGradient
        colors={[mode === "dark" ? "rgba(20,184,166,0.08)" : "rgba(13,148,136,0.05)", colors.background]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll}>
          {/* Header */}
          <View style={s.header}>
            <View>
              <Text style={s.greeting}>좋은 아침이에요</Text>
              <Text style={s.name}>종현님</Text>
            </View>
            <View style={s.bell}>
              <Ionicons name="notifications-outline" size={18} color={colors.muted} />
              <View style={s.dot} />
            </View>
          </View>

          {/* Hero Score */}
          <GlowCard accentColor={colors.teal} style={s.hero}>
            <View style={s.heroRow}>
              <VitaScoreRing score={vitaScore} size={96} />
              <View style={s.heroInfo}>
                <View style={s.badgeRow}>
                  <View style={s.badgeGood}>
                    <Text style={s.badgeText}>양호</Text>
                  </View>
                  <Ionicons name="trending-up" size={12} color={colors.emerald} style={{ marginLeft: 6 }} />
                  <Text style={s.delta}> +3</Text>
                </View>
                <View style={s.miniChart}>
                  {weeklyScores.map((sc, i) => (
                    <View key={i} style={s.barWrap}>
                      {i === weeklyScores.length - 1 ? (
                        <LinearGradient
                          colors={[colors.teal, colors.blue]}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 0, y: 0 }}
                          style={[s.bar, { height: `${sc}%` }]}
                        />
                      ) : (
                        <View style={[s.barMuted, { height: `${sc}%` }]} />
                      )}
                    </View>
                  ))}
                </View>
                <View style={s.daysRow}>
                  {weekDays.map((d, i) => (
                    <Text key={i} style={[s.dayLabel, { color: i === weekDays.length - 1 ? colors.teal : colors.mutedLight }]}>{d}</Text>
                  ))}
                </View>
              </View>
            </View>
          </GlowCard>

          {/* Bento Vitals */}
          <View style={s.vitalsGrid}>
            {[
              { icon: "heart" as const, label: "심박수", value: "68", unit: "bpm", color: colors.coral },
              { icon: "water" as const, label: "산소포화도", value: "97.3", unit: "%", color: colors.blue },
              { icon: "moon" as const, label: "수면", value: "6h42m", unit: "", sub: "깊은 잠 28%", color: colors.purple },
              { icon: "flash" as const, label: "스트레스", value: "낮음", unit: "", sub: "32점", color: colors.gold },
            ].map((v) => (
              <GlowCard key={v.label} accentColor={v.color} style={s.vitalCard}>
                <View style={s.vitalHeader}>
                  <Ionicons name={v.icon} size={14} color={v.color} />
                  <Text style={s.vitalLabel}>{v.label}</Text>
                </View>
                <View>
                  <Text style={s.vitalValue}>
                    {v.value}
                    {v.unit ? <Text style={s.vitalUnit}> {v.unit}</Text> : null}
                  </Text>
                  {v.sub && <Text style={s.vitalSub}>{v.sub}</Text>}
                </View>
              </GlowCard>
            ))}
          </View>

          {/* AI Coaching */}
          <GlowCard accentColor={colors.teal} style={s.coach}>
            <View style={s.coachHeader}>
              <LinearGradient
                colors={[colors.teal, colors.blue]}
                style={s.coachIcon}
              >
                <Ionicons name="bulb" size={14} color="#fff" />
              </LinearGradient>
              <Text style={s.coachTitle}>AI 코칭</Text>
            </View>
            <Text style={s.coachText}>
              수면의 질이 이번 주 꾸준히 개선되고 있습니다. 스트레스 회복력도 좋은 상태입니다. 오늘은 30분 산책을 추천드립니다.
            </Text>
          </GlowCard>

          {/* Vital Cash + Activity */}
          <View style={s.row2}>
            <GlowCard accentColor={colors.gold} style={s.cashCard}>
              <View style={s.vitalHeader}>
                <Ionicons name="diamond-outline" size={14} color={colors.gold} />
                <Text style={s.vitalLabel}>바이탈 캐시</Text>
              </View>
              <Text style={s.cashAmount}>
                12,400<Text style={s.vitalUnit}> P</Text>
              </Text>
              <View style={{ flexDirection: "row", marginTop: 6, gap: 8 }}>
                <Text style={s.earning}>+500 숙면</Text>
                <Text style={s.earning}>+300 회복</Text>
              </View>
            </GlowCard>
            <GlowCard accentColor={colors.emerald} style={s.activityCard}>
              <Ionicons name="walk" size={16} color={colors.emerald} />
              <View style={{ marginTop: 8 }}>
                <Text style={s.actValue}>4,328</Text>
                <Text style={s.vitalSub}>걸음 / 54%</Text>
              </View>
            </GlowCard>
          </View>

          {/* Streak */}
          <View style={s.streak}>
            <View style={s.streakIcon}>
              <Ionicons name="flame" size={20} color={colors.coral} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.streakTitle}>7일 연속 달성</Text>
              <Text style={s.streakDesc}>숙면 목표를 7일 연속 달성</Text>
            </View>
            <View style={s.streakBadge}>
              <Text style={s.streakBadgeText}>+1,000P</Text>
            </View>
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
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    greeting: { fontSize: 12, color: c.muted },
    name: { fontSize: 20, fontWeight: "700", color: c.foreground, marginTop: 2 },
    bell: { padding: 10, backgroundColor: c.card, borderRadius: 12, borderWidth: 1, borderColor: c.border },
    dot: { position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: c.coral },
    hero: { padding: 20, marginBottom: 12 },
    heroRow: { flexDirection: "row", alignItems: "center" },
    heroInfo: { flex: 1, marginLeft: 20 },
    badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    badgeGood: { backgroundColor: `${c.emerald}33`, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
    badgeText: { fontSize: 10, color: c.emerald, fontWeight: "600" },
    delta: { fontSize: 11, color: c.emerald },
    miniChart: { flexDirection: "row", height: 40, alignItems: "flex-end", gap: 2 },
    barWrap: { flex: 1, height: "100%", justifyContent: "flex-end" },
    bar: { width: "100%", borderRadius: 2, minHeight: 2 },
    barMuted: { width: "100%", borderRadius: 2, backgroundColor: c.overlayLight, minHeight: 2 },
    daysRow: { flexDirection: "row", marginTop: 4 },
    dayLabel: { flex: 1, textAlign: "center", fontSize: 9 },
    vitalsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 12 },
    vitalCard: { width: "48%", aspectRatio: 1.5, justifyContent: "space-between" },
    vitalHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
    vitalLabel: { fontSize: 10, color: c.muted },
    vitalValue: { fontSize: 22, fontWeight: "900", color: c.foreground, fontVariant: ["tabular-nums"] },
    vitalUnit: { fontSize: 11, fontWeight: "400", color: c.muted },
    vitalSub: { fontSize: 10, color: c.muted, marginTop: 2 },
    coach: { padding: 20, marginBottom: 12 },
    coachHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
    coachIcon: { width: 28, height: 28, borderRadius: 8, justifyContent: "center", alignItems: "center" },
    coachTitle: { fontSize: 12, fontWeight: "600", color: c.teal },
    coachText: { fontSize: 14, color: c.foreground, lineHeight: 21, opacity: 0.8 },
    row2: { flexDirection: "row", gap: 12, marginBottom: 12 },
    cashCard: { flex: 3 },
    cashAmount: { fontSize: 22, fontWeight: "900", color: c.foreground, marginTop: 8, fontVariant: ["tabular-nums"] },
    earning: { fontSize: 10, color: c.emerald },
    activityCard: { flex: 2, justifyContent: "space-between" },
    actValue: { fontSize: 18, fontWeight: "900", color: c.foreground, fontVariant: ["tabular-nums"] },
    streak: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      backgroundColor: c.cardMuted,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border,
      gap: 12,
    },
    streakIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: `${c.coral}1A`, justifyContent: "center", alignItems: "center" },
    streakTitle: { fontSize: 14, fontWeight: "700", color: c.foreground },
    streakDesc: { fontSize: 10, color: c.muted, marginTop: 2 },
    streakBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: `${c.coral}26`,
      borderWidth: 1,
      borderColor: `${c.coral}33`,
    },
    streakBadgeText: { fontSize: 10, color: c.coral, fontWeight: "600" },
  });
}
