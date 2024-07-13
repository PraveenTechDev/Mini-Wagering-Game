import React from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import { useJoinedChallenges } from '../services/JoinedChallengeContext'; 
import { icons } from '../constants';

const ChallengeDetailsModal = ({ visible, onClose, challenge }) => {
  const { joinChallenge, isJoined } = useJoinedChallenges();

  const handleJoin = () => {
    joinChallenge(challenge);
  };

  if (!challenge) return null;

  const joined = isJoined(challenge.id);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.topContainer}>
            <Text style={styles.name}>{challenge.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonImg}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.startDate}>
            <Text style={styles.dateText}>Starts on 25 July, 00:01</Text>
          </View>
          <View style={styles.tag}>
            <View style={styles.singleTag}><Text style={styles.tagTitle}>FITNESS</Text></View>
            <View style={styles.singleTag2}><Text style={styles.tagTitle}>DARE TO WIN</Text></View>
          </View>
          <View style={styles.imageContainer}>
            <Image source={challenge.img} style={styles.image} resizeMode='contain' />
          </View>
          <View style={styles.about}>
            <Text style={styles.aboutText}>ABOUT THE CHALLENGE</Text>
            <Text style={styles.description}>{challenge.detailDescription}</Text>
          </View>
          <View style={styles.impRules}>
            <Text style={styles.aboutText}>IMPORTANT RULES</Text>
            <View style={styles.rules}>
              <Image source={icons.plus} style={styles.pointerImg} resizeMode='contain' />
              <Text>Outdoor Challenge</Text>
            </View>
            <View style={styles.rules}>
              <Image source={icons.plus} style={styles.pointerImg} resizeMode='contain' />
              <Text>Location services should be on</Text>
            </View>
            <View style={styles.rules}>
              <Image source={icons.plus} style={styles.pointerImg} resizeMode='contain' />
              <Text>Avoid any distractions</Text>
            </View>
          </View>
          <View style={styles.joinedDetails}>
            <Text style={styles.participants}>{challenge.participants} joined</Text>
          </View>
          <CustomButton
            title={joined ? 'Joined' : 'Join'}
            containerStyle={styles.buttonStyle}
            onPress={joined ? null : handleJoin}
          />
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
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%',
    height: 60,
    backgroundColor: '#131842',
    paddingHorizontal: 20,
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
  startDate:{
    width:'100%',
    marginLeft:20,
    marginTop:20,
  },
  dateText:{
    fontSize:13,
    opacity:0.7,
  },
  tag:{
    width:'100%',
    display:"flex",
    flexDirection:'row',
     marginTop:10,
  },
  singleTag:{
    paddingVertical:1,
    paddingHorizontal:7,
    marginLeft:10,
    backgroundColor:'#FFC7ED',
    borderRadius:4
    
  },
  singleTag2:{
    paddingVertical:1.4,
    paddingHorizontal:7,
    marginLeft:10,
    backgroundColor:'#FAFFAF',
    borderRadius:4
  },
  tagTitle:{
    color:'#000',
    fontSize:11,
    opacity:0.8
  },
  imageContainer: {
    marginTop:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    padding: 10,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 9,
      height: 7,
    },
    shadowOpacity: .25,
    shadowRadius: 1.84,
    elevation: 20,
  },
 
  image: {
    width: 50,
    height:50,
    borderRadius: 30,
    
  },
  about:{
    width:'100%',
    padding:10,
    marginTop:60,
  },
  aboutText:{
    fontSize:15,
    fontWeight:'bold',
    opacity:0.8,
    marginBottom:5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    marginTop:8,
    fontSize: 13,
    color: 'gray',
    opacity:0.8,
    marginBottom: 10,
  },
  impRules:{
    width:'100%',
    padding:10,
    marginTop:10,
    marginBottom:15,
  },
  rules:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    padding:6,
  },
  pointerImg:{
    width:20,
    height:20,
    marginRight:10,
  },
  joinedDetails:{
    marginTop:20,
    marginBottom:40,
    alignItems:'center',
    width:'94%',
    height:40,
    backgroundColor:'#FAFFAF',
    textAlign:'center',
    display:'flex',
    justifyContent:'center',
    borderRadius:7,
  },
  participants: {
    fontSize: 14,
    color: '#000',
  },
  buttonStyle: {
    width: '90%',
    borderRadius: 15,
    margins:10,
    marginTop: 20,
  }
});

export default ChallengeDetailsModal;
