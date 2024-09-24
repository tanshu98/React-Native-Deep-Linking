import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Photos from '../components/Photos';
import Videos from '../components/Videos';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

// import ReactNativeBiometrics from 'react-native-biometrics';

const Tab = createMaterialTopTabNavigator();

const Camera = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [images, setImages] = useState<{photos: any[]} | null>(null);
  const [videos, setVideos] = useState<{photos: any[]} | null>(null);
  console.log('videos---', videos);
  


  const platformVersion = Number(Platform.Version);

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (platformVersion >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (platformVersion >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    await getImages();
    await getVideos();
  };

  useEffect(()=> {
    savePicture();
  },[])

  const getImages = ()=> {
    CameraRoll.getPhotos({
      first:20,
      assetType:'Photos'
    }).then(response => {
      setImages({photos:response.edges})
    }).catch(error => console.log(error)
    )
  }

  const getVideos = ()=> {
    CameraRoll.getPhotos({
      first:20,
      assetType:'Videos'
    }).then((response)=> {
      setVideos({photos:response.edges})
    })
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Photos"  children={() => <Photos images={images} />} />
      <Tab.Screen name="Videos" children={() => <Videos videos={videos} />}  />
    </Tab.Navigator>
  );
};

export default Camera;
