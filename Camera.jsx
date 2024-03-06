import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import * as MediaLibrary from "expo-media-library";

function Camera(props) {
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode);
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);


    useEffect(() => {
        permission();
    }, []);

    async function permission() {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasPermission(cameraStatus.status === "granted")
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}>
                <Text>hello----------------------------------</Text>

            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    camera: {
        // flex: 1,
        borderRadius: 20,
    }
});

export default Camera;