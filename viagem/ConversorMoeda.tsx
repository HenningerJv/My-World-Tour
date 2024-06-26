import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';

interface User {
  nome: string;
  nacionalidade: string;
}

const exchangeRates = {
  realBrasileiro: 1,
  euro: 5.5,
  dolarCanadense: 4.2,
  dolarAmericano: 5.0,
  libraEsterlina: 6.2,
  ieneJapones: 0.045
};

export default function ConversorMoeda() {
  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('');
  const [moedaDestino, setMoedaDestino] = useState('');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
  const [valorAtual, setValorAtual] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Simulação de usuário logado
    const fakeUser: User = { nome: 'João', nacionalidade: 'Brasileira' };
    setUser(fakeUser);
  }, []);

  const calcularConversao = () => {
    if (!moedaOrigem || !moedaDestino || !valor) {
      alert('Por favor, selecione as moedas e informe o valor a ser convertido.');
      return;
    }

    const valorConvertido = (parseFloat(valor) / exchangeRates[moedaOrigem]) * exchangeRates[moedaDestino];
    setResultado(valorConvertido.toFixed(2));
    setValorAtual(exchangeRates[moedaDestino].toString());
  };

  return (
    <>
      <LinearGradient colors={['#00FF94', '#00FF94', '#2F829C']} style={styles.linearGradient}>
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
          <Text style={styles.text}>Converte Sua Moeda</Text>
          <Picker
            selectedValue={moedaOrigem}
            onValueChange={(itemValue: string) => setMoedaOrigem(itemValue)}>
            <Picker.Item label='Selecione a Moeda que será Convertida' value='' />
            <Picker.Item label='Real Brasileiro' value='realBrasileiro' />
            <Picker.Item label='Euro' value='euro' />
            <Picker.Item label='Dolar Canadense' value='dolarCanadense' />
            <Picker.Item label='Dolar Americano' value='dolarAmericano' />
            <Picker.Item label='Libra Esterlina' value='libraEsterlina' />
            <Picker.Item label='Iene Japonês' value='ieneJapones' />
          </Picker>
          <TextInput
            style={styles.textInput}
            placeholder="Quanto quer converter"
            keyboardType="numeric"
            onChangeText={text => setValor(text)}
          />
          <Picker
            selectedValue={moedaDestino}
            onValueChange={(itemValue: string) => setMoedaDestino(itemValue)}>
            <Picker.Item label='Selecione a Moeda Convertedora' value='' />
            <Picker.Item label='Real Brasileiro' value='realBrasileiro' />
            <Picker.Item label='Euro' value='euro' />
            <Picker.Item label='Dolar Canadense' value='dolarCanadense' />
            <Picker.Item label='Dolar Americano' value='dolarAmericano' />
            <Picker.Item label='Libra Esterlina' value='libraEsterlina' />
            <Picker.Item label='Iene Japonês' value='ieneJapones' />
          </Picker>
          <TouchableOpacity style={styles.btnCadastro} onPress={calcularConversao}>
            <Text style={styles.iconText}>Converter</Text>
          </TouchableOpacity>
          <Text style={styles.resultText}>Total Convertido: {resultado}</Text>
          <Text style={styles.resultText}>Valor Atual da Moeda Destino: {valorAtual}</Text>
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
    padding: 16,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 7,
    marginLeft: '5%',
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  textInput: {
    width: '100%',
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
  resultText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  }
});
