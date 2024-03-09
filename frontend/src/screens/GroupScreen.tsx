import { FC, useState } from "react";
import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import Banner from "../components/Banner";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import RowMenu from "../components/RowMenu";
import Payment from "../models/Payment";
import PaymentCard from "../components/cards/PaymentCard";
import Debt from "../models/Debt";
import DebtCard from "../components/cards/DebtCard";

interface GroupScreenProps {
  name: string;
  payments: (Payment)[];
  debts: (Debt)[];
}

const GroupScreen: FC<GroupScreenProps> = ({ name, payments, debts }) => { 
  const [showPayments, setShowPayments] = useState(true);

  const menuItems = ['Payments', 'Debts'];
  const menuItemsCallbacks: (() => void)[] = [
    () => { setShowPayments(true) },
    () => { setShowPayments(false) }
  ];

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
          <Text style={styles.header}>{name}</Text>
        </View>
      </Banner>
      <RowMenu items={menuItems} onPressCallbacks={menuItemsCallbacks} />
      <View style={styles.content}>
        <View>
        {showPayments
          ? <FlatList 
              contentContainerStyle={{ gap: 16 }} 
              data={payments} 
              renderItem={renderPayment} 
            />
          : <FlatList 
              contentContainerStyle={{ gap: 16 }}
              data={debts}
              renderItem={renderDebt}
            />
        }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%'
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
  }
});

export default GroupScreen;