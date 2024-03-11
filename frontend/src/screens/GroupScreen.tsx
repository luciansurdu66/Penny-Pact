import { FC, useEffect, useState } from "react";
import { ActivityIndicator, ListRenderItem, StyleSheet, Text, View } from "react-native";
import Banner from "../components/Banner";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import RowMenu from "../components/RowMenu";
import Payment from "../models/Payment";
import PaymentCard from "../components/cards/PaymentCard";
import Debt from "../models/Debt";
import DebtCard from "../components/cards/DebtCard";
import { useApp } from "../providers/AppProvider";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type GroupScreenProps = StackScreenProps<RootStackParamList, 'Group'>;

const GroupScreen: FC<GroupScreenProps> = ({ route }) => {
  // Contexts

  const { 
    groups, 
    groupPayments: payments, 
    groupDebts: debts,
    isFecthingGroupDetails: isFetchingGroupDetails,
    fetchGroupDetails
  } = useApp();
  
  // States
  
  const [showPayments, setShowPayments] = useState(true);
  
  const groupId = route.params.groupId;
  const groupName = groups[groupId - 1]?.name ?? 'Unknown';
  const menuItems = ['Payments', 'Debts'];

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
  }, []);

  return (
    <View style={styles.wrapper}>
      <Banner>
        <View style={styles.bannerContent}>
          <TouchableOpacity>
            <Icon 
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
        {isFetchingGroupDetails ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator color={'white'} />
            <Text style={styles.text}>Fetching group details...</Text>
          </View>
        ) : (
          showPayments ? renderPayments() : renderDebts()
        )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
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
  }
});

export default GroupScreen;