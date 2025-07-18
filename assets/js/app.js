// Main App JavaScript
let currentWeekStart = null;
let currentMonth = null;
let currentYear = null;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up theme selector event listeners
    document.querySelectorAll('.theme-option').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            applyTheme(theme);
        });
    });
    
    // Initialize current date displays
    updateDateDisplays();
});

// Date formatting functions
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function formatDateShort(date) {
    const options = { 
        month: 'short', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function formatMonthYear(date) {
    const options = { 
        year: 'numeric', 
        month: 'long' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Update all date displays
function updateDateDisplays() {
    // Daily view
    document.getElementById('currentDate').textContent = formatDate(currentDate);
    
    // Weekly view
    if (!currentWeekStart) {
        currentWeekStart = getWeekStart(currentDate);
    }
    updateWeekDisplay();
    
    // Monthly view
    if (!currentMonth) {
        currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }
    document.getElementById('monthYear').textContent = formatMonthYear(currentMonth);
    
    // Yearly view
    if (!currentYear) {
        currentYear = currentDate.getFullYear();
    }
    document.getElementById('currentYear').textContent = currentYear;
}

// Get the start of the week (Sunday)
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
}

// Date navigation functions
function changeDate(direction) {
    currentDate.setDate(currentDate.getDate() + direction);
    loadDailyView();
    updateDateDisplays();
}

function changeWeek(direction) {
    currentWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    loadWeeklyView();
    updateWeekDisplay();
}

function changeMonth(direction) {
    currentMonth.setMonth(currentMonth.getMonth() + direction);
    document.getElementById('monthYear').textContent = formatMonthYear(currentMonth);
    loadMonthlyView();
}

function changeYear(direction) {
    currentYear += direction;
    document.getElementById('currentYear').textContent = currentYear;
    loadYearlyView();
}

// View switching
function switchView(viewName) {
    currentView = viewName;
    
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    document.getElementById(viewName + 'View').classList.add('active');
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
    
    // Load view content
    switch(viewName) {
        case 'daily':
            loadDailyView();
            break;
        case 'weekly':
            loadWeeklyView();
            break;
        case 'monthly':
            loadMonthlyView();
            break;
        case 'yearly':
            loadYearlyView();
            break;
    }
}

// Theme functions
function toggleThemeSelector() {
    const selector = document.getElementById('themeSelector');
    selector.style.display = selector.style.display === 'none' ? 'block' : 'none';
}

function toggleView() {
    const views = ['daily', 'weekly', 'monthly', 'yearly'];
    const currentIndex = views.indexOf(currentView);
    const nextIndex = (currentIndex + 1) % views.length;
    switchView(views[nextIndex]);
}

// Theme Modal Logic
const themes = [
  {
    key: 'default-light', name: 'Default Light', accent: '#d6ad60', bg: '#fff', font: 'Inter Tight, sans-serif', fontLabel: 'Inter Tight',
  },
  {
    key: 'default-dark', name: 'Default Dark', accent: '#d6ad60', bg: '#1a1a1a', font: 'Inter Tight, sans-serif', fontLabel: 'Inter Tight',
  },
  {
    key: 'ocean-light', name: 'Ocean Light', accent: '#1e90ff', bg: '#f0f8ff', font: 'Rubik, sans-serif', fontLabel: 'Rubik',
  },
  {
    key: 'navy-dark', name: 'Navy Dark', accent: '#1e90ff', bg: '#0f1419', font: 'IBM Plex Sans, sans-serif', fontLabel: 'IBM Plex Sans',
  },
  {
    key: 'tomato-light', name: 'Tomato Light', accent: '#ff6347', bg: '#fff5f5', font: 'Nunito Sans, sans-serif', fontLabel: 'Nunito Sans',
  },
  {
    key: 'tomato-dark', name: 'Tomato Dark', accent: '#ff4500', bg: '#1a0f0f', font: 'Noto Sans, sans-serif', fontLabel: 'Noto Sans',
  },
  {
    key: 'mediumsea-light', name: 'MediumSea Light', accent: '#3cb371', bg: '#f0fff4', font: 'Open Sans, sans-serif', fontLabel: 'Open Sans',
  },
  {
    key: 'mediumsea-dark', name: 'MediumSea Dark', accent: '#2e8b57', bg: '#0f1a14', font: 'Mulish, sans-serif', fontLabel: 'Mulish',
  },
  {
    key: 'violet-light', name: 'Violet Light', accent: '#8a2be2', bg: '#faf5ff', font: 'Lato, sans-serif', fontLabel: 'Lato',
  },
  {
    key: 'violet-dark', name: 'Violet Dark', accent: '#6a0dad', bg: '#1a0f1a', font: 'Source Sans 3, sans-serif', fontLabel: 'Source Sans 3',
  },
  {
    key: 'orange-light', name: 'Orange Light', accent: '#ffa500', bg: '#fffaf0', font: 'PT Sans, sans-serif', fontLabel: 'PT Sans',
  },
  {
    key: 'orange-dark', name: 'Orange Dark', accent: '#cc8400', bg: '#1a1408', font: 'Manrope, sans-serif', fontLabel: 'Manrope',
  },
  {
    key: 'khaki-light', name: 'Khaki Light', accent: '#f0e68c', bg: '#fefcbf', font: 'Assistant, sans-serif', fontLabel: 'Assistant',
  },
  {
    key: 'khaki-dark', name: 'Khaki Dark', accent: '#bca869', bg: '#1a1810', font: 'Raleway, sans-serif', fontLabel: 'Raleway',
  },
  {
    key: 'tangerine-light', name: 'Tangerine Light', accent: '#ffcc00', bg: '#fffff0', font: 'Inter, sans-serif', fontLabel: 'Inter',
  },
  {
    key: 'tangerine-dark', name: 'Tangerine Dark', accent: '#e69500', bg: '#1a1608', font: 'Overpass, sans-serif', fontLabel: 'Overpass',
  },
  {
    key: 'greyscale-light', name: 'Greyscale Light', accent: '#808080', bg: '#fff', font: 'IBM Plex Sans, sans-serif', fontLabel: 'IBM Plex Sans',
  },
  {
    key: 'greyscale-dark', name: 'Greyscale Dark', accent: '#404040', bg: '#1a202c', font: 'Karla, sans-serif', fontLabel: 'Karla',
  },
  {
    key: 'ultracolourful', name: 'Ultra Colourful', accent: '#ff6b6b', bg: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)', font: 'Comic Neue, cursive', fontLabel: 'Comic Neue',
  },
  {
    key: 'sunshine-light', name: 'Sunshine Light', accent: '#fff700', bg: '#fffef7', font: 'Quicksand, sans-serif', fontLabel: 'Quicksand',
  },
  {
    key: 'sunshine-dark', name: 'Sunshine Dark', accent: '#e1cd00', bg: '#1c1917', font: 'Work Sans, sans-serif', fontLabel: 'Work Sans',
  },
];

function openThemeModal() {
  const modal = document.getElementById('themeModal');
  const grid = document.getElementById('themeCardGrid');
  grid.innerHTML = '';
  const currentTheme = document.body.getAttribute('data-theme') || 'default-light';
  themes.forEach(theme => {
    const card = document.createElement('div');
    card.className = 'theme-card' + (theme.key === currentTheme ? ' selected' : '');
    card.onclick = () => {
      applyTheme(theme.key);
      closeThemeModal();
    };
    // Card left: accent, right: preview
    const accent = document.createElement('div');
    accent.className = 'theme-accent';
    accent.style.background = theme.accent;
    const preview = document.createElement('div');
    preview.className = 'theme-preview';
    preview.style.background = theme.bg;
    preview.style.fontFamily = theme.font;
    const name = document.createElement('div');
    name.className = 'theme-name';
    name.textContent = theme.name;
    const fontPreview = document.createElement('div');
    fontPreview.className = 'theme-font-preview';
    fontPreview.textContent = theme.fontLabel;
    fontPreview.style.fontFamily = theme.font;
    preview.appendChild(name);
    preview.appendChild(fontPreview);
    card.appendChild(accent);
    card.appendChild(preview);
    grid.appendChild(card);
  });
  modal.style.display = 'flex';
}
function closeThemeModal() {
  document.getElementById('themeModal').style.display = 'none';
}

// Task management functions
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (!taskText) return;
    
    const task = {
        id: Date.now().toString(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Add to UI
    addTaskToList(task);
    
    // Save to Firebase
    saveTaskToFirebase(task);
    
    // Clear input
    taskInput.value = '';
}

function addTaskToList(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.setAttribute('data-task-id', task.id);
    
    li.innerHTML = `
        <span class="task-text" onclick="toggleTask('${task.id}')">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask('${task.id}')">
            <span class="material-icons">delete</span>
        </button>
    `;
    
    taskList.appendChild(li);
}

function toggleTask(taskId) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    taskElement.classList.toggle('completed');
    
    // Update in Firebase
    updateTaskInFirebase(taskId, {
        completed: taskElement.classList.contains('completed')
    });
}

function deleteTask(taskId) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    taskElement.remove();
    
    // Remove from Firebase
    deleteTaskFromFirebase(taskId);
}

// Firebase task functions
async function saveTaskToFirebase(task) {
    if (!currentUser) return;
    
    try {
        const dayData = await loadUserData(currentDate) || {};
        if (!dayData.tasks) dayData.tasks = [];
        
        dayData.tasks.push(task);
        dayData.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();
        
        await saveUserData(currentDate, dayData);
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

async function updateTaskInFirebase(taskId, updates) {
    if (!currentUser) return;
    
    try {
        const dayData = await loadUserData(currentDate);
        if (!dayData || !dayData.tasks) return;
        
        const taskIndex = dayData.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            Object.assign(dayData.tasks[taskIndex], updates);
            dayData.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();
            await saveUserData(currentDate, dayData);
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTaskFromFirebase(taskId) {
    if (!currentUser) return;
    
    try {
        const dayData = await loadUserData(currentDate);
        if (!dayData || !dayData.tasks) return;
        
        dayData.tasks = dayData.tasks.filter(t => t.id !== taskId);
        dayData.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();
        await saveUserData(currentDate, dayData);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// View loading functions
async function loadDailyView() {
    // Display verse for current date
    displayVerse(currentDate);
    
    // Load user data for current date
    const dayData = await loadUserData(currentDate);
    
    if (dayData) {
        // Load branding
        if (dayData.branding) {
            document.getElementById('brandingInput').value = dayData.branding;
        } else {
            document.getElementById('brandingInput').value = '';
        }
        
        // Load tasks
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        if (dayData.tasks) {
            dayData.tasks.forEach(task => addTaskToList(task));
        }
        
        // Load notes
        if (dayData.notes) {
            document.getElementById('learningNotes').value = dayData.notes;
        } else {
            document.getElementById('learningNotes').value = '';
        }
    } else {
        // Clear all fields for new day
        document.getElementById('brandingInput').value = '';
        document.getElementById('taskList').innerHTML = '';
        document.getElementById('learningNotes').value = '';
    }
    
    updateDateDisplays();
}

async function loadWeeklyView() {
    const weekGrid = document.getElementById('weekGrid');
    const mainDaySelect = document.getElementById('mainDaySelect');
    
    weekGrid.innerHTML = '';
    mainDaySelect.innerHTML = '<option value="">Select main day...</option>';
    
    // Load week data
    const weekData = await loadWeekData(currentWeekStart);
    
    // Generate week days
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        
        const dayData = await loadUserData(date);
        const dayCard = createDayCard(date, dayData);
        weekGrid.appendChild(dayCard);
        
        // Add to main day selector
        const option = document.createElement('option');
        option.value = formatDateKey(date);
        option.textContent = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        mainDaySelect.appendChild(option);
    }
    
    // Set selected main day
    if (weekData && weekData.mainDay) {
        mainDaySelect.value = weekData.mainDay;
    }
    
    // Add main day change listener
    mainDaySelect.onchange = function() {
        if (currentUser) {
            saveWeekData(currentWeekStart, {
                mainDay: this.value,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    };
}

function createDayCard(date, dayData) {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.onclick = () => {
        currentDate = new Date(date);
        switchView('daily');
    };
    
    const isToday = date.toDateString() === new Date().toDateString();
    if (isToday) {
        card.classList.add('selected');
    }
    
    card.innerHTML = `
        <div class="day-name">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
        <div class="day-date">${date.getDate()}</div>
        <div class="day-indicators">
            ${dayData && dayData.tasks && dayData.tasks.length > 0 ? '<div class="indicator tasks"></div>' : ''}
            ${dayData && dayData.notes && dayData.notes.trim() ? '<div class="indicator notes"></div>' : ''}
        </div>
    `;
    
    return card;
}

function updateWeekDisplay() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(currentWeekStart.getDate() + 6);
    
    const startStr = currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    document.getElementById('weekRange').textContent = `${startStr} - ${endStr}`;
}

async function loadMonthlyView() {
    const monthGrid = document.getElementById('monthGrid');
    monthGrid.innerHTML = '';
    
    // Get first and last day of month view
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    // Get the Sunday before the first day
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    // Get the Saturday after the last day
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    // Generate calendar grid in order
    const days = [];
    const current = new Date(startDate);
    while (current <= endDate) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    // Sort days in ascending order
    days.sort((a, b) => a - b);
    for (const day of days) {
        const dayData = await loadUserData(day);
        const dayElement = createMonthDay(day, dayData);
        monthGrid.appendChild(dayElement);
    }
}

function createMonthDay(date, dayData) {
    const day = document.createElement('div');
    day.className = 'month-day';
    day.onclick = () => {
        currentDate = new Date(date);
        switchView('daily');
    };
    
    // Check if day is in current month
    if (date.getMonth() !== currentMonth.getMonth()) {
        day.classList.add('other-month');
    }
    
    // Check if today
    if (date.toDateString() === new Date().toDateString()) {
        day.classList.add('today');
    }
    
    day.innerHTML = `
        <div>${date.getDate()}</div>
        ${dayData && dayData.tasks && dayData.tasks.length > 0 ? '<div class="indicator tasks"></div>' : ''}
        ${dayData && dayData.notes && dayData.notes.trim() ? '<div class="indicator notes"></div>' : ''}
    `;
    
    return day;
}

async function loadYearlyView() {
    const yearGrid = document.getElementById('yearGrid');
    yearGrid.innerHTML = '';
    
    // Generate 12 months in order
    const months = Array.from({ length: 12 }, (_, i) => i);
    for (const month of months) {
        const monthData = await getMonthSummary(currentYear, month);
        const monthElement = createYearMonth(currentYear, month, monthData);
        yearGrid.appendChild(monthElement);
    }
}

function createYearMonth(year, month, monthData) {
    const monthElement = document.createElement('div');
    monthElement.className = 'year-month';
    monthElement.onclick = () => {
        currentMonth = new Date(year, month, 1);
        switchView('monthly');
    };
    
    // Check if current month
    const now = new Date();
    if (year === now.getFullYear() && month === now.getMonth()) {
        monthElement.classList.add('current');
    }
    
    const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' });
    
    monthElement.innerHTML = `
        <div>${monthName}</div>
        <div style="font-size: 0.8rem; margin-top: 0.5rem;">
            ${monthData.taskDays} days with tasks<br>
            ${monthData.noteDays} days with notes
        </div>
    `;
    
    return monthElement;
}

async function getMonthSummary(year, month) {
    if (!currentUser) return { taskDays: 0, noteDays: 0 };
    
    let taskDays = 0;
    let noteDays = 0;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayData = await loadUserData(date);
        
        if (dayData) {
            if (dayData.tasks && dayData.tasks.length > 0) {
                taskDays++;
            }
            if (dayData.notes && dayData.notes.trim()) {
                noteDays++;
            }
        }
    }
    
    return { taskDays, noteDays };
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return; // Don't interfere with form inputs
    }
    
    switch(e.key) {
        case 'ArrowLeft':
            if (currentView === 'daily') changeDate(-1);
            else if (currentView === 'weekly') changeWeek(-1);
            else if (currentView === 'monthly') changeMonth(-1);
            else if (currentView === 'yearly') changeYear(-1);
            break;
        case 'ArrowRight':
            if (currentView === 'daily') changeDate(1);
            else if (currentView === 'weekly') changeWeek(1);
            else if (currentView === 'monthly') changeMonth(1);
            else if (currentView === 'yearly') changeYear(1);
            break;
        case '1':
            switchView('daily');
            break;
        case '2':
            switchView('weekly');
            break;
        case '3':
            switchView('monthly');
            break;
        case '4':
            switchView('yearly');
            break;
        case 't':
            openThemeModal();
            break;
        case 'Escape':
            closeThemeModal();
            break;
    }
});

// Initialize dates
currentDate = currentDate || new Date();
updateDateDisplays();