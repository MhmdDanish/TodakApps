import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import Cart from './screens/Cart';
import Address from './screens/Address';

import ActionBar from './components/ActionBar';
import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ProductDetailScreen from './screens/ProductDetailScreen'
import Profile from './screens/Profile';
import Order from './screens/Order';
import OrderDetail from './screens/OrderDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            return <Entypo name={iconName} size={24} color="black" />

          } else if (route.name === 'Profile') {
            iconName = 'person';
            return <Ionicons name={iconName} size={24} color="black" />
          } else if (route.name === 'Order') {
            iconName = 'list-alt'
            return <FontAwesome5 name={iconName} size={24} color="black" />
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Profile" component={Profile} />



    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={HomeStack}
            options={({ navigation }) => ({
              header: () => <ActionBar title="TodakEcommerce" navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
          />
          <Stack.Screen
            name="Address"
            component={Address}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            name="Order"
            component={Order}
          />
            <Stack.Screen
            name="OrderDetail"
            component={OrderDetail}
          />



        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
