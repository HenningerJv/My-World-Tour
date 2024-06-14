import { Picker } from "@react-native-picker/picker";
import LinearGradient from "react-native-linear-gradient";
import Home from "./Home";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

interface User {
  nome: string;
  nacionalidade: string;
}


export default function ConfirmeCompra() {
  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('')
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [cvv, setCvv] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('');
  const [user, setUser] = useState<User | null>(null);

  type Login = StackNavigationProp<RootStackParamList, 'Login'>;
  type Home = StackNavigationProp<RootStackParamList, 'Home'>
  type HallMoedas = StackNavigationProp<RootStackParamList, 'HallMoedas'>

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
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="black" />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HallMoedas')}>
            <Icon name="coins-outline" size={30} color="black" />
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
        <View style={styles.container}>
          <StatusBar hidden />
          <Text style={styles.text}>Bem-vindo</Text>
          <TextInput style={styles.textInput} placeholder="Informe o seu Email:" onChangeText={text => setEmail(text)} />
          <TextInput style={styles.textInput} placeholder="Informe o endereço da cobrança:" onChangeText={text => setEndereco(text)} />
          <TextInput
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Digite o número do Cartão:"
            onChangeText={text => setNumeroCartao(text)}
          />
          <TextInput
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Digite o CPF do titular:"
            onChangeText={text => setCpf(text)}
          />
          <TextInput
            keyboardType="numeric"
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Digite o CVV:"
            onChangeText={text => setCvv(text)}
          />
          <Picker selectedValue={tipoPagamento}
            onValueChange={(itemValue: React.SetStateAction<string>, itemIndex: any) =>
              setTipoPagamento(itemValue)
            }>
            <Picker.Item label='Selecione o tipo de Pagamento' value='' />
            <Picker.Item label='Débito' value='debito' />
            <Picker.Item label='Crédito' value='credito' />
          </Picker>
          <TextInput style={styles.textInput} placeholder="Nome do Titular do Cartão:" onChangeText={text => setNome(text)} />
          <TouchableOpacity style={styles.btnCadastro} onPress={() => Home()}>
            <Text style={styles.btnCadastro}>Confirmar</Text>
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
});
