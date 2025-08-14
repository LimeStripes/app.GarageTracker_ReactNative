import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { getData, saveData } from '@/storage';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function VehicleScreen() {
  const { id } = useLocalSearchParams();
  const [vehicle, setVehicle] = useState<any | null>(null);
  const [all, setAll] = useState<any[]>([]);

  useEffect(() => {
    // read vehicle info from route params (we pass maintenance as JSON string)
    const p = (global as any).__expo_router_params ?? {};
    const params = p[id] ?? {};
    if (params && params.id) {
      setVehicle({ id: params.id, make: params.make, model: params.model, year: params.year, maintenance: JSON.parse(params.maintenance || '[]') });
      setAll([]);
    }
  }, [id]);

  const addEntry = async (text: string) => {
    if (!vehicle) return;
    const entry = { id: Date.now().toString(), text, date: new Date().toISOString() };
    const updated = all.map((v) => (v.id === vehicle.id ? { ...v, maintenance: [...(v.maintenance||[]), entry] } : v));
    setAll(updated);
    setVehicle(updated.find((v) => v.id === vehicle.id));
    // await saveData({ vehicles: updated });
  };

  if (!vehicle) return (
    <ThemedView style={styles.container}><ThemedText>Vehicle not found</ThemedText></ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: `${vehicle.make} ${vehicle.model}` }} />
      <ThemedText type="title">{vehicle.make} {vehicle.model}</ThemedText>
      <ThemedText type="subtitle">Maintenance</ThemedText>
      {/* Simple list */}
      {(vehicle.maintenance || []).slice().reverse().map((e: any) => (
        <View key={e.id} style={styles.entry}><ThemedText>{e.text}</ThemedText><ThemedText type="subtitle">{new Date(e.date).toLocaleString()}</ThemedText></View>
      ))}
      <TouchableOpacity style={styles.add} onPress={() => addEntry('Oil change @ 5,000 mi')}>
        <ThemedText type="defaultSemiBold">Add sample entry</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  entry: { padding: 12, borderRadius: 8, backgroundColor: '#fff', marginBottom: 8 },
  add: { marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: '#FF8C00' }
});
