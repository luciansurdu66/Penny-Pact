import { FC, useEffect, useState } from "react";
import { FlatList, ActivityIndicator, ListRenderItem, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import Banner from "../components/Banner";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import RowMenu from "../components/RowMenu";
import Payment from "../models/Payment";
import PaymentCard from "../components/cards/PaymentCard";
import Debt from "../models/Debt";
import DebtCard from "../components/cards/DebtCard";
import { useApp } from "../providers/AppProvider";
import { RootStackParamList } from "../navigation/AppNavigator";
import { DrawerScreenProps } from "@react-navigation/drawer";
import DatePicker from "react-native-date-picker";
import { Button, Dialog } from "react-native-paper";
import { useAuth } from "../providers/AuthProvider";
import User from "../models/User";
import DebtorItem from "../components/items/DebtorItem";

type GroupScreenProps = DrawerScreenProps<RootStackParamList, 'Group'>;

const GroupScreen: FC<GroupScreenProps> = ({ navigation, route }) => {

  // Contexts

  const {
    loggedUser
  } = useAuth();

  const {
    isFetchingGroupDetails: isFetchingGroupDetails,
    groupPayments: payments,
    groupDebts: debts,
    fetchGroupDetails,
    fetchGroupMembers,
    isFetchingMembers,
    groupMembers,
    addPayment,
  } = useApp();
  
  // States
  
  const [showPayments, setShowPayments] = useState(true);
  const [newPaymentName, setNewPaymentName] = useState('');
  const [newPaymentTotal, setNewPaymentTotal] = useState('');
  const [newPaymentTotalCopy, setNewPaymentTotalCopy] = useState(0);
  const [paymentDialogError, setPaymentDialogError] = useState('');
  const [newPaymentDate, setNewPaymentDate] = useState(new Date());
  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false);
  const [isShowingAddPaymentDialog, setIsShowingAddPaymentDialog] = useState(false);
  const [isShowingSplitTheBillDialog, setIsShowingSplitTheBillDialog] = useState(false);
  const [isShowingDebtorsDialog, setIsShowingDebtorsDialog] = useState(false);
  
  // Properties

  const group = route.params.group;
  const groupId = group.id;
  const groupName = group.name;
  const menuItems = ['Payments', 'Debts'];

  // Callbacks

  const menuItemsCallbacks: (() => void)[] = [
    () => { setShowPayments(true) },
    () => { setShowPayments(false) }
  ];

  // Renderes
  // Flat List Renderes

  const renderPayment: ListRenderItem<Payment> = ({ item: payment, index }) => {
    return (
      <PaymentCard 
        key={index}
        payment={payment}
      />
    );
  }

  const renderDebt: ListRenderItem<Debt> = ({ item: debt, index }) => {
    return (
      <DebtCard 
        key={index}
        debt={debt}
      />
    );
  }

  const renderDebtorItem: ListRenderItem<User> = ({ index, item: memeber }) => {
    return (
      <DebtorItem 
        member={memeber}
        total={newPaymentTotalCopy}
        setTotal={setNewPaymentTotalCopy}
      />
    )
  }

  // Component Renderes

  const renderContent = (data: (any)[], renderItem: any, emptyText: string) => {
    return data.length > 0 ? (
      <FlatList 
        contentContainerStyle={{ gap: 16 }}
        data={data}
        renderItem={renderItem}
      />
    ) : (
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>{emptyText}</Text>
      </View>
    );
  };
  
  const renderPayments = () => renderContent(payments, renderPayment, 'The group has no payments.');
  const renderDebts = () => renderContent(debts, renderDebt, 'There are no debts in this group.');

  // Effects

  useEffect(() => {
    fetchGroupDetails(groupId);
    fetchGroupMembers(groupId);
  }, []);

  return (
    <View style={styles.wrapper}>
      <Banner>
        <View style={styles.bannerContent}>
          <TouchableOpacity onPress={handleMenuButtonPress}>
            <MaterialCommunityIcons
              name="microsoft-xbox-controller-menu"
              size={64}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.header}>{groupName}</Text>
        </View>
      </Banner>
      <RowMenu items={menuItems} onPressCallbacks={menuItemsCallbacks} />
      <View style={styles.content}>
        <View>
        {isFetchingMembers || isFetchingGroupDetails ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator color={'white'} />
            <Text style={styles.text}>Fetching group details...</Text>
          </View>
        ) : (
          showPayments ? renderPayments() : renderDebts()
        )}
        </View>
        {!isFetchingMembers && !isFetchingGroupDetails && showPayments && !isShowingAddPaymentDialog && (
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => {
              setIsShowingAddPaymentDialog(true);
              setNewPaymentDate(new Date());
            }}
          >
            <AntDesignIcon 
              name='pluscircleo' 
              size={64} 
              color={'#f8d717'} 
            />
        </TouchableOpacity>
        )}
      </View>
      <Dialog
        visible={isShowingSplitTheBillDialog}
        style={{ backgroundColor: '#f8d717' }}
        dismissable={false}
      >
        <Dialog.Title style={{ color: 'black' }}>
          Split The Bill?
        </Dialog.Title>
        <Dialog.Content>
          <Text
            style={{ color: 'black', fontSize: 16, textAlign: 'center' }}
          >
            Do you want to split the bill with other members?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              addPayment(
                groupId, 
                newPaymentName, 
                isNaN(parseInt(newPaymentTotal)) ? 0 : parseInt(newPaymentTotal), 
                newPaymentDate, 
                () => {
                  setIsShowingSplitTheBillDialog(false);
                  setNewPaymentName('');
                  setNewPaymentTotal('');
                  setPaymentDialogError('');
                  fetchGroupDetails(groupId);
                }
              )
            }}
            textColor="black"
          >
            No
          </Button>
          <Button
            onPress={() => {
              setIsShowingSplitTheBillDialog(false);
              setIsShowingDebtorsDialog(true);
              setNewPaymentTotalCopy(parseInt(newPaymentTotal));
            }}
            textColor="black"
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={isShowingAddPaymentDialog}
        style={{ backgroundColor: '#f8d717' }}
        onDismiss={() => {
          setIsShowingAddPaymentDialog(false);
          setNewPaymentName('');
          setNewPaymentTotal('');
          setPaymentDialogError('');
        }}
      >
        <Dialog.Title style={{ color: 'black' }}>
          Add Payment
        </Dialog.Title>
        <Dialog.Content
          style={{ gap: 16 }}
        >
          <View 
            style={styles.inputContainer}
          >
            <TextInput
              value={newPaymentName}
              onChangeText={newName => setNewPaymentName(newName)}
              style={styles.input}
              placeholder='Name'
              placeholderTextColor='gray'
            />
          </View>
          <TouchableOpacity
            onPress={() => setIsShowingDatePicker(true)}
            style={styles.inputContainer}
          >
            <Text style={{ color: 'black' }}>
              {newPaymentDate.toLocaleDateString()}
            </Text>
            <FontistoIcon name="date" color="black" size={16} />
          </TouchableOpacity>
          <View 
            style={{ ...styles.inputContainer, width: '50%' }}
          >
            <TextInput
              value={newPaymentTotal}
              onChangeText={newTotal => {
                if (newTotal == '' || (newTotal.length < 9 && /^\d+$/.test(newTotal))) {
                  setNewPaymentTotal(newTotal);
                }
              }}
              style={styles.input}
              placeholder='Total'
              placeholderTextColor='gray'
              keyboardType='numeric'
            />
            <Text style={{ color: 'black', fontSize: 16 }}>RON</Text>
          </View>
          {paymentDialogError && (
            <Text style={{ color: 'red', fontSize: 16 }}>
              {paymentDialogError}
            </Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setIsShowingAddPaymentDialog(false);
              setNewPaymentName('');
              setNewPaymentTotal('');
              setPaymentDialogError('');
            }}
            textColor="black"
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              if (newPaymentName == '' || newPaymentTotal == '') {
                setPaymentDialogError("Please complete the empty fields");
              } else if (isNaN(parseInt(newPaymentTotal))) {
                setPaymentDialogError("Invalid total");
              } else {
                if (groupMembers.length == 1) {
                  addPayment(
                    groupId, 
                    newPaymentName, 
                    parseInt(newPaymentTotal), 
                    newPaymentDate, 
                    () => {
                      setIsShowingAddPaymentDialog(false);
                      setNewPaymentName('');
                      setNewPaymentTotal('');
                      setPaymentDialogError('');
                      fetchGroupDetails(groupId);
                    }
                  );
                } else {
                  setIsShowingSplitTheBillDialog(true);
                  setIsShowingAddPaymentDialog(false);
                }
              }
            }}
            textColor="black"
          >
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog
        visible={isShowingDebtorsDialog}
        style={{ backgroundColor: '#f8d717' }}
        dismissable={false}
      >
        <Dialog.Title style={{ color: 'black' }}>
          Debtors
        </Dialog.Title>
        <Dialog.Content>
          <FlatList 
            data={groupMembers.filter(member => member.id != loggedUser!!.id)}
            renderItem={renderDebtorItem}
          />
          <Text style={{ color: 'black', fontSize: 16, marginTop: 32, fontWeight: 'bold' }}>Total: {newPaymentTotalCopy} RON</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              addPayment(
                groupId, 
                newPaymentName, 
                parseInt(newPaymentTotal), 
                newPaymentDate, 
                () => {
                  setIsShowingDebtorsDialog(false);
                  setNewPaymentName('');
                  setNewPaymentTotal('');
                  setPaymentDialogError('');
                  fetchGroupDetails(groupId);
                }
              )
            }}
            textColor="black"
          >
            Finalize
          </Button>
        </Dialog.Actions>
      </Dialog>
      <DatePicker 
        modal
        mode="date"
        open={isShowingDatePicker}
        date={newPaymentDate}
        onDateChange={newDate => setNewPaymentDate(newDate)}
        onConfirm={newDate => { 
          setNewPaymentDate(newDate);
          setIsShowingDatePicker(false);
        }}
        onCancel={() => setIsShowingDatePicker(false)}
      />
    </View>
  );

  // Functions

  function handleMenuButtonPress() {
    navigation.openDrawer();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black'
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
  content: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  centeredContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  fab: {
    position: 'absolute',
    bottom: 64,
    alignSelf: 'center',
  },
  modal: {
    position: 'absolute'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent white
    height: 50,
  },
  input: {
    flex: 1,
    color: 'black',
    fontFamily: 'Avenir',
    padding: 0,
  },
});

export default GroupScreen;