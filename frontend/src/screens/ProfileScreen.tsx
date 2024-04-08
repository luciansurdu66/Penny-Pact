import { RootStackParamList } from "../navigation/AppNavigator";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Banner from "../components/Banner";
import { DrawerScreenProps } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../providers/AuthProvider";

type SetttingsScreenProps = DrawerScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: FC<SetttingsScreenProps> = ({ navigation }) => {
  const { loggedUser } = useAuth();
  const defaultProfilePicture = '../../assets/images/person.jpg'

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
          <Text style={styles.header}>
            Profile
          </Text>
        </View>
      </Banner>
      <View style={styles.centeredContainer}>
        <View
          style={{ 
            padding: 32,
            borderColor: 'white', 
            borderWidth: 1,
            alignItems: 'center'
          }}
        >
          <Image source={require(defaultProfilePicture)} style={styles.profilePicture}/>
          <Text style={styles.text}>ID: #{loggedUser!!.id}</Text>
          <Text style={styles.text}>Username: {loggedUser!!.username}</Text>
          <Text style={styles.text}>Email: {loggedUser!!.email}</Text>
        </View>
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
  },
  profilePicture: {
    height: 128,
    width: 128,
    marginBottom: 16
  }
});

export default ProfileScreen;