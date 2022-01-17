import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native'
const PhotoPreview = (props) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={.9}
                style={styles.container}
                onPress={()=>props.previewOff(false)}
            >
                <View style={styles.imageCont}>
                    <ImageBackground
                        source={{uri:props.photo.uri}}
                        style={{flex: 1}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.7)',

    },
    imageCont:{
        width:'80%',
        height:'80%',
    }
});

export default PhotoPreview;
