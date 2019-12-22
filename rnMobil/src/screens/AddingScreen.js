import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Image } from "react-native";
import * as firebase from "firebase";

let rootRef = firebase.database().ref();
let ilanRef = rootRef.child('ilanlar');

export default class AddingScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerTitle: "İLANLAR",
        headerStyle: {
            backgroundColor: '#f1f1f1',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = ({
            ilanlar: [],
            newTitle: '',
            newDescription: '',
            newPrice: '',
            newCreative: '',
            newDate: '',
            newPlace: '',
            newTelNo: '',
            loading: false,
            //timePassed: false,
        });
    }
    
    onPressAdd = () => {
        if (this.state.newTitle.trim() === '') {
            alert('Başlık Alanı Boş Bırakılamaz');
            return;
        }
        if (this.state.newDescription.trim() === '') {
            alert('Açıklama Alanı Boş Bırakılamaz.');
            return;
        }
        if (this.state.newPrice.trim() === '') {
            this.state.price == '0';
        }
        if (this.state.newDate.trim() === '') {
            alert('Tarih Alanı Boş Bırakılamaz');
            return;
        }
        if (this.state.newPlace.trim() === '') {
            alert('Mekan/Yer Alanı Boş Bırakılamaz');
            return;
        }
        if (this.state.newTelNo.trim() === '') {
            alert('Telefon No Alanı Boş Bırakılamaz');
            return;
        }

        ilanRef.push({
            ilanTitle: this.state.newTitle,
            description: this.state.newDescription,
            price: this.state.newPrice,
            creative: this.state.displayName,
            date: this.state.newDate,
            place: this.state.newPlace,
            telNo: this.state.newTelNo,
        });
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });

        ilanRef.on('value', (childSnapshot) => {
            const ilanlar = [];
            childSnapshot.forEach((doc) => {
                ilanlar.push({
                    key: doc.key,
                    ilanTitle: doc.toJSON().ilanTitle
                });
                this.setState({
                    ilanlar: ilanlar.sort((a, b) => {
                        return (a.ilanTitle < b.ilanTitle);
                    }),
                    loading: false,
                });
            });
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView enabled style={styles.container}>
                <View style={styles.addingForm}>

                    <View>
                        <Image style={{marginTop:10, width: 60, height: 60, }}
                            source={require('../assets/book2.png')} />
                    </View>

                    <TextInput style={styles.input1}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Başlık Giriniz'
                        returnKeyType="next"
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newTitle: text });
                            }
                        }
                        value={this.state.newTitle}
                        ref={(input) => this.titleInput = input}
                        onSubmitEditing={() => this.priceInput.focus()}
                    />
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        placeholderTextColor='white'
                        placeholder='Ücreti Giriniz'
                        returnKeyType="next"
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newPrice: text });
                            }
                        }
                        value={this.state.price}
                        ref={(input) => this.priceInput = input}
                        onSubmitEditing={() => this.descriptionInput.focus()}
                    />
                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Açıklama Giriniz'
                        returnKeyType="next"
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newDescription: text });
                            }
                        }
                        value={this.state.description}
                        ref={(input) => this.descriptionInput = input}
                        onSubmitEditing={() => this.placeInput.focus()}
                    />
                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Mekan/Yer Giriniz'
                        returnKeyType="next"
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newPlace: text });
                            }
                        }
                        value={this.state.newPlace}
                        ref={(input) => this.placeInput = input}
                        onSubmitEditing={() => this.dateInput.focus()}
                    />
                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Tarih Giriniz'
                        returnKeyType="next"
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newDate: text });
                            }
                        }
                        value={this.state.newDate}
                        ref={(input) => this.dateInput = input}
                        onSubmitEditing={() => this.telInput.focus()}
                    />
                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholderTextColor='white'
                        placeholder='Telefon Numaranızı Giriniz'
                        returnKeyType="go"
                        autoCapitalize='none'
                        onChangeText={
                            (text) => {
                                this.setState({ newTelNo: text });
                            }
                        }
                        value={this.state.newTelNo}
                        ref={(input) => this.telInput = input}
                        onSubmitEditing={() => {this.onPressAdd(), navigate('Search')}}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.onPressAdd, navigate('Search')}}
                    >
                        <Text>EKLE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => navigate('Search')}
                    >
                        <Text style={{ fontWeight: 'bold', color: 'yellow', textDecorationLine: 'underline', fontSize: 16 }}>
                            Geri Dön
                            </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
        //marginTop: 0,
    },

    addingForm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2a52be",
        flexDirection: 'column',

    },
    input1: {
        height: 40,
        width: 200,
        margin: 10,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        marginTop: 30,
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
    button: {
        backgroundColor: 'white',
        borderRadius: 4,
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 7,
    }
});