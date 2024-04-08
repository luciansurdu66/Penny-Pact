import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Card from "./Card";
import Payment from "../../models/Payment";

interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  const name = payment.name;
  const user = payment.user;
  const date = payment.date;
  const amount = payment.amount;

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return (
    <TouchableOpacity>
      <Card>
        <View style={styles.wrapper}>
          <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}>{month}</Text>
            <Text style={styles.text}>{day}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.header}>{name}</Text>
            <Text numberOfLines={1} style={styles.text}>{user}</Text> 
          </View>
          <View 
            style={{ 
              flexDirection: 'row',
              height: '100%',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <Text numberOfLines={1} style={styles.header}>{amount.toFixed(2)}</Text>
            <Text style={styles.text}>RON</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  header: {
    color: 'black',
    fontSize: 24
  },
  text: {
    color: 'black',
    fontSize: 16,
  }
});

export default PaymentCard;