import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar, Alert, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import LinearGradient from "react-native-linear-gradient";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import Geolocation from '@react-native-community/geolocation';

interface User {
  nome: string;
}

const hotels = {
  'Hotel Copacabana Palace': 'Rio de Janeiro',
  'Hotel Fasano': 'São Paulo',
  'Hotel Bahia Othon Palace': 'Salvador',
  'Hotel Brasília Palace': 'Brasília',
  'Hotel Sheraton Vitória': 'Espírito Santo',
  'Hotel Majestic Palace': 'Florianópolis',
  'Hotel Eden': 'Roma',
  'Hotel Avenida Palace': 'Lisboa',
  'Hotel Le Meurice': 'Paris',
  'Hotel De L’Europe': 'Amsterdam',
  'Hotel Adlon Kempinski': 'Berlim',
  'Hotel Grand Hôtel': 'Estocolmo',
  'Hotel The Shelbourne': 'Dublin',
  'Hotel The Langham': 'Londres',
  'Hotel The Balmoral': 'Edimburgo',
  'Hotel Grande Bretagne': 'Atenas',
  'Hotel Bellevue Palace': 'Berna',
  'Hotel Sacher': 'Viena',
};

export default function ReservaHotel() {
  const [nome, setNome] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [hotel, setHotel] = useState('');
  const [cidade, setCidade] = useState('');
  const [dataCheckIn, setDataCheckIn] = useState(new Date());
  const [dataCheckOut, setDataCheckOut] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [dateType, setDateType] = useState<'checkIn' | 'checkOut'>('checkIn');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      setNome(user.nome);
    }
  }, [user]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = getLocationName(latitude, longitude);
        setCidade(location);
        setHotel(hotels[location]);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const getLocationName = (latitude: number, longitude: number) => {
    if (latitude === -22.9105 && longitude === -43.1631) {
      return 'Rio de Janeiro';
    }
    if (latitude === -23.4356 && longitude === -46.4731) {
      return 'São Paulo';
    }
    if (latitude === -12.9086 && longitude === -38.3225) {
      return 'Salvador';
    }
    if (latitude === -15.8711 && longitude === -47.9186) {
      return 'Brasília';
    }
    if (latitude === -20.2581 && longitude === -40.2864) {
      return 'Espírito Santo';
    }
    if (latitude === -27.6705 && longitude === -48.5525) {
      return 'Florianópolis';
    }
    if (latitude === 41.8003 && longitude === 12.2389) {
      return 'Roma';
    }
    if (latitude === 38.7742 && longitude === -9.1342) {
      return 'Lisboa';
    }
    if (latitude === 49.0097 && longitude === 2.5479) {
      return 'Paris';
    }
    if (latitude === 52.3105 && longitude === 4.7683) {
      return 'Amsterdam';
    }
    if (latitude === 52.3667 && longitude === 13.5033) {
      return 'Berlim';
    }
    if (latitude === 59.6519 && longitude === 17.9186) {
      return 'Estocolmo';
    }
    if (latitude === 53.4213 && longitude === -6.2701) {
      return 'Dublin';
    }
    if (latitude === 51.5053 && longitude === 0.0553) {
      return 'Londres';
    }
    if (latitude === 55.9500 && longitude === -3.3725) {
      return 'Edimburgo';
    }
    if (latitude === 37.9364 && longitude === 23.9475) {
      return 'Atenas';
    }
    if (latitude === 46.9141 && longitude === 7.4989) {
      return 'Berna';
    }
    if (latitude === 48.1103 && longitude === 16.5697) {
      return 'Viena';
    }
    return 'Desconhecido';
  };

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || (dateType === 'checkIn' ? dataCheckIn : dataCheckOut);
    setShowDatePicker(Platform.OS === 'ios');
    if (dateType === 'checkIn') {
      setDataCheckIn(currentDate);
    } else {
      setDataCheckOut(currentDate);
    }
  };

  const showDatepicker = (type: 'checkIn' | 'checkOut') => {
    setDateType(type);
    setShowDatePicker(true);
  };

  const handleConfirm = () => {
    console.log('Nome:', nome);
    console.log('Hotel:', hotel);
    console.log('Cidade:', cidade);
    console.log('Data Check-in:', dataCheckIn);
    console.log('Data Check-out:', dataCheckOut);

    if (!nome.trim() || !hotel || !cidade || !dataCheckIn || !dataCheckOut) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    Alert.alert("Sucesso", "Reserva realizada com sucesso!");
    navigation.navigate('Home');
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
        <Text style={styles.text}>Onde você quer se hospedar?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Informe o seu nome:"
          onChangeText={setNome}
          value={nome}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={hotel}
            onValueChange={(itemValue) => setHotel(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um Hotel" value="" />
            {Object.keys(hotels).map((key) => (
              <Picker.Item key={key} label={key} value={key} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity onPress={() => showDatepicker('checkIn')}>
          <Text style={styles.textInput}>Data de Check-in: {dataCheckIn.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDatepicker('checkOut')}>
          <Text style={styles.textInput}>Data de Check-out: {dataCheckOut.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateType === 'checkIn' ? dataCheckIn : dataCheckOut}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity style={styles.btnCadastro} onPress={handleConfirm}>
          <Text style={styles.linkText}>Confirmar compra</Text>
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
  linkText: {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '800',
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
  pickerContainer: {
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 40,
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
});
