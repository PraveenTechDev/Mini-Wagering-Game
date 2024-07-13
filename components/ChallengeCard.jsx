import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ChallengeCard = ({ challenge, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} className='h-32'>
      <View style={styles.topContainer}>
        <View style={styles.cardContent}>
          <Text style={styles.name} className='font-pmedium'>{challenge.name}</Text>
          <Text style={styles.description} className=''>{challenge.description}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={challenge.img} style={styles.image} />
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.footer}>
        <Text style={styles.participants}>{challenge.participants} joined</Text>
        <Text style={styles.creator}>Creator: {challenge.creator}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 3,
    marginVertical: 10,
    padding: 10,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    
  },
  description: {
    fontSize: 14,
    paddingTop: 10,
    opacity: 0.7,
    color: '#666',
  },
  line: {
    height: 0.5,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  participants: {
    fontSize: 12,
    color: '#999',
  },
  creator: {
    fontSize: 12,
    color: '#999',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 5,
    borderRadius: 35,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default ChallengeCard;
