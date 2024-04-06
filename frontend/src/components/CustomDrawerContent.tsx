import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

import { 
  DrawerDescriptorMap, 
  DrawerNavigationHelpers 
} from '@react-navigation/drawer/lib/typescript/src/types';

import { 
  DrawerNavigationState, 
  ParamListBase 
} from '@react-navigation/native';

import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../providers/AuthProvider';

type CustomDrawerContentProps = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}

const CustomDrawerContent: FC<CustomDrawerContentProps> = (props) => {
  const { setToken } = useAuth();

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button 
        onPress={() => setToken(null)}
        dark={true}
        mode='elevated'
        icon='exit-to-app'
        style={styles.logout}
      >
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    fontSize: 16,
  },
  logout: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  }
});

export default CustomDrawerContent;