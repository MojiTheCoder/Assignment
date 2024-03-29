import React, {Component} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

// Dummy Products Array
const products = [
    {
      name: 'KangKung1',
      id: '001',
      category: 'vegetable',
      image: require('../images/product1.jpg'),
      price: 1.00,
    },
    {
      name: 'KangKung2',
      id: '002',
      category: 'vegetable',
      image: require('../images/product1.jpg'),
      price: 1.00,
    },
    {
      name: 'KangKung3',
      id: '003',
      category: 'vegetable',
      image: require('../images/product1.jpg'),
      price: 1.00,
    },
    {
      name: 'Apple1',
      id: '004',
      category: 'fruit',
      image: require('../images/apple.jpg'),
      price: 1.00,
    },
    {
      name: 'Apple2',
      id: '005',
      category: 'fruit',
      image: require('../images/apple.jpg'),
      price: 1.00,
    },
    {
      name: 'Apple3',
      id: '006',
      category: 'fruit',
      image: require('../images/apple.jpg'),
      price: 1.00,
    },
    {
      name: 'Lays1',
      id: '007',
      category: 'snack',
      image: require('../images/lays.jpg'),
      price: 1.00,
    },
    {
      name: 'Lays2',
      id: '008',
      category: 'snack',
      image: require('../images/lays.jpg'),
      price: 1.00,
    },
    {
      name: 'Lays3',
      id: '009',
      category: 'snack',
      image: require('../images/lays.jpg'),
      price: 1.00,
    },
    {
      name: 'Beer1',
      id: '010',
      category: 'beverage',
      image: require('../images/heineken.jpg'),
      price: 1.00,
    },
    {
      name: 'Beer2',
      id: '011',
      category: 'beverage',
      image: require('../images/heineken.jpg'),
      price: 1.00,
    },
    {
      name: 'Beer3',
      id: '012',
      category: 'beverage',
      image: require('../images/heineken.jpg'),
      price: 1.00,
    },
    {
      name: 'Cheese1',
      id: '013',
      category: 'frozen',
      image: require('../images/cheese.jpg'),
      price: 1.00,
    },
    {
      name: 'Cheese2',
      id: '014',
      category: 'frozen',
      image: require('../images/cheese.jpg'),
      price: 1.00,
    },
    {
      name: 'Cheese3',
      id: '015',
      category: 'frozen',
      image: require('../images/cheese.jpg'),
      price: 1.00,
    },
]


export default class ProductListingScreen extends Component{
  
  // Initial  Value
  state = {
    selectedCategory: '',
    searchQuery: '',
    products: []
  };

// renderProductFunction for FlatList 
renderProduct = ({item}) => {

  return (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetailScreen', { product: item })}>
        <Image source={item.image} style={styles.productImage} resizeMode="cover" />
        <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>RM{item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>

  )
}
  // For Search Function
  handleSearch = (text) => {
    this.setState({ searchQuery: text });
  };

  render () {
    // To filter the products that match both the selected category and the search query
    const { selectedCategory, searchQuery } = this.state;

    const filteredProducts = products.filter((product) => {
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const nameMatch = product.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      return categoryMatch && nameMatch;
    });

    return (
      
      <View style={styles.container}>
        {/* Header with Shop logo */}
        <View style={styles.header}>
            <Image source={require('../images/logo.jpg')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for products..."
            placeholderTextColor="#888"
            onChangeText={this.handleSearch}
            value={this.state.searchQuery}
          />
        </View>

        {/* Filter Categorization */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {/* Vegetable Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'vegetable' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'vegetable' ? { selectedCategory: ''} : { selectedCategory: 'vegetable'})}>
              <Text style={styles.filterButtonText}>Vegetable</Text>
            </TouchableOpacity>

            {/* Fruit Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'fruit' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'fruit' ? { selectedCategory: ''} : { selectedCategory: 'fruit'})}>
              <Text style={styles.filterButtonText}>Fruit</Text>
            </TouchableOpacity>

            {/* Snacks  Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'snack' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'snack' ? { selectedCategory: ''} : { selectedCategory: 'snack'})}>
              <Text style={styles.filterButtonText}>Snacks</Text>
            </TouchableOpacity>

            {/* Beverages  Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'beverage' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'beverage' ? { selectedCategory: ''} : { selectedCategory: 'beverage'})}>
              <Text style={styles.filterButtonText}>Beverages</Text>
            </TouchableOpacity>

            {/* Chilled and Frozen Filter */}
            <TouchableOpacity style={[styles.filterButton, selectedCategory === 'frozen' && styles.selectedFilter]} onPress={() => this.setState((prevState) => prevState.selectedCategory === 'frozen' ? { selectedCategory: ''} : { selectedCategory: 'frozen'})}>
              <Text style={styles.filterButtonText}>Chilled and Frozen</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>

      {/* Product Listing */}
        <View style={styles.ProductListContainer}>
          <View style={styles.ProductContainer}>
            <FlatList 
              data={filteredProducts}
              renderItem={this.renderProduct}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={styles.productList}
            />
          </View>
        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 200,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  logo: {
    width: 100,
    height: 40,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  searchBarContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },

  searchBar: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
    color: 'black', 
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },

  filterButtonText: {
    fontSize: 16,
    color: 'black',
  },

  selectedFilter: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },

  productItem: {
    width: '32%', 
    marginVertical: 20,
    marginHorizontal: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },

  productImage: {
    width: '100%',
    height: 80, 
    borderRadius: 8,
    marginBottom: 5, 
  },

  productInfo: {
    alignItems: 'center',
  },

  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#888',
  },

  productPrice: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },

  productListContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start', 
  },

  productContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

});