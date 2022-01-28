import React, {useEffect, useState} from 'react';
import { Camera } from 'expo-camera';
import CameraPreview from "../UI/CameraPreview";
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraView = (props) => {

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

    const savePhoto = async (uri, success) => {
        await requestPermission()
        if(status.status === 'granted'){
            const asset = await MediaLibrary.createAssetAsync(uri);

            await MediaLibrary.createAlbumAsync(nameAlbum, asset, false)
                .then(async () => {
                    console.log('File Saved Successfully!');
                    await AsyncStorage.setItem(asset.uri.split('/')[asset.uri.split('/').length-1], success)
                    console.log('set this fucking state\t', asset.uri)
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
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                const photo = await camera.takePictureAsync();
                                setPreviewVisible(true)
                                setCapturedImage(photo)
                            }}>
                            <Image
                                source={require('../Images/cameraButton.png')}
                                style={styles.logoText}
                            />
                        </TouchableOpacity>
                    </View>
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
    }
});

export default CameraView;
