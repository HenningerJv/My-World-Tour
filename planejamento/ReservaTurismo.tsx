import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

interface User {
    nome: string;
    nacionalidade: string;
}


export default function ReservaTurismo() {
    const [nome, setNome] = useState('');
    const [nacionalidade, setNacionalidade] = useState('')
    const [user, setUser] = useState<User | null>(null);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (user) {
            setNome(user.nome);
            setNacionalidade(user.nacionalidade);
        }
    }, [user]);

    return (
        <>
            <LinearGradient
                colors={['#00FF94', '#00FF94', '#2F829C']}
                style={styles.linearGradient}>
                <Text style={styles.text}>Bem-vindo, {user ? user.nome : 'Carregando...'}</Text>
                <Text style={styles.text}>Nacionalidade: {user ? user.nacionalidade : 'Carregando...'}</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('HallMoedas')}>
                        <Text style={styles.iconText}>Conversor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
                        <Text style={styles.iconText}>Configurações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.iconText}>Sair</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <StatusBar hidden />
                    <View style={styles.container2}>
                    </View>
                </View>
            </LinearGradient>
        </>
    )
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
        fontSize: 40,
        marginBottom: 70,
        fontWeight: '500',
        color: 'black',
        marginLeft: 60
    },
    btnCadastro: {
        backgroundColor: '#00FF94',
        color: 'black',
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 9,
        alignContent: 'center',
        width: '60%'
    },
    textInput: {
        width: '90%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: 'transparent',
        shadowColor: 'black',
        marginBottom: 10,
        paddingLeft: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    container2: {
        backgroundColor: '#00FF94',
        width: '40%'
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
    }
});
