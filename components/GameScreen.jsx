import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useAuth } from '../services/AuthContext';


const GameModal = ({ challenge, onClose }) => {
  const [isAccelerometerAvailable, setIsAccelerometerAvailable] = useState('checking');
  const [stepCount, setStepCount] = useState(0);
  const [timer, setTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const currentUser = useAuth();
  const displayName = currentUser.currentUser?.displayName ? currentUser.currentUser.displayName.slice(0, 20) : '';

  const subscribeAccelerometer = async () => {
    const isAvailable = await Accelerometer.isAvailableAsync();
    setIsAccelerometerAvailable(String(isAvailable));

    if (isAvailable) {
      const accelerometerSubscription = Accelerometer.addListener(accelerometerData => {
        detectStep(accelerometerData);
      });

      setSubscription(accelerometerSubscription);
    }
  };

  const detectStep = (accelerometerData) => {
    const { x, y, z } = accelerometerData;
    const acceleration = Math.sqrt(x * x + y * y + z * z);

    if (acceleration > 1.1) {
      setStepCount(prevCount => prevCount + 1);
    }
  };

  const startChallenge = () => {
    setIsRunning(true);
    setTimer(300); 
    subscribeAccelerometer();
  };

  const stopChallenge = () => {
    if (subscription) {
      subscription.remove();
    }
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 0 && isRunning) {
      console.log('Congratulations! Timer reached 0.');
      Alert.alert(
        'Congratulations!',
        `You have completed ${stepCount} steps.`,
        [
          {
            text: 'OK',
            onPress: () => {
              onClose();
              stopChallenge(); 
            },
          }
        ]
      );
    }
  }, [timer, isRunning, stepCount, onClose]);

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <View style={styles.header} className='w-full h-[55px]  pt-2 bg-primary flex justify-between items-center'>
        <Text style={styles.title}>{challenge.name}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonImg}>X</Text>
            </TouchableOpacity>
        </View>
        <View >
          <Text className='text-xl font-pmedium pl-4 mt-5'>Hi! {displayName}</Text>
          <View className='w-[91%] ml-4 h-[260px] mt-8 ' style={{backgroundColor:'#FFC7ED', borderRadius:10}}>
            <Text className='text-l font-pmedium text-gray-800 text-center mt-3'>Welcome to your challenge</Text>
            <Image source={challenge.img} style={styles.challengeImage}  resizeMode='contain'/>

          <Text style={styles.description} className='text-gray-500 font-pregular'>{challenge.detailDescription}</Text>
          </View>
        </View>
        <View style={styles.accelerometerContainer}>
            <View style={styles.accelerometerItem}>
              <Text style={styles.accelerometerText}>Total Steps</Text>
              <Text style={styles.accelerometerValue}>{stepCount}</Text>
            </View>
            <View style={styles.accelerometerItem}>
              <Text style={styles.accelerometerText}>Time Remaining</Text>
              <Text style={styles.accelerometerValue}>{formatTime(timer)}</Text>
            </View>
          </View>
          {!isRunning ? (
            <TouchableOpacity onPress={startChallenge} style={styles.startButton}>
              <Text style={styles.buttonText}>Start Challenge</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={stopChallenge} style={styles.stopButton}>
              <Text style={styles.buttonText}>Stop Challenge</Text>
            </TouchableOpacity>
          )}
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height:'100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header:{
    display:'flex',
    flexDirection:'row',
    padding:10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
    marginTop:5,
  },
  challengeImage: {
    width: '100%',
    height: 80, 
    borderRadius: 10,
    marginBottom: 10,
    marginTop:30,
  },
  description: {
    marginTop:10,
    fontSize: 12,
    padding:15,
    textAlign: 'center',
  },
  accelerometerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:40,
    padding:30,
  },
  accelerometerItem: {
    alignItems: 'center',
  },
  accelerometerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  accelerometerValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal:20,
    marginTop:80,
  },
  stopButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal:20,
    marginTop:80,


  },
  closeButton: {
    backgroundColor: '#131845',
    color:'fff',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 9,
      height: 7,
    },
    shadowOpacity: .65,
    shadowRadius: 3.84,
    elevation: 10,
  },
  closeButtonImg: {
    color:'#fff',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold'
  },
});

export default GameModal;
