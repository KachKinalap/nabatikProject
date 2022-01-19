import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import MainMenu from "./MainMenu";
import CameraView from "./CameraView";
import History from "./History";
import Settings from "./Settings";
import Gallery from "../UI/Gallery";
import AppRouter from "./AppRouter";

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(true)
    const Stack = createNativeStackNavigator();

    // const slideToMain = ()=>{
    //     navigation.navigate('MainMenu')
    // }

    return (
        <View style={styles.container}>
        <NavigationContainer>

                {
                    isAuth
                    ?
                        <AppRouter setIsAuth={setIsAuth}/>
                    :
                        <Stack.Navigator screenOptions={{
                            headerShown: false
                        }}>
                            <Stack.Screen
                                name="Login"
                                component={()=><Login setIsAuth={setIsAuth}/>}
                            />
                        </Stack.Navigator>
                }



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
