import { FC } from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import Friend from "../models/Friend";

interface FriendItemProps {
  friend: Friend
}

const FriendItem: FC<FriendItemProps> = ({ friend }) => {
  const username = friend.username;
  const profilePicture = friend.profilePicture;

  return (
    <TouchableNativeFeedback>
      <View style={styles.wrapper}>
        <Image 
          source={profilePicture ?? require('../../assets/images/person.jpg')} 
          style={styles.image} 
        />
        <View style={styles.details}>
          <Text 
            style={styles.username}
            numberOfLines={1}
          >
            {username}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    alignItems: 'center'
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  username: {
    fontSize: 24,
    color: 'white',
  },
  details: {
    flex: 1,
  }
});

export default FriendItem;