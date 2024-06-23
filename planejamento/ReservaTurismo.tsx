import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';

interface Reserva {
  tipo: 'hotel' | 'passeio';
  nome: string;
  data: string;
  cidade: string;
}

const reservasMock: Reserva[] = [
  { tipo: 'hotel', nome: 'Hotel Copacabana Palace', data: '2024-06-16', cidade: 'Rio de Janeiro' },
  { tipo: 'passeio', nome: 'Cristo Redentor', data: '2024-06-17', cidade: 'Rio de Janeiro' },
];

export default function ReservasList() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [confirmada, setConfirmada] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setReservas(reservasMock);
  }, []);

  const confirmarReserva = () => {
    setConfirmada(true);
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#00FF94', '#2F829C']}
      style={styles.linearGradient}>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.title}>Minhas Reservas</Text>
        {!confirmada ? (
          <TouchableOpacity onPress={confirmarReserva} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirmar Reservas</Text>
          </TouchableOpacity>
        ) : (
          reservas.map((reserva, index) => (
            <View key={index} style={styles.reservaContainer}>
              <Text style={styles.reservaText}>{reserva.tipo === 'hotel' ? 'Hotel' : 'Passeio'}: {reserva.nome}</Text>
              <Text style={styles.reservaText}>Data: {reserva.data}</Text>
              <Text style={styles.reservaText}>Cidade: {reserva.cidade}</Text>
            </View>
          ))
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Reservas')}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: 'black',
  },
  reservaContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  reservaText: {
    fontSize: 18,
    color: 'black',
  },
  confirmButton: {
    backgroundColor: '#00FF94',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  confirmButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  backText: {
    marginTop: 20,
    fontSize: 18,
    color: '#00FF94',
    fontWeight: '600',
  },
});
