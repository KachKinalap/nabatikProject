import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import MainMenu from "./MainMenu";

const LoginRouter = ({ navigation }) => {

    const Stack = createNativeStackNavigator();

    const slideToMain = ()=>{
        navigation.navigate('MainMenu')
    }

    return (
        <View style={styles.container}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={() => <Login action={slideToMain}/>}
                />
                <Stack.Screen
                    name="MainMenu"
                    component={MainMenu}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    }
})

export default LoginRouter;
