import { FC } from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import User from "../../models/User";

interface FriendItemProps {
  friend: User
}

const FriendItem: FC<FriendItemProps> = ({ friend }) => {
  const id = friend.id;
  const email = friend.email;
  const username = friend.username;
  const defaultProfilePicture = '../../../assets/images/person.jpg';

  return (
    <View style={styles.wrapper}>
      <Image 
        source={require(defaultProfilePicture)} 
        style={styles.image} 
      />
      <View style={styles.details}>
        <Text 
          style={styles.username}
          numberOfLines={1}
        >
          {username} #{id}
        </Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    alignItems: 'center',
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