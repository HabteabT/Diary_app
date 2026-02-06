Diary_app

A cross-platform Diary / Journal mobile app built with React Native (Expo) and Firebase.
Users can sign up, log in, and write personal diary entries securely.

Overview

Diary_app is a simple journaling application focused on:

Easy to use interface

Secure authentication

Clean screen navigation

Safe handling of sensitive data

Features

Sign up / Login with Firebase

Create and manage diary entries

Screen-based navigation

Secure environment variable usage

No secrets stored in the repository

Project Structure

Diary-app
├── assets/        # App assets
├── functions/     # Firebase functions (optional)
├── images/        # Images and UI resources
├── Modals/        # Modal components
├── navigation/    # App navigation
├── Screens/       # App screens
├── my-app/        # Optional / legacy folder
├── App.js         # Entry point
├── firebase.js    # Firebase setup
├── package.json   # Dependencies
└── README.md      # Documentation
Tech Stack

React Native (Expo)

React Navigation

Firebase (Auth & Firestore)

AsyncStorage

Security

Environment variables stored in .env

.env is ignored by Git

No API keys committed
