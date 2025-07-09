import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function BookingScreen() {
  const [client, setClient] = useState('');
  const [service, setService] = useState('');
  const [response, setResponse] = useState(null);

  const handleBooking = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client, service }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Something went wrong' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>

      <TextInput
        style={styles.input}
        placeholder="Client Name"
        value={client}
        onChangeText={setClient}
      />

      <TextInput
        style={styles.input}
        placeholder="Service (e.g., Gel Nails)"
        value={service}
        onChangeText={setService}
      />

      <Button title="Book" onPress={handleBooking} />

      {response && (
        <View style={styles.result}>
          {response.status ? (
            <Text style={styles.success}>
              ✅ {response.status} with {response.staff}
            </Text>
          ) : (
            <Text style={styles.error}>❌ {response.error}</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  result: {
    marginTop: 20,
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
});
