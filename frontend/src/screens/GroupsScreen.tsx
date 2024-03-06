import { FC } from "react";
import { ListRenderItem, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GroupItem from "../components/GroupItem";
import Icon from "react-native-vector-icons/FontAwesome";

interface GroupScreenProps {
  groups: (string)[];
}

const GroupScreen: FC<GroupScreenProps> = ({ groups }) => {
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return <GroupItem name={item} />
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.list}>
        <FlatList 
          data={groups}
          renderItem={renderItem}
        />
      </View>
      <Icon name='plus' size={60} color={'#f8d717'} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  list: {
    width: '100%'
  }
})

export default GroupScreen;