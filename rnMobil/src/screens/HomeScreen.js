import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: "ANASAYFA",
        headerStyle: {
            backgroundColor: '#f1f1f1',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        email: "",
        displayName: "",
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={styles.homeIcon}>
                    <Image style={{ width: '100%', height: 250 }}
                        source={require('../assets/happynewyear.png')} />
                </View>

                <View style={styles.welcome}>
                    <Text style={{ marginHorizontal: 5 }}> Merhaba, {this.state.displayName}. DersArkadaşım'a hoşgeldin.</Text>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => navigate('Search')}>
                            <Text>           Ders Bul           </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}
                            onPress={() => navigate('Settings')}>
                            <Text>   Bilgilerimi Düzenle   </Text>
                        </TouchableOpacity>
                    </View>



                    <TouchableOpacity style={styles.button}
                        onPress={this.signOutUser}>
                        <Text>           Çıkış Yap           </Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1e90ff'
    },
    homeIcon:
    {
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 3,
        marginBottom: 10,
        marginHorizontal: 25,
        borderRadius: 7,
        backgroundColor: '#e7e8e9',
        height: 64,
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 30,
        backgroundColor: "white",
        borderRadius: 6,
        borderColor: 'black',
        borderWidth: 3,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});

