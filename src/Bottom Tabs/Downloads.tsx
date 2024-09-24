import React, { useState } from 'react';
import {Platform, StyleSheet, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';

const Downloads = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getFileName = (url:string) => {
    return url.split('/').pop() || 'default_filename'; // Extracts the file name from the URL or provides a default
  };

  const actualDownload = async () => {
    if (!downloadUrl || !downloadUrl.startsWith('http')) {
      Alert.alert('Invalid URL', 'Please enter a valid URL to download the file.');
      return;
    }

    setIsDownloading(true);
    setErrorMessage(''); // Clear previous errors

    const { dirs } = RNFetchBlob.fs;
    const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const fileName = getFileName(downloadUrl); // Get the dynamic file name

    const configOptions = {
      fileCache: true,
      path: `${dirToSave}/${fileName}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: fileName,
        path: `${dirToSave}/${fileName}`,
      },
    };

    try {
      const res = await RNFetchBlob.config(configOptions).fetch('GET', downloadUrl, {});

      if (Platform.OS === 'ios') {
        await RNFetchBlob.fs.writeFile(configOptions.path, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(configOptions.path);
      } else if (Platform.OS === 'android') {
        Alert.alert('Success', `File "${fileName}" downloaded successfully`);
      }

      setIsDownloading(false);
    } catch (error) {
      console.error('Download error:', error);
      setErrorMessage('Failed to download file. Please try again.');
      Alert.alert('Error', 'Failed to download file. Please try again.');
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter download URL"
        onChangeText={setDownloadUrl}
        value={downloadUrl}
        editable={!isDownloading}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isDownloading && { backgroundColor: '#ccc' }]}
        onPress={actualDownload}
        disabled={isDownloading}
      >
        <Text style={styles.buttonText}>{isDownloading ? 'Downloading...' : 'Download'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    color:'#000',
    fontWeight:'500'
  },
  button: {
    backgroundColor: '#DB3022',
    padding: 12,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default Downloads;
