import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import MainMenu from "./MainMenu";
import CameraView from "./CameraView";
import History from "./History";
import Settings from "./Settings";

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
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
                        <Stack.Navigator>
                            <Stack.Screen
                                name="MainMenu"
                                component={MainMenu}
                            />
                            <Stack.Screen
                                name="Camera"
                                component={CameraView}
                            />
                            <Stack.Screen
                                name="History"
                                component={History}
                            />
                            <Stack.Screen
                                name="Settings"
                                component={Settings}
                            />
                        </Stack.Navigator>
                    :
                        <Stack.Navigator>
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
