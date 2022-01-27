import React from 'react';
import {View, ScrollView, StyleSheet, Image, ImageBackground, Text, TouchableOpacity} from 'react-native'
import * as MediaLibrary from "expo-media-library";
import PostService from "../API/PostService";
const GalleryItem = (props) => {
    const img = {
        uri: props.currPhoto.uri,
        width: "100%",
        height: "100%"
    };

    return (
            <View style={styles.itemCont}>
                <ImageBackground
                    style={styles.image}
                    source={img}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async ()=>{
                            // const getAlbum = await MediaLibrary.getAlbumAsync(props.nameAlbum)
                            // const result = await MediaLibrary.removeAssetsFromAlbumAsync(props.currPhoto, getAlbum)
                            // props.setDeleted(!props.deleted)
                            console.log(props.currPhoto)
                            const response = await PostService.postPhoto(props.currPhoto, props.coord, props.token, 2.0, 1.0)
                            //console.log('response', response)

                        }}>
                        <Text style={{fontSize:18, color:'#fff'}}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
    );
};

const styles = StyleSheet.create({
    itemCont:{
        width:168,
        height:168,
        margin:10
    },
    button:{
        backgroundColor:'#90c900',
        width:100,
        height:40,
        borderRadius:30,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
    },
    image:{
        height:'100%',
        width:'100%',
        display:'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth:3,
        borderRadius:6,
        borderColor:'#90c900'
    }
})
export default GalleryItem;
