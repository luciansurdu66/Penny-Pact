import { RootStackParamList } from "../navigation/AppNavigator";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Banner from "../components/Banner";
import { DrawerScreenProps } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type SetttingsScreenProps = DrawerScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: FC<SetttingsScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Banner>
        <View style={styles.bannerContent}>
          <TouchableOpacity onPress={handleMenuButtonPress}>
            <Icon 
              name="microsoft-xbox-controller-menu"
              size={64}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.header}>Settings</Text>
        </View>
      </Banner>
      <View style={styles.centeredContainer}>
        <Icon name="tools" size={32} color="white" />
        <Text style={styles.text}>Screen under construction...</Text>
      </View>
    </View>
  );

  // Functions

  function handleMenuButtonPress() {
    navigation.openDrawer();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: 'black'
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  }
});

export default SettingsScreen;