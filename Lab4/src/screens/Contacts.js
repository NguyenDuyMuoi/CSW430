import React, { useEffect, useState, useMemo } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadContacts } from '../store/contactsSlice';
import { toggleFavorite } from '../store/favoritesSlice';
import { selectContacts, selectFavoriteIds, selectStatus } from '../store/store';
import ContactListItem from '../components/ContactListItem';

export default function Contacts({ navigation }) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const favIds = useSelector(selectFavoriteIds);
  const status = useSelector(selectStatus);
  const [search, setSearch] = useState('');

  useEffect(() => { dispatch(loadContacts()); }, [dispatch]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return s ? contacts.filter(c => c.fullName.toLowerCase().includes(s)) : contacts;
  }, [contacts, search]);

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search contact..."
        value={search}
        onChangeText={setSearch}
        style={{ margin: 10 }}
      />
      {status === 'loading' && contacts.length === 0 ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={status === 'loading'} onRefresh={() => dispatch(loadContacts())} />
          }
          renderItem={({ item }) => (
            <ContactListItem
              item={item}
              isFavorite={favIds.includes(item.id)}
              onPress={() => navigation.navigate('ProfileContact', { id: item.id })}
              onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            />
          )}
        />
      )}
    </View>
  );
}
