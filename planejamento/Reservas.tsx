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

export default function Reservas() {
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

  return (
    <>
      <LinearGradient
        colors={['#00FF94', '#00FF94', '#2F829C']}
        style={styles.linearGradient}>
        <Text style={styles.text}>Bem-vindo {user ? user.nome : ''}</Text>
        <Text style={styles.text}>Nacionalidade {user ? user.nacionalidade : ''}</Text>
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
          <StatusBar hidden />
          <TouchableOpacity style={styles.btnCadastro} onPress={() => navigation.navigate('ReservaHotel')}>
            <Text style={styles.text}>Reservar Hotel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCadastro2} onPress={() => navigation.navigate('ReservaPasseio')}>
            <Text style={styles.text}>Reservar Passeios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCadastro2} onPress={() => navigation.navigate('ReservaTurismo')}>
            <Text style={styles.text}>Ver Reservas</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    padding: 16,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    marginLeft: '5%',
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: '60%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  btnCadastro2: {
    backgroundColor: '#00FF94',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: '60%',
    marginVertical: 10,
    padding: 10,
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '80%',
    paddingTop: 8,
    marginLeft: '10%',
    marginTop: 20,
  },
  iconText: {
    color: 'black',
    fontWeight: '600',
  },
});
