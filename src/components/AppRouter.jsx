import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraView from "./CameraView";
import Gallery from "../UI/Gallery";
import Settings from "./Settings";
import Ionicons from '@expo/vector-icons/Ionicons';
import GetGeo from '../API/GetGeo'

const AppRouter = (props) => {
    const Tab = createBottomTabNavigator()

    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(()=>{
        GetGeo.getCoord(setErrorMsg, setLocation)
    },[])

    return (
        <Tab.Navigator
            initialRouteName={'Camera'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({color, size }) => {
                    let iconName;

                    if (route.name === 'Camera') {
                        iconName = 'camera'
                    }
                    else if (route.name === 'History') {
                        iconName = 'time'
                    }
                    else if (route.name === 'Settings') {
                        iconName = 'settings'
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#90C900',
                tabBarInactiveTintColor: 'gray',
                unmountOnBlur:true
            })}
        >
            <Tab.Screen name="Camera" component={()=><CameraView token={props.token} coord={location}/>}/>
            <Tab.Screen name="History" component={()=><Gallery token={props.token} coord={location}/>} />
            <Tab.Screen name="Settings" component={()=><Settings setIsAuth={props.setIsAuth}/>} />
        </Tab.Navigator>
    );
};

export default AppRouter;
