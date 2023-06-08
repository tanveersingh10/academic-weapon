import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen, RegisterScreen, WelcomeScreen, VerificationScreen, ResetPasswordScreen, PasswordResettedScreen, CreateProfileScreen,
 ViewProfileScreen, SettingsScreen, ChatScreen} from '../screens';



const BottomNavigator = () => {
    const Tab = createBottomTabNavigator();
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'HomeScreen') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'ViewProfileScreen') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            } else if (route.name === 'ChatScreen') {
              iconName = focused ? 'ios-chatbubble-ellipses' : 'ios-chatbubble-ellipses-outline';
            } else if (route.name === 'SettingsScreen') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } 
  
  
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        <Tab.Screen options={{ headerShown: false }} name="ViewProfileScreen" component={ViewProfileScreen} />
        <Tab.Screen options={{ headerShown: false }} name="ChatScreen" component={ChatScreen} />
        <Tab.Screen options={{ headerShown: false }} name="SettingsScreen" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }

export default BottomNavigator;