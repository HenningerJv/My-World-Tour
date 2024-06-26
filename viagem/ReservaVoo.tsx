import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importação corrigida para Expo
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import DateTimePicker from '@react-native-community/datetimepicker'; // Mantido para compatibilidade
import * as Location from 'expo-location'; // Importação para obter a localização no Expo

interface User {
    nome: string;
    nacionalidade: string;
}

const airports = {
    'Aeroporto Santos Dumont': 'Rio de Janeiro',
    'Aeroporto de Guarulhos': 'Sao Paulo',
    'Aeroporto Internacional de Salvador Luís Eduardo Magalhães': 'Salvador',
    'Aeroporto Internacional de Brasília - Presidente Juscelino Kubitschek': 'Brasilia',
    'Aeroporto de Vitória Eurico de Aguiar Salles': 'Espírito Santo',
    'Aeroporto Internacional de Florianópolis - Hercílio Luz': 'Florianopolis',
    'Aeroporto Fiumicino': 'Roma',
    'Aeroporto Humberto Delgado': 'Lisboa',
    'Aeroporto de Paris-Charles de Gaulle': 'Paris',
    'Aeroporto de Amesterdão Schiphol': 'Amsterdam',
    'Aeroporto de Berlim-Brandemburgo': 'Berlim',
    'Aeroporto de Arlanda': 'Estocolmo',
    'Aeroporto de Dublin': 'Dublin',
    'Aeroporto da Cidade de Londres': 'Londres',
    'Aeroporto de Edimburgo': 'Edimburgo',
    'Aeroporto Internacional de Atenas': 'Atenas',
    'Aeroporto de Berna': 'Berna',
    'Aeroporto Internacional de Viena': 'Viena',
};

export default function ReservaVoo() {
    const [nome, setNome] = useState('');
    const [nacionalidade, setNacionalidade] = useState('')
    const [user, setUser] = useState<User | null>(null);
    const [destino, setDestino] = useState('');
    const [origem, setOrigem] = useState('');
    const [aeroporto, setAeroporto] = useState('');
    const [dataIda, setDataIda] = useState(new Date());
    const [dataVolta, setDataVolta] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [dateType, setDateType] = useState<'ida' | 'volta'>('ida');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão negada', 'É necessário permitir o acesso à localização para prosseguir.');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                const locationName = await getLocationName(latitude, longitude);
                setOrigem(locationName);
                setAeroporto(airports[locationName]);
            } catch (error) {
                console.error('Erro ao obter localização:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao obter a localização. Tente novamente mais tarde.');
            }
        })();
    }, []);

    useEffect(() => {
        checkFields();
    }, [origem, destino, dataIda, dataVolta]);

    const getLocationName = async (latitude: number, longitude: number) => {
        try {
            const location = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (location.length > 0) {
                const { city } = location[0];
                return city || 'Desconhecido';
            } else {
                return 'Desconhecido';
            }
        } catch (error) {
            console.error('Erro ao obter nome da localização:', error);
            return 'Desconhecido';
        }
    };

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || (dateType === 'ida' ? dataIda : dataVolta);
        setShowDatePicker(Platform.OS === 'ios');
        if (dateType === 'ida') {
            setDataIda(currentDate);
        } else {
            setDataVolta(currentDate);
        }
    };

    const showDatepicker = (type: 'ida' | 'volta') => {
        setDateType(type);
        setShowDatePicker(true);
    };

    const checkFields = () => {
        if (origem && destino && dataIda && dataVolta) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    };

    const processReservation = () => {
        if (!origem || !destino || !dataIda || !dataVolta) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        // Simulando uma chamada de API para processar a reserva
        const reservationDetails = {
            origem,
            destino,
            dataIda,
            dataVolta,
            nome,
            nacionalidade,
        };

        // Lógica de reserva simulada
        try {
            // Sucesso na reserva
            Alert.alert("Sucesso", "Reserva realizada com sucesso!");
            // Redirecionar para a página inicial ou outra página
            navigation.navigate('Home');
        } catch (error) {
            // Falha na reserva
            console.error("Erro ao processar a reserva:", error);
            Alert.alert("Erro", "Ocorreu um erro ao processar a reserva. Tente novamente mais tarde.");
        }
    };

    return (
        <LinearGradient
            colors={['#00FF94', '#00FF94', '#2F829C']}
            style={styles.linearGradient}>
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
                <Text style={styles.text}>Para onde nós vamos?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Informe a origem da viagem:"
                    onChangeText={text => setOrigem(text)}
                    value={origem}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Informe o destino:"
                    onChangeText={text => setDestino(text)}
                    value={destino}
                />
                <View>
                    <Button onPress={() => showDatepicker('ida')} title="Selecione a data de ida" />
                    <Text>Data de Ida: {dataIda.toDateString()}</Text>
                </View>
                <View>
                    <Button onPress={() => showDatepicker('volta')} title="Selecione a data de volta" />
                    <Text>Data de Volta: {dataVolta.toDateString()}</Text>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateType === 'ida' ? dataIda : dataVolta}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <TouchableOpacity
                    style={[styles.btnCadastro, { backgroundColor: isButtonEnabled ? '#00FF94' : '#ccc' }]}
                    onPress={processReservation}
                    disabled={!isButtonEnabled}
                >
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
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 7,
        marginTop: 40,
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
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
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        width: '80%',
        paddingTop: 8,
        marginLeft: 40,
        marginTop: 20,
    },
    iconText: {
        color: 'black',
        fontWeight: '600',
    },
    btnCadastro: {
        backgroundColor: '#00FF94',
        color: 'black',
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 9,
        alignContent: 'center',
        width: '60%',
        marginBottom: 20,
    },
    linkText: {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: '800',
    },
});

