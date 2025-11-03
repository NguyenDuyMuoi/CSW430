import React, { useState } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";

const Product_Search = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!keyword) return;
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${keyword}`);
      const json = await res.json();
      setResults(json.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Text style={styles.detailTitle}>Product Detail</Text>
      <Card.Cover source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Title: {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.desc}>
          Description: {item.description}
        </Text>
        <Text>Price: ${item.price}</Text>
        <Text style={styles.discount}>
          Discount: {item.discountPercentage}% off
        </Text>
        <Text>Rating: {item.rating} stars</Text>
        <Text>Stock: {item.stock} units</Text>
        <Text>Category: {item.category}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Search Products</Text>
      <TextInput
        label="Enter keyword..."
        value={keyword}
        onChangeText={setKeyword}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSearch} style={styles.searchBtn}>
        SEARCH
      </Button>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f7f7f7",marginTop:20 },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#1976d2",
    marginVertical: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  searchBtn: {
    backgroundColor: "#2196f3",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 5,
    marginVertical: 8,
  },
  detailTitle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#444",
    marginTop: 8,
  },
  thumbnail: {
    height: 160,
    resizeMode: "cover",
    marginVertical: 8,
  },
  title: { fontWeight: "bold" },
  desc: { fontSize: 12, color: "#555" },
  discount: { color: "green", marginTop: 2 },
});

export default Product_Search;
