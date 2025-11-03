import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";

const Product_Add = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [result, setResult] = useState("");

  const handleAdd = async () => {
    if (!title || !price) {
      setResult("❌ Please enter at least title and price!");
       setTimeout(() => setResult(""), 3000);
      return;
    }
    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          discountPercentage: Number(discountPercentage),
          rating: Number(rating),
          stock: Number(stock),
          brand,
          category,
          images: images ? [images] : [],
        }),
      });
      const data = await res.json();
      setResult(`✅ Added: ${data.title} ($${data.price})`);
      setTimeout(() => setResult(""), 3000);
    
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscountPercentage("");
      setRating("");
      setStock("");
      setBrand("");
      setCategory("");
      setImages("");
    } catch (e) {
      setResult("❌ Error adding product");
      setTimeout(() => setResult(""), 3000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add a Product</Text>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.input}
          />
          <TextInput
            label="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Discount Percentage"
            value={discountPercentage}
            onChangeText={setDiscountPercentage}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Rating"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Stock"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
            style={styles.input}
          />
      
          <TextInput
            label="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          <TextInput
            label="Images (URLs)"
            value={images}
            onChangeText={setImages}
            style={styles.input}
          />

          <Button mode="contained" onPress={handleAdd} style={styles.submitBtn}>
            SUBMIT
          </Button>

          {result ? (
            <Text style={styles.result}>{result}</Text>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f7f7f7", marginTop: 25 },
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
    paddingVertical: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  submitBtn: {
    marginTop: 10,
    backgroundColor: "#2196f3",
  },
  result: {
    marginTop: 10,
    textAlign: "center",
    color: "red",
    fontWeight: "600",
  },
});

export default Product_Add;
