import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/lib/theme/ThemeContext";

function ActiveIndicator({ color }: { color: string }) {
  return <View style={[styles.indicator, { backgroundColor: color }]} />;
}

export default function TabLayout() {
  const { colors, mode } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.teal,
        tabBarInactiveTintColor: colors.mutedLight,
        tabBarStyle: {
          backgroundColor: mode === "dark" ? "rgba(10,14,26,0.95)" : "rgba(248,250,252,0.95)",
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && <ActiveIndicator color={color} />}
              <Ionicons name={focused ? "grid" : "grid-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="guardian"
        options={{
          title: "보호자",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && <ActiveIndicator color={color} />}
              <Ionicons name={focused ? "people" : "people-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="org"
        options={{
          title: "관제",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && <ActiveIndicator color={color} />}
              <Ionicons name={focused ? "business" : "business-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="vital-cash"
        options={{
          title: "캐시",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && <ActiveIndicator color={color} />}
              <Ionicons name={focused ? "diamond" : "diamond-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && <ActiveIndicator color={color} />}
              <Ionicons name={focused ? "settings" : "settings-outline"} size={20} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  indicator: {
    width: 16,
    height: 2,
    borderRadius: 1,
    marginBottom: 2,
  },
});
