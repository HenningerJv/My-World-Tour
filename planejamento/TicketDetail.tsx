import React from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from "@react-navigation/native";

export default function TicketDetail() {
    const route = useRoute();
    const { ticket } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Passagem</Text>
            <Text style={styles.detail}>Destino: {ticket.destino}</Text>
            <Text style={styles.detail}>Data: {ticket.data}</Text>
            <Text style={styles.detail}>Assento: {ticket.assento}</Text>
            <QRCode value={JSON.stringify(ticket)} size={200} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    },
    detail: {
        fontSize: 18,
        marginBottom: 10,
    }
});
