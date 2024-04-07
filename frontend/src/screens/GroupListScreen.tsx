import { FC, useEffect, useState } from "react";
import { 
  FlatList, 
  ActivityIndicator, 
  ListRenderItem, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput 
} from "react-native";
import GroupItem from "../components/GroupItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Banner from "../components/Banner";
import { useApp } from "../providers/AppProvider";
import Group from "../models/Group";
import { RootStackParamList } from "../navigation/AppNavigator";
import SearchBar from "../components/SearchBar";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Button, Dialog } from "react-native-paper";

type GroupListScreenProps = DrawerScreenProps<RootStackParamList, 'GroupList'>;

const GroupListScreen: FC<GroupListScreenProps> = ({ navigation }) => {
  const renderItem: ListRenderItem<Group> = ({ item }) => {
    return (
      <GroupItem 
        id={item.id}
        name={item.name}
        creator={item.creator}
        onPress={ () => handleGroupItemPress(item) } 
        onLongPress={ () => {
          setGroupMarkedForDeletion(item);
          setIsGroupDeletionDialogVisible(true);
        }}
      />);
  };

  // States

  const { 
    groups, 
    isFetchingGroups,
    isSavingGroup,
    isDeletingGroup, 
    fetchGroups,
    saveGroup,
    deleteGroup
  } = useApp();

  const [searchValue, setSearchValue] = useState('');
  const [groupCreationDialogInputValue, setGroupCreationDialogInputValue] = useState('');
  const [groupCreationDialogError, setGroupCreationDialogError] = useState('');
  const [isGroupCreationDialogVisible, setIsGroupCreationDialogVisible] = useState(false);
  const [isGroupDeletionDialogVisible, setIsGroupDeletionDialogVisible] = useState(false);
  const [groupMarkedForDeletion, setGroupMarkedForDeletion] = useState<Group | undefined>();
  const [groupDeletionDialogError, setGroupDeletionDialogError] = useState('');

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
          <TouchableOpacity onPress={handleMenuButtonPress}>
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
        {!isGroupCreationDialogVisible && (
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => setIsGroupCreationDialogVisible(true)}
          >
            <Icon name='plus-circle' size={64} color={'#f8d717'} />
          </TouchableOpacity>
        )}
      </View>
      <Dialog 
        visible={isGroupCreationDialogVisible}
        onDismiss={
          () => {
            if (!isSavingGroup) {
              setIsGroupCreationDialogVisible(false)
              setGroupCreationDialogInputValue('');
              setGroupCreationDialogError('');
            }
          }
        }
        style={{ backgroundColor: '#f8d717' }}
      >
        <Dialog.Title>
          New Group
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.inputContainer}>
            <TextInput
              editable={!isSavingGroup}
              selectTextOnFocus={!isSavingGroup}
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="black"
              value={groupCreationDialogInputValue}
              onChangeText={
                newValue => { 
                  if (newValue.length <= 36 ) {
                    setGroupCreationDialogInputValue(newValue);
                  }
              }}
            />
          </View>
          {groupCreationDialogError != '' && (
            <Text style={{ color: 'red' }}>{groupCreationDialogError}</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button 
            disabled={isSavingGroup}
            onPress={
              () => {
                setIsGroupCreationDialogVisible(false);
                setGroupCreationDialogInputValue('');
                setGroupCreationDialogError('');
            }}
            textColor="black"
          >
            <Text>Cancel</Text>
          </Button>
          <Button
            disabled={isSavingGroup}
            onPress={() => {
              if (groupCreationDialogInputValue.trim() != '') {
                onSaveGroup();
              } else {
                setGroupCreationDialogError('Name must not be empty!');
              }
            }}
            loading={isSavingGroup}
            contentStyle={{ flexDirection: 'row-reverse' }}
            textColor="black"
          >
            <Text>
              {!isSavingGroup ? 'Create' : 'Creating'}
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog 
        visible={isGroupDeletionDialogVisible}
        onDismiss={
          () => {
            if (!isDeletingGroup) {
              setIsGroupDeletionDialogVisible(false)
            }
          }
        }
        style={{ backgroundColor: '#f8d717' }}
      >
        <Dialog.Title>
          <Text>
            Delete Group {isGroupDeletionDialogVisible && `'${groupMarkedForDeletion!!.name}'`}?
          </Text>
        </Dialog.Title>
        <Dialog.Content
          style={{
            gap: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{
            color: 'black',
            textAlign: 'center',
            paddingHorizontal: 32
          }}>
            Are you sure you want to delete this group? (This can be done only by the group creator.)
          </Text>
          {groupDeletionDialogError != '' && (
            <Text style={{ ...styles.error, textAlign: 'center' }}>
              {groupDeletionDialogError}
            </Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          {groupDeletionDialogError == '' ? (
            <>
              <Button
                disabled={isDeletingGroup}
                onPress={() => setIsGroupDeletionDialogVisible(false)}
                textColor="black"
              >
                <Text>No</Text>
              </Button>
              <Button
                disabled={isDeletingGroup}
                onPress={onDeleteGroup}
                textColor="black"
                contentStyle={{ flexDirection: 'row-reverse' }}
                loading={isDeletingGroup}
              >
                <Text>{isDeletingGroup ? 'Deleting' : 'Yes'}</Text>
              </Button>
            </>
          ) : (
            <>
              <Button
                onPress={() => {
                  setIsGroupDeletionDialogVisible(false);
                  setGroupDeletionDialogError('');
                }}
                textColor="black"
              >
                <Text>Dimiss</Text>
              </Button>
            </>
          )}
        </Dialog.Actions>
      </Dialog>
    </View>
  );

  // Functions

  function handleMenuButtonPress() {
    navigation.openDrawer();
  }

  function handleGroupItemPress(group: Group) {
    navigation.navigate('Group', { group });
  };

  function onSaveGroup() {
    const newGroupName = groupCreationDialogInputValue;

    saveGroup(newGroupName, () => {
      setIsGroupCreationDialogVisible(false);
      setGroupCreationDialogError('');
      setGroupCreationDialogInputValue('');
      fetchGroups();
    });
  }

  function onDeleteGroup() {
    const groupId = groupMarkedForDeletion!!.id;

    deleteGroup(
      groupId, 
      () => {   // onSuccess
        setIsGroupDeletionDialogVisible(false);
        fetchGroups();
      }, 
      () => {   // onFailure
        setGroupDeletionDialogError('You are not the creator of this group.');
      }
    )
  }
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
    opacity: 1,
    bottom: 32,
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent white
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
    fontFamily: 'Avenir',
    padding: 0,
  }
});

export default GroupListScreen;