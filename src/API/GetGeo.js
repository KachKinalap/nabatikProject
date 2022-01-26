import * as Location from "expo-location"


export default class GetGeo {
    static async getCoord(onError, setPos) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            onError('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setPos(location);
    }
}
