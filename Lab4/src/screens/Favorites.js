import React, { useMemo } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectContacts, selectFavoriteIds } from '../store/store';

const { width } = Dimensions.get('window');

export default function Favorites({ navigation }) {
  const contacts = useSelector(selectContacts);
  const favIds = useSelector(selectFavoriteIds);

  const favorites = useMemo(
    () => contacts.filter(c => favIds.includes(c.id)),
    [contacts, favIds]
  );

  if (favorites.length === 0)
    return <Text style={{ margin: 20, textAlign: 'center' }}>No favorites yet.</Text>;

  return (
    <View style={styles.container}>
      {favorites.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.avatarContainer}
          onPress={() => navigation.navigate('ProfileContact', { id: item.id })}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: item.avatar || item.picture?.large }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingTop: 30,
  },
  avatarContainer: {
    margin: 10,
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.25,  // khoảng 25% chiều rộng
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#ddd',
    elevation: 3, // bóng cho avatar nổi lên
  },
});
