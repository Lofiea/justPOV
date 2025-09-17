import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars'; // Placeholder for calendar UI
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Touchable,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [timeOffRequests, setTimeOffRequests] = useState([
    { date: 'July 20', reason: 'Family gathering', status: 'Pending' },
    { date: 'August 1', status: 'Approved' },
  ]);

  const todayAppointments = [
    { time: '10:00 AM', client: 'Olivia L.', type: 'Booked' },
    { time: '11:30 AM', client: '—', type: 'Walk-in' },
    { time: '2:00 PM', client: 'Leo W.', type: 'Booked' },
  ];

  const requestTimeOff = () => {
    if (!selectedDate) {
      Alert.alert('Select a date first', 'Tap on a date to request a time off.');
      return;
    }

    Alert.prompt(
      'Reason for Time Off',
      `Enter a reason for ${selectedDate} off request:`,
      (reason) => {
        if (!reason || !reason.trim()) {
          Alert.alert('Error', 'Please provide a reason for your time off request.');
          return;
        }

        setTimeOffRequests((prev) => [
          ...prev,
          { date: selectedDate, reason: reason.trim(), status: 'Pending' },
        ]);

        Alert.alert('Request Sent', 'Your time off request has been submitted!');
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          <Calendar
            onDayPress={(day) => {
              console.log('Selected date:', day.dateString);
              setSelectedDate(day.dateString);
            }}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: { selected: true, selectedColor: '#007aff' },
                  }
                : {}
            }
            style={styles.calendar}
          />

          {/* Today's Appointments */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today’s Appointments</Text>
            <FlatList
              scrollEnabled={false}
              data={todayAppointments}
              keyExtractor={(item) => item.time}
              renderItem={({ item }) => (
                <View style={styles.appointmentItem}>
                  <Text style={styles.appointmentText}>
                    {item.time} - {item.client} ({item.type})
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Time Off Request */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Request Time Off</Text>
            <TouchableOpacity style={styles.button} onPress={requestTimeOff}>
              <Text style={styles.buttonText}>Request Day Off</Text>
            </TouchableOpacity>

            <View style={styles.subtitleRow}>
              <Text style={styles.sectionSubtitle}>My Requests</Text>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Hint', 'Long press a request to cancel it.')
                }
                style={styles.infoIcon}
              >
                <View style={styles.circleDot} />
              </TouchableOpacity>
            </View>

            {timeOffRequests
              .filter((req) => selectedDate === '' || req.date === selectedDate)
              .map((req, i) => (
                <TouchableOpacity
                  key={i}
                  onLongPress={() => {
                    Alert.alert(
                      'Delete Request',
                      `Remove time-off request for ${req.date}?`,
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Delete',
                          onPress: () => {
                            setTimeOffRequests((prev) =>
                              prev.filter((_, idx) => idx !== i)
                            );
                          },
                          style: 'destructive',
                        },
                      ]
                    );
                  }}
                >
                  <Text style={styles.requestText}>
                    {req.date} - {req.status}
                    {'\n'}Reason: {req.reason} 
                  </Text>
                </TouchableOpacity>
              ))}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: width < 380 ? 16 : 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarBox: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  calendarPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  appointmentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  appointmentText: {
    fontSize: width < 380 ? 14 : 16,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width < 380 ? 14 : 16,
  },
  sectionSubtitle: {
    marginTop: 10,
    fontWeight: '600',
  },
  requestText: {
    fontSize: 14,
    marginTop: 4,
    color: '#444',
  },

  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
  },

  infoIcon: {
    marginLeft: 8,
    padding: 4,
  },

  circleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
  },

});
