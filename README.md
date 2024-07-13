# Welcome to Mini Wagering Game app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Brief Description of the App
### This app is built with React Native, Expo, Tailwind, and Firebase. It has the following features:

1. Login and Signup:
Users can create an account or log in using Firebase Authentication.

2. Explore Page:
This page shows a list of challenges in a card format.
Users can click on a challenge card to see its details.
The explore page supports pagination, allowing users to browse through multiple pages of challenges.
Challenge Details and Joining:
When users click on a challenge, they see its details.
Users can join the challenge by clicking the join button.
Once joined, the challenge appears on their dashboard.

3. Dashboard:
Users can see all the challenges they have joined and start them from this page.

4. Pedometer:
Users can track their step count over a 5-minute duration.

6. Profile Page:
Displays the user's email and username.

7. User Data Storage:
Utilizes Context API for managing user data storage across the application.

8. Styling:
Tailwind CSS is used for styling the application, providing a responsive and modern design.


### App Architecture
The Mini Wagering app follows a modular architecture with the following key components:

1. Components: Reusable UI components.
2. Containers: Components connected to the Redux store.
3. Reducers: Redux reducers for managing state.
4. Actions: Redux actions for dispatching events.
5. Services: API service modules for data fetching.
6. Styles: Styling files using Tailwind CSS and custom styles.
