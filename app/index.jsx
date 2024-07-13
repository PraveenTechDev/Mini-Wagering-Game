import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { images } from "../constants";

export default function App() {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: '100%' }} >
        <View className="w-full justify-center min-h-[85vh] items-center px-4 ">
         
          <Image
            source={images.cards}
            style={styles.image} 
            resizeMode="contain"
          />
          <View className="relative mt-12">
            <Text className="text-2xl text-white font-bold text-center">
              Enter the Ultimate Wagering Arena with{' '}
              <Text className="text-secondary-200 text-center">Mini Wagering Game!</Text>
            </Text>
          </View>
          <Text className='text-sm font-pregular text-green-100 mt-7 text-center'>
            Challenge yourself and others in exciting wagering games. Track your progress and become the champion!
          </Text>
          <CustomButton
            title="Continue with Email"
            onPress={() => router.push('signin')}
            containerStyle={styles.buttonContainer}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginTop: 30,
  },
  image: {
    width: 280,
    height: 280,
    
  },
});
