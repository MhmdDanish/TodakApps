import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const OrderDetailComponent = ({ item }) => {
  const calculateTotalPrice = () => {
    return Object.values(item)
      .filter((product) => typeof product === 'object')
      .reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const renderProductItem = (product, index) => (
    <View key={index} style={styles.productItem}>
      <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      <View style={styles.productDetails}>
        <Text style={styles.title}>{product.title}</Text>
        <Text>{`Quantity: ${product.quantity}`}</Text>
        <Text>{`Price: RM${(product.price * product.quantity).toFixed(2)}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.orderDetailContainer}>
      <Text style={styles.dateTime}>{`Date: ${item.date} Time: ${item.time}`}</Text>
      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Delivery Address</Text>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Ordered Items</Text>
      <View style={styles.productContainer}>
        {Object.values(item).filter((product) => typeof product === 'object').map(renderProductItem)}
      </View>

      <View style={styles.separator} />
      <Text style={styles.totalPrice}>{`Total Price: RM${calculateTotalPrice().toFixed(2)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetailContainer: {
    padding: 10,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
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
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default OrderDetailComponent;
