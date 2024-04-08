import { FC, useState } from "react";
import User from "../../models/User";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DebtorItemProps {
  member: User
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>
}

const DebtorItem: FC<DebtorItemProps> = ({ member, total, setTotal }) => {
  const [amount, setAmount] = useState(0);

  return (
    <View 
      style={{ 
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Text
        style={{ color: 'black', fontSize: 16 }}
      >
        {member.username} #{member.id}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TouchableOpacity 
          onPress={() => {
            if (amount - 1 >= 0) {
              setAmount(amount - 1);
              setTotal(total + 1);
            }
          }}
          style={{ paddingHorizontal: 8, backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
        >
          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'monospace' }}>-</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 16 }}>{amount}</Text>
        <TouchableOpacity 
          onPress={() => {
            if (total - 1 >= 0) {
              setAmount(amount + 1);
              setTotal(total - 1);
            }
          }}
          style={{ paddingHorizontal: 8, backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
        >
          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'monospace' }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DebtorItem;