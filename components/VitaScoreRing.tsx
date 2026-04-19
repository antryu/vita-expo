import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Colors } from "../theme/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  score: number;
  size?: number;
}

export function VitaScoreRing({ score, size = 96 }: Props) {
  const progress = useSharedValue(0);
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    progress.value = withTiming(score, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });
  }, [score]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * progress.value) / 100,
  }));

  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={Colors.teal} />
            <Stop offset="100%" stopColor={Colors.blue} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={6}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={6}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={[styles.score, { fontSize: size * 0.3 }]}>{score}</Text>
      <Text style={[styles.label, { fontSize: size * 0.07 }]}>SCORE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  score: {
    fontWeight: "900",
    color: Colors.foreground,
    fontVariant: ["tabular-nums"],
  },
  label: {
    color: Colors.muted,
    letterSpacing: 2,
    marginTop: -4,
  },
});
