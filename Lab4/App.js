import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider } from 'react-native-paper';

import { store } from './src/store/store';
import Contacts from './src/screens/Contacts';
import Favorites from './src/screens/Favorites';
import ProfileContact from './src/screens/ProfileContact';
import { loadContacts } from './src/store/contactsSlice';
import { selectFavoriteIds } from './src/store/store';
import { setFavorites } from './src/store/favoritesSlice';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// ----------------------
// 🔹 Bootstrapper
// ----------------------
function Bootstrapper({ children }) {
  const dispatch = useDispatch();
  const favIds = useSelector(selectFavoriteIds);

  useEffect(() => {
    dispatch(loadContacts());
    (async () => {
      const saved = await AsyncStorage.getItem('@favorites');
      if (saved) dispatch(setFavorites(JSON.parse(saved)));
    })();
  }, [dispatch]);

  useEffect(() => {
    AsyncStorage.setItem('@favorites', JSON.stringify(favIds));
  }, [favIds]);

  return children;
}


// ----------------------
// 🔹 Contacts Stack (có ProfileContact)
// ----------------------
const ContactsStack = createStackNavigator();
function ContactsStackScreen() {
  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen
        name="ContactsList"
        component={Contacts}
        options={{ title: 'Contacts' }}
      />
      <ContactsStack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile Contact' }}
      />
    </ContactsStack.Navigator>
  );
}


// ----------------------
// 🔹 Favorites Stack (có ProfileContact)
// ----------------------
const FavoritesStack = createStackNavigator();
function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="FavoritesList"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <FavoritesStack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: 'Profile Contact' }}
      />
    </FavoritesStack.Navigator>
  );
}


// ----------------------
// 🔹 Bottom Tabs (hiển thị ở mọi màn)
// ----------------------
function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      screenOptions={({ route }) => ({
        headerShown: false, // ✅ ẩn header riêng từng tab
        tabBarShowLabel: false, // ✅ chỉ hiện icon
        tabBarActiveTintColor: '#ebeef7ff',
        tabBarInactiveTintColor: '#160c0cff',
        tabBarStyle: {
          backgroundColor: '#1111f3ff',
          height: 70,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Contacts' ? 'menu' : 'star';
          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Contacts" component={ContactsStackScreen} />
      <Tab.Screen name="Favorites" component={FavoritesStackScreen} />
    </Tab.Navigator>
  );
}


// ----------------------
// 🔹 Main App Stack
// ----------------------
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}


// ----------------------
// 🔹 App chính
// ----------------------
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Bootstrapper>
            <MainStack />
          </Bootstrapper>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
