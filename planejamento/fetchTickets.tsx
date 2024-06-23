import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchTickets, Ticket } from './ticketService';

export default function TicketList({ userId }: { userId: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const loadTickets = async (userId: string) => {
    const userTickets = await fetchTickets(userId);
    setTickets(userTickets);
  };

  useEffect(() => {
    loadTickets(userId);
  }, [userId]);

  return (
    <View style={styles.container}>
      {tickets.map(ticket => (
        <View key={ticket.id} style={styles.ticket}>
          <Text>Destino: {ticket.destino}</Text>
          <Text>Data: {ticket.data}</Text>
          <Text>Assento: {ticket.assento}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ticket: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  }
});
