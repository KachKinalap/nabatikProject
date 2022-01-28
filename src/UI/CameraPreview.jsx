import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert, Modal} from 'react-native'
import * as MediaLibrary from "expo-media-library";
import MyInput from "./MyInput";
import PostService from "../API/PostService";
import Loader from "./Loader";


const CameraPreview = (props, {navigation}) => {

    //state for loader
    const [loaderActive, setLoaderActive] = useState(false)

    const [isSaved, setIsSaved] = useState(false)
    //modal for params
    const [modalVisible, setModalVisible] = useState(false);
    //photo has saved or not modal(1) and modal text(2)
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal2Text, setModal2Text] = useState(false);

    if(modal2Visible){
        setTimeout(()=>{setModal2Visible(false)},2000)
    }
    //getAsset()

    //states for additional params
    const [trunkDiam, setTrunkDiam] = useState('')
    const [treeHeight, setTreeHeight] = useState('')

    const pushPhoto = async (tD, tH) => {
        const response = await PostService.postPhoto(props.photo, props.coord, props.token, tD, tH)
        return response
    }

    return (
        <View style={styles.previewCont}>
            <ImageBackground source={{uri:props.photo.uri}} style={{flex: 1}}>
                {modal2Visible
                 ?
                <View style={styles.popup}>
                    <Text style={styles.popupText}>{modal2Text}</Text>
                </View>

                 :
                    console.log('lol')
                }
                {loaderActive
                    ?
                    <View>
                        <Loader/>
                    </View>
                    :
                    console.log('loader inactive')
                }

                <View style={styles.butCont}>
                    <TouchableOpacity
                        style={styles.buttonBottom}
                        onPress={()=>{
                            props.retakePh()
                        }}>
                        <Text style={{fontSize:18, color:'#fff'}}>
                            Retake
                        </Text>
                    </TouchableOpacity>
                    {isSaved
                        ?
                        console.log('saved')
                        :
                        <View>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Enter additional params:</Text>
                                    <MyInput
                                        value={treeHeight}
                                        secure={false}
                                        label={'tree height'}
                                        onChange={setTreeHeight}
                                        keyType = 'numeric'
                                    />
                                    <MyInput
                                        value={trunkDiam}
                                        secure={false}
                                        label={'trunk diameter'}
                                        onChange={setTrunkDiam}
                                        keyType = 'numeric'
                                    />
                                    <View style={styles.buttonWrap}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={async () => {
                                                if((typeof (+trunkDiam))==='number' && (typeof (+treeHeight))==='number' && trunkDiam!=='' && treeHeight !==''){
                                                    setModalVisible(!modalVisible)
                                                    setLoaderActive(true)
                                                    const response = await pushPhoto(trunkDiam, treeHeight)
                                                    setLoaderActive(false)
                                                    if(response){
                                                        if(response.data.success===true){
                                                            setModal2Text('Photo has sent on server!')
                                                            setModal2Visible(true)
                                                            props.savePh(props.photo.uri, "sent")
                                                        }
                                                    }
                                                    else{
                                                        setModal2Text('NetworkError! Photo will be sent later in background')
                                                        setModal2Visible(true)
                                                        props.savePh(props.photo.uri, "not_sent", props.coord, trunkDiam, treeHeight)
                                                        }

                                                    setIsSaved(true)
                                                }

                                            }}
                                        >
                                            <Text style={styles.textStyle}>Send</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity
                            style={styles.buttonBottom}
                            onPress={()=>{
                                setModalVisible(true)
                            }}>
                            <Text style={{fontSize:18, color:'#fff'}}>
                                Send photo
                            </Text>
                        </TouchableOpacity>
                        </View>
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
        fontSize: 24,
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
        fontSize: 24,
        color:'white',
        textAlign:'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonWrap:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin:20
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#90c900",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:20
    },
    buttonBottom:{
        backgroundColor:'#90c900',
        width:160,
        height:60,
        margin:30,
        borderRadius:30,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CameraPreview;
