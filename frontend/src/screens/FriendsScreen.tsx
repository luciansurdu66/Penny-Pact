import { RootStackParamList } from "../navigation/AppNavigator";
import { FC, useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import Banner from "../components/Banner";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import User from "../models/User";
import { useApp } from "../providers/AppProvider";
import FriendItem from "../components/items/FriendItem";
import { ActivityIndicator, Button, Dialog } from "react-native-paper";

type FindFriendsScreenProps = DrawerScreenProps<RootStackParamList, 'Friends'>;

const SettingsScreen: FC<FindFriendsScreenProps> = ({ navigation }) => {
  const renderItem: ListRenderItem<User> = ({ item: friend }) => {
    return (
      <FriendItem friend={friend} />
    )
  };

  // States

  const {
    friends,
    fetchFriends,
    isFetchingFriends,
    addFriend
  } = useApp();

  const [isShowingAddFriendDialog, setIsShowingAddFriendDialog] = useState(false);
  const [addFriendDialogError, setAddFriendDialogError] = useState('');
  const [addFriendDialogInputValue, setAddDialogInputValue] = useState('');

  // Effects

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Banner>
        <View style={styles.bannerContent}>
          <TouchableOpacity onPress={handleMenuButtonPress}>
            <MaterialCommunityIcon 
              name="microsoft-xbox-controller-menu"
              size={64}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.header}>Friends</Text>
        </View>
      </Banner>
      {!isFetchingFriends ? (
        <View style={styles.content}>
          {friends.length > 0 ? (
            <FlatList 
              data={friends}
              renderItem={renderItem}
            />
          ) : (
            <View style={styles.centeredContainer}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24
                }}
              >
                You have no friends
              </Text>
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>
                Don't worry! You can always request a friend 
                invitaiton by pressing the button below. 👇🏻
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View 
          style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16
          }}
        >
          <ActivityIndicator 
            size='large'
            color='white'
          />
          <Text
            style={{ color: 'white', fontSize: 24 }}
          >
            Fetching your friends...
          </Text>
        </View>
      )}
      {!isShowingAddFriendDialog && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => {
            setIsShowingAddFriendDialog(true);
            setAddFriendDialogError('');
          }}
        >
          <AntDesignIcon 
            name='pluscircleo' 
            size={64} 
            color={'#f8d717'} 
          />
        </TouchableOpacity>
      )}
      <Dialog
        visible={isShowingAddFriendDialog}
        onDismiss={() => setIsShowingAddFriendDialog(false)}
        style={{
          backgroundColor: '#f8d717'
        }}
      >
        <Dialog.Title style={{ color: 'black' }}>
          Add Friend
        </Dialog.Title>
        <Dialog.Content>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                value={addFriendDialogInputValue}
                onChangeText={newInputValue => {
                  if (newInputValue == '' || /^\d+$/.test(newInputValue)) {
                    setAddDialogInputValue(newInputValue);
                  }
                }}
                style={styles.input}
                placeholder="Enter the user's id here. (e.g., '123'.)"
                placeholderTextColor="gray"
                keyboardType='number-pad'
              />
            </View>
            {addFriendDialogError != '' && (
              <Text style={{ color: 'red' }}>
                {addFriendDialogError}
              </Text>
            )}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button 
            textColor='black'
            onPress={() => {
              setIsShowingAddFriendDialog(false);
              setAddFriendDialogError('');
            }}
          >
            Cancel
          </Button>
          <Button 
            textColor='black'
            onPress={() => {
              if (addFriendDialogInputValue == '') {
                setAddFriendDialogError('Please provide an id');
              } else {
                setAddFriendDialogError('');
                addFriend(parseInt(addFriendDialogInputValue), () => {
                  setAddDialogInputValue('');
                  setIsShowingAddFriendDialog(false);
                  fetchFriends();
                }, (errorMessage) => {
                  setAddFriendDialogError(errorMessage);
                });
              }
            }}
          >
            Add
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );

  // Functions

  function handleMenuButtonPress() {
    navigation.openDrawer();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: 'black',
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 64,
    alignSelf: 'center'
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
  },
});

export default SettingsScreen;