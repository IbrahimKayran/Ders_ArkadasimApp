import React from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';

import * as firebase from "firebase";

export default class Login extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />

                    <Image style={{ width: '80%', height: 120, marginTop:20 }}
                        source={require('../assets/welcome1.png')} />

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="example@example.com"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            returnKeyType="go"
                            onSubmitEditing={() => this.handleLogin()}
                            ref={(input) => this.passwordInput = input}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>         Giriş Yap         </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        Hesabınız Yok Mu? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Kayıt Ol</Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
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
    }
});
