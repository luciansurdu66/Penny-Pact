import { FC } from "react";
import { Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GroupItem from "../components/GroupItem";
import Icon from "react-native-vector-icons/Feather";
import Banner from "../components/Banner";

interface GroupListScreenProps {
  groups: (string)[];
}

const GroupListScreen: FC<GroupListScreenProps> = ({ groups }) => {
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (<GroupItem name={item} />);
  }

  return (
    <View style={styles.wrapper}>
      <Banner />
      <View style={styles.content}>
        <View style={styles.list}>
          <FlatList 
            data={groups}
            renderItem={renderItem}
          />
        </View>
        <TouchableOpacity style={styles.fab}>
          <Icon name='plus-circle' size={64} color={'#f8d717'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  content: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: 32
  }
});

export default GroupListScreen;