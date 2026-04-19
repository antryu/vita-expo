import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface Props {
  accentColor: string;
  children: React.ReactNode;
  style?: ViewStyle;
  opacity?: number;
}

export function GlowCard({ accentColor, children, style, opacity = 0.08 }: Props) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: `${accentColor}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`,
          borderColor: `${accentColor}1F`,
          shadowColor: accentColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
  },
});
