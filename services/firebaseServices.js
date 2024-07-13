import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDOwkFe5mFiQEjr7au3qOIRBmVwl_ddjR4",
    authDomain: "mini-wagering-game-3f959.firebaseapp.com",
    projectId: "mini-wagering-game-3f959",
    storageBucket: "mini-wagering-game-3f959.appspot.com",
    messagingSenderId: "458000908331",
    appId: "1:458000908331:web:ad59178e914e694ef32a6e",
    measurementId: "G-4CVEJ60M0J"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
