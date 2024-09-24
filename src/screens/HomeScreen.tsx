import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Separator from '../components/Seperator';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(userData => {
        setData(userData);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderList = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => Alert.alert('Navigate to Details screen')}
        style={{paddingHorizontal: 10}}>
        <Text style={{fontSize: 24, color: '#000'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#DB3022" size="large" />
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderList}
            keyExtractor={item => item}
            ItemSeparatorComponent={Separator} style={styles.flatListContainer}></FlatList>
    
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer:{
    paddingVertical:20
  }
});

export default HomeScreen;
