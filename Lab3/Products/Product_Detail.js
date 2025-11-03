import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Card, Button, Text } from "react-native-paper";

const Product_Detail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products/2") // có thể đổi ID tùy ý
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Product Detail</Text>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: product.thumbnail }} style={styles.image} />
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            Title: {product.title}
          </Text>
          <Text numberOfLines={3} style={styles.desc}>
            Description: {product.description}
          </Text>
          <Text>Price: ${product.price}</Text>
          <Text style={styles.discount}>
            Discount: {product.discountPercentage}% off
          </Text>
          <Text>Rating: {product.rating} stars</Text>
          <Text>Stock: {product.stock} units</Text>
          <Text>Brand: {product.brand}</Text>
          <Text>Category: {product.category}</Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button mode="contained" style={styles.deleteBtn}>
            Delete
          </Button>
          <Button mode="contained" style={styles.cancelBtn}>
            Cancel
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f7f7f7" },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#1976d2",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: 10,
  },
  image: {
    height: 180,
    resizeMode: "cover",
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  desc: {
    fontSize: 13,
    color: "#555",
  },
  discount: {
    color: "green",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  deleteBtn: {
    backgroundColor: "#6A1B9A",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  cancelBtn: {
    backgroundColor: "#9575CD",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default Product_Detail;
