import { FC } from "react";
import Card from "./Card";
import { StyleSheet, Text, View } from "react-native";
import Debt from "../../models/Debt";

interface DebtCardProps {
  debt: Debt;
}

const DebtCard: FC<DebtCardProps> = ({ debt }) => {
  const debtor = debt.debtor;
  const creditor = debt.creditor;
  const amount = debt.amount.toFixed(2);

  const isUserDebtor = debt.debtor.toLowerCase() == 'you';
  const isUserCreditor = debt.creditor.toLowerCase() == 'you';

  return (
    <Card>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.text}>
            <Text style={!isUserDebtor && { fontWeight: 'bold' }}>{debtor} </Text>
            <Text>{isUserDebtor ? 'owe' : 'owes'} </Text>
            <Text style={!isUserCreditor && { fontWeight: 'bold' }}>{creditor}</Text>
          </Text>
        </View>
        <View style={styles.amountWrapper}>
          <Text style={styles.header}>{amount}</Text>
          <Text style={styles.text}>RON</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  text: {
    color: 'black',
    fontSize: 16
  },
  header: {
    color: 'black',
    fontSize: 24
  }
});

export default DebtCard;