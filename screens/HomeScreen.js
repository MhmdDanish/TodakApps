import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActionBar from '../components/ActionBar';
import axios from 'axios';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (category) => {
    let filtered;
    if (category === 'all') {
      filtered = products;
    } else {
      filtered = products.filter((product) => product.category === category);
    }

    // Check if the number of items is odd
    if (filtered.length % 2 === 1) {
      // Add a dummy item to make it even
      filtered.push({ id: -1, dummy: true });
    }

    setFilteredProducts(filtered);
    setCurrentCategory(category);
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      style={[styles.categoryButton, { backgroundColor: currentCategory === category ? 'lightblue' : 'white' }]}
      onPress={() => filterProducts(category)}
    >
      <Text>{category}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    if (item.dummy) {
      return <View style={styles.productContainer}></View>;
    }

    return (
      <View style={styles.productContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}>

          <View style={styles.imageContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.price}>Price: ${item.price}</Text>
          </View>
        </TouchableOpacity>

      </View >
    );
  };

  return (
    <View style={styles.container}>
      <ActionBar title="TodakEcommerce" navigation={navigation} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryButtonsContainer}>
        {renderCategoryButton('all')}
        {renderCategoryButton('smartphones')}
        {renderCategoryButton('fragrances')}
        {renderCategoryButton('skincare')}
        {renderCategoryButton('home-decoration')}
        {renderCategoryButton('laptops')}
      </ScrollView>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    height: 150,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  productDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    height: 40,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});

export default HomeScreen;
