// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Cadastro from './Cadastro'
import Home from './Home';
import ConversorMoeda from './ConversorMoeda';
import Configuracoes from './Configuracoes';
import Passagens from './Passagens';
import ReservaVoo from './ReservaVoo';
import ReservaPasseio from './ReservaPasseio';
import ReservaTurismo from './ReservaTurismo'
import Reservas from './Reservas';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ConversorMoeda" component={ConversorMoeda} />
        <Stack.Screen name="Configuracoes" component={Configuracoes} />
        <Stack.Screen name="Passagens" component={Passagens} />
        <Stack.Screen name="ReservaVoo" component={ReservaVoo} />
        <Stack.Screen name="Reservas" component={Reservas} />
        <Stack.Screen name="ReservaPasseio" component={ReservaPasseio} />
        <Stack.Screen name="ReservaTurismo" component={ReservaTurismo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
