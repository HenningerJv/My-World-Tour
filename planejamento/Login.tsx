import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { loginUser } from './authFunction';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  type Home = StackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<Home>();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const user = await loginUser(email, senha);
      Alert.alert('Login realizado com sucesso');
      navigation.navigate('Home'); // Ajuste a navegação conforme sua configuração
    } catch (error: unknown) {
      console.error('Erro ao fazer login:', error);
      if (error instanceof Error) {
        Alert.alert('Erro ao fazer login', error.message);
      } else {
        Alert.alert('Erro ao fazer login', 'Ocorreu um erro desconhecido.');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#00FF94', '#2F829C']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.text}>Faça seu login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Informe o seu Email:"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Informe a sua senha:"
          onChangeText={text => setSenha(text)}
          value={senha}
        />
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.btnLoginText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Não tem Conta?</Text>
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
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  btnLogin: {
    backgroundColor: '#00FF94',
    padding: 9,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnLoginText: {
    color: 'black',
    fontWeight: '600',
  },
});
