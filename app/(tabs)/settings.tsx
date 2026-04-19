import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { type ThemeColors } from "@/theme/colors";
import { useTheme } from "@/lib/theme/ThemeContext";

export default function SettingsScreen() {
  const [notif, setNotif] = useState({ daily: true, anomaly: true, weekly: true, marketing: false });
  const [sharing, setSharing] = useState({ insurance: false, research: false });
  const { mode: themeMode, toggle: toggleTheme, colors } = useTheme();
  const s = makeStyles(colors);

  const healthSources = [
    { id: "vitalring", name: "VitalRing", icon: "finger-print" as const, connected: true, color: colors.teal, device: "VR-2026-48291 / 72%" },
    { id: "apple", name: "Apple HealthKit", icon: "logo-apple" as const, connected: false, color: colors.blue, device: "Apple Watch Series 9" },
    { id: "samsung", name: "Samsung Health", icon: "phone-portrait" as const, connected: false, color: colors.emerald, device: "Galaxy Watch 7" },
    { id: "garmin", name: "Garmin Connect", icon: "compass" as const, connected: false, color: colors.coral, device: "Fenix 8 / Venu 3" },
  ];

  return (
    <View style={s.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll}>
          <View style={s.header}>
            <Ionicons name="settings" size={24} color={colors.teal} />
            <Text style={s.title}>설정</Text>
          </View>

          {/* Theme toggle */}
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Ionicons name="color-palette" size={16} color={colors.muted} />
              <Text style={s.sectionTitle}>화면 모드</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              <TouchableOpacity
                onPress={() => themeMode !== "dark" && toggleTheme()}
                style={[
                  s.modeBtn,
                  themeMode === "dark"
                    ? { backgroundColor: colors.teal, borderColor: colors.teal }
                    : { backgroundColor: colors.cardMuted, borderColor: colors.border },
                ]}
              >
                <Ionicons name="moon" size={16} color={themeMode === "dark" ? "#fff" : colors.muted} />
                <Text style={[s.modeBtnText, { color: themeMode === "dark" ? "#fff" : colors.muted }]}>다크</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => themeMode !== "light" && toggleTheme()}
                style={[
                  s.modeBtn,
                  themeMode === "light"
                    ? { backgroundColor: colors.teal, borderColor: colors.teal }
                    : { backgroundColor: colors.cardMuted, borderColor: colors.border },
                ]}
              >
                <Ionicons name="sunny" size={16} color={themeMode === "light" ? "#fff" : colors.muted} />
                <Text style={[s.modeBtnText, { color: themeMode === "light" ? "#fff" : colors.muted }]}>라이트</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>프로필</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12 }}>
              <LinearGradient colors={[colors.teal, colors.blue]} style={s.avatar}>
                <Text style={s.avatarText}>JH</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={s.profileName}>안종현</Text>
                <Text style={s.profileEmail}>jonghyun.ahn@example.com</Text>
                <View style={s.premiumBadge}>
                  <Text style={s.premiumText}>Premium</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Health Sources */}
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Ionicons name="fitness" size={16} color={colors.muted} />
              <Text style={s.sectionTitle}>연동 기기</Text>
            </View>
            <View style={{ gap: 8, marginTop: 12 }}>
              {healthSources.map((src) => (
                <View key={src.id} style={s.sourceRow}>
                  <View style={[s.sourceIcon, { backgroundColor: `${src.color}1A` }]}>
                    <Ionicons name={src.icon} size={18} color={src.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.sourceName}>{src.name}</Text>
                    <Text style={s.sourceDevice}>{src.device}</Text>
                  </View>
                  {src.connected ? (
                    <View style={s.connectedBadge}>
                      <Ionicons name="checkmark-circle" size={12} color={colors.emerald} />
                      <Text style={s.connectedText}>연결됨</Text>
                    </View>
                  ) : (
                    <TouchableOpacity style={s.connectBtn}>
                      <Text style={s.connectBtnText}>연결</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Notifications */}
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Ionicons name="notifications" size={16} color={colors.muted} />
              <Text style={s.sectionTitle}>알림 설정</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              {[
                { k: "daily" as const, label: "일일 건강 리포트", desc: "매일 06:00 KakaoTalk 발송" },
                { k: "anomaly" as const, label: "이상 징후 알림", desc: "실시간 긴급 알림" },
                { k: "weekly" as const, label: "주간 요약 리포트", desc: "매주 월요일 09:00" },
                { k: "marketing" as const, label: "마케팅/이벤트", desc: "프로모션 안내" },
              ].map((n) => (
                <View key={n.k} style={s.toggleRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={s.toggleLabel}>{n.label}</Text>
                    <Text style={s.toggleDesc}>{n.desc}</Text>
                  </View>
                  <Switch
                    value={notif[n.k]}
                    onValueChange={() => setNotif((p) => ({ ...p, [n.k]: !p[n.k] }))}
                    trackColor={{ true: colors.teal, false: colors.surface }}
                    thumbColor="#fff"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Data Sharing */}
          <View style={s.section}>
            <View style={s.sectionHeader}>
              <Ionicons name="shield-checkmark" size={16} color={colors.muted} />
              <Text style={s.sectionTitle}>개인정보 및 데이터</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <View style={s.toggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.toggleLabel}>보험사 데이터 공유</Text>
                  <Text style={s.toggleDesc}>VITA Score + 수면/활동 트렌드 (원시 데이터 제외)</Text>
                </View>
                <Switch
                  value={sharing.insurance}
                  onValueChange={() => setSharing((p) => ({ ...p, insurance: !p.insurance }))}
                  trackColor={{ true: colors.teal, false: colors.surface }}
                  thumbColor="#fff"
                />
              </View>
              <View style={s.toggleRow}>
                <View style={{ flex: 1 }}>
                  <Text style={s.toggleLabel}>연구 데이터 제공</Text>
                  <Text style={s.toggleDesc}>비식별화 데이터를 의학 연구에 제공</Text>
                </View>
                <Switch
                  value={sharing.research}
                  onValueChange={() => setSharing((p) => ({ ...p, research: !p.research }))}
                  trackColor={{ true: colors.teal, false: colors.surface }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={s.linkRow}>
            <Ionicons name="card" size={16} color={colors.gold} />
            <Text style={s.linkText}>구독 관리</Text>
            <View style={s.currentPlan}>
              <Text style={s.currentPlanText}>Premium</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedLight} />
          </TouchableOpacity>

          <TouchableOpacity style={s.linkRow}>
            <Ionicons name="log-out-outline" size={16} color={colors.coral} />
            <Text style={[s.linkText, { color: colors.coral }]}>로그아웃</Text>
          </TouchableOpacity>
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
    section: { padding: 16, backgroundColor: c.card, borderRadius: 16, marginTop: 12, borderWidth: 1, borderColor: c.border },
    sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
    sectionTitle: { fontSize: 13, fontWeight: "600", color: c.foreground },
    modeBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 12, borderRadius: 10, borderWidth: 1 },
    modeBtnText: { fontSize: 13, fontWeight: "600" },
    avatar: { width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center" },
    avatarText: { fontSize: 18, fontWeight: "700", color: "#fff" },
    profileName: { fontSize: 16, fontWeight: "700", color: c.foreground },
    profileEmail: { fontSize: 11, color: c.muted, marginTop: 2 },
    premiumBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, backgroundColor: c.surface, borderRadius: 6, marginTop: 4 },
    premiumText: { fontSize: 10, color: c.foreground, fontWeight: "600" },
    sourceRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 6 },
    sourceIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
    sourceName: { fontSize: 13, fontWeight: "500", color: c.foreground },
    sourceDevice: { fontSize: 10, color: c.muted, marginTop: 2 },
    connectedBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: `${c.emerald}1A`, borderRadius: 6, borderWidth: 1, borderColor: `${c.emerald}33` },
    connectedText: { fontSize: 10, color: c.emerald, fontWeight: "600" },
    connectBtn: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: c.teal, borderRadius: 6 },
    connectBtnText: { fontSize: 10, color: "#fff", fontWeight: "600" },
    toggleRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
    toggleLabel: { fontSize: 13, color: c.foreground },
    toggleDesc: { fontSize: 10, color: c.muted, marginTop: 2 },
    linkRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16, backgroundColor: c.card, borderRadius: 16, marginTop: 12, borderWidth: 1, borderColor: c.border },
    linkText: { flex: 1, fontSize: 13, color: c.foreground, fontWeight: "500" },
    currentPlan: { paddingHorizontal: 8, paddingVertical: 2, backgroundColor: `${c.gold}26`, borderRadius: 6 },
    currentPlanText: { fontSize: 10, color: c.gold, fontWeight: "600" },
  });
}
