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

type CustomDrawerContentProps = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}

const CustomDrawerContent: FC<CustomDrawerContentProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
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
  }
});

export default CustomDrawerContent;