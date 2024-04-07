import { RootStackParamList } from "../navigation/AppNavigator";
import { FC } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import Banner from "../components/Banner";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Friend from "../models/Friend";
import { useApp } from "../providers/AppProvider";
import FriendItem from "../components/FriendItem";

type FindFriendsScreenProps = DrawerScreenProps<RootStackParamList, 'Friends'>;

const SettingsScreen: FC<FindFriendsScreenProps> = ({ navigation }) => {
  const renderItem: ListRenderItem<Friend> = ({ item: friend }) => {
    return (
      <FriendItem friend={friend} />
    )
  };

  // States

  const {
    friends
  } = useApp();

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
          <Text style={styles.header}>Friends</Text>
        </View>
      </Banner>
      <View style={styles.content}>
        <FlatList 
          data={friends}
          renderItem={renderItem}
        />
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
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32
  },
});

export default SettingsScreen;