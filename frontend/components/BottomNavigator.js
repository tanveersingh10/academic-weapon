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
            } else if (route.name === 'ViewProfile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            } else if (route.name === 'Chat') {
              iconName = focused ? 'ios-chatbubble-ellipses' : 'ios-chatbubble-ellipses-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } 
  
  
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#303f9f',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        <Tab.Screen options={{ headerShown: false }} name="ViewProfile" component={ViewProfileScreen} />
        <Tab.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
        <Tab.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }

  //hello world

export default BottomNavigator;