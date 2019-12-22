import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";

export default class EditName extends React.Component {
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
        password: "",
        errorMessage: null,
        displayName: ""
    };


    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    changeName(newData) {
        firebase.auth().currentUser.updateProfile({
                displayName: newData
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>             
               <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    returnKeyType="go"
                    value={this.state.displayName}
                    ref={(input) => this.displayName = input}
                    onChangeText={displayName => this.setState({ displayName })}
                    onSubmitEditing={() => this.handleUptade()}
                    >
                </TextInput>

                <TouchableOpacity style={styles.button} onPress={() => {this.changeName(this.state.displayName), navigate('Home')}}>
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