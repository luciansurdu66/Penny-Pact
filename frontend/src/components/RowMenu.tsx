import React, { FC, Fragment, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RowMenuProps { 
  items: (string)[];
  initiallySelectedIndex?: number;
  onPressCallbacks: (() => void)[];
}

const RowMenu: FC<RowMenuProps> = ({ items, onPressCallbacks, initiallySelectedIndex=0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(initiallySelectedIndex);

  return (
    <View>
      <View style={styles.horizontalSeparator} />
      <View style={styles.rowMenu}>
        {items.map((item, index) => (
          <Fragment key={index}>
            <TouchableOpacity 
              key={index}
              style={styles.menuButton} 
              onPress={() => {
                  setSelectedIndex(index);
                  if (index < onPressCallbacks.length) {
                    onPressCallbacks[index]();
                  }
                }
              }
            >
              <Text style={index == selectedIndex ? styles.ephasisedText : styles.text}>{item}</Text>
            </TouchableOpacity>
            {index != items.length - 1 && <View style={styles.verticalSeparator} />}
          </Fragment>
        ))}
      </View>
      <View style={styles.horizontalSeparator} />
    </View>
  );
};

const styles = StyleSheet.create({
  rowMenu: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ''
  },
  menuButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ephasisedText: {
    fontSize: 16,
    color: '#f7cf25',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    color: '#f7cf25'
  },
  verticalSeparator: {
    height: '100%',
    width: 4,
    backgroundColor: '#f7cf25',
  },
  horizontalSeparator: {
    height: 4,
    backgroundColor: '#f7cf25'
  }
});

export default RowMenu;
