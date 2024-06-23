import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from './types';
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";
import { updateEmail, updatePassword } from "firebase/auth";

interface User {
    nome: string;
    nacionalidade: string;
}

export default function AlterarInformacao() {
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

                await updateDoc(userRef, {
                    nome,
                    email,
                    cpf,
                    endereco,
                    nacionalidade,
                    genero
                });

                if (email !== currentUser.email) {
                    await updateEmail(currentUser, email);
                }

                if (senha) {
                    await updatePassword(currentUser, senha);
                }

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
            <View style={styles.container}>
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
                <StatusBar hidden />
                <Text style={styles.textPagina}>Alteração de Informação</Text>
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
                    <Text style={styles.text}>Atualizar Informações</Text>
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
    textPagina: {
        textAlign: 'center',
        fontWeight: '500',
        color: 'black',
        fontSize: 40,
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
        borderRadius: 5,
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
        marginLeft: 40,
    },
    iconText: {
        color: 'black',
        fontWeight: '600',
    }
});
