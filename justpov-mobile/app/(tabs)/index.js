import React, { useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const [available, setAvailable] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [queue, setQueue] = useState([
    { id: "1", position: 1, name: "Jane Doe", status: "serving" },
    { id: "2", position: 2, name: "Emma Wilson", status: "available", etaMin: 30 },
  ]);

  const clientsToday = 1;
  const inQueue = queue.length;
  const nextAppt = "--:--";

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.badge}><Text style={styles.badgeText}>{item.position}</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtle}>
          Status: {item.status === "serving" ? "Currently serving client" :
                   item.status === "available" ? "Available" :
                   item.status === "waiting" ? "Waiting" : "On break"}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", gap: 6 }}>
        {item.status === "serving" && <Chip label="Now serving" />}
        {typeof item.etaMin === "number" && <Text style={styles.eta}>{item.etaMin} min{"\n"}estimated wait</Text>}
      </View>
    </View>
  );

  return (
    <FlatList
      style={{ paddingTop: top + 12 }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      data={queue}
      keyExtractor={(i) => i.id}
      renderItem={renderItem}
      ListHeaderComponent={
        <View style={{ gap: 16 }}>
          <Text style={styles.h1}>Welcome Back!</Text>
          <View style={styles.statusCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={[styles.dot, { backgroundColor: available ? "#2ecc71" : "#bdc3c7" }]} />
                <Text style={styles.statusText}>{available ? "Availability: Online" : "Availability: Offline"}</Text>
              </View>
              <Switch value={available} onValueChange={setAvailable} />
            </View>
            <View style={styles.statsRow}>
              <Stat label="Clients Today" value={String(clientsToday)} />
              <Stat label="In Queue" value={String(inQueue)} />
              <Stat label="Next Appt" value={nextAppt} />
            </View>
          </View>
          <Text style={styles.sectionTitle}>Live Queue</Text>
        </View>
      }
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListEmptyComponent={<EmptyState onRefresh={onRefresh} />}
    />
  );
}

function Stat({ label, value }) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.subtle}>{label}</Text>
    </View>
  );
}
function Chip({ label }) {
  return <View style={styles.chip}><Text style={styles.chipText}>{label}</Text></View>;
}
function EmptyState({ onRefresh }) {
  return (
    <View style={{ padding: 16, backgroundColor: "#f3f4f6", borderRadius: 16 }}>
      <Text style={styles.subtle}>No clients in the queue yet.</Text>
      <TouchableOpacity onPress={onRefresh} style={{ marginTop: 8 }}>
        <Text style={{ color: "#2563eb", fontWeight: "600" }}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: "800" },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  subtle: { color: "#6b7280" },
  statusCard: { backgroundColor: "#f3f4f6", borderRadius: 16, padding: 16, gap: 16 },
  dot: { width: 10, height: 10, borderRadius: 6 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statValue: { fontSize: 20, fontWeight: "700" },
  card: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, backgroundColor: "#f3f4f6", borderRadius: 16, marginTop: 12 },
  badge: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "#e5e7eb" },
  badgeText: { fontWeight: "800" },
  eta: { textAlign: "right", color: "#6b7280", fontSize: 12 },
  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: "#e5e7eb" },
  chipText: { fontSize: 12, color: "#4b5563", fontWeight: "600" },
});
