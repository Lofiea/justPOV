import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to justPOV</Text>
            <Button
                title = "Book Appointment"
                onPress={() => navigation.navigate('Booking')}
            />
        </View>
    );
}

const navigation = useNavigation();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    text: { 
        fontSize:24,
        fontWeight: 'bold'
    }
});