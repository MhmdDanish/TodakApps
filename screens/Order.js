import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ActionBar from '../components/ActionBar';
import OrderComponent from '../components/OrderComponent';

const Order = ({ navigation }) => {

    const order = useSelector((state) => state.order.orders);


    return (
        <View style={styles.container}>
            <ActionBar />
            <OrderComponent orders={order} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    orderItemContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    address: {
        marginBottom: 10,
    },
    productContainer: {
        flexDirection: 'column',
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Order;
