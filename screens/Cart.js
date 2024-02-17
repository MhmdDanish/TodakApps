import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartBar from '../components/CartBar';
import { MaterialIcons } from '@expo/vector-icons';
import { FAB, DataTable, Surface, Card, Avatar, IconButton, Colors, Button, Appbar, Provider } from 'react-native-paper';
import { addOrder } from '../store/action/actionOrder';
import { clearCart } from '../store/action/actionCart';


const Cart = ({ navigation }) => {
    const data = useSelector((state) => state.cart.items);
    const order = useSelector((state) => state.order.orders);
    console.log('Order', order)

    const getCurrentDate = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[0];
      };
      
      const getCurrentTime = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[1].split('.')[0];
      };

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const calculatePrice = (price, quantity) => {
        let totalPrice = quantity * price;
        return totalPrice;
    }
    const checkOut = () => {

        if (data.length >0 ){
            alert('Successfully Checkout')
            dispatch(clearCart())
            dispatch(addOrder(data,user.add,getCurrentTime(),getCurrentDate()));
            navigation.navigate('Home')
        }else{
            alert('Nothing to checkout')
        }
    
    }

    const getTotalPrice = () => {
        return data.reduce((total, item) => total + calculatePrice(item.price, item.quantity), 0);
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.itemDetails}>
                <Text style={styles.title}>{item.title}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.price}>Qty: {item.quantity}</Text>
                    <Text style={styles.price}>RM: {calculatePrice(item.price, item.quantity)}</Text>
                </View>

            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <CartBar />
            <View style={styles.listContainer}>

                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Card style={{ padding: 5, backgroundColor: 'white' }}>
                            <Image
                                source={require('../assets/cartempty.jpg')}
                                style={styles.emptyImage}
                            />
                        </Card>
                    </View>
                )}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addressButton} onPress={() => navigation.navigate('Address')}>
                    <Text style={{ fontWeight: 'bold', padding: 5 }}>Address</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ padding: 5 }}>
                            {user.add}
                        </Text>
                        <MaterialIcons name="navigate-next" size={35} color="black" style={{ padding: 5 }} />
                    </View>
                </TouchableOpacity>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: RM {getTotalPrice()}</Text>
                    <TouchableOpacity style={styles.checkoutButton} onPress={checkOut}>
                        <Text style={styles.checkoutButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listContainer: {
        flex: 1,
        marginTop: 60,
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 8,
    },
    thumbnail: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        marginRight: 8,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        color: 'black',
        marginTop: 8,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 16,
    },
    addressButton: {
        padding: 12,
        borderRadius: 8,
    },
    addressButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    emptyImage: {
        width: 200, // Adjust the width and height based on your image size
        height: 200,
        marginBottom: 10,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Cart;
