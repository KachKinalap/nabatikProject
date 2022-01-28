import React, {useEffect, useState} from 'react';
import { Camera } from 'expo-camera';
import CameraPreview from "../UI/CameraPreview";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../UI/Loader";

const CameraView = (props, {navigation}) => {

    //loader's state
    const [loaderActive, setLoaderActive] = useState(false)

    //perm to use camera
    const [hasPermission, setHasPermission] = useState(null);

    //shows photo's preview and saves params(w,h,uri)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    //perm for saving into gallery
    const [status, requestPermission] = MediaLibrary.usePermissions();

    const retakePhoto = () => {
        setPreviewVisible(false)
        setCapturedImage(null)
    }
    //name of our user app's folder
    const nameAlbum = 'TreesNabatikProject'

    const savePhoto = async (uri, success, location, tD, tH) => {
        await requestPermission()
        if(status.status === 'granted'){
            const asset = await MediaLibrary.createAssetAsync(uri);

            await MediaLibrary.createAlbumAsync(nameAlbum, asset, false)
                .then(async () => {
                    console.log('File Saved Successfully!');
                    if(success === "sent"){
                        await AsyncStorage.setItem(asset.uri.split('/')[asset.uri.split('/').length-1], success)
                    }
                    else{
                        const imgJSON = JSON.stringify({success, location, tD, tH})
                        await AsyncStorage.setItem(asset.uri.split('/')[asset.uri.split('/').length-1], imgJSON)
                    }
                })
                .catch(() => {
                    console.log('Error In Saving File!');
                });
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View style={{width:'100%', height:'100%', backgroundColor:'#ff0000'}}/>;
    }
    if (hasPermission === false) {
        return <View style={{width:'100%', height:'100%', backgroundColor:'#ff0000'}}><Text>No access to camera</Text></View>;
    }
    // var for camera object
    let camera

    return (
        <View style={styles.container}>
            {(previewVisible && capturedImage) ?
                <CameraPreview
                    photo={capturedImage}
                    retakePh={retakePhoto}
                    savePh={savePhoto}
                    album={nameAlbum}
                    coord={props.coord}
                    token={props.token}
                />
                :
                <Camera
                    style={styles.camera}
                    ref={(ref) => {
                        camera=ref
                    }}
                >
                    {loaderActive
                        ?
                        <View style={styles.loader}>
                            <Loader/>
                        </View>

                        :
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={async () => {
                                    let photo=''
                                    try{
                                        setLoaderActive(true)
                                        photo = await camera.takePictureAsync();
                                        setLoaderActive(false)
                                    }catch (err){
                                        console.log(err)
                                    }
                                    setPreviewVisible(true)
                                    setCapturedImage(photo)
                                    //props.setChanger(!props.changer)
                                }}>
                                <Image
                                    source={require('../Images/cameraButton.png')}
                                    style={styles.logoText}
                                />
                            </TouchableOpacity>
                        </View>
                    }

                </Camera>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
    logoText:{
        flex: 1,
        width:100,
        maxHeight:100,
        resizeMode:'contain',
        marginBottom:20
    },
    loader:{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center'
    }
});

export default CameraView;
