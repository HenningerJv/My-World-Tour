import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from "./fireBaseConfig";

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
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // O usuário está autenticado, você pode definir os dados do usuário no estado
        setUser({
          nome: currentUser.displayName || '',
          nacionalidade: currentUser.customClaims?.nacionalidade || '',
        });
      } else {
        // Não há usuário autenticado, limpe o estado
        setUser(null);
      }
    });

    // Cleanup da subscription
    return () => unsubscribe();
  }, []);

  return (
    <LinearGradient
      colors={['#00FF94', '#00FF94', '#2F829C']}
      style={styles.linearGradient}
    >
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
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  btnCadastro2: {
    backgroundColor: '#00FF94',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 8,
    marginTop: 20,
  },
  iconText: {
    color: 'black',
    fontWeight: '600',
  },
});
