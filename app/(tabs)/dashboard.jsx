import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useJoinedChallenges } from '../../services/JoinedChallengeContext';
import GameModal from '../../components/GameScreen';

const Dashboard = () => {
  const { joinedChallenges } = useJoinedChallenges();
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    console.log("Joined Challenges: ", joinedChallenges);
  }, [joinedChallenges]);

  if (joinedChallenges.length === 0) {
    return (
      <View style={styles.container} className='w-full h-min-[100%]'>
        <Text  className='text-gray-700 font-pbold text-xl'>No Challenges Joined</Text>
        <Text style={styles.message}>Join a challenge to see it here.</Text>
      </View>
    );
  }

  const openChallenge = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const closeModal = () => {
    setSelectedChallenge(null);
  };

  return (
    <View style={styles.container}>
        <View style={styles.header} className='w-full h-[55px] mt-8 pt-2 bg-primary flex justify-between items-center'>
      <Text style={styles.title}>My Challenges</Text>
      </View>
      <FlatList
        data={joinedChallenges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openChallenge(item)} style={styles.challenge}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.detailDescription}</Text>
            <Image source={item.img} style={styles.challengeImage}  resizeMode='contain'/>
            <View style={styles.enterChallenge}><Text style={styles.challengeText}>Enter in your challenge</Text></View>
          </TouchableOpacity>
        )}
      />
      {selectedChallenge && (
        <GameModal challenge={selectedChallenge} onClose={closeModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
       justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white',
    marginTop:5,
  },
  message: {
    fontSize: 16,
    color: 'gray',
  },
  challenge: {
    width:'98.5%',
    marginBottom: 15,
    marginTop:20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    
  },
  challengeImage: {
    width: '100%',
    height: 60, 
    borderRadius: 10,
    marginBottom: 10,
  },
  enterChallenge:{
    marginTop:10,
    width:'100%',
    height:35,
    borderRadius:10,
    backgroundColor:'#FF6969',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  challengeText:{
    color:'white',
    fontSize:12,
    fontWeight:'bold'
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
});

export default Dashboard;
