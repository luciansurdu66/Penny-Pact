import { FC } from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

interface GroupItemProps {
  id: number,
  creator: string,
  name: string;
  onPress: () => void;
  onLongPress: () => void;
}

const GroupItem: FC<GroupItemProps> = ({ name, creator, onPress, onLongPress }) => {
  const defaultGroupImage = '../../assets/images/landscape.jpg';

  return (
    <TouchableNativeFeedback 
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.wrapper}>
        <Image source={require(defaultGroupImage)} style={styles.image} />
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
  }
});

export default GroupItem;