# Spiritual To-Do List App

A beautiful, responsive spiritual and educational to-do list application built with plain HTML, CSS, and JavaScript. Features Firebase authentication, cloud sync, multiple themes, and Bible verses for daily inspiration.

## 🌟 Features

### 📅 Multiple Views
- **Daily View**: Task-focused interface with Bible verses, branding notes, tasks, and learning reflections
- **Weekly View**: 7-day overview with main day selection
- **Monthly View**: Calendar grid with task and note indicators
- **Yearly View**: 12-month overview with activity summaries

### ✨ Spiritual Elements
- **Daily Bible Verses**: 50+ inspirational verses that rotate deterministically by date
- **Branding Notes**: Add personal touches like "John's Birthday" or "Cal Today"
- **Learning Reflections**: Daily "What I Learned" section for personal growth

### 🎨 Beautiful Themes (21 total)
Each theme includes light/dark variants with custom fonts:

- **Default** (Light/Dark) - Inter Tight fonts, golden accent
- **Ocean/Navy** - Blues with Outfit/Rubik and Barlow Condensed/IBM Plex
- **Tomato** (Light/Dark) - Reds with Bebas Neue/Nunito Sans and Orbitron/Noto Sans
- **MediumSea** (Light/Dark) - Greens with Saira/Open Sans and Ubuntu/Mulish
- **Violet** (Light/Dark) - Purples with Prompt/Lato and Rajdhani/Source Sans 3
- **Orange** (Light/Dark) - Oranges with Righteous/PT Sans and Titillium Web/Manrope
- **Khaki** (Light/Dark) - Earth tones with Tenor Sans/Assistant and Red Hat Display/Raleway
- **Tangerine** (Light/Dark) - Yellows with Yatra One/Inter and Exo 2/Overpass
- **Greyscale** (Light/Dark) - Minimalist with IBM Plex Serif/Sans and Fira Sans/Karla
- **Ultra Colourful** - Animated rainbow gradient with Bungee Shade/Comic Neue
- **Sunshine** (Light/Dark) - Bright yellows with Baloo 2/Quicksand and Varela Round/Work Sans

### 🔥 Firebase Integration
- **Authentication**: Email/password signup and login
- **Cloud Sync**: All data automatically saved to Firestore
- **Multi-device**: Access your data from anywhere
- **Auto-save**: Changes saved automatically with debouncing

### 📱 User Experience
- **No Checkboxes**: Click tasks to strike them through
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Keyboard Shortcuts**: Navigate with arrow keys, numbers 1-4 for views, 't' for themes
- **Smooth Animations**: Beautiful transitions and hover effects
- **Auto-expanding Notes**: Text areas grow with content

## 🚀 Quick Start

### 1. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password provider
3. Enable Firestore Database
4. Get your Firebase configuration from Project Settings
5. Update `firebase-config.js` with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-actual-sender-id",
    appId: "your-actual-app-id"
};
```

### 2. Launch the App

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Create an account or sign in
4. Start organizing your spiritual journey!

### 3. Firestore Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📖 Usage Guide

### Daily View
- **Bible Verse**: Automatically displays a verse for each date
- **Branding Input**: Add special notes like birthdays or events
- **Tasks**: Click to add, click task text to complete (strikethrough), click delete button to remove
- **Learning Notes**: Reflect on what you learned or discovered

### Weekly View
- View 7 days at once with task/note indicators
- Select a "main day" for each week during weekly wrap-ups
- Click any day to jump to its daily view

### Monthly View
- Calendar grid showing task/note indicators
- Click any date to view that day
- Grayed out dates are from other months

### Yearly View
- 12-month overview showing activity summaries
- Shows days with tasks and notes for each month
- Click any month to view it in monthly view

### Themes
- Click the palette icon in the header
- Choose from 21 beautiful themes
- Theme preference is saved locally

### Keyboard Shortcuts
- **Arrow Keys**: Navigate dates/weeks/months/years
- **1-4**: Switch between Daily/Weekly/Monthly/Yearly views
- **T**: Toggle theme selector
- **Escape**: Close theme selector
- **Enter**: Add task when typing in task input

## 🛠 Technical Details

### File Structure
```
spiritual-todo-app/
├── index.html              # Main HTML structure
├── styles.css              # All CSS including themes
├── firebase-config.js      # Firebase setup and auth
├── bible-verses.js         # Bible verse collection
├── app.js                  # Main application logic
└── README.md              # This file
```

### Technologies Used
- **Frontend**: Plain HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Authentication & Firestore
- **Fonts**: Google Fonts (20+ font families)
- **Icons**: Google Material Icons
- **No Build Process**: Just open in browser!

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Data Structure
Each user's data is stored in Firestore under `/users/{userId}/`:
- `days/{date}`: Daily data (tasks, notes, branding)
- `weeks/{weekStart}`: Weekly data (main day selection)

### Performance
- Automatic data caching with Firestore
- Debounced auto-save (1 second delay)
- Lazy loading of month/year data
- CSS transforms for smooth animations

## 🎯 Features Roadmap

- [ ] Export data to PDF/print
- [ ] Import/export functionality
- [ ] Shared lists with other users
- [ ] Habit tracking integration
- [ ] Prayer request management
- [ ] Goal setting and tracking
- [ ] Verse memorization feature
- [ ] Daily gratitude section

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you encounter any issues or have questions:
1. Check that your Firebase configuration is correct
2. Ensure your browser supports modern JavaScript features
3. Verify your internet connection for Firebase sync
4. Open browser developer tools to check for console errors

---

**Built with ❤️ for spiritual growth and daily organization**

