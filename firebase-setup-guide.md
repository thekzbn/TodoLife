# Firebase Setup Guide for TodoLife (Open Source)

Welcome to the open-source TodoLife project! This guide will help you set up Firebase Authentication and Firestore for your own instance of TodoLife.

## 1. Create Your Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter a project name (e.g., "TodoLife")
4. (Optional) Enable Google Analytics
5. Click "Create project"

## 2. Enable Authentication
1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable Email/Password and Google sign-in
5. Click "Save"

## 3. Enable Firestore Database
1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location
5. Click "Done"

## 4. Get Your Firebase Config
1. Go to Project Settings (gear icon)
2. Under "Your apps", click the web icon `</>`
3. Register your app (e.g., "todolife-web")
4. Copy the config object
5. Paste it into `firebase-config.js`

## 5. Set Firestore Security Rules
Replace the default rules with your preferred rule set.

## 6. Run the App Locally
- Use a local server (e.g., `python -m http.server 8000`)
- Open `http://localhost:8000` in your browser

## 7. Contributing to Setup
If you find ways to improve this setup guide, please open a Pull Request or Issue! We welcome contributions from the community.

## 8. License & Community
- This project is MIT licensed. See [LICENSE](LICENSE).
- For help, open an issue or join the discussion on GitHub.

---

Thank you for contributing to TodoLife!
