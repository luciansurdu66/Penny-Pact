import { FC, PropsWithChildren } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";

const Banner: FC<PropsWithChildren> = ({ children }) => {
  const defaultBackgroundImage = '../../assets/images/banner.jpg';

  return (
    <ImageBackground
        style={styles.wrapper}
        source={require(defaultBackgroundImage)}
        resizeMode="repeat"
      >
        { children }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    minHeight: 128,
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32
  }
})

export default Banner;