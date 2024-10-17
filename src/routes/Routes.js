import { AntDesign } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CustomDrawer from '../components/CustomDrawer';
import Produtos from '../components/Produtos/Produtos';
import Ajuda from '../screens/appScreens/Ajuda/Ajuda';
import Anunciar from '../screens/appScreens/Anunciar/Anunciar';
import Inicio from '../screens/appScreens/Inicio/Inicio';
import MinhaConta from '../screens/appScreens/Perfil/MinhaConta/MinhaConta';
import Perfil from '../screens/appScreens/Perfil/Perfil';
import Tutorial from '../screens/appScreens/Tutorial/Tutorial';
import Cadastro from '../screens/authScreens/Cadastro/Cadastro';
import Login from '../screens/authScreens/Login/Login';
import RecuperarSenha from '../screens/authScreens/Login/RecuperarSenha/RecuperarSenha';
import OnBoarding from '../screens/authScreens/OnBoarding/OnBoarding';
import Splash from '../screens/splashScreens/Splash/Splash';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName='Splash'
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
            <Stack.Screen name="Produtos" component={Produtos} />
            <Stack.Screen name="MinhaConta" component={MinhaConta} />
            <Stack.Screen name="DrawerApp" component={DrawerApp} />
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

function DrawerApp() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: '#FE8330',
                drawerInactiveTintColor: '#000',
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name="Início"
                component={Inicio}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign name="home" size={size} color={focused ? '#FE8330' : '#000'} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Anunciar"
                component={Anunciar}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign name="notification" size={size} color={focused ? '#FE8330' : '#000'} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Minha Conta"
                component={Perfil}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign name="user" size={size} color={focused ? '#FE8330' : '#000'} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Ajuda"
                component={Ajuda}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign name="questioncircleo" size={size} color={focused ? '#FE8330' : '#000'} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Tutorial"
                component={Tutorial}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign name="book" size={size} color={focused ? '#FE8330' : '#000'} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}