import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RNFS, {ReadDirItem} from 'react-native-fs';
import { fontFamily } from '../constants/fonts';

const Files = () => {
  const [folderText, setFolderText] = useState('');
  const [fileText, setFileText] = useState('');
  const [folderList, setFolderList] = useState<ReadDirItem[]>([]);
  const [fileList, setFileList] = useState<ReadDirItem[]>([]);

  // Create Folder ---
  const createFolder = async () => {
    if (folderText) {
      const parentDir = RNFS.DocumentDirectoryPath; // Parent directory
      const folderPath = `${parentDir}/${folderText}`;
      try {
        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          await RNFS.mkdir(folderPath);
          Alert.alert('Folder created successfully');
          fetchFiles(parentDir); // Fetch files in the parent directory
          setFolderText('');
        } else {
          Alert.alert('Folder already exists!');
        }
      } catch (error) {
        Alert.alert('Error', `Error creating folder: ${error}`);
      }
    } else {
      Alert.alert('Error', 'Please enter a folder name');
    }
  };

  const createFiles = async () => {
    if (fileText) {
      const folderPath = `${RNFS.DocumentDirectoryPath}/${folderText}`;
      const filePath = `${folderPath}/${fileText}.txt`;

      try {
        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          Alert.alert(`Error`, 'Folder doesn’t exist. Please create a folder first!');
          return;
        }
        const fileContent = 'This is the content of the file!';
        await RNFS.writeFile(filePath, fileContent, 'utf8');
        Alert.alert('Success', 'File created successfully!');
        fetchFiles(folderPath);
        setFileText('');
      } catch (error) {
        Alert.alert('Error', `Error creating file: ${error}`);
      }
    } else {
      Alert.alert('Error', 'Please enter a file name');
    }
  };

  // Fetch files and folders
  const fetchFiles = async (folderPath: string) => {
    try {
      const files = await RNFS.readDir(folderPath);
      console.log('files------', files);
      const folders = files.filter(item => item.isDirectory());
      const regularFiles = files.filter(item => item.isFile());
      setFolderList(folders);
      setFileList(regularFiles);
    } catch (error) {
      Alert.alert('Error', `Error reading folder: ${error}`);
    }
  };

  useEffect(() => {
    fetchFiles(RNFS.DocumentDirectoryPath); // Fetch from the root directory initially
  }, [fetchFiles]);

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={{marginHorizontal: 10, marginVertical: 30}}>
        {/* Folder Creation */}
        <View>
          <Text style={styles.createTextContainer}>Create Folders</Text>
          <View style={styles.textViewContainer}>
            <TextInput
              onChangeText={setFolderText}
              style={styles.input}
              value={folderText}
            />
            <TouchableOpacity style={styles.button} onPress={createFolder}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* File Creation */}
        <View>
          <Text style={styles.createTextContainer}>Create Files</Text>
          <View style={styles.textViewContainer}>
            <TextInput
              onChangeText={setFileText}
              style={styles.input}
              value={fileText}
            />
            <TouchableOpacity style={styles.button} onPress={createFiles}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Display Folders and Files */}
        <View style={{display: 'flex',  gap: 30}}>
          {/* Folders */}
          <View>
            <Text style={styles.folderFilesText}>Folders</Text>
            <FlatList
              data={folderList}
              renderItem={({item}) => (
                <View style={styles.folderFilesContainer}>
                  <Image
                    source={require('../../assets/FolderIcon.png')}
                    style={styles.image}
                  />
                  <Text>{item.name}</Text>
                </View>
              )}
              keyExtractor={item => item.path}
            />
          </View>

          {/* Files */}
          <View>
            <Text style={styles.folderFilesText}>Files</Text>
            <FlatList
              data={fileList}
              renderItem={({item}) => (
                <View style={styles.folderFilesContainer}>
                  <Image
                    source={require('../../assets/fonts/file.png')} // Different icon for files
                    style={styles.image}
                  />
                  <Text>{item.name}</Text>
                </View>
              )}
              keyExtractor={item => item.path}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textViewContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  createTextContainer: {
    marginLeft: 15,
    fontSize: responsiveFontSize(3),
    fontWeight: '600',
    fontFamily: fontFamily.extraLight
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: responsiveWidth(70),
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
    fontFamily:fontFamily.medium
  },
  image: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
  },
  folderFilesContainer: {
    // textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 20,
  },
  folderFilesText: {
    fontSize: responsiveFontSize(3),
    fontWeight: '600',
  },
});

export default Files;
