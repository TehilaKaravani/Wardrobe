import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useEffect, useState} from "react";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

import {AdvancedImage} from 'cloudinary-react-native';
import {Cloudinary} from '@cloudinary/url-gen';
import {backgroundRemoval} from "@cloudinary/url-gen/actions/effect";


export default function App() {
  const cld = new Cloudinary({cloud: {cloudName: 'dcfqbqckg'}});
  let img = cld.image("shirt_bxq0il").effect(backgroundRemoval());

  const [text, setText] = useState("Tehila");


    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode);
    const [cameraRef, setCameraRef] = useState(null);


    useEffect(() => {
        startCamera();
    }, []);


    const startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync();
    }


    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            console.log(photo);
        }
    };


  const clicked = () => {
    setText("hii");
  }


  return (
      <View style={styles.container}>
        <Text>{text}</Text>

        <TouchableOpacity onPress={clicked}>
          <Text style={{color: "purple"}}>Press Here</Text>
        </TouchableOpacity>

        <StatusBar style="auto"/>

        <View>
          <AdvancedImage cldImg={img} style={{width: 300, height: 200}}/>
        </View>



          <View>
              <Camera
                  style={{ flex: 1 }}
                  type={Camera.Constants.Type.back}
                  ref={ref => setCameraRef(ref)}
                  onCameraReady={() => setHasPermission(true)}
              >
                  <View >
                      <TouchableOpacity onPress={takePicture}>
                          <Text style={{color: "blue"}}>Press Here</Text>
                      </TouchableOpacity>
                  </View>
              </Camera>
          </View>




      </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
