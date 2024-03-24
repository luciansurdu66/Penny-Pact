import { FC, PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface HorizontalLinearGradientProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>
  colors: (string | number)[]
};

const HorizontalLinearGradient: FC<HorizontalLinearGradientProps> = ({ children, style, colors }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={colors}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default HorizontalLinearGradient;