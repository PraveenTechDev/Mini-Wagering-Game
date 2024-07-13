import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useAuth } from '../../services/AuthContext';
import { router } from 'expo-router';

const Profile = () => {
  const currentUser = useAuth();
  const userId = currentUser.currentUser?.uid;
  const displayName = currentUser.currentUser?.displayName ? currentUser.currentUser.displayName.slice(0, 20) : '';
  const displayEmail = currentUser.currentUser?.email ? currentUser.currentUser.email.slice(0, 30) : '';
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'U';


  const handleLogout = () => {
    router.push('/signin'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Profile</Text>
        </View>
        {initial ? (
          <View style={styles.profileInitial}>
            <Text style={styles.initialText}>{initial}</Text>
          </View>
        ) : (
          <Text>No Profile Image</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoS}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info}>{displayName}</Text>
        </View>
        <View style={styles.infoS}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{displayEmail}</Text>
        </View>
        <View style={styles.infoS}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.info}>********</Text>
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <CustomButton
          title='Log Out'
          containerStyle={styles.buttonStyle}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#161622',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight:'bold'
  },
  profileInitial: {
    width: 125,
    height: 125,
    top:160,
    left:120,
    backgroundColor: '#FF6969',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position:'absolute'
  },
  initialText: {
    fontSize: 56,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    marginTop: 50,
    padding: 20,
  },
  infoS: {
    borderBottomWidth: 2,
    borderColor: '#161622',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  buttonStyle: {
    width: '60%',
    borderRadius: 15,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    width: '100%',
  },
});

export default Profile;
