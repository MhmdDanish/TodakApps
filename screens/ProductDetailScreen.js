import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from '../components/StarRating';
import ProductBar from '../components/ProductBar';
import { addToCart } from '../store/action/actionCart';
import { updateQuantity } from '../store/action/actionCart';
import Carousel from 'react-native-snap-carousel';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log(product)

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.thumbnail} />
  );

  const handleAddToCart = () => {
    // Check if the product with the same id already exists in the cart
    const existingProduct = data.find(item => item.id === product.id);

    if (existingProduct) {
      console.log('Exist')
      dispatch(updateQuantity(product.id, existingProduct.quantity + quantity));
    } else {
      console.log('Not')

      dispatch(addToCart({ ...product, quantity }));
    }

    navigation.navigate('Home')
    setIsModalVisible(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ProductBar title={`${product.title}`} navigation={navigation} />
      <ScrollView>
        <View style={{ marginTop: 50 }}>
          <Carousel
            data={product.images}
            renderItem={renderImageItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
          />
          <View style={styles.productDetails}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.price}>Price: RM{product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <StarRating rating={product.rating} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{product.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center', alignSelf: 'center' }}>
              <Image source={{ uri: product.thumbnail }} style={styles.modalThumbnail} />
              <View style={[styles.quantityContainer, { marginLeft: 16 }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Quantity</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, }}>
                  <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={quantity.toString()}
                    onChangeText={(text) => setQuantity(parseInt(text) || 1)}
                  />
                  <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddToCart}>
                <Text style={styles.modalButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  thumbnail: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginRight: 10, // Adjust spacing between images if needed
  },
  productDetails: {
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 12,
  },
  addToCartButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalThumbnail: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityButton: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageScrollView: {
    flexDirection: 'row',
    alignItems: 'center', // Center images vertically if needed
  },
});

export default ProductDetailScreen;
