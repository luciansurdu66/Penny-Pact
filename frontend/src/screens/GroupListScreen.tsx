import { FC, useEffect, useState } from "react";
import { ActivityIndicator, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import GroupItem from "../components/GroupItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Banner from "../components/Banner";
import { useApp } from "../providers/AppProvider";
import Group from "../models/Group";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import SearchBar from "../components/SearchBar";

type GroupListScreenProps = StackScreenProps<RootStackParamList, 'GroupList'>;

const GroupListScreen: FC<GroupListScreenProps> = ({ navigation }) => {
  const { 
    groups, 
    isFetchingGroups, 
    fetchGroups,
  } = useApp();

  const renderItem: ListRenderItem<Group> = ({ item }) => {
    return (<GroupItem name={item.name} onPress={ () => onGroupItemPress(item.id) } />);
  };

  // States

  const [searchValue, setSearchValue] = useState('');

  // Effects

  useEffect(() => {
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      {isFetchingGroups && (
        <View style={styles.loader}>
          <ActivityIndicator color={'white'} size={'large'} />
          <Text style={styles.header}>Fetching the groups...</Text>
        </View>
      )}
      <Banner>
        <View style={styles.bannerContent}>
          <TouchableOpacity>
            <Icon 
              name="microsoft-xbox-controller-menu"
              size={64}
              color="black"
            />
            </TouchableOpacity>
            <SearchBar 
              value={searchValue} 
              editable={groups.length > 0}
              onChangeText={(newSearchValue) => setSearchValue(newSearchValue)} 
            />
        </View>
      </Banner>
      <View style={styles.content}>
        {!isFetchingGroups && (
          <View style={styles.list}>
            {groups.length > 0 ? (
              filteredGroups.length > 0 ? (
                <FlatList 
                  data={filteredGroups}
                  renderItem={renderItem}
                />
              ) : (
                <View style={styles.centeredContainer}>
                  <Text style={styles.text}>No matches found...</Text>
                </View>
              )
            ) : (
              <View style={styles.centeredContainer}>
                <Text style={styles.header}>You're not part of any group...</Text>
                <Text style={styles.text}>Don't worry, you can always create a new group by pressing the add button! 👇🏻</Text>
              </View>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.fab}>
          <Icon name='plus-circle' size={64} color={'#f8d717'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Functions

  function onGroupItemPress(groupId: number) {
    navigation.navigate('Group', { groupId });
  };
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
    color: 'white',
    textAlign: 'center'
  },
  centeredContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  },
});

export default GroupListScreen;