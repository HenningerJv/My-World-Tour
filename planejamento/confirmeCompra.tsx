import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import LinearGradient from "react-native-linear-gradient";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { processPayment } from './apiService'; 
import NetInfo from '@react-native-community/netinfo';

interface User {
  nome: string;
  nacionalidade: string;
}

export default function ConfirmeCompra() {
  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [cvv, setCvv] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setNacionalidade(user.nacionalidade);
    }
  }, [user]);

  const handleConfirm = async () => {
    if (!email || !endereco || !numeroCartao || !cpf || !cvv || !tipoPagamento || !nome) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const paymentDetails = {
      email,
      endereco,
      numeroCartao,
      cpf,
      cvv,
      tipoPagamento,
      nome,
      nacionalidade,
    };

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state: { isConnected: any; }) => {
        if (!state.isConnected) {
          Alert.alert('Erro de Conexão', 'Verifique sua conexão de internet.');
        }
      });
    
      return () => unsubscribe();
    }, []);

    try {
      const response = await processPayment(paymentDetails);
      if (response.success) {
        Alert.alert("Sucesso", "Compra realizada com sucesso!");
        navigation.navigate('Home');
      } else {
        Alert.alert("Erro", "Falha na compra. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      Alert.alert("Erro", "Ocorreu um erro ao processar o pagamento. Tente novamente mais tarde.");
    }
    
  };

  return (
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
        <StatusBar hidden />
        <Text style={styles.text}>Bem-vindo</Text>
        <TextInput style={styles.textInput} placeholder="Informe o seu Email:" onChangeText={setEmail} />
        <TextInput style={styles.textInput} placeholder="Informe o endereço da cobrança:" onChangeText={setEndereco} />
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="Digite o número do Cartão:"
          onChangeText={setNumeroCartao}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="Digite o CPF do titular:"
          onChangeText={setCpf}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="Digite o CVV:"
          onChangeText={setCvv}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoPagamento}
            onValueChange={(itemValue) => setTipoPagamento(itemValue)}>
            <Picker.Item label="Selecione o tipo de Pagamento" value="" />
            <Picker.Item label="Débito" value="debito" />
            <Picker.Item label="Crédito" value="credito" />
          </Picker>
        </View>
        <TextInput style={styles.textInput} placeholder="Nome do Titular do Cartão:" onChangeText={setNome} />
        <TouchableOpacity style={styles.btnCadastro} onPress={handleConfirm}>
          <Text style={styles.btnCadastroText}>Confirmar</Text>
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
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginBottom: 16,
  },
  textInput: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnCadastro: {
    backgroundColor: '#00FF94',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    width: '60%',
    borderRadius: 5,
  },
  btnCadastroText: {
    color: 'black',
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    width: '100%',
    padding: 8,
  },
  iconText: {
    color: 'black',
    fontWeight: '600',
  },
  pickerContainer: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
});
