import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderComponent = ({ orders }) => {
    const navigation = useNavigation();

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { order: item })}>
            <View style={styles.orderItemContainer}>
                {/* <Text style={styles.orderId}>Order ID: {item.orderId}</Text> */}
                {/* <Text style={styles.address}>{`Address: ${item.address}`}</Text>*/}
                <Text style={styles.dateTime}>{`Date: ${item.date} Time: ${item.time}`}</Text>
                <View style={styles.productContainer}>
                    {Object.values(item).filter((product) => typeof product === 'object').map((product, index) => (
                        <View key={index} style={styles.productItem}>
                            <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
                            <View style={styles.productDetails}>
                                <Text style={styles.title}>{product.title}</Text>
                                <Text>{`Quantity: ${product.quantity}`}</Text>
                                <Text>{`Price: RM${(product.price).toFixed(2)}`}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {orders && orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.orderId}
                    renderItem={renderOrderItem}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text>No orders available.</Text>
                </View>
            )}
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
        marginBottom: 5,
    },
    dateTime: {
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

export default OrderComponent;
