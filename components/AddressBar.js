import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

const CartBar = ({ title, navigation }) => {
    const data = useSelector((state) => state.cart.items);
    console.log(data)

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, top: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Address</Text>
            <View />
            {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View>
                    <AntDesign name="shoppingcart" size={24} color="black" />
                    {data.length > 0 && (
                        <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', borderRadius: 6, width: 12, height: 12, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 8 }}>{data.length}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity> */}
        </View>
    );
};

export default CartBar;
