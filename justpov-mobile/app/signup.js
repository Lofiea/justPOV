import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const isLongEnough = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleSignUp = async () => {
    if (!fullName || !email || !phone || !password || !role) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    if (!(isLongEnough && hasUpper && hasNumber)) {
      Alert.alert('Error', 'Password does not meet requirements');
      return;
    }

    try {
      console.log('Attempting singup...');
      const res = await fetch('http://192.168.0.4:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          full_name: fullName, 
          email, 
          phone, 
          password, 
          role }),
      });
      console.log('Response:', res); 

      const text = await res.text();
      console.log('Response text:', text); // Log the response text

      //const data = await res.json();

      let data; 
      try{ 
        data = JSON.parse(text);
      }
      catch (jsonError) { 
        console.log('JSON parse error:'. jsonError);
        Alert.alert('Error', 'Server response is not valid JSON');
        return;
      }

      if (res.ok) {
        Alert.alert('Success', 'Account created successfully');
        router.replace('/login');
      } else {
        Alert.alert('Error', data.error || 'Something went wrong');
      }
    } catch (err) {
      console.log('Catch error:', err)
      Alert.alert('Error', 'Server unreachable');
    }
  };

  const renderInput = (icon, placeholder, value, setValue, secure = false, keyboard = 'default') => (
    <View style={styles.inputWrapper}>
      {icon}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secure}
        keyboardType={keyboard}
        onFocus={() => placeholder === 'Password' && setShowPasswordRules(true)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {renderInput(<FontAwesome name="user" size={20} style={styles.icon} />, 'Full Name', fullName, setFullName)}
      {renderInput(<MaterialIcons name="email" size={20} style={styles.icon} />, 'Email', email, setEmail, false, 'email-address')}
      {renderInput(<Feather name="phone" size={20} style={styles.icon} />, 'Phone Number', phone, setPhone, false, 'phone-pad')}
      {renderInput(<Feather name="lock" size={20} style={styles.icon} />, 'Password', password, setPassword, true)}

      {showPasswordRules && (
        <View style={styles.rules}>
          <Text style={{ color: isLongEnough ? 'green' : 'gray' }}>
            • At least 8 characters
          </Text>
          <Text style={{ color: hasUpper ? 'green' : 'gray' }}>
            • One uppercase letter
          </Text>
          <Text style={{ color: hasNumber ? 'green' : 'gray' }}>
            • One number
          </Text>
        </View>
      )}

      <View style={styles.inputWrapper}>
        <FontAwesome name="briefcase" size={20} style={styles.icon} />
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setRoleDropdownOpen(!roleDropdownOpen)}
        >
          <Text style={{ color: role ? '#000' : '#aaa' }}>
            {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Role'}
          </Text>
        </TouchableOpacity>
      </View>

      {roleDropdownOpen && (
        <View style={styles.dropdownOptions}>
          {['employee', 'owner'].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setRole(option);
                setRoleDropdownOpen(false);
              }}
              style={styles.dropdownOption}
            >
              <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 12, fontWeight: 'bold' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
    color: '#555',
  },
  input: {
    flex: 1,
    height: 40,
  },
  rules: {
    marginBottom: 12,
    marginLeft: 6,
  },
  dropdown: {
    flex: 1,
    paddingVertical: 10,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  dropdownOption: {
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 18,
  },
  loginText: {
    color: 'blue',
    textAlign: 'center',
  },
});
