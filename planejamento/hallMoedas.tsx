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
        <Text style={styles.text}>Bem-vindo, {user?.nome ?? 'Visitante'}</Text>
        <Text style={styles.text}>Nacionalidade: {user?.nacionalidade ?? 'Desconhecida'}</Text>
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.container2}>
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
});
