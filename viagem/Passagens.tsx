import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { fetchTickets, Ticket } from './ticketService';
import { db } from './fireBaseConfig';
import { LinearGradient } from 'expo-linear-gradient'; // Importação corrigida para Expo

interface User {
  id: string;
  nome: string;
  nacionalidade: string;
}

export default function Passagens() {
  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setNacionalidade(user.nacionalidade);
      loadTickets(user.id);
    }
  }, [user]);

  const loadTickets = async (userId: string) => {
    const userTickets = await fetchTickets(userId);
    setTickets(userTickets);
  };

  const renderItem = ({ item }: { item: Ticket }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TicketDetail', { ticket: item })}>
      <View style={styles.ticketItem}>
        <Text style={styles.ticketText}>Destino: {item.destino}</Text>
        <Text style={styles.ticketText}>Data: {item.data}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <LinearGradient colors={['#00FF94', '#00FF94', '#2F829C']} style={styles.linearGradient}>
        <Text style={styles.text}>Bem-vindo {user ? user.nome : ''}</Text>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.iconText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Passagens')}>
              <Text style={styles.iconText}>Passagens</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Reservas')}>
              <Text style={styles.iconText}>Reservas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
              <Text style={styles.iconText}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.iconText}>Sair</Text>
            </TouchableOpacity>
          </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.btnCadastro} onPress={() => navigation.navigate('ReservaVoo')}>
            <Text style={styles.text}>Reservar Voo</Text>
          </TouchableOpacity>
          <FlatList
            data={tickets}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.ticketList}
          />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: 7,
    justifyContent: 'center',
    display: 'flex',
    padding: 6,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingTop: 1,
    marginLeft: 19,
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '500',
    color: 'black',
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    color: 'black',
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
    alignContent: 'center',
    width: '40%',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '80%',
    paddingTop: 8,
    marginLeft: 40,
    marginTop: 20,
  },
  iconText: {
    color: 'black',
    fontWeight: '600',
  },
  ticketList: {
    width: '100%',
  },
  ticketItem: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 7,
    marginBottom: 10,
  },
  ticketText: {
    fontSize: 18,
    fontWeight: '400',
  },
});
