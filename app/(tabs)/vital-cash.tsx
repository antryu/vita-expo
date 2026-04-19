import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { type ThemeColors } from "@/theme/colors";
import { GlowCard } from "@/components/GlowCard";
import { useTheme } from "@/lib/theme/ThemeContext";

const earningRules = [
  { action: "숙면 달성", points: "500P/일" },
  { action: "아침 준비도", points: "300P/일" },
  { action: "스트레스 관리", points: "300P/일" },
  { action: "가족 연결", points: "200P" },
  { action: "팬덤 챌린지", points: "1,000P/주" },
  { action: "약 복용 인증", points: "100P/회" },
];

const transactions = [
  { reason: "숙면 달성", amount: 500, time: "오늘 06:00" },
  { reason: "아침 준비도 상승", amount: 300, time: "오늘 07:00" },
  { reason: "HRV 목표 유지", amount: 300, time: "어제" },
  { reason: "가족 안부 연결", amount: 200, time: "어제" },
  { reason: "구독료 차감", amount: -19900, time: "04/01" },
  { reason: "팬덤 챌린지 달성", amount: 1000, time: "04/14" },
];

export default function VitalCashScreen() {
  const { colors, mode } = useTheme();
  const s = makeStyles(colors);

  return (
    <View style={s.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={s.header}>
            <Ionicons name="diamond" size={24} color={colors.gold} />
            <Text style={s.title}>바이탈 캐시</Text>
          </View>
          <Text style={s.subtitle}>건강하면 포인트가 쌓입니다</Text>

          <LinearGradient
            colors={mode === "dark" ? ["#0F172A", "#1E293B"] : ["#1E293B", "#334155"]}
            style={s.balanceCard}
          >
            <Text style={s.balanceLabel}>보유 포인트</Text>
            <Text style={s.balanceValue}>
              12,400<Text style={s.balanceUnit}> P</Text>
            </Text>
            <View style={s.balanceRow}>
              <View style={s.balanceTile}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="arrow-up" size={10} color={colors.emerald} />
                  <Text style={s.balanceTileLabel}>이번 달 적립</Text>
                </View>
                <Text style={[s.balanceTileValue, { color: colors.emerald }]}>+4,200P</Text>
              </View>
              <View style={s.balanceTile}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="arrow-down" size={10} color={colors.coral} />
                  <Text style={s.balanceTileLabel}>이번 달 사용</Text>
                </View>
                <Text style={[s.balanceTileValue, { color: colors.coral }]}>-19,900P</Text>
              </View>
            </View>
          </LinearGradient>

          <GlowCard accentColor={colors.teal} opacity={0.03} style={{ marginTop: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <Ionicons name="trending-up" size={16} color={colors.teal} />
              <Text style={s.sectionTitle}>적립 방법</Text>
            </View>
            <View style={s.rulesGrid}>
              {earningRules.map((r) => (
                <View key={r.action} style={s.ruleItem}>
                  <Text style={s.ruleAction}>{r.action}</Text>
                  <Text style={s.rulePoints}>{r.points}</Text>
                </View>
              ))}
            </View>
          </GlowCard>

          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <GlowCard accentColor={colors.teal} style={{ flex: 1 }}>
              <Ionicons name="gift" size={20} color={colors.teal} />
              <Text style={s.optTitle}>구독료 차감</Text>
              <Text style={s.optDesc}>포인트로 구독료 결제</Text>
            </GlowCard>
            <GlowCard accentColor={colors.gold} style={{ flex: 1 }}>
              <Ionicons name="cart" size={20} color={colors.gold} />
              <Text style={s.optTitle}>바이탈 몰</Text>
              <Text style={s.optDesc}>건강 상품 구매</Text>
            </GlowCard>
            <GlowCard accentColor={colors.purple} style={{ flex: 1 }} opacity={0.05}>
              <Ionicons name="shield" size={20} color={colors.purple} />
              <Text style={s.optTitle}>파트너 혜택</Text>
              <Text style={s.optDesc}>보험/상조 할인</Text>
            </GlowCard>
          </View>

          <View style={s.txCard}>
            <Text style={s.sectionTitle}>거래 내역</Text>
            <View style={{ marginTop: 12 }}>
              {transactions.map((tx, i) => (
                <View key={i} style={[s.txRow, i === transactions.length - 1 && { borderBottomWidth: 0 }]}>
                  <View>
                    <Text style={s.txReason}>{tx.reason}</Text>
                    <Text style={s.txTime}>{tx.time}</Text>
                  </View>
                  <Text style={[s.txAmount, { color: tx.amount > 0 ? colors.emerald : colors.coral }]}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}P
                  </Text>
                </View>
              ))}
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
    header: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { fontSize: 22, fontWeight: "700", color: c.foreground },
    subtitle: { fontSize: 12, color: c.muted, marginTop: 4 },
    balanceCard: { padding: 20, borderRadius: 20, marginTop: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
    balanceLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 },
    balanceValue: { fontSize: 36, fontWeight: "900", color: "#fff", fontVariant: ["tabular-nums"] },
    balanceUnit: { fontSize: 16, fontWeight: "400" },
    balanceRow: { flexDirection: "row", gap: 10, marginTop: 16 },
    balanceTile: { flex: 1, padding: 10, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10 },
    balanceTileLabel: { fontSize: 9, color: "rgba(255,255,255,0.6)" },
    balanceTileValue: { fontSize: 16, fontWeight: "700", marginTop: 4 },
    sectionTitle: { fontSize: 13, fontWeight: "600", color: c.foreground },
    rulesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    ruleItem: { width: "31%", padding: 10, backgroundColor: c.cardMuted, borderRadius: 10, alignItems: "center" },
    ruleAction: { fontSize: 10, color: c.foreground, textAlign: "center" },
    rulePoints: { fontSize: 12, fontWeight: "700", color: c.teal, marginTop: 4 },
    optTitle: { fontSize: 12, fontWeight: "600", color: c.foreground, marginTop: 8 },
    optDesc: { fontSize: 9, color: c.muted, marginTop: 2 },
    txCard: { padding: 16, backgroundColor: c.card, borderRadius: 20, marginTop: 12, borderWidth: 1, borderColor: c.border },
    txRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: c.border },
    txReason: { fontSize: 13, color: c.foreground },
    txTime: { fontSize: 10, color: c.muted, marginTop: 2 },
    txAmount: { fontSize: 13, fontWeight: "700", fontVariant: ["tabular-nums"] },
  });
}
