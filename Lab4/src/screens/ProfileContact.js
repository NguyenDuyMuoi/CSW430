import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectFavoriteIds } from '../store/store';
import { toggleFavorite } from '../store/favoritesSlice';

export default function ProfileContact({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const favIds = useSelector(selectFavoriteIds);
  const contact = contacts.find(c => c.id === id);
  const isFav = favIds.includes(id);

  if (!contact) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Contact not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: contact.largeAvatar }} style={styles.avatar} />
          <Text style={styles.name}>{contact.fullName}</Text>
          <View style={styles.rowCenter}>
            <Icon name="phone" size={18} color="#fff" />
            <Text style={styles.phone}> {contact.phone}</Text>
          </View>
        </View>

        {/* Info section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#000" style={styles.icon} />
            <View>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{contact.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="work" size={20} color="#000" style={styles.icon} />
            <View>
              <Text style={styles.label}>Work</Text>
              <Text style={styles.value}>{contact.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="smartphone" size={20} color="#000" style={styles.icon} />
            <View>
              <Text style={styles.label}>Personal</Text>
              <Text style={styles.value}>
                ({Math.floor(Math.random() * 900 + 100)})-{Math.floor(
                  Math.random() * 900
                ) + 100}-{Math.floor(Math.random() * 9000 + 1000)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ⭐ Floating favorite button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => dispatch(toggleFavorite(id))}
        activeOpacity={0.8}
      >
        <Icon name={isFav ? 'star' : 'star-border'} size={26} color="#0047FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0047FF',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  phone: {
    color: '#fff',
    fontSize: 15,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoSection: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  value: {
    color: '#555',
    fontSize: 14,
    marginTop: 2,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },

  // ⭐ FAB button in bottom center
  fab: {
    position: 'absolute',
    top: '65%',
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});
