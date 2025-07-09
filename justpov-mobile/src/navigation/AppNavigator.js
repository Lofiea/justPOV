import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from '../screens/BookingScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name = "Home" component = {HomeScreen} />
                <Stack.Screen name = "Booking" component = {BookingScreen} />
                <Stack.Screen name = "Login" component = {LoginScreen} />   
            </Stack.Navigator>
        </NavigationContainer>
    )
}