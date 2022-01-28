import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Image, ImageBackground, Text, TouchableOpacity} from 'react-native'
import * as MediaLibrary from "expo-media-library";
import PostService from "../API/PostService";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GalleryItem = (props) => {
    const img = {
        uri: props.currPhoto.uri,
        width: "100%",
        height: "100%"
    };
    const [json, setJson] = useState('')
    const [status, setStatus] = useState('')
    const [place, setPlace] = useState('')
    const [trunkDiam, setTrunkDiam] = useState('')
    const [treeHeight, setTreeHeight] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem(props.currPhoto.uri.split('/')[props.currPhoto.uri.split('/').length-1])
            .then((item)=>{
                if(item==="sent"){
                    setStatus(item)
                }
                else{
                    setJson(item)
                    const myItem = JSON.parse(item)
                    setStatus(myItem.success)
                    setPlace(item.location)
                    setTrunkDiam(item.tD)
                    setTreeHeight(item.tH)
                }

            })
    }, [])

    return (
            <View style={styles.itemCont}>
                <ImageBackground
                    style={styles.image}
                    source={img}
                >
                <View style={styles.viewStatus}>
                    {status === "sent"
                        ?
                        console.log("all's okay'")
                        :
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async ()=>{
                                setStatus("sending")
                                const response = await PostService.postPhoto(props.currPhoto, place, props.token, trunkDiam, treeHeight)
                                setStatus("sent")
                                await AsyncStorage.setItem(props.currPhoto.uri.split('/')[props.currPhoto.uri.split('/').length-1], "sent")
                                console.log('response', response)
                            }}>
                            <Text style={{fontSize:18, color:'#fff'}}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity style={status==='sent'?styles.status:styles.statusNot}>
                        <Text style={{color:'#fff'}}>
                            {status}
                        </Text>
                    </TouchableOpacity>
                </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async ()=>{
                            const getAlbum = await MediaLibrary.getAlbumAsync(props.nameAlbum)
                            const result = await MediaLibrary.removeAssetsFromAlbumAsync(props.currPhoto, getAlbum)
                            props.setDeleted(!props.deleted)
                            // const response = await PostService.postPhoto(props.currPhoto, props.coord, props.token, 2, 1)
                            // console.log('response', response)
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
        width:90,
        height:40,
        borderRadius:30,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        marginTop:2
    },
    image:{
        height:'100%',
        width:'100%',
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth:3,
        borderRadius:6,
        borderColor:'#90c900'
    },
    viewStatus:{
        display:'flex',
        flexDirection:'row'

    },
    status:{
        backgroundColor:'#90c900',
        margin:5,
        padding:5,
        borderRadius:30,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    statusNot:{
        backgroundColor:'#ff0000',
        margin:5,
        padding:5,
        borderRadius:30,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})
export default GalleryItem;
