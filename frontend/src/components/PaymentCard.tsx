import { StyleSheet, Text, View } from "react-native";
import Card from "./Card";

interface PaymentCardProps {
  name: string,
  date: Date,
  user: string,
  amount: number,
};

const PaymentCard: React.FC<PaymentCardProps> = ({ name, date, user, amount }) => {
  const day = date.getDay();
  const month = date.toLocaleString('default', { month: 'long' });

  return (
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