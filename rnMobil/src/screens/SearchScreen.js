import React from "react";
import { Modal, Alert, View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import * as firebase from "firebase";

let rootRef = firebase.database().ref();
let ilanRef = rootRef.child('ilanlar');

export default class SearchScreen extends React.Component {
    static navigationOptions = {
        headerTitle: "İLANLAR",
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
        modalVisible: false,
        baslik: "",
        aciklama: "",
        tarih: "",
        ucret: "",
        yer: "",
        olusturan: "",
        telefon: "",
    };

    deleteData(key) {
        firebase.database().ref('ilanlar').child(key).remove();
        alert('Silindi!');
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setData(key, ilanTitle, description, place, date, price, creative, telNo) {
        this.setState({ id: key })
        this.setState({ baslik: ilanTitle });
        this.setState({ olusturan: creative });
        this.setState({ aciklama: description });
        this.setState({ yer: place });
        this.setState({ tarih: date });
        this.setState({ ucret: price });
        this.setState({ telefon: telNo });
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });

        ilanRef.on('value', (childSnapshot) => {
            const ilanlar = [];
            childSnapshot.forEach((doc) => {
                ilanlar.push({
                    key: doc.key,
                    ilanTitle: doc.toJSON().ilanTitle,
                    description: doc.toJSON().description,
                    price: doc.toJSON().price,
                    creative: doc.toJSON().creative,
                    date: doc.toJSON().date,
                    place: doc.toJSON().place,
                    telNo: doc.toJSON().telNo,
                });
                this.setState({
                    ilanlar: ilanlar.sort((a, b) => {
                        return (a.key < b.key);
                    }),
                    loading: false,
                });
            });
        });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={{
                    backgroundColor: "#007fff",
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 64,
                    borderBottomWidth: 3,
                    borderBottomColor: 'black',
                }}>
                    <Image style={{ width: '60%', height: 64, }}
                        source={require('../assets/welcome2.png')} />
                </View>

                <View style={{
                    backgroundColor: "#f1f1f1",
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 100
                }}>
                    <FlatList
                        data={this.state.ilanlar}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                    borderTopColor: 'black',
                                    borderTopWidth: 2,
                                    borderLeftWidth: 2,
                                    borderLeftColor: 'black',
                                    borderRightWidth: 2,
                                    borderRightColor: 'black',
                                    borderBottomWidth: 2,
                                    borderBottomColor: 'black',
                                    backgroundColor: '#e7e8e9'
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setData(item.key, item.ilanTitle, item.description,
                                            item.place, item.date,
                                            item.price, item.creative,
                                            item.telNo);
                                        this.setModalVisible(true);
                                    }} style={{ alignItems: 'flex-start', }}>
                                        <View style={{
                                            flex: 2,
                                            flexDirection: 'row',
                                            marginHorizontal: 5
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                            }}>
                                                <Text style={styles.titleText}>
                                                    {item.ilanTitle}
                                                </Text>
                                                <Text style={styles.placeText}>
                                                    Mekan > {item.place}
                                                </Text>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                                alignItems: 'flex-end'
                                            }}>

                                                <Text style={styles.priceText}>
                                                    Ücret: {item.price} TL
                                                </Text>
                                                <Text style={styles.dateText}>
                                                    {item.date}
                                                </Text>
                                            </View>

                                            <Modal
                                                animationType='none'
                                                transparent={true}
                                                visible={this.state.modalVisible}
                                                onRequestClose={() => {
                                                    Alert.alert('Modal has been closed.');
                                                }}
                                            >
                                                <View style={styles.modal}>
                                                    <View>
                                                        <View style={{ marginTop: 5, marginHorizontal: 10, flexDirection: 'row' }}>
                                                            <View style={{}}>
                                                                <Text style={{ color: 'blue', fontSize: 17, fontWeight: 'bold', textDecorationLine: 'underline' }}>
                                                                    {this.state.baslik}
                                                                </Text>
                                                            </View>
                                                            <View style={{ marginLeft: 120, }}>
                                                                <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 18, }}> {this.state.ucret} TL</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text> Oluşturan >  </Text>
                                                            <Text style={{ textDecorationLine: 'underline' }}>
                                                                {this.state.olusturan}
                                                            </Text>
                                                        </View>
                                                        <View style={{ backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', marginLeft: 5 }}>
                                                                Açıklama:
                                                            </Text>
                                                            <Text style={{ marginHorizontal: 3 }}> {this.state.aciklama} </Text>
                                                        </View>
                                                        <View style={{ marginVertical: 4, flexDirection: 'row' }}>
                                                            <View style={{ marginHorizontal: 6, }}>
                                                                <Text style={{ marginHorizontal: 3, textDecorationLine: 'underline' }}>Mekan: </Text>
                                                                <Text> {this.state.yer} </Text>
                                                            </View>
                                                            <View style={{}}>
                                                                <Text style={{ textDecorationLine: 'underline' }}>Tarih:</Text>
                                                                <Text style={{ fontWeight: 'bold', }}> {this.state.tarih} </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                                                            <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', marginHorizontal: 10 }}>İletişim:</Text>
                                                            <Text>{this.state.telefon}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'column' }}>

                                                        <TouchableOpacity style={styles.modalButton1}
                                                            onPress={() => {
                                                                this.setModalVisible(!this.state.modalVisible);
                                                            }}>
                                                            <Text style={{ color: 'white' }}>Kapat</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center' }}
                                                            onPress={() => {
                                                                { this.deleteData(this.state.id), navigate('Home') }
                                                            }}>
                                                            <Text style={{ color: 'red', textDecorationLine: 'underline' }}>Kaldır</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}>

                    </FlatList>
                </View>

                <View style={styles.tabs}>
                    <TouchableOpacity style={styles.homeButton} onPress={() => navigate('Home')}>
                        <Image style={{ width: '30%', height: 30, justifyContent: 'center', alignItems: 'center' }}
                            source={require('../assets/homeicon2.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton} onPress={() => navigate('Adding')}>
                        <Image style={{ width: 30, height: 30, }}
                            source={require('../assets/addicon.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsButton} onPress={() => navigate('Settings')}>
                        <Image style={{ width: 30, height: 30, }}
                            source={require('../assets/settings.png')} />
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabs: {
        flex: 3,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    homeButton: {
        flex: 1,
        backgroundColor: '#007fff',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: 'black',
        borderTopWidth: 2,
        borderRightColor: 'black',
        borderRightWidth: 1,

    },
    addButton: {
        flex: 1,
        backgroundColor: '#007fff',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: 'black',
        borderTopWidth: 2,
        borderRightColor: 'black',
        borderRightWidth: 1,
    },
    settingsButton: {
        flex: 1,
        backgroundColor: '#007fff',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: 'black',
        borderTopWidth: 2,
    },
    input: {
        height: 40,
        width: 200,
        margin: 10,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textDecorationLine: 'underline'
    },
    priceText: {
        fontSize: 16,
        color: 'blue',
        marginLeft: 3,
    },
    dateText: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modal: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        marginTop: 200,
        marginBottom: 100,
        marginHorizontal: 50,
        borderRadius: 16,
        borderColor: 'black',
        borderWidth: 4
    },
    modalButton1: {
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 30,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 5,
        marginLeft: 75,
    },
});

