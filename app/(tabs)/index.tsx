import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/theme/colors";
import { useTheme } from "@/lib/theme/ThemeContext";
import { GlowCard } from "@/components/GlowCard";
import { VitaScoreRing } from "@/components/VitaScoreRing";

const vitaScore = 87;
const weeklyScores = [78, 81, 84, 82, 85, 84, 87];
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

export default function DashboardScreen() {
  const { colors, mode } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      <LinearGradient
        colors={[mode === "dark" ? "rgba(20,184,166,0.08)" : "rgba(13,148,136,0.05)", colors.background]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>좋은 아침이에요</Text>
              <Text style={styles.name}>종현님</Text>
            </View>
            <View style={styles.bell}>
              <Ionicons name="notifications-outline" size={18} color={Colors.muted} />
              <View style={styles.dot} />
            </View>
          </View>

          {/* Hero Score */}
          <GlowCard accentColor={Colors.teal} style={styles.hero}>
            <View style={styles.heroRow}>
              <VitaScoreRing score={vitaScore} size={96} />
              <View style={styles.heroInfo}>
                <View style={styles.badgeRow}>
                  <View style={styles.badgeGood}>
                    <Text style={styles.badgeText}>양호</Text>
                  </View>
                  <Ionicons name="trending-up" size={12} color={Colors.emerald} style={{ marginLeft: 6 }} />
                  <Text style={styles.delta}> +3</Text>
                </View>
                <View style={styles.miniChart}>
                  {weeklyScores.map((s, i) => (
                    <View key={i} style={styles.barWrap}>
                      {i === weeklyScores.length - 1 ? (
                        <LinearGradient
                          colors={[Colors.teal, Colors.blue]}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 0, y: 0 }}
                          style={[styles.bar, { height: `${s}%` }]}
                        />
                      ) : (
                        <View style={[styles.barMuted, { height: `${s}%` }]} />
                      )}
                    </View>
                  ))}
                </View>
                <View style={styles.daysRow}>
                  {weekDays.map((d, i) => (
                    <Text
                      key={i}
                      style={[
                        styles.dayLabel,
                        { color: i === weekDays.length - 1 ? Colors.teal : "rgba(255,255,255,0.2)" },
                      ]}
                    >
                      {d}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </GlowCard>

          {/* Bento Vitals */}
          <View style={styles.vitalsGrid}>
            {[
              { icon: "heart" as const, label: "심박수", value: "68", unit: "bpm", color: Colors.coral },
              { icon: "water" as const, label: "산소포화도", value: "97.3", unit: "%", color: Colors.blue },
              { icon: "moon" as const, label: "수면", value: "6h42m", unit: "", sub: "깊은 잠 28%", color: Colors.purple },
              { icon: "flash" as const, label: "스트레스", value: "낮음", unit: "", sub: "32점", color: Colors.gold },
            ].map((v) => (
              <GlowCard key={v.label} accentColor={v.color} style={styles.vitalCard}>
                <View style={styles.vitalHeader}>
                  <Ionicons name={v.icon} size={14} color={v.color} />
                  <Text style={styles.vitalLabel}>{v.label}</Text>
                </View>
                <View>
                  <Text style={styles.vitalValue}>
                    {v.value}
                    {v.unit ? <Text style={styles.vitalUnit}> {v.unit}</Text> : null}
                  </Text>
                  {v.sub && <Text style={styles.vitalSub}>{v.sub}</Text>}
                </View>
              </GlowCard>
            ))}
          </View>

          {/* AI Coaching */}
          <GlowCard accentColor={Colors.teal} style={styles.coach}>
            <View style={styles.coachHeader}>
              <LinearGradient
                colors={[Colors.teal, Colors.blue]}
                style={styles.coachIcon}
              >
                <Ionicons name="bulb" size={14} color="#fff" />
              </LinearGradient>
              <Text style={styles.coachTitle}>AI 코칭</Text>
            </View>
            <Text style={styles.coachText}>
              수면의 질이 이번 주 꾸준히 개선되고 있습니다. 스트레스 회복력도 좋은 상태입니다. 오늘은 30분 산책을 추천드립니다.
            </Text>
          </GlowCard>

          {/* Vital Cash + Activity */}
          <View style={styles.row2}>
            <GlowCard accentColor={Colors.gold} style={styles.cashCard}>
              <View style={styles.vitalHeader}>
                <Ionicons name="diamond-outline" size={14} color={Colors.gold} />
                <Text style={styles.vitalLabel}>바이탈 캐시</Text>
              </View>
              <Text style={styles.cashAmount}>
                12,400<Text style={styles.vitalUnit}> P</Text>
              </Text>
              <View style={{ flexDirection: "row", marginTop: 6, gap: 8 }}>
                <Text style={styles.earning}>+500 숙면</Text>
                <Text style={styles.earning}>+300 회복</Text>
              </View>
            </GlowCard>
            <GlowCard accentColor={Colors.emerald} style={styles.activityCard}>
              <Ionicons name="walk" size={16} color={Colors.emerald} />
              <View style={{ marginTop: 8 }}>
                <Text style={styles.actValue}>4,328</Text>
                <Text style={styles.vitalSub}>걸음 / 54%</Text>
              </View>
            </GlowCard>
          </View>

          {/* Streak */}
          <View style={styles.streak}>
            <View style={styles.streakIcon}>
              <Ionicons name="flame" size={20} color={Colors.coral} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.streakTitle}>7일 연속 달성</Text>
              <Text style={styles.streakDesc}>숙면 목표를 7일 연속 달성</Text>
            </View>
            <View style={styles.streakBadge}>
              <Text style={styles.streakBadgeText}>+1,000P</Text>
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
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  greeting: { fontSize: 12, color: Colors.muted },
  name: { fontSize: 20, fontWeight: "700", color: Colors.foreground, marginTop: 2 },
  bell: { padding: 10, backgroundColor: "rgba(17,24,39,0.6)", borderRadius: 12, borderWidth: 1, borderColor: Colors.border },
  dot: { position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.coral },
  hero: { padding: 20, marginBottom: 12 },
  heroRow: { flexDirection: "row", alignItems: "center" },
  heroInfo: { flex: 1, marginLeft: 20 },
  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  badgeGood: { backgroundColor: "rgba(16,185,129,0.2)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 10, color: Colors.emerald, fontWeight: "600" },
  delta: { fontSize: 11, color: Colors.emerald },
  miniChart: { flexDirection: "row", height: 40, alignItems: "flex-end", gap: 2 },
  barWrap: { flex: 1, height: "100%", justifyContent: "flex-end" },
  bar: { width: "100%", borderRadius: 2, minHeight: 2 },
  barMuted: { width: "100%", borderRadius: 2, backgroundColor: "rgba(255,255,255,0.06)", minHeight: 2 },
  daysRow: { flexDirection: "row", marginTop: 4 },
  dayLabel: { flex: 1, textAlign: "center", fontSize: 9 },
  vitalsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 12 },
  vitalCard: { width: "48%", aspectRatio: 1.5, justifyContent: "space-between" },
  vitalHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  vitalLabel: { fontSize: 10, color: Colors.muted },
  vitalValue: { fontSize: 22, fontWeight: "900", color: Colors.foreground, fontVariant: ["tabular-nums"] },
  vitalUnit: { fontSize: 11, fontWeight: "400", color: Colors.muted },
  vitalSub: { fontSize: 10, color: Colors.muted, marginTop: 2 },
  coach: { padding: 20, marginBottom: 12 },
  coachHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  coachIcon: { width: 28, height: 28, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  coachTitle: { fontSize: 12, fontWeight: "600", color: Colors.teal },
  coachText: { fontSize: 14, color: Colors.foreground, lineHeight: 21, opacity: 0.8 },
  row2: { flexDirection: "row", gap: 12, marginBottom: 12 },
  cashCard: { flex: 3 },
  cashAmount: { fontSize: 22, fontWeight: "900", color: Colors.foreground, marginTop: 8, fontVariant: ["tabular-nums"] },
  earning: { fontSize: 10, color: Colors.emerald },
  activityCard: { flex: 2, justifyContent: "space-between" },
  actValue: { fontSize: 18, fontWeight: "900", color: Colors.foreground, fontVariant: ["tabular-nums"] },
  streak: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
    gap: 12,
  },
  streakIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(244,63,94,0.1)", justifyContent: "center", alignItems: "center" },
  streakTitle: { fontSize: 14, fontWeight: "700", color: Colors.foreground },
  streakDesc: { fontSize: 10, color: Colors.muted, marginTop: 2 },
  streakBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "rgba(244,63,94,0.15)",
    borderWidth: 1,
    borderColor: "rgba(244,63,94,0.2)",
  },
  streakBadgeText: { fontSize: 10, color: Colors.coral, fontWeight: "600" },
});
