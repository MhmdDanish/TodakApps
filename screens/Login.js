import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Alert, TextInput, TouchableOpacity, AppState } from 'react-native';
import { FAB, DataTable, Surface, Card, Avatar, IconButton, Colors, Button, Appbar, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { updateAdd1, updateAdd2, updateCity, updateEmail, updateId, updateIdno, updateKodpusat, updateMobileno, updateName, updatePostcode, updateState, updateApi_token, updateNamaSekolah, clearPickup } from '../store/reducer/userSlice';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';


const Login = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const doLogin = async () => {
        navigation.navigate('Home')
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ImageBackground
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                }}
            >
                <Image
                    source={require('../assets/todaklogo.png')}
                    style={{ width: 200, height: 80, alignSelf: 'center', top: 200 }}
                />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 20, width: '80%', top: 20, backgroundColor: 'white', }}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 10, }}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 10 }}
                        />

                        <TouchableOpacity
                            onPress={doLogin}
                            style={{
                                backgroundColor: 'black',
                                padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </ImageBackground>
        </View>




    );
};

export default Login;