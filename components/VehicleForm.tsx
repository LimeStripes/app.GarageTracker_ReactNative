import { ACCENT } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VehicleForm({ onAdd }: { onAdd: (v: any) => void }) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const submit = () => {
    if (!make.trim() || !model.trim()) return;
    onAdd({ id: Date.now().toString(), make, model, year, maintenance: [] });
    setMake(''); setModel(''); setYear('');
  };

  return (
    <View style={s.form}>
      <TextInput placeholder="Make" value={make} onChangeText={setMake} style={s.input} />
      <TextInput placeholder="Model" value={model} onChangeText={setModel} style={s.input} />
      <TextInput placeholder="Year" value={year} onChangeText={setYear} style={s.input} keyboardType="numeric" />
      <TouchableOpacity style={[s.button, { backgroundColor: ACCENT }]} onPress={submit}>
        <Text style={s.buttonText}>Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  form: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 8, backgroundColor: '#fff' },
  button: { padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' }
});
