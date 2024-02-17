import React from 'react';
import { View, Text, FlatList,StyleSheet,ScrollView } from 'react-native';
import OrderDetailComponent from '../components/OrderDetailComponent';
import OrderDetailBar from '../components/OrderDetailBar';

const OrderDetail = ({ route }) => {
    const { order } = route.params;
    console.log('Order', order)


    return (
        <View style={styles.container}>
            <OrderDetailBar/>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <OrderDetailComponent item={order} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        marginTop:80,

    },
});

export default OrderDetail;
