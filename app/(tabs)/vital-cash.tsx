import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/theme/colors";
import { useTheme } from "@/lib/theme/ThemeContext";
import { GlowCard } from "@/components/GlowCard";

const earningRules = [
  { action: "숙면 달성", points: "500P/일" },
  { action: "아침 준비도", points: "300P/일" },
  { action: "스트레스 관리", points: "300P/일" },
  { action: "가족 연결", points: "200P" },
  { action: "팬덤 챌린지", points: "1,000P/주" },
  { action: "약 복용 인증", points: "100P/회" },
];

const transactions = [
  { reason: "숙면 달성", amount: 500, time: "오늘 06:00", type: "earn" },
  { reason: "아침 준비도 상승", amount: 300, time: "오늘 07:00", type: "earn" },
  { reason: "HRV 목표 유지", amount: 300, time: "어제", type: "earn" },
  { reason: "가족 안부 연결", amount: 200, time: "어제", type: "earn" },
  { reason: "구독료 차감", amount: -19900, time: "04/01", type: "burn" },
  { reason: "팬덤 챌린지 달성", amount: 1000, time: "04/14", type: "earn" },
];

export default function VitalCashScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Ionicons name="diamond" size={24} color={Colors.gold} />
            <Text style={styles.title}>바이탈 캐시</Text>
          </View>
          <Text style={styles.subtitle}>건강하면 포인트가 쌓입니다</Text>

          {/* Balance */}
          <LinearGradient
            colors={["#0F172A", "#1E293B"]}
            style={styles.balanceCard}
          >
            <Text style={styles.balanceLabel}>보유 포인트</Text>
            <Text style={styles.balanceValue}>
              12,400<Text style={styles.balanceUnit}> P</Text>
            </Text>
            <View style={styles.balanceRow}>
              <View style={styles.balanceTile}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="arrow-up" size={10} color={Colors.emerald} />
                  <Text style={styles.balanceTileLabel}>이번 달 적립</Text>
                </View>
                <Text style={[styles.balanceTileValue, { color: Colors.emerald }]}>+4,200P</Text>
              </View>
              <View style={styles.balanceTile}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="arrow-down" size={10} color={Colors.coral} />
                  <Text style={styles.balanceTileLabel}>이번 달 사용</Text>
                </View>
                <Text style={[styles.balanceTileValue, { color: Colors.coral }]}>-19,900P</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Earning rules */}
          <GlowCard accentColor={Colors.teal} opacity={0.03} style={{ marginTop: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <Ionicons name="trending-up" size={16} color={Colors.teal} />
              <Text style={styles.sectionTitle}>적립 방법</Text>
            </View>
            <View style={styles.rulesGrid}>
              {earningRules.map((r) => (
                <View key={r.action} style={styles.ruleItem}>
                  <Text style={styles.ruleAction}>{r.action}</Text>
                  <Text style={styles.rulePoints}>{r.points}</Text>
                </View>
              ))}
            </View>
          </GlowCard>

          {/* Redemption options */}
          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <GlowCard accentColor={Colors.teal} style={{ flex: 1 }}>
              <Ionicons name="gift" size={20} color={Colors.teal} />
              <Text style={styles.optTitle}>구독료 차감</Text>
              <Text style={styles.optDesc}>포인트로 구독료 결제</Text>
            </GlowCard>
            <GlowCard accentColor={Colors.gold} style={{ flex: 1 }}>
              <Ionicons name="cart" size={20} color={Colors.gold} />
              <Text style={styles.optTitle}>바이탈 몰</Text>
              <Text style={styles.optDesc}>건강 상품 구매</Text>
            </GlowCard>
            <GlowCard accentColor={Colors.purple} style={{ flex: 1 }} opacity={0.05}>
              <Ionicons name="shield" size={20} color={Colors.purple} />
              <Text style={styles.optTitle}>파트너 혜택</Text>
              <Text style={styles.optDesc}>보험/상조 할인</Text>
            </GlowCard>
          </View>

          {/* Transaction history */}
          <View style={styles.txCard}>
            <Text style={styles.sectionTitle}>거래 내역</Text>
            <View style={{ marginTop: 12 }}>
              {transactions.map((tx, i) => (
                <View key={i} style={[styles.txRow, i === transactions.length - 1 && { borderBottomWidth: 0 }]}>
                  <View>
                    <Text style={styles.txReason}>{tx.reason}</Text>
                    <Text style={styles.txTime}>{tx.time}</Text>
                  </View>
                  <Text style={[styles.txAmount, { color: tx.amount > 0 ? Colors.emerald : Colors.coral }]}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, paddingBottom: 80 },
  header: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 22, fontWeight: "700", color: Colors.foreground },
  subtitle: { fontSize: 12, color: Colors.muted, marginTop: 4 },
  balanceCard: { padding: 20, borderRadius: 20, marginTop: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  balanceLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 },
  balanceValue: { fontSize: 36, fontWeight: "900", color: "#fff", fontVariant: ["tabular-nums"] },
  balanceUnit: { fontSize: 16, fontWeight: "400" },
  balanceRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  balanceTile: { flex: 1, padding: 10, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 10 },
  balanceTileLabel: { fontSize: 9, color: "rgba(255,255,255,0.6)" },
  balanceTileValue: { fontSize: 16, fontWeight: "700", marginTop: 4 },
  sectionTitle: { fontSize: 13, fontWeight: "600", color: Colors.foreground },
  rulesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  ruleItem: { width: "31%", padding: 10, backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 10, alignItems: "center" },
  ruleAction: { fontSize: 10, color: Colors.foreground, textAlign: "center" },
  rulePoints: { fontSize: 12, fontWeight: "700", color: Colors.teal, marginTop: 4 },
  optTitle: { fontSize: 12, fontWeight: "600", color: Colors.foreground, marginTop: 8 },
  optDesc: { fontSize: 9, color: Colors.muted, marginTop: 2 },
  txCard: { padding: 16, backgroundColor: Colors.card, borderRadius: 20, marginTop: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.04)" },
  txRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  txReason: { fontSize: 13, color: Colors.foreground },
  txTime: { fontSize: 10, color: Colors.muted, marginTop: 2 },
  txAmount: { fontSize: 13, fontWeight: "700", fontVariant: ["tabular-nums"] },
});
