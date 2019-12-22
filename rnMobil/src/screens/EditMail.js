import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";

export default class EditMail extends React.Component {
    static navigationOptions = {
        headerTitle: "Bilgileri Düzenle",
        headerStyle: {
            backgroundColor: '#f1f1f1',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };
    
    state = {
        email: "",
        displayName: "",
        errorMessage: null,
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    changeEmail (newData) {
        firebase.auth().currentUser.updateEmail(newData)

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>             
               <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    value={this.state.email}           
                    ref={(input) => this.emailInput = input}
                    onChangeText={email => this.setState({ email })}
                    >
                </TextInput>

                <TouchableOpacity style={styles.button} onPress={() => {this.changeEmail(this.state.email),  navigate('Home');}}>
                    <Text>     Güncelle     </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 2,
        marginVertical:25,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
});