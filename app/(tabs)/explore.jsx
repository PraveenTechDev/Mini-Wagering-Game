import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { icons, images } from '../../constants';
import ChallengeCard from '../../components/ChallengeCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChallengeDetailsModal from '../../components/ChallengeDetailsModal';

const challenges = [
  { id: 1, name: 'Running Challenge', img: images.walking, description: 'Run 5 kilometers every day for a month', participants: '10/20', creator: 'John Doe', detailDescription: 'Challenge yourself to run 5 kilometers daily for a month and track your progress with this running challenge.' },
  { id: 2, name: 'Meditation Challenge', img: images.meditation, description: 'Meditate for 20 minutes daily for 30 days', participants: '15/20', creator: 'Jane Smith', detailDescription: 'Calm your mind and improve focus by meditating for 20 minutes daily over the next 30 days in this meditation challenge.' },
  { id: 3, name: 'Reading Challenge', img: images.reading, description: 'Read a book for 30 minutes every day for a month', participants: '8/20', creator: 'Alice Johnson', detailDescription: 'Discover the joy of reading by dedicating 30 minutes each day to a book of your choice in this reading challenge.' },
  { id: 4, name: 'Cycling Challenge', img: images.cycling, description: 'Cycle 10 kilometers every day for 2 weeks', participants: '12/20', creator: 'Bob Brown', detailDescription: 'Improve your fitness level and stamina by cycling 10 kilometers daily for the next 2 weeks with this cycling challenge.' },
  { id: 5, name: 'Healthy Eating Challenge', img: images.eating, description: 'Eat only home-cooked meals for 30 days', participants: '20/20', creator: 'Sara Davis', detailDescription: 'Take control of your diet and adopt healthier eating habits by consuming only home-cooked meals for the next 30 days in this healthy eating challenge.' },
  { id: 6, name: 'Yoga Challenge', img: images.yoga, description: 'Practice yoga for 30 minutes daily for 30 days', participants: '18/20', creator: 'Emma Wilson', detailDescription: 'Enhance your flexibility, strength, and mental clarity with daily 30-minute yoga sessions over the next month in this yoga challenge.' },
];


const ITEMS_PER_PAGE = 4;

const Explore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const totalPages = Math.ceil(challenges.length / ITEMS_PER_PAGE);

  const handlePress = (challenge) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const renderChallenges = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return challenges.slice(startIndex, endIndex).map((challenge) => (
      <ChallengeCard key={challenge.id} challenge={challenge} onPress={() => handlePress(challenge)} />
    ));
  };

  return (
    <SafeAreaView style={styles.container} className='min-h-full pt-2 bg-white'>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header} className='w-full h-[80px] bg-gray-200 flex justify-between items-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[235px] h-[225px] mt-10'
          />
          <Image
            source={images.profile}
            resizeMode='contain'
            className='w-[45px] h-[30px] mt-6 mr-4'
            style={styles.profileImg}
          />
        </View>
        <View>
          <View className='m-2 ml-2 w-[94.5%] pl-2 pr-2 h-32 bg-primary' style={styles.titleCard}>
            <Text className='text-white font-pbold text-l'>
              Explore best challenge for you {' '}
              <Image source={icons.rightArrow} />
            </Text>
          </View>
          <View style={styles.gameContainer} className='w-full  p-2 mt-14'>
            <View style={styles.trendingGamesHeader}>
              <Text className='font-pmedium text-l'>TRENDING GAMES</Text>
              <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
            >
              <Image source={icons.leftArrow} style={styles.paginationImage} />
            </TouchableOpacity>
            <Text style={styles.pageInfo}>{currentPage} / {totalPages}</Text>
            <TouchableOpacity
              onPress={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
            >
              <Image source={icons.rightArrow} style={styles.paginationImage} />
            </TouchableOpacity>
          </View>
            </View>
            {renderChallenges()}
          </View>
        </View>
      </ScrollView>
      <ChallengeDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        challenge={selectedChallenge}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
  },
  profileImg: {
    borderRadius: 20,
  },
  header: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA001',
  },
  titleCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: '#CDCDE0',
  },
  gameContainer: {
    marginTop: 10,
  },
  trendingGamesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageButton: {
    padding: 4,
    backgroundColor: '#FF6969',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  pageButtonText: {
    color: '#fff',
  },
  paginationImage: {
    width: 16,
    height: 16,
    tintColor: '#FFF',
  },
  pageInfo: {
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
});

export default Explore;
