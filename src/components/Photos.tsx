import React, { useState } from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

const Photos = ({images}: any) => {
    const [generateImages, setGenerateImages] = useState(false);
  console.log('images----', images);
  const photoData = images?.photos || [];

  const renderImages = ({item}: any) => (
    <TouchableOpacity>
      <Image
        source={{uri: item.node.image.uri}}
        style={{width: 100, height: 100, margin: 5}}
      />
    </TouchableOpacity>
  );

  return (
    <View>
        {generateImages ? (
             <FlatList 
             data={photoData}
             renderItem={renderImages}   
             keyExtractor={(item, index) => index.toString()}
             numColumns={3} 
           />
        ): (
            <TouchableOpacity style={styles.button} onPress={()=> setGenerateImages(true)}>
                
                <Text style={styles.buttonText}>Generate Images</Text>
            </TouchableOpacity>
        )}
     
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#DB3022',
        padding: 12,
        borderRadius: 25,
      },
      buttonText: {
        textAlign: 'center',
        color: '#fff',
      },
});

export default Photos;
