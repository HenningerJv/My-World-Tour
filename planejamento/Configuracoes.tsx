import { Picker } from "@react-native-picker/picker";
import LinearGradient from "react-native-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth, firestore } from './fireBaseConfig';


interface User {
    nome: string;
    nacionalidade: string;
}

export default function ConversorMoeda() {
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
                await firestore.collection('Usuario').doc(currentUser.uid).delete();

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
        <>
            <LinearGradient
                colors={['#00FF94', '#00FF94', '#2F829C']}
                style={styles.linearGradient}>
                <Text style={styles.text}>Bem-vindo, {user?.nome ?? 'Visitante'}</Text>
                <Text style={styles.text}>Nacionalidade: {user?.nacionalidade ?? 'Desconhecida'}</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon name="home" size={30} color="black" />
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HallMoedas')}>
                        <Icon name="monetization_on" size={30} color="black" />
                        <Text>Conversor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
                        <Icon name="settings" size={30} color="black" />
                        <Text>Configurações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Icon name="logout" size={30} color="black" />
                        <Text>Sair</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlterarInformacao')}>
                        <Text style={styles.buttonText}>Alterar Informações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDeletar} onPress={handleDeleteUser}>
                        <Text style={styles.buttonText}>Deletar Perfil</Text>
                    </TouchableOpacity>
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
        marginLeft: 19
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
        marginTop: 20,
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
        backgroundColor: '#red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontWeight: '600',
    }
});
