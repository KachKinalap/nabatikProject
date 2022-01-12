import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, ScrollView, FlatList} from 'react-native'
import * as MediaLibrary from "expo-media-library";
import GalleryItem from "./GalleryItem";


const Gallery = (props) => {

    const nameAlbum = 'TreesNabatikProject'
    const [assets, setAssets] = useState(null)
    const getAsset = async ()=>{
        const getAlbum = await MediaLibrary.getAlbumAsync(nameAlbum)
        const result = await MediaLibrary.getAssetsAsync({
            album: getAlbum,
            sortBy:['creationTime']
        })
        setAssets(result.assets)
    }
    getAsset()
    return (
            <SafeAreaView style={{marginTop:40, marginBottom:30}}>
                {
                    assets
                        ?
                <ScrollView
                    contentContainerStyle={styles.scrollCont}
                >
                    {
                        assets.map(asset =>
                            <GalleryItem currPhoto={asset} key={asset.filename}/>
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
