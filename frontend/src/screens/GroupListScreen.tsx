import { FC, useEffect } from "react";
import { ActivityIndicator, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GroupItem from "../components/GroupItem";
import Icon from "react-native-vector-icons/Feather";
import Banner from "../components/Banner";
import { useApp } from "../providers/AppProvider";
import Group from "../models/Group";

const GroupListScreen: FC = () => {
  const { 
    groups, 
    isFetchingGroups, 
    fetchGroups,
  } = useApp();

  const renderItem: ListRenderItem<Group> = ({ item }) => {
    return (<GroupItem name={item.name} />);
  }

  // Effects

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <View style={styles.wrapper}>
      {isFetchingGroups && (
        <View style={styles.loader}>
          <ActivityIndicator color={'white'} size={'large'} />
          <Text style={styles.header}>Fetching the groups...</Text>
        </View>
      )}
      <Banner />
      <View style={styles.content}>
        {!isFetchingGroups && (
          <View style={styles.list}>
            {groups.length > 0 ? (
              <FlatList 
                data={groups}
                renderItem={renderItem}
              />
            ) : (
              <>
                <Text style={styles.header}>You're not part of any group</Text>
                <Text style={styles.header}>:(</Text>
              </>
            )}
          </View>
        )}
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
    backgroundColor: 'black'
  },
  content: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,
    alignItems: 'center'
  },
  list: {
    width: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: 32
  },
  error: {
    fontSize: 16,
    color: 'red'
  },
  header: {
    fontSize: 24,
    color: 'white'
  },
  loader: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    position: 'absolute',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: 'black'
  },
});

export default GroupListScreen;