import React from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native'

const GalleryItem = (props) => {
    const img = {
        uri: props.currPhoto.uri,
        width: "100%",
        height: "100%"
    };
    return (
            <View style={styles.itemCont}>
                <Image
                    source={img}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    itemCont:{
        width:128,
        height:128,
        borderRadius:5,
        margin:10
    },
})
export default GalleryItem;
