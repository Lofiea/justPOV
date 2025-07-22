import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    // Option 1: Redirect to login on load
    router.replace('/login');
  }, []);
  return null;
}
