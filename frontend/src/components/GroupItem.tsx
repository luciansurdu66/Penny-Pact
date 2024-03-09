import { FC } from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

interface GroupItemProps {
  name: string
}

const GroupItem: FC<GroupItemProps> = ({ name }) => {
  const defaultGroupImage = '../../assets/images/landscape.jpg';

  return (
    <TouchableNativeFeedback>
      <View style={styles.wrapper}>
        <Image source={require(defaultGroupImage)} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
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
    color: 'white'
  }
});

export default GroupItem;