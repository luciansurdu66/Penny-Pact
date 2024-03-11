import { StyleSheet, Text, View } from "react-native";
import Card from "./Card";
import Payment from "../../models/Payment";
import { TouchableOpacity } from "react-native-gesture-handler";

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
          <View 
            style={{ 
              flexDirection: 'row',
              alignItems: 'center', 
              gap: 16 
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>{month}</Text>
              <Text style={styles.text}>{day}</Text>
            </View>
            <View>
              <Text style={styles.header}>{name}</Text>
              <Text style={styles.text}>{user}</Text> 
            </View>
          </View>
          <View 
            style={{ 
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center'
            }}
          >
            <Text style={styles.header}>{amount.toFixed(2)}</Text>
            <Text style={styles.text}>RON</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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