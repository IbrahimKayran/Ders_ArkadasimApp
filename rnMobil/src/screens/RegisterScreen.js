import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";

export default class RegisterScreen extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.greeting}>{`MERHABA!\nKayıt ol ve kullanmaya başla.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Ad Soyad</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="Adınızı Giriniz"
                            returnKeyType="next"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                            onSubmitEditing={() => this.emailInput.focus()}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Adresi</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="example@example.com"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            ref={(input) => this.emailInput = input}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Parola</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="*********"
                            secureTextEntry
                            autoCapitalize="none"
                            returnKeyType="go"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            onSubmitEditing={() => this.handleSignUp()}
                            ref={(input) => this.passwordInput = input}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>         Kayıt OL         </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigate('Login')}>
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        Zaten Hesabım Var? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Giriş</Text>
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