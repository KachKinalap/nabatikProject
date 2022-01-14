import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert, Pressable} from 'react-native'
import * as MediaLibrary from "expo-media-library";

const CameraPreview = (props) => {

    const getAsset = async ()=>{
        const getAlbum = await MediaLibrary.getAlbumAsync(props.album)
        const assets = await MediaLibrary.getAssetsAsync({
            album: getAlbum,
            sortBy:['creationTime']
        })
        console.log(assets)
    }

    const [isSaved, setIsSaved] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    if(modalVisible){
        setTimeout(()=>{setModalVisible(false)},2000)
    }
    getAsset()
    return (
        <View style={styles.previewCont}>
            <ImageBackground source={{uri:props.photo.uri}} style={{flex: 1}}>
                {modalVisible
                 ?
                <View style={styles.popup}>
                    <Text style={styles.popupText}>Photo has saved to your gallery!</Text>
                </View>

                 :
                 console.log("lol")
                }

                <View style={styles.butCont}>
                    <TouchableOpacity onPress={()=>props.retakePh()}>
                        <Text style={styles.text}>Retake</Text>
                    </TouchableOpacity>
                    {isSaved
                        ?
                        <View>
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate()

                            }}>
                                <Text style={styles.text}>Show gallery</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={()=>{
                            props.savePh(props.photo.uri)
                            setIsSaved(true)
                            setModalVisible(true)
                        }}>
                            <Text style={styles.text}>Save</Text>
                        </TouchableOpacity>
                    }

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    previewCont:{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
    },
    butCont:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end',
        marginBottom:'5%'
    },
    text: {
        fontSize: 18,
        color: 'white',
        shadowColor:'#000',
        shadowRadius:10,
        shadowOpacity:0
    },
    popup:{
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    popupText:{
        fontSize: 18,
        color:'white'
    }
})

export default CameraPreview;
