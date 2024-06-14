import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./fireBaseConfig";
import { RootStackParamList } from "./types";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState<{ nome: string; nacionalidade: string } | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, 'Usuario', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData as { nome: string; nacionalidade: string });
        navigation.navigate('Home');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error logging in: ', error);
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <LinearGradient
      colors={['#00FF94', '#00FF94', '#2F829C']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.text}>Bem-vindo</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="Informe o seu Email:" 
          onChangeText={text => setEmail(text)} 
          value={email}
        />
        <TextInput 
          secureTextEntry={true} 
          style={styles.textInput} 
          placeholder="Crie sua senha:" 
          onChangeText={text => setSenha(text)} 
          value={senha}
        />
        <TouchableOpacity style={styles.btnCadastro} onPress={handleLogin}>
          <Text style={styles.btnCadastro}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Não tem Conta?</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
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
    marginLeft: 55,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 7,
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 40,
    marginBottom: 70,
    fontWeight: '500',
    color: 'black',
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    color: 'black',
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
    width: '60%',
    textAlign: 'center'
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
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
