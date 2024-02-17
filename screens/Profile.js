import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ActionBar from '../components/ActionBar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
    const user = useSelector((state) => state.user); // Assuming 'user' is the key for user profile in Redux state

    return (
        <View style={styles.container}>
            <ActionBar title="TodakEcommerce" navigation={navigation} />
            <Ionicons style={{ textAlign: 'center', marginTop: 20 }} name="person-circle-sharp" size={100} color="black" />
            <Text style={{ textAlign: 'center', padding: 10 }}>MUHAMMAD DANISH BIN MOHD ISKANDAR</Text>
            <TouchableOpacity style={styles.addressButton} onPress={() => navigation.navigate('Address')}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', padding: 13, textAlign: 'center' }}>Addresses</Text>
                    <MaterialIcons name="navigate-next" size={35} color="black" style={{ padding: 5 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={{ textAlign: 'center', marginTop: 100 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});

export default Profile;
