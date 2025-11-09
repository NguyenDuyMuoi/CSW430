import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

const ContactListItem = ({ item, isFavorite, onPress, onToggleFavorite }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
      }}
    >
      <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text variant="titleMedium">{item.fullName}</Text>
        <Text variant="bodySmall" style={{ opacity: 0.7 }}>{item.phone}</Text>
      </View>
      <IconButton
        icon={isFavorite ? 'star' : 'star-outline'}
        size={22}
        onPress={onToggleFavorite}
      />
    </TouchableOpacity>
  );
};

export default ContactListItem;
