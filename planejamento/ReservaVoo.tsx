import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { View, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, Platform, Button } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from '@react-native-community/geolocation';

interface User {
    nome: string;
    nacionalidade: string;
}

const airports = {
    'Rio de Janeiro': 'Aeroporto Santos Dumont',
    'Sao Paulo': 'Aeroporto de Guarulhos',
    'Salvador': 'Aeroporto Internacional de Salvador Luís Eduardo Magalhães',
    'Brasilia': 'Aeroporto Internacional de Brasília - Presidente Juscelino Kubitschek',
    'Espirito Santo': 'Aeroporto de Vitória Eurico de Aguiar Salles',
    'Florianopolis': 'Aeroporto Internacional de Florianópolis - Hercílio Luz',
    'Roma': 'Aeroporto Fiumicino',
    'Lisboa': 'Aeroporto Humberto Delgado',
    'Paris': 'Aeroporto de Paris-Charles de Gaulle',
    'Amsterdam': 'Aeroporto de Amesterdão Schiphol',
    'Berlim': 'Aeroporto de Berlim-Brandemburgo',
    'Estocolmo': 'Aeroporto de Arlanda',
    'Dublin': 'Aeroporto de Dublin',
    'Londres': 'Aeroporto da Cidade de Londres',
    'Edimburgo': 'Aeroporto de Edimburgo',
    'Atenas': 'Aeroporto Internacional de Atenas',
    'Berna': 'Aeroporto de Berna',
    'Viena': 'Aeroporto Internacional de Viena',
};

export default function ReservaVoo() {
    const [nome, setNome] = useState('');
    const [nacionalidade, setNacionalidade] = useState('')
    const [user, setUser] = useState<User | null>(null);
    const [destino, setDestino] = useState('')
    const [origem, setOrigem] = useState('')
    const [aeroporto, setAeroporto] = useState('')
    const [dataIda, setDataIda] = useState(new Date());
    const [dataVolta, setDataVolta] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mode, setMode] = useState('date');
    const [dateType, setDateType] = useState<'ida' | 'volta'>('ida');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (user) {
            setNome(user.nome);
            setNacionalidade(user.nacionalidade);
        }
    }, [user]);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position: { coords: { latitude: any; longitude: any; }; }) => {
                const { latitude, longitude } = position.coords;
                const location = getLocationName(latitude, longitude);
                setOrigem(location);
                setAeroporto(airports[location]);
            },
            (error: any) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const getLocationName = (latitude: number, longitude: number) => {
        if (latitude === -22.9105 && longitude === -43.1631) {
            return 'Rio de Janeiro';
        }
        if (latitude === -23.4356 && longitude === -46.4731) {
            return 'Sao Paulo';
        }
        if (latitude === -12.9086 && longitude === -38.3225) {
            return 'Salvador';
        }
        if (latitude === -15.8711 && longitude === -47.9186) {
            return 'Brasilia';
        }
        if (latitude === -20.2581 && longitude === -40.2864) {
            return 'Espirito Santo';
        }
        if (latitude === -27.6705 && longitude === -48.5525) {
            return 'Florianopolis';
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
        const currentDate = selectedDate || (dateType === 'ida' ? dataIda : dataVolta);
        setShowDatePicker(Platform.OS === 'ios');
        if (dateType === 'ida') {
            setDataIda(currentDate);
        } else {
            setDataVolta(currentDate);
        }
    };

    const showDatepicker = (type: string | ((prevState: "ida" | "volta") => "ida" | "volta")) => {
        setDateType(type);
        setShowDatePicker(true);
    };

    return (
        <>
            <LinearGradient
                colors={['#00FF94', '#00FF94', '#2F829C']}
                style={styles.linearGradient}>
                <Text style={styles.text}>Bem-vindo, {user ? user.nome : 'Carregando...'}</Text>
                <Text style={styles.text}>Nacionalidade: {user ? user.nacionalidade : 'Carregando...'}</Text>
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
                    <TouchableOpacity onPress={() => navigation.navigate('HallMoedas')}>
                        <Text style={styles.iconText}>Conversor</Text>
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
                    <Text style={styles.text}>Para onde nós vamos?</Text>
                    <TextInput style={styles.textInput} placeholder="Informe a origem da viagem:" onChangeText={text => setOrigem(text)} value={origem} />
                    <Picker
                        selectedValue={origem}
                        onValueChange={(itemValue) => setOrigem(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione o aeroporto" value="" />
                        {Object.keys(airports).map((location) => (
                            <Picker.Item key={location} label={location} value={location} />
                        ))}
                    </Picker>
                    <TextInput style={styles.textInput} placeholder="Informe o destino:" onChangeText={text => setDestino(text)} value={destino} />
                    <Picker
                        selectedValue={destino}
                        onValueChange={(itemValue) => setDestino(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione o aeroporto" value="" />
                        {Object.keys(airports).map((location) => (
                            <Picker.Item key={location} label={location} value={location} />
                        ))}
                    </Picker>
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
                    <TouchableOpacity onPress={() => navigation.navigate('ConfirmeCompra')}>
                        <Text style={styles.linkText}>Confirmar compra</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 7,
        marginTop: 40,
    },
    picker: {
        width: '90%',
        height: 40,
        marginBottom: 10,
    },
    linkText: {
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 20,
    },
    text: {
        fontSize: 40,
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
    }
});
