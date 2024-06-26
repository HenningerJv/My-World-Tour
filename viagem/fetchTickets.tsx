import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchTickets, Ticket } from './ticketService';
import { LinearGradient } from 'expo-linear-gradient'; // Importação corrigida para Expo

interface TicketListProps {
  userId: string;
}

export default function TicketList({ userId }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const loadTickets = async (userId: string) => {
    const userTickets = await fetchTickets(userId);
    setTickets(userTickets);
  };

  useEffect(() => {
    loadTickets(userId);
  }, [userId]);

  return (
    <LinearGradient colors={['#00FF94', '#00FF94', '#2F829C']} style={styles.linearGradient}>
      <View style={styles.container}>
        {tickets.map(ticket => (
          <View key={ticket.id} style={styles.ticket}>
            <Text style={styles.ticketText}>Destino: {ticket.destino}</Text>
            <Text style={styles.ticketText}>Data: {ticket.data}</Text>
            <Text style={styles.ticketText}>Assento: {ticket.assento}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  ticket: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  ticketText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
});
