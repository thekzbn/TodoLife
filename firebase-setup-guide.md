# Firebase Setup Guide for Spiritual To-Do List App

This guide will walk you through setting up Firebase Authentication and Firestore for your Spiritual To-Do List App.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name (e.g., "spiritual-todo-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Email/Password"
5. Enable the first option (Email/Password)
6. Click "Save"

## Step 3: Enable Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select a location for your database (choose closest to your users)
5. Click "Done"

## Step 4: Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>`
5. Register your app with a nickname (e.g., "spiritual-todo-web")
6. Don't check "Firebase Hosting" for now
7. Click "Register app"
8. Copy the firebaseConfig object

## Step 5: Update Your App

Replace the placeholder values in `firebase-config.js` with your actual configuration:

```javascript
// Replace this placeholder config
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// With your actual config that looks like this:
  const firebaseConfig = {
    apiKey: "AIzaSyApbgR7NN6Cc0ZjVkvFIsRXUIp-UGj6aqE",
    authDomain: "todolife-9a248.firebaseapp.com",
    projectId: "todolife-9a248",
    storageBucket: "todolife-9a248.firebasestorage.app",
    messagingSenderId: "332087562112",
    appId: "1:332087562112:web:c51f9897053215c3337b65",
    measurementId: "G-ED8TSDMKFV"
  };
```

## Step 6: Set Up Security Rules

1. Go back to Firestore Database in Firebase Console
2. Click on the "Rules" tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Click "Publish"

## Step 7: Test Your Setup

1. Open `index.html` in your web browser
2. You should see the authentication modal
3. Try creating a new account
4. If successful, you should see the main app interface
5. Add a task to test Firestore functionality

## Troubleshooting

### Common Issues:

**Authentication Error**: 
- Check that Email/Password is enabled in Firebase Console
- Verify your Firebase config is correct

**Firestore Permission Denied**:
- Make sure Firestore security rules are published
- Check that the user is authenticated before accessing data

**Config Not Found**:
- Ensure you've replaced the placeholder config in `firebase-config.js`
- Check that all config values are strings (wrapped in quotes)

**Network Errors**:
- Check your internet connection
- Try disabling ad blockers or browser extensions

### Testing Locally

If you want to run the app locally for development:

1. You can simply open `index.html` in your browser
2. Or use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have it)
   npx serve .
   ```

### Firebase Console Navigation

- **Authentication**: View users, manage sign-in methods
- **Firestore**: View/edit database documents, manage rules
- **Usage**: Monitor API usage and costs
- **Settings**: Get config, manage billing

## Data Structure Overview

Your Firestore database will automatically create this structure:

```
/users/{userId}/
  └── days/
      ├── 2024-01-15
      │   ├── tasks: [...]
      │   ├── notes: "What I learned today..."
      │   ├── branding: "John's Birthday"
      │   └── lastUpdated: timestamp
      └── weeks/
          └── 2024-01-14  // Week start date
              ├── mainDay: "2024-01-17"
              └── lastUpdated: timestamp
```

## Security Best Practices

1. **Never share your Firebase config publicly** in repositories without proper environment variable setup
2. **Always use security rules** to protect user data
3. **Monitor usage** to avoid unexpected charges
4. **Keep Firebase SDK updated** for security patches
5. **Use HTTPS** when deploying to production

## Next Steps

Once your Firebase is set up:

1. Test all app features (daily/weekly/monthly/yearly views)
2. Try different themes
3. Test on mobile devices
4. Consider adding your domain to Firebase authorized domains for production
5. Set up Firebase Hosting for easy deployment

## Cost Considerations

Firebase offers generous free tiers:

- **Authentication**: 50,000 monthly active users free
- **Firestore**: 1GB storage, 50K reads, 20K writes, 20K deletes per day free
- **Hosting**: 10GB storage, 125 visits per day free

For personal use, you'll likely stay within free limits. Monitor usage in Firebase Console.

---

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs) or the app's README.md file.