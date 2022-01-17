import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import * as MediaLibrary from "expo-media-library";
import GalleryItem from "./GalleryItem";
import PhotoPreview from "./PhotoPreview";


const Gallery = (props) => {

    //need change to name from CameraView
    const nameAlbum = 'TreesNabatikProject'

    //photos
    const [assets, setAssets] = useState(null)

    //getting photos for preview
    const getAsset = async ()=>{
        const getAlbum = await MediaLibrary.getAlbumAsync(nameAlbum)
        const result = await MediaLibrary.getAssetsAsync({
            album: getAlbum,
            sortBy:['creationTime']
        })
        setAssets(result.assets)
    }
    useEffect(()=>{
        getAsset()
    },[])

    //whether photoPreview or not
    const [isPreview, setIsPreview] = useState(false)
    const [currPhoto, setCurrPhoto] = useState(null)
    return (
            <SafeAreaView>
                {
                    isPreview
                    ?
                    <PhotoPreview photo={currPhoto} previewOff={setIsPreview}/>
                    :
                        assets
                        ?
                        <ScrollView
                            contentContainerStyle={styles.scrollCont}
                        >
                            {
                                assets.map(asset =>
                                    <TouchableOpacity
                                        style={{marginTop:10}}
                                        onPress={()=>{
                                            setCurrPhoto(asset)
                                            setIsPreview(true)
                                    }}>
                                        <GalleryItem currPhoto={asset} key={asset.filename}/>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                        :
                        <Text style={styles.textLoad}>Gallery is loading, wait a second...</Text>

                }


            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollCont:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    textLoad:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Gallery;
