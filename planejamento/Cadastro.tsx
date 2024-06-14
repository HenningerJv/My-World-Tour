import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from './types';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmeSenha, setConfirmeSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [genero, setGenero] = useState('');

  type Login = StackNavigationProp<RootStackParamList, 'Login'>;
  const navigation = useNavigation<Login>();

  const cadastro = async () => {
    if (!nome || !email || !cpf || !senha || !confirmeSenha || !endereco || !nacionalidade || !genero) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    if (senha !== confirmeSenha) {
      Alert.alert('As senhas não coincidem');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, 'Usuario', user.uid), {
        nome,
        email,
        cpf,
        endereco,
        nacionalidade,
        genero,
      });

      Alert.alert('Cadastro realizado com sucesso');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error);
      if (error instanceof Error) {
        Alert.alert('Erro ao cadastrar usuário', error.message);
      } else {
        Alert.alert('Erro ao cadastrar usuário', 'Ocorreu um erro desconhecido.');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#00FF94', '#2F829C']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.text}>Abra uma conta</Text>
        <TextInput style={styles.textInput} placeholder="Informe o seu nome:" onChangeText={text => setNome(text)} value={nome} />
        <TextInput style={styles.textInput} placeholder="Informe o seu CPF:" onChangeText={number => setCpf(number)} value={cpf} />
        <TextInput style={styles.textInput} placeholder="Informe o seu Email:" onChangeText={text => setEmail(text)} value={email} />
        <TextInput style={styles.textInput} placeholder="Informe o seu Endereço:" onChangeText={text => setEndereco(text)} value={endereco} />
        <Picker
          selectedValue={nacionalidade}
          onValueChange={(itemValue) => setNacionalidade(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione sua Nacionalidade" value="" />
          <Picker.Item label="Africana" value="africana" />
          <Picker.Item label="Mexicana" value="mexicana" />
          <Picker.Item label="Inglesa" value="inglesa" />
          <Picker.Item label="Portuguesa" value="portuguesa" />
          <Picker.Item label="Brasileira" value="brasileira" />
          <Picker.Item label="Espanhola" value="espanhola" />
          <Picker.Item label="Italiana" value="italiana" />
          <Picker.Item label="Alemã" value="alema" />
          <Picker.Item label="Francesa" value="francesa" />
          <Picker.Item label="Australiana" value="australiana" />
          <Picker.Item label="Sueca" value="sueca" />
          <Picker.Item label="Argentina" value="argentina" />
          <Picker.Item label="Colombiana" value="colombiana" />
          <Picker.Item label="Canadense" value="canadense" />
          <Picker.Item label="Americana" value="americana" />
          <Picker.Item label="Holandesa" value="holandesa" />
          <Picker.Item label="Chilena" value="chilena" />
          <Picker.Item label="Venezuelana" value="venezuelana" />
          <Picker.Item label="Austriaca" value="austriaca" />
          <Picker.Item label="Chinesa" value="chinesa" />
          <Picker.Item label="Japonesa" value="japonesa" />
          <Picker.Item label="Coreana" value="Coreana" />
          <Picker.Item label="Russa" value="russa" />
        </Picker>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione seu Gênero" value="" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Feminino" value="feminino" />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Crie sua senha:"
          onChangeText={text => setSenha(text)}
          value={senha}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Confirme sua senha:"
          onChangeText={text => setConfirmeSenha(text)}
          value={confirmeSenha}
        />
        <TouchableOpacity style={styles.btnCadastro} onPress={cadastro}>
          <Text style={styles.btnCadastroText}>Cadastrar</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    padding: 8,
    marginLeft: 55,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 7,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    marginBottom: 70,
    fontWeight: '500',
    color: 'black',
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
  picker: {
    width: '90%',
    height: 40,
    marginBottom: 10,
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    padding: 9,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnCadastroText: {
    color: 'black',
    fontWeight: '600',
  },
});
