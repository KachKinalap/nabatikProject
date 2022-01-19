import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraView from "./CameraView";
import Gallery from "../UI/Gallery";
import Settings from "./Settings";

const AppRouter = (props) => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName={'Camera'}>
            <Tab.Screen name="Camera" component={CameraView} />
            <Tab.Screen name="History" component={Gallery} />
            <Tab.Screen name="Settings" component={()=><Settings setIsAuth={props.setIsAuth}/>} />
        </Tab.Navigator>
    );
};

export default AppRouter;
