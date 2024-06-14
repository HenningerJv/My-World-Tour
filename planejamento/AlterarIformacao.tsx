import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import Login from "./Login";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from './types';
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface User {
    nome: string;
    nacionalidade: string;
}

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('')
    const [endereco, setEndereco] = useState('')
    const [nacionalidade, setNacionalidade] = useState('')
    const [genero, setGenero] = useState('')
    const [user, setUser] = useState<User | null>(null);

    type Home = StackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (user) {
            setNome(user.nome);
            setNacionalidade(user.nacionalidade);
        }
    }, [user]);

    const updateUser = async () => {
        if (senha !== confirmeSenha) {
            Alert.alert("Erro", "As senhas não conferem.");
            return;
        }

        try {
            const currentUser = auth.currentUser;

            if (currentUser) {
                const userRef = doc(db, "Usuario", currentUser.uid);
                await setDoc(userRef, {
                    nome,
                    email,
                    cpf,
                    endereco,
                    nacionalidade,
                    genero
                }, { merge: true });

                Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
                navigation.navigate('Home');
            } else {
                Alert.alert("Erro", "Nenhum usuário autenticado encontrado.");
            }
        } catch (error) {
            Alert.alert("Erro", "Houve um erro ao atualizar as informações.");
            console.error("Erro ao atualizar informações:", error);
        }
    };

    return (
        <LinearGradient
            colors={['#00FF94', '#00FF94', '#2F829C']}
            style={styles.linearGradient}>
            <Text style={styles.text}>Bem-vindo, {user?.nome ?? 'Visitante'}</Text>
            <Text style={styles.text}>Nacionalidade: {user?.nacionalidade ?? 'Desconhecida'}</Text>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon name="home-outline" size={30} color="black" />
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HallMoedas')}>
                        <Icon name="home-outline" size={30} color="black" />
                        <Text>Conversor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
                        <Icon name="settings-outline" size={30} color="black" />
                        <Text>Configurações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Icon name="log-out-outline" size={30} color="black" />
                        <Text>Sair</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar hidden />
                <Text style={styles.text}>Alteração de Informação</Text>
                <TextInput style={styles.textInput} placeholder="Informe o seu nome:" onChangeText={text => setNome(text)} />
                <TextInput style={styles.textInput} placeholder="Informe o seu CPF:" onChangeText={number => setCpf(number)} />
                <TextInput style={styles.textInput} placeholder="Informe o seu Email:" onChangeText={text => setEmail(text)} />
                <TextInput style={styles.textInput} placeholder="Informe o seu Endereço:" onChangeText={text => setEndereco(text)} />
                <Picker selectedValue={nacionalidade}
                    onValueChange={(itemValue: React.SetStateAction<string>) => setNacionalidade(itemValue)}>
                    <Picker.Item label='Selecione sua Nacionalidade' value='' />
                    <Picker.Item label='Africana' value='africana' />
                    <Picker.Item label='Mexicana' value='mexicana' />
                    <Picker.Item label='Inglesa' value='inglesa' />
                    <Picker.Item label='Portuguesa' value='portuguesa' />
                    <Picker.Item label='Brasileira' value='brasileira' />
                    <Picker.Item label='Espanhola' value='espanhola' />
                    <Picker.Item label='Italiana' value='italiana' />
                    <Picker.Item label='Alemã' value='alema' />
                    <Picker.Item label='Francesa' value='francesa' />
                    <Picker.Item label='Australiana' value='australiana' />
                    <Picker.Item label='Sueca' value='sueca' />
                    <Picker.Item label='Argentina' value='argentina' />
                    <Picker.Item label='Colombiana' value='colombiana' />
                    <Picker.Item label='Canadense' value='canadense' />
                    <Picker.Item label='Americana' value='americana' />
                    <Picker.Item label='Holandesa' value='holandesa' />
                    <Picker.Item label='Chilena' value='chilena' />
                    <Picker.Item label='Venezuelana' value='venezuelana' />
                    <Picker.Item label='Austriaca' value='austriaca' />
                    <Picker.Item label='Chinesa' value='chinesa' />
                    <Picker.Item label='Japonesa' value='japonesa' />
                    <Picker.Item label='Coreana' value='Coreana' />
                    <Picker.Item label='Russa' value='russa' />
                </Picker>
                <Picker selectedValue={genero}
                    onValueChange={(itemValue: React.SetStateAction<string>) => setGenero(itemValue)}>
                    <Picker.Item label='Selecione seu Gênero' value='' />
                    <Picker.Item label='Masculino' value='masculino' />
                    <Picker.Item label='Feminino' value='feminino' />
                    <Picker.Item label='Outro' value='outro' />
                </Picker>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder="Crie sua senha:"
                    onChangeText={text => setSenha(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    placeholder="Confirme sua senha:"
                    onChangeText={text => setConfirmeSenha(text)}
                />
                <TouchableOpacity style={styles.btnCadastro} onPress={updateUser}>
                    <Text style={styles.btnCadastro}>Atualizar Informações</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient >
    )
}


const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 8,
        height: 7,
        marginLeft: 55,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 7,
        paddingTop: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    text: {
        fontSize: 40,
        marginBottom: 70,
        fontWeight: '500',
        color: 'black',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
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
        textAlign: 'center'
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
    }
});

function alert(confirmeSenha: string) {
    throw new Error("Function not implemented.");
}
