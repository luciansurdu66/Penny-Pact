import { FC, useState } from "react";
import User from "../../models/User";
import { Text, View, TouchableOpacity } from "react-native";

interface FriendInvitationItemProps {
  friend: User,
  onPress: () => void
}

const FriendInvitationItem: FC<FriendInvitationItemProps> = ({ friend, onPress }) => {
  const [isInvitationSent, setIsInvitationSent] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => { 
        setIsInvitationSent(true);
        onPress();
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 32,
          marginBottom: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <Text 
          style={{ 
            color: 'black', 
            fontSize: 16,
            flex: 1,
            marginLeft: 8
          }}
          numberOfLines={1}
        >
          {friend.username} #{friend.id}
        </Text>
        <Text 
          style={!isInvitationSent ? { 
            color: 'black', 
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'flex-end',
            marginLeft: 16
          } : {
            color: 'black',
            fontSize: 16,
            alignSelf: 'flex-end'
          }}
        >
          {!isInvitationSent ? '+ Invite' : 'Invitation Sent'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default FriendInvitationItem;