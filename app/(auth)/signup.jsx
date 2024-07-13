import { Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../services/AuthContext'; 
import { showMessage } from 'react-native-flash-message';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
   const { signup, loginWithGoogle } = useAuth(); 

  const handleSignUp = async () => {
    console.log(form);
    if (!form.email || !form.password || !form.username) {
      showMessage({
        message: "Error",
        description: "Please fill in all fields correctly",
        type: "danger",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await signup(form.email, form.password, form.username);
      console.log("Success", "Account created successfully");
      router.push('/explore'); 
      setForm("");
    } catch (error) {
      showMessage({
        message: "Error",
        description: "Please fill all the details correctly.",
        type: "danger",
      });
      setForm("");
      return;
     
    } finally {
      setIsSubmitting(false);
    }
  };


  const handlePress = () => {
    if (!isSubmitting) {
      handleSignUp();
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[82vh] justify-center px-4 my-6 items-center">
          
          <Text className="text-2xl text-white text-semibold mb-5 mt-0 text-center font-psemibold">Sign Up</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyle="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
            
          />
          <CustomButton
            title='Sign up'
            containerStyle={styles.buttonStyle} 
            isLoading={isSubmitting}
            onPress={handlePress} 
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-md text-gray-100 font-pregular'>Already have an account?</Text>
            <Link href='/signin' className='text-md font-psemibold text-secondary'>Login</Link>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    borderRadius: 15,
    marginTop: 20,
  }
});
