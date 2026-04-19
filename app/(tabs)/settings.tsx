import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/theme/colors";
import { useTheme } from "@/lib/theme/ThemeContext";

const healthSources = [
  { id: "vitalring", name: "VitalRing", icon: "finger-print" as const, connected: true, color: Colors.teal, device: "VR-2026-48291 / 72%" },
  { id: "apple", name: "Apple HealthKit", icon: "logo-apple" as const, connected: false, color: Colors.blue, device: "Apple Watch Series 9" },
  { id: "samsung", name: "Samsung Health", icon: "phone-portrait" as const, connected: false, color: Colors.emerald, device: "Galaxy Watch 7" },
  { id: "garmin", name: "Garmin Connect", icon: "compass" as const, connected: false, color: Colors.coral, device: "Fenix 8 / Venu 3" },
];

export default function SettingsScreen() {
  const [notif, setNotif] = useState({ daily: true, anomaly: true, weekly: true, marketing: false });
  const [sharing, setSharing] = useState({ insurance: false, research: false });
  const { mode: themeMode, toggle: toggleTheme, colors: themeColors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Ionicons name="settings" size={24} color={themeColors.teal} />
            <Text style={[styles.title, { color: themeColors.foreground }]}>설정</Text>
          </View>

          {/* Theme toggle */}
          <View style={[styles.section, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="color-palette" size={16} color={themeColors.muted} />
              <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>화면 모드</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <TouchableOpacity
                onPress={() => themeMode !== "dark" && toggleTheme()}
                style={[
                  styles.modeBtn,
                  {
                    backgroundColor: themeMode === "dark" ? themeColors.teal : themeColors.cardMuted,
                    borderColor: themeMode === "dark" ? themeColors.teal : themeColors.border,
                  },
                ]}
              >
                <Ionicons name="moon" size={16} color={themeMode === "dark" ? "#fff" : themeColors.muted} />
                <Text style={[styles.modeBtnText, { color: themeMode === "dark" ? "#fff" : themeColors.muted }]}>다크</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => themeMode !== "light" && toggleTheme()}
                style={[
                  styles.modeBtn,
                  {
                    backgroundColor: themeMode === "light" ? themeColors.teal : themeColors.cardMuted,
                    borderColor: themeMode === "light" ? themeColors.teal : themeColors.border,
                  },
                ]}
              >
                <Ionicons name="sunny" size={16} color={themeMode === "light" ? "#fff" : themeColors.muted} />
                <Text style={[styles.modeBtnText, { color: themeMode === "light" ? "#fff" : themeColors.muted }]}>라이트</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>프로필</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12 }}>
              <LinearGradient colors={[Colors.teal, Colors.blue]} style={styles.avatar}>
                <Text style={styles.avatarText}>JH</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={styles.profileName}>안종현</Text>
                <Text style={styles.profileEmail}>jonghyun.ahn@example.com</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>Premium</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Health Sources */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="fitness" size={16} color={Colors.muted} />
              <Text style={styles.sectionTitle}>연동 기기</Text>
            </View>
            <View style={{ gap: 8, marginTop: 12 }}>
              {healthSources.map((s) => (
                <View key={s.id} style={styles.sourceRow}>
                  <View style={[styles.sourceIcon, { backgroundColor: `${s.color}1A` }]}>
                    <Ionicons name={s.icon} size={18} color={s.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sourceName}>{s.name}</Text>
                    <Text style={styles.sourceDevice}>{s.device}</Text>
                  </View>
                  {s.connected ? (
                    <View style={styles.connectedBadge}>
                      <Ionicons name="checkmark-circle" size={12} color={Colors.emerald} />
                      <Text style={styles.connectedText}>연결됨</Text>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.connectBtn}>
                      <Text style={styles.connectBtnText}>연결</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="notifications" size={16} color={Colors.muted} />
              <Text style={styles.sectionTitle}>알림 설정</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              {[
                { k: "daily" as const, label: "일일 건강 리포트", desc: "매일 06:00 KakaoTalk 발송" },
                { k: "anomaly" as const, label: "이상 징후 알림", desc: "실시간 긴급 알림" },
                { k: "weekly" as const, label: "주간 요약 리포트", desc: "매주 월요일 09:00" },
                { k: "marketing" as const, label: "마케팅/이벤트", desc: "프로모션 안내" },
              ].map((n) => (
                <View key={n.k} style={styles.toggleRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.toggleLabel}>{n.label}</Text>
                    <Text style={styles.toggleDesc}>{n.desc}</Text>
                  </View>
                  <Switch
                    value={notif[n.k]}
                    onValueChange={() => setNotif((p) => ({ ...p, [n.k]: !p[n.k] }))}
                    trackColor={{ true: Colors.teal, false: Colors.surface }}
                    thumbColor="#fff"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Data Sharing */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark" size={16} color={Colors.muted} />
              <Text style={styles.sectionTitle}>개인정보 및 데이터</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <View style={styles.toggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.toggleLabel}>보험사 데이터 공유</Text>
                  <Text style={styles.toggleDesc}>VITA Score + 수면/활동 트렌드 (원시 데이터 제외)</Text>
                </View>
                <Switch
                  value={sharing.insurance}
                  onValueChange={() => setSharing((p) => ({ ...p, insurance: !p.insurance }))}
                  trackColor={{ true: Colors.teal, false: Colors.surface }}
                  thumbColor="#fff"
                />
              </View>
              <View style={styles.toggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.toggleLabel}>연구 데이터 제공</Text>
                  <Text style={styles.toggleDesc}>비식별화 데이터를 의학 연구에 제공</Text>
                </View>
                <Switch
                  value={sharing.research}
                  onValueChange={() => setSharing((p) => ({ ...p, research: !p.research }))}
                  trackColor={{ true: Colors.teal, false: Colors.surface }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </View>

          {/* Subscription link */}
          <TouchableOpacity style={styles.linkRow}>
            <Ionicons name="card" size={16} color={Colors.gold} />
            <Text style={styles.linkText}>구독 관리</Text>
            <View style={styles.currentPlan}>
              <Text style={styles.currentPlanText}>Premium</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.mutedLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkRow}>
            <Ionicons name="log-out-outline" size={16} color={Colors.coral} />
            <Text style={[styles.linkText, { color: Colors.coral }]}>로그아웃</Text>
          </TouchableOpacity>
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
  section: { padding: 16, backgroundColor: Colors.card, borderRadius: 16, marginTop: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.04)" },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  sectionTitle: { fontSize: 13, fontWeight: "600", color: Colors.foreground },
  modeBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 12, borderRadius: 10, borderWidth: 1 },
  modeBtnText: { fontSize: 13, fontWeight: "600" },
  avatar: { width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 18, fontWeight: "700", color: "#fff" },
  profileName: { fontSize: 16, fontWeight: "700", color: Colors.foreground },
  profileEmail: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  premiumBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, backgroundColor: Colors.surface, borderRadius: 6, marginTop: 4 },
  premiumText: { fontSize: 10, color: Colors.foreground, fontWeight: "600" },
  sourceRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 6 },
  sourceIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  sourceName: { fontSize: 13, fontWeight: "500", color: Colors.foreground },
  sourceDevice: { fontSize: 10, color: Colors.muted, marginTop: 2 },
  connectedBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: "rgba(16,185,129,0.1)", borderRadius: 6, borderWidth: 1, borderColor: "rgba(16,185,129,0.2)" },
  connectedText: { fontSize: 10, color: Colors.emerald, fontWeight: "600" },
  connectBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: Colors.teal, borderRadius: 6 },
  connectBtnText: { fontSize: 10, color: "#fff", fontWeight: "600" },
  toggleRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  toggleLabel: { fontSize: 13, color: Colors.foreground },
  toggleDesc: { fontSize: 10, color: Colors.muted, marginTop: 2 },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16, backgroundColor: Colors.card, borderRadius: 16, marginTop: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.04)" },
  linkText: { flex: 1, fontSize: 13, color: Colors.foreground, fontWeight: "500" },
  currentPlan: { paddingHorizontal: 8, paddingVertical: 2, backgroundColor: "rgba(245,158,11,0.15)", borderRadius: 6 },
  currentPlanText: { fontSize: 10, color: Colors.gold, fontWeight: "600" },
});
