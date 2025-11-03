import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Card, Button, Text } from "react-native-paper";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Card.Cover source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={styles.info}>
            <Text variant="titleMedium" style={styles.title}>
              Title: {item.title}
            </Text>
            <Text numberOfLines={2} style={styles.desc}>
              Description: {item.description}
            </Text>
            <Text>Price: {item.price}</Text>
            <Text style={styles.discount}>
              Discount: {item.discountPercentage}% off
            </Text>
            <Text>Rating: {item.rating}</Text>
            <Text>Stock: {item.stock}</Text>
            <Text>Category: {item.category}</Text>
          </View>
        </View>
        <View style={styles.btnRow}>
          <Button mode="contained" style={styles.btnDetail}>DETAIL</Button>
          <Button mode="contained" style={styles.btnAdd}>ADD</Button>
          <Button mode="contained" style={styles.btnDelete}>DELETE</Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>Product list</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f7f7f7" },
  header: { textAlign: "center", fontWeight: "bold", fontSize: 20, marginVertical: 10 },
  card: {
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 5,
  },
  row: { flexDirection: "row" },
  thumbnail: { width: 90, height: 90, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10 },
  title: { fontWeight: "bold", marginBottom: 2 },
  desc: { fontSize: 12, color: "#555" },
  discount: { color: "green", marginTop: 2 },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  btnDetail: { backgroundColor: "#2196f3" },
  btnAdd: { backgroundColor: "#2196f3" },
  btnDelete: { backgroundColor: "#2196f3" },
});

export default Products;
