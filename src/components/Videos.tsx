import React, { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Video, { VideoRef } from 'react-native-video';

const Videos = ({ videos }: any) => {
  const [generateVideos, setGenerateVideos] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const videoRef = useRef<VideoRef>(null);

  console.log('videos----', videos);
  const videoData = videos?.photos || [];

  const renderVideos = ({ item }: any) => (
    <TouchableOpacity onPress={() => setSelectedVideo({ uri: item.node.image.uri })}>
      <Image
        source={{ uri: item.node.image.uri }}
        style={{ width: 100, height: 100, margin: 5 }}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      {generateVideos ? (
        <>
          <FlatList
            data={videoData}
            renderItem={renderVideos}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />

          {selectedVideo && (
            <Video
              source={selectedVideo} 
              ref={videoRef}
              controls={true}
              resizeMode="contain"
              style={{ width: '100%', height: 200 }}
            />
          )}
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setGenerateVideos(true)}>
          <Text style={styles.buttonText}>Load Videos</Text>
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

export default Videos;
