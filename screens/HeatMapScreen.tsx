
import { View, Text, StyleSheet, Button, PermissionsAndroid, Platform } from "react-native";
import Svg, { Circle } from "react-native-svg";
import ControlsScreen from "./ControlsScreen";
import { useState } from "react";
import React = require("react");


const HeatMapScreen = ({ controll, setControll }: any) => {
  const [data, setData] = useState([
    { pontoX: 15, pontoY: 17, wifi: 5 }
  ]);
  const [connectedDevice, setConnectedDevice] = useState(null);


  React.useEffect(() => {
    // Solicitar permissões em dispositivos Android
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
      }
    };
    requestPermissions();

    // Escanear e conectar ao dispositivo Bluetooth
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.warn(error);
        return;
      }

      // Aqui você pode usar o nome ou ID do dispositivo para verificar se é o dispositivo desejado
      if (device.name === "JDY-31-SSP" || device.id === "seu_device_id") {
        manager.stopDeviceScan();
        device.connect()
          .then((device) => {
            setConnectedDevice(device);
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            // Substitua por UUIDs de serviço e característica do JDY-31
            const serviceUUID = "service-uuid";
            const characteristicUUID = "characteristic-uuid";
            device.monitorCharacteristicForService(
              serviceUUID,
              characteristicUUID,
              (error, characteristic) => {
                if (error) {
                  console.warn(error);
                  return;
                }

                // Atualize os dados recebidos no `mockData`
                const newData = parseBluetoothData(characteristic.value);
                setData((prevData) => [...prevData, newData]);
              }
            );
          });
      }
    });

    return () => {
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, []);

  // Função para interpretar os dados recebidos via Bluetooth
  const parseBluetoothData = (value) => {
    // Decodifique `value` (é base64) e retorne um objeto
    const decoded = atob(value); // para testar base64
    const parsedData = JSON.parse(decoded); // supondo que os dados estejam em JSON
    return {
      pontoX: parsedData.pontoX,
      pontoY: parsedData.pontoY,
      wifi: parsedData.wifi,
    };
  };



  const getWifiStatus = (wifi: number) => {
    switch (true) {
      case wifi >= 0 && wifi <= 3.3:
        return "red";
      case wifi > 3.3 && wifi <= 6.6:
        return "yellow";
      case wifi > 6.6 && wifi <= 10:
        return "green";
      default:
        return "invalid value";
    }
  };

  return (
    <View style={styles.container}>
      {!controll ? (
        <>
          <Text style={styles.title}>Mapa de Calor</Text>
          <Svg height="300" width="300" style={styles.map}>
            {data.map((point, index) => (
              <Circle
                key={index}
                cx={point.pontoX}
                cy={point.pontoY}
                r="15"
                fill={getWifiStatus(point.wifi)}
                opacity="0.5"
              />
            ))}
          </Svg>
        </>
      ) : (
        <ControlsScreen />
      )}

      <Button
        onPress={() => setControll(!controll)}
        title={!controll ? "Controlar manualmente" : "Ver Mapa de calor"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  map: {
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default HeatMapScreen;
