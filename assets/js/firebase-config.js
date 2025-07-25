// Firebase Configuration
// Replace these values with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyApbgR7NN6Cc0ZjVkvFIsRXUIp-UGj6aqE",
    authDomain: "todolife-9a248.firebaseapp.com",
    projectId: "todolife-9a248",
    storageBucket: "todolife-9a248.firebasestorage.app",
    messagingSenderId: "332087562112",
    appId: "1:332087562112:web:c51f9897053215c3337b65",
    measurementId: "G-ED8TSDMKFV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Current user state
let currentUser = null;
let currentDate = new Date();
let currentView = 'daily';
let currentTheme = 'default-light';

// Authentication functions
function showSignUp() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showSignIn() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            document.getElementById('authModal').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            initializeApp();
        })
        .catch((error) => {
            alert('Error signing in: ' + error.message);
        });
}

function signUp() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const displayName = document.getElementById('displayName').value;
    
    if (!email || !password || !displayName) {
        alert('Please fill in all fields');
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update user profile with display name
            return userCredential.user.updateProfile({
                displayName: displayName
            });
        })
        .then(() => {
            currentUser = auth.currentUser;
            document.getElementById('authModal').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            initializeApp();
        })
        .catch((error) => {
            alert('Error creating account: ' + error.message);
        });
}

function signOut() {
    auth.signOut().then(() => {
        currentUser = null;
        document.getElementById('authModal').style.display = 'flex';
        document.getElementById('app').style.display = 'none';
    }).catch((error) => {
        alert('Error signing out: ' + error.message);
    });
}

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        initializeApp();
    } else {
        currentUser = null;
        document.getElementById('authModal').style.display = 'flex';
        document.getElementById('app').style.display = 'none';
    }
});

// Add Google Sign-In
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            currentUser = result.user;
            document.getElementById('authModal').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            initializeApp();
        })
        .catch((error) => {
            alert('Error signing in with Google: ' + error.message);
        });
}
// Make function available globally
window.signInWithGoogle = signInWithGoogle;

// Show authentication modal and hide landing page
function showAuthModal() {
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('landingPage').style.display = 'none';
}
window.showAuthModal = showAuthModal;

// Update auth state observer to handle landing page
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        document.getElementById('authModal').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        document.getElementById('landingPage').style.display = 'none';
        initializeApp();
    } else {
        currentUser = null;
        document.getElementById('authModal').style.display = 'flex';
        document.getElementById('app').style.display = 'none';
        document.getElementById('landingPage').style.display = 'block';
    }
});

// Firestore helper functions
function getUserDocRef(date) {
    const dateStr = formatDateKey(date);
    return db.collection('users').doc(currentUser.uid).collection('days').doc(dateStr);
}

function getWeekDocRef(weekStart) {
    const weekKey = formatDateKey(weekStart);
    return db.collection('users').doc(currentUser.uid).collection('weeks').doc(weekKey);
}

function formatDateKey(date) {
    return date.getFullYear() + '-' + 
           String(date.getMonth() + 1).padStart(2, '0') + '-' + 
           String(date.getDate()).padStart(2, '0');
}

// Save data to Firestore
async function saveUserData(date, data) {
    if (!currentUser) return;
    
    try {
        const docRef = getUserDocRef(date);
        await docRef.set(data, { merge: true });
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Load data from Firestore
async function loadUserData(date) {
    if (!currentUser) return null;
    
    try {
        const docRef = getUserDocRef(date);
        const doc = await docRef.get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// Save week data
async function saveWeekData(weekStart, data) {
    if (!currentUser) return;
    
    try {
        const docRef = getWeekDocRef(weekStart);
        await docRef.set(data, { merge: true });
    } catch (error) {
        console.error('Error saving week data:', error);
    }
}

// Load week data
async function loadWeekData(weekStart) {
    if (!currentUser) return null;
    
    try {
        const docRef = getWeekDocRef(weekStart);
        const doc = await docRef.get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error('Error loading week data:', error);
        return null;
    }
}

// Auto-save functions with debouncing
let saveTimeout;

function autoSave(date, data) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveUserData(date, data);
    }, 1000); // Save after 1 second of inactivity
}

// Save preferred theme to Firestore
async function savePreferredTheme(themeName) {
    if (!currentUser) return;
    try {
        await db.collection('users').doc(currentUser.uid).set({ preferredTheme: themeName }, { merge: true });
    } catch (error) {
        console.error('Error saving preferred theme:', error);
    }
}

// Load preferred theme from Firestore
async function loadPreferredTheme() {
    if (!currentUser) return null;
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists && doc.data().preferredTheme) {
            return doc.data().preferredTheme;
        }
    } catch (error) {
        console.error('Error loading preferred theme:', error);
    }
    return null;
}

// Initialize app after authentication
function initializeApp() {
    loadTheme();
    loadDailyView();
    setupEventListeners();
}

// Setup auto-save event listeners
function setupEventListeners() {

    
    // Learning notes auto-save
    const learningNotes = document.getElementById('learningNotes');
    learningNotes.addEventListener('input', () => {
        autoSave(currentDate, {
            notes: learningNotes.value,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
    });
    
    // Task input enter key
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}

// Load and apply saved theme
async function loadTheme() {
    let savedTheme = localStorage.getItem('spiritualTodoTheme') || 'default-light';
    if (currentUser) {
        const cloudTheme = await loadPreferredTheme();
        if (cloudTheme) {
            savedTheme = cloudTheme;
            localStorage.setItem('spiritualTodoTheme', cloudTheme);
        }
    }
    applyTheme(savedTheme);
}

// Apply theme
function applyTheme(themeName) {
    currentTheme = themeName;
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('spiritualTodoTheme', themeName);
    if (typeof savePreferredTheme === 'function') savePreferredTheme(themeName);
    // Update theme selector buttons (if any remain)
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === themeName) {
            btn.classList.add('active');
        }
    });
}
window.applyTheme = applyTheme;