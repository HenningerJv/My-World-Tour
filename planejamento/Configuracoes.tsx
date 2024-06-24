import { Picker } from "@react-native-picker/picker";
import LinearGradient from "react-native-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { auth, db } from './fireBaseConfig'; // Importar auth e db de fireBaseConfig

interface User {
    nome: string;
    nacionalidade: string;
}

export default function Configuracoes() {
    const [nome, setNome] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [user, setUser] = useState<User | null>(null);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (user) {
            setNome(user.nome);
            setNacionalidade(user.nacionalidade);
        }
    }, [user]);

    const handleDeleteUser = async () => {
        try {
            const currentUser = auth.currentUser;

            if (currentUser) {
                await db.collection('Usuario').doc(currentUser.uid).delete(); // Usar db para acessar Firestore
                await currentUser.delete();
                setUser(null);
                Alert.alert('Usuário deletado', 'O usuário foi deletado com sucesso.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro', 'Nenhum usuário autenticado encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro ao deletar o usuário.');
            console.error('Erro ao deletar usuário:', error);
        }
    };

    return (
        <LinearGradient colors={['#00FF94', '#00FF94', '#2F829C']} style={styles.linearGradient}>
            <Text style={styles.text}>Bem-vindo, {user ? user.nome : ''}</Text>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlterarInformacao')}>
                        <Text style={styles.buttonText}>Alterar Informações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDeletar} onPress={handleDeleteUser}>
                        <Text style={styles.buttonText}>Deletar Perfil</Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom: 70,
        fontWeight: '500',
        color: 'black',
        marginLeft: 60,
    },
    btnCadastro: {
        backgroundColor: '#00FF94',
        color: 'black',
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 9,
        alignContent: 'center',
        width: '60%',
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
        width: '40%',
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
    linkText: {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#00FF94',
        padding: 10,
        borderRadius: 5,
    },
    buttonDeletar: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        color: 'black',
        fontWeight: '600',
    },
    buttonText: {
        color: 'black',
        fontWeight: '600',
    },
});
