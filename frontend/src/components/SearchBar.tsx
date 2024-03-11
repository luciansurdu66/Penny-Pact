import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

interface SearchBarProps {
  value: string;
  onChangeText: (newText: string) => void;
  placeholder?: string;
  editable?: boolean
}

const SearchBar: FC<SearchBarProps> = ({ value, placeholder = 'Search...', onChangeText, editable = true }) => {
  return (
    <View style={styles.wrapper}>
      <TextInput 
        value={value}
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor={'gray'}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <View style={styles.button}>
        <Icon 
          name={'search'} 
          size={16}
          color='white'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 23,
    paddingRight: 8,
    alignItems: 'center',
  },
  button: {
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 5,
  },
  input: {
    color: 'black',
    fontSize: 16,
    flex: 1,
  }
});

export default SearchBar;