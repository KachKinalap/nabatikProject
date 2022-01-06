import React, {useEffect, useState} from 'react';
import { Camera } from 'expo-camera';
import CameraPreview from "../UI/CameraPreview";
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native'
import * as MediaLibrary from "expo-media-library";

const CameraView = localUri => {

    //perm to use camera, front or back
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

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

    const savePhoto = async (uri) => {
        await requestPermission()
        if(status.status === 'granted'){
            //await MediaLibrary.saveToLibraryAsync(uri)
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.createAlbumAsync(nameAlbum, asset, false)
                .then(() => {
                    console.log('File Saved Successfully!');
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
                />
                :
                <Camera
                    style={styles.camera}
                    type={type}
                    ref={(ref) => {
                        camera = ref
                    }}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                const photo = await camera.takePictureAsync();
                                setPreviewVisible(true)
                                setCapturedImage(photo)
                            }}>
                            <Text style={styles.text}> Take a photo </Text>
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
        fontSize: 18,
        color: 'white',
    },
});

export default CameraView;
