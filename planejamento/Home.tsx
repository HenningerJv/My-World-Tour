import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["USD", "EUR", "GBP", "JPY", "AUD"],
  datasets: [
    {
      data: [1.0, 0.84, 0.74, 110.57, 1.34],
    },
  ],
};

interface User {
  nome: string;
  nacionalidade: string;
}

export default function HallMoedas() {
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
        <Text style={styles.text}>Bem-vindo, {user ? user.nome : 'Carregando...'}</Text>
        <Text style={styles.text}>Nacionalidade: {user ? user.nacionalidade : 'Carregando...'}</Text>
        <View style={styles.container}>
          <StatusBar hidden />
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
          <View style={styles.container2}>
          <TouchableOpacity style={styles.btnCadastro} onPress={() => navigation.navigate('ConversorMoeda')}>
            <Text style={styles.text}>Simular Conversor</Text>
          </TouchableOpacity>
            <LineChart
              data={data}
              width={screenWidth * 0.9}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
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
    marginLeft: 10,
    textAlign: 'center'
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
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
    width: '70%'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '80%',
    paddingTop: 8,
    marginLeft: 40,
    marginTop: -30,
  },
  iconText: {
    color: 'black',
    fontWeight: '600',
  },
});
