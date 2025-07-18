

// Main App JavaScript

let currentDate = new Date();
let currentView = 'daily';

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
    
    // Initialize current date contexts
    if (!currentWeekStart) currentWeekStart = getWeekStart(currentDate);
    if (!currentMonth) currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    if (!currentYear) currentYear = currentDate.getFullYear();

    updateDateDisplays();
    switchView(currentView);
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
    // Daily view date
    document.getElementById('currentDate').textContent = formatDate(currentDate);

    // Weekly view range
    if (!currentWeekStart) currentWeekStart = getWeekStart(currentDate);
    updateWeekDisplay();

    // Monthly view label
    if (!currentMonth) currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    document.getElementById('monthYear').textContent = formatMonthYear(currentMonth);

    // Yearly view label
    if (!currentYear) currentYear = currentDate.getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
}

// Get the start of the week (Sunday)
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
}

// Date navigation functions
function changeDate(direction) {
    currentDate.setDate(currentDate.getDate() + direction);
    updateDateContextsFromCurrentDate();
    loadDailyView();
    updateDateDisplays();
}

function changeWeek(direction) {
    currentWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    updateDateContextsFromWeekStart();
    loadWeeklyView();
    updateWeekDisplay();
}

function changeMonth(direction) {
    currentMonth.setMonth(currentMonth.getMonth() + direction);
    updateDateContextsFromMonth();
    loadMonthlyView();
    document.getElementById('monthYear').textContent = formatMonthYear(currentMonth);
}

function changeYear(direction) {
    currentYear += direction;
    currentMonth = new Date(currentYear, currentMonth.getMonth(), 1);
    currentWeekStart = getWeekStart(new Date(currentYear, currentMonth.getMonth(), currentDate.getDate()));
    currentDate = new Date(currentYear, currentMonth.getMonth(), currentDate.getDate());
    loadYearlyView();
    updateDateDisplays();
}

// Keep all date contexts consistent after changes
function updateDateContextsFromCurrentDate() {
    currentWeekStart = getWeekStart(currentDate);
    currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    currentYear = currentDate.getFullYear();
}

function updateDateContextsFromWeekStart() {
    // Set currentDate to the start of week for coherence
    currentDate = new Date(currentWeekStart);
    currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    currentYear = currentDate.getFullYear();
}

function updateDateContextsFromMonth() {
    // Set currentDate to first day of currentMonth for coherence
    currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    currentWeekStart = getWeekStart(currentDate);
    currentYear = currentMonth.getFullYear();
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

// Theme functions (as you had before)
// ... [Same as your previous theme code]

// Task management, Firebase interaction, and view loading functions
// ... [Your existing implementations unchanged]

// Week view date range display
function updateWeekDisplay() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(currentWeekStart.getDate() + 6);
    
    const startStr = currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    document.getElementById('weekRange').textContent = `${startStr} - ${endStr}`;
}

// Keyboard shortcuts for navigation
document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return; // ignore inputs
    
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
        case 'd':
            switchView('daily');
            break;
        case 'w':
            switchView('weekly');
            break;
        case 'm':
            switchView('monthly');
            break;
        case 'y':
            switchView('yearly');
            break;
    }
});



