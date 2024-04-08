import { FC } from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View, TouchableOpacity } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface GroupItemProps {
  id: number,
  creator: string,
  name: string;
  onPress: () => void;
  onDeletePress: () => void;
  onInvitePress: () => void;
}

const GroupItem: FC<GroupItemProps> = ({ name, creator, onPress, onDeletePress, onInvitePress }) => {
  const defaultGroupImage = '../../../assets/images/landscape.jpg';

  return (
    <TouchableNativeFeedback 
      onPress={onPress}
    >
      <View style={styles.wrapper}>
        <Image 
          source={require(defaultGroupImage)} 
          style={styles.image} 
        />
        <View style={styles.details}>
          <Text 
            style={styles.name}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={styles.creator}
            numberOfLines={1}
          >
            Created by {creator}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity 
            onPress={onInvitePress}
            style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            padding: 8,
          }}>
            <AntDesignIcon 
              name='adduser'
              color='white'
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onDeletePress}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: 8,
          }}>
            <FontAwesome 
              name='trash-o'
              color='rgba(255, 0, 0, 0.75)'
              size={24}
            />
          </TouchableOpacity>
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
  name: {
    fontSize: 24,
    color: 'white',
  },
  creator: {
  },
  details: {
    flex: 1,
  },
  buttons: {
    height: '100%',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 4
  }
});

export default GroupItem;