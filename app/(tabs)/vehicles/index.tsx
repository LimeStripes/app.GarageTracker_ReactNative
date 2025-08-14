import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import VehicleForm from '@/components/VehicleForm';
import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<any[]>([]); // In-memory vehicles list (no local persistence)

  // Removed AsyncStorage usage

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Garage' }} />
      <ThemedText type="title">My Vehicles</ThemedText>
  <VehicleForm onAdd={(v:any)=> setVehicles((s)=>[v,...s])} />
  <FlatList
        data={vehicles}
        keyExtractor={(v) => v.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Link
              href={(
                { pathname: `/vehicles/${item.id}`, params: { id: item.id, make: item.make, model: item.model, year: item.year ?? '', maintenance: JSON.stringify(item.maintenance || []) } }
              ) as any}>
              <ThemedText type="defaultSemiBold">{item.make} {item.model} {item.year ? `· ${item.year}` : ''}</ThemedText>
              <ThemedText type="subtitle">{(item.maintenance||[]).length} entries</ThemedText>
            </Link>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<ThemedText>No vehicles yet — add one.</ThemedText>}
      />
      <TouchableOpacity style={[styles.card, styles.addCard]} onPress={() => {
        const v = { id: Date.now().toString(), make: 'New', model: 'Car', year: '2025', maintenance: [] };
        setVehicles((s) => [v, ...s]);
      }}>
        <ThemedText type="defaultSemiBold">+ Add Vehicle</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 12, borderRadius: 8, backgroundColor: '#fff', marginBottom: 8 }
  ,addCard: { backgroundColor: '#FFFBF0' }
});
