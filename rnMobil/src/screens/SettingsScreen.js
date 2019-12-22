import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component {
    static navigationOptions = {
        title: "AYARLAR",
    }

    state = {
        email: "",
        displayName: ""
    };

    state = {
        telNo: null
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

    deleteAcc() {
        firebase.auth().currentUser.delete()
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
    
                <View style={styles.info}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            textShadowColor: '#ffff',
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}
                    >Profil Bilgileri:
                      </Text>

                    <Text style={{ fontSize: 16 }}> E-posta Adresi </Text>
                    <TouchableOpacity onPress={() => navigate('EditMail')}>
                        <Text
                            style={{
                                marginHorizontal: 30,
                                marginBottom: 15,
                                fontSize: 16,
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                textDecorationLine: 'underline'
                            }}
                        >-> {this.state.email} -
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 16 }}> Ad Soyad: </Text>
                    <TouchableOpacity onPress={() => navigate('EditName')}>
                        <Text
                            style={{
                                marginHorizontal: 30,
                                marginBottom: 15,
                                fontSize: 16,
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                textDecorationLine: 'underline'
                            }}
                        >-> {this.state.displayName} -
                        </Text>
                    </TouchableOpacity>

                    

                </View>

                <View style={styles.section1}>
                    <View style={{ backgroundColor: '#f1f1f1', alignItems:'center' }}>
                        <Text style={{ fontSize: 14, }}> - Görüşlerinizi Bize Bildirin -</Text>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'#f1f1f1', marginLeft:25,}}>
                    <Image style={{width: '8%', height: 20, marginRight:10 }}
                        source={require('../assets/mailicon.png')} />
                        <Text style={{fontWeight: 'bold'}}> dersarkadasimapp@info.com</Text>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'#f1f1f1', marginLeft:27}}>
                    <Image style={{width: '6%', height: 20, marginRight:15 }}
                        source={require('../assets/phoneicon.png')} />
                        <Text style={{fontWeight: 'bold'}}> 375-08-86 </Text>
                    </View>
                </View>              

                <View>
                <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => { this.deleteAcc() }}>
                        <Text
                            style={{
                                marginHorizontal: 25,
                                color: 'red',
                                marginBottom: 15,
                                fontSize: 15,
                                fontWeight: '400',
                                fontStyle: 'italic',
                                textDecorationLine: 'underline'
                            }}
                        >- Hesabımı Sil -
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
                        <Text style={{ color: "white", fontWeight: "500" }}>         Çıkış Yap         </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    section1: {
        borderStyle: 'solid',
        borderColor: '#f1f1f1',
        backgroundColor:'#f1f1f1',
        borderRadius: 2,
        borderBottomWidth: 25,
        borderTopWidth: 25,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginBottom: 15,
    },
    info: {
        backgroundColor: '#f1f1f1',
        top: 0,
        left: 0,
        right: 0,
        marginBottom: 30,
        marginTop:40,
    },
    button: {
        marginHorizontal: 30,
        marginTop:20,
        backgroundColor: "#007fff",
        borderRadius: 4,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});