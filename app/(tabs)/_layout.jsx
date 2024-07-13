import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants'; 

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]} 
      />
      {name ? (
        <Text style={[styles.label, { color: color }]}>{name}</Text>
      ) : null}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6969",
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 60,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home} 
              color={color}
              name="Explore"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark} 
              color={color}
              name="Dashboard"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile} 
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 12,
    marginTop: 1,
  },
});

export default TabsLayout;
