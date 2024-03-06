import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import HorizontalLinearGradient from "./HorizontalLinearGradient";

interface CardProps extends PropsWithChildren {
  colors?: (string | number) []
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <HorizontalLinearGradient 
      style={styles.card}
      colors={['#f7cf25', '#ffef65']}
    >
      {children}
    </HorizontalLinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
  }
});

export default Card;