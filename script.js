class FitnessTracker {
    constructor() {
        this.workouts = [];
        this.currentWorkout = null;
        this.settings = {
            userName: '',
            startWeight: 0,
            targetWeight: 0
        };
        
        this.init();
        this.loadData();
        this.setupEventListeners();
        this.updateDashboard();
    }
    
    init() {
        // Initialize with default settings
        this.settings = {
            userName: localStorage.getItem('userName') || '',
            startWeight: parseFloat(localStorage.getItem('startWeight')) || 0,
            targetWeight: parseFloat(localStorage.getItem('targetWeight')) || 0
        };
        
        // Load workouts from localStorage
        const savedWorkouts = localStorage.getItem('workouts');
        if (savedWorkouts) {
            this.workouts = JSON.parse(savedWorkouts);
        }
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showView(e.target.dataset.view);
            });
        });
        
        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.startWorkout(e.target.dataset.workout);
            });
        });
        
        // Start workout buttons
        document.querySelectorAll('.start-workout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.startWorkout(e.target.dataset.workout);
            });
        });
        
        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeWorkoutModal();
        });
        
        document.getElementById('closeSetModal').addEventListener('click', () => {
            this.closeSetModal();
        });
        
        document.getElementById('saveWorkout').addEventListener('click', () => {
            this.saveCurrentWorkout();
        });
        
        document.getElementById('cancelWorkout').addEventListener('click', () => {
            this.closeWorkoutModal();
        });
        
        document.getElementById('addSet').addEventListener('click', () => {
            this.addSetToExercise();
        });
        
        document.getElementById('cancelSet').addEventListener('click', () => {
            this.closeSetModal();
        });
        
        // Settings
        document.getElementById('userName').addEventListener('input', (e) => {
            this.settings.userName = e.target.value;
            localStorage.setItem('userName', e.target.value);
        });
        
        document.getElementById('startWeight').addEventListener('input', (e) => {
            this.settings.startWeight = parseFloat(e.target.value) || 0;
            localStorage.setItem('startWeight', e.target.value);
        });
        
        document.getElementById('targetWeight').addEventListener('input', (e) => {
            this.settings.targetWeight = parseFloat(e.target.value) || 0;
            localStorage.setItem('targetWeight', e.target.value);
        });
        
        // Export/Import
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });
        
        document.getElementById('importData').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        
        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
        
        // History filters
        document.getElementById('historyFilter').addEventListener('change', () => {
            this.filterHistory();
        });
        
        document.getElementById('historyDate').addEventListener('change', () => {
            this.filterHistory();
        });
        
        // Workout Editor
        this.setupWorkoutEditor();
        
        // Load settings into form
        this.loadSettings();
    }
    
    setupWorkoutEditor() {
        // Editor tabs
        document.querySelectorAll('.editor-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchEditorTab(e.target.dataset.workout);
            });
        });
        
        // Add exercise buttons
        document.getElementById('addExerciseA').addEventListener('click', () => {
            this.addExercise('A');
        });
        
        document.getElementById('addExerciseB').addEventListener('click', () => {
            this.addExercise('B');
        });
        
        // Save and reset buttons
        document.getElementById('saveWorkoutTemplate').addEventListener('click', () => {
            this.saveWorkoutTemplate();
        });
        
        document.getElementById('resetWorkoutTemplate').addEventListener('click', () => {
            this.resetWorkoutTemplate();
        });
        
        // Load current templates
        this.loadWorkoutTemplates();
    }
    
    switchEditorTab(workoutType) {
        // Update tab buttons
        document.querySelectorAll('.editor-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-workout="${workoutType}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.editor-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`workout${workoutType}Editor`).classList.add('active');
    }
    
    loadWorkoutTemplates() {
        // Load custom templates from localStorage or use defaults
        const customTemplates = JSON.parse(localStorage.getItem('workoutTemplates')) || {};
        
        this.workoutTemplates = {
            A: customTemplates.A || this.getDefaultWorkoutA(),
            B: customTemplates.B || this.getDefaultWorkoutB()
        };
        
        this.renderWorkoutEditor('A');
        this.renderWorkoutEditor('B');
    }
    
    getDefaultWorkoutA() {
        return [
            { name: 'לחיצות חזה', machine: 'מכשירים 81, 84' },
            { name: 'פרפר', machine: 'מכשירים 77, 78' },
            { name: 'יד אחורית', machine: 'מכשיר 85' },
            { name: 'גב פולי עליון', machine: 'מכשירים 4, 5, 6' },
            { name: 'חתירה', machine: 'מכשיר 79' },
            { name: 'כתפיים – לחיצה', machine: 'מכשיר 82' },
            { name: 'הרחקות כתף', machine: 'מכשיר 59' },
            { name: 'יד קדמית פטישים', machine: '-' },
            { name: 'יד קדמית סופינציה', machine: '-' },
            { name: 'כיסא רומי', machine: 'מכשיר 23' },
            { name: 'פלאנק סטטי', machine: '1 סט של דקה' },
            { name: 'בטן אלכסונים על מזרן', machine: '2 סטים × 20 חזרות' },
            { name: 'הנפות רגליים', machine: '3 סטים × 20 חזרות' },
            { name: 'כפיפות בטן', machine: '3 סטים × 20 חזרות' }
        ];
    }
    
    getDefaultWorkoutB() {
        return [
            { name: 'סקוואט – סמית משין', machine: 'סמית משין' },
            { name: 'כפיפת ברך', machine: 'מכשיר 74' },
            { name: 'מקרבי ירך', machine: 'מכשיר 92' },
            { name: 'מרחיקי ירך', machine: 'מכשיר 93' },
            { name: 'עליות תאומים', machine: 'מכשיר 71' },
            { name: 'לחיצות רגליים', machine: 'מכשיר 71' },
            { name: 'פלאנק סטטי', machine: '1 סט של דקה' },
            { name: 'בטן אלכסונים על מזרן', machine: '2 סטים × 20 חזרות' },
            { name: 'הנפות רגליים', machine: '3 סטים × 20 חזרות' },
            { name: 'כפיפות בטן', machine: '3 סטים × 20 חזרות' }
        ];
    }
    
    renderWorkoutEditor(workoutType) {
        const container = document.getElementById(`workout${workoutType}Exercises`);
        const exercises = this.workoutTemplates[workoutType];
        
        container.innerHTML = '';
        
        exercises.forEach((exercise, index) => {
            const exerciseItem = this.createExerciseEditorItem(exercise, index, workoutType);
            container.appendChild(exerciseItem);
        });
    }
    
    createExerciseEditorItem(exercise, index, workoutType) {
        const item = document.createElement('div');
        item.className = 'exercise-item-editor';
        
        item.innerHTML = `
            <button class="remove-exercise-btn" onclick="fitnessTracker.removeExercise('${workoutType}', ${index})">×</button>
            <div class="exercise-inputs">
                <div class="exercise-input-row">
                    <input type="text" 
                           value="${exercise.name}" 
                           placeholder="שם התרגיל"
                           onchange="fitnessTracker.updateExercise('${workoutType}', ${index}, 'name', this.value)">
                    <input type="text" 
                           value="${exercise.machine}" 
                           placeholder="מספר מכשיר"
                           onchange="fitnessTracker.updateExercise('${workoutType}', ${index}, 'machine', this.value)">
                </div>
            </div>
            <div class="exercise-controls">
                ${index > 0 ? `<button class="move-exercise-btn" onclick="fitnessTracker.moveExercise('${workoutType}', ${index}, 'up')">↑</button>` : ''}
                ${index < this.workoutTemplates[workoutType].length - 1 ? `<button class="move-exercise-btn" onclick="fitnessTracker.moveExercise('${workoutType}', ${index}, 'down')">↓</button>` : ''}
            </div>
        `;
        
        return item;
    }
    
    addExercise(workoutType) {
        const newExercise = { name: 'תרגיל חדש', machine: 'מכשיר' };
        this.workoutTemplates[workoutType].push(newExercise);
        this.renderWorkoutEditor(workoutType);
    }
    
    removeExercise(workoutType, index) {
        if (confirm('האם אתה בטוח שברצונך למחוק תרגיל זה?')) {
            this.workoutTemplates[workoutType].splice(index, 1);
            this.renderWorkoutEditor(workoutType);
        }
    }
    
    updateExercise(workoutType, index, field, value) {
        this.workoutTemplates[workoutType][index][field] = value;
    }
    
    moveExercise(workoutType, index, direction) {
        const exercises = this.workoutTemplates[workoutType];
        
        if (direction === 'up' && index > 0) {
            [exercises[index], exercises[index - 1]] = [exercises[index - 1], exercises[index]];
        } else if (direction === 'down' && index < exercises.length - 1) {
            [exercises[index], exercises[index + 1]] = [exercises[index + 1], exercises[index]];
        }
        
        this.renderWorkoutEditor(workoutType);
    }
    
    saveWorkoutTemplate() {
        localStorage.setItem('workoutTemplates', JSON.stringify(this.workoutTemplates));
        this.showNotification('תוכנית האימון נשמרה בהצלחה!', 'success');
    }
    
    resetWorkoutTemplate() {
        if (confirm('האם אתה בטוח שברצונך לאפס את תוכנית האימון לברירת המחדל?')) {
            this.workoutTemplates = {
                A: this.getDefaultWorkoutA(),
                B: this.getDefaultWorkoutB()
            };
            localStorage.removeItem('workoutTemplates');
            this.renderWorkoutEditor('A');
            this.renderWorkoutEditor('B');
            this.showNotification('תוכנית האימון אופסה לברירת המחדל', 'info');
        }
    }
    
    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected view
        document.getElementById(viewName).classList.add('active');
        
        // Add active class to nav button
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
        
        // Update specific view content
        if (viewName === 'history') {
            this.updateHistory();
        } else if (viewName === 'settings') {
            this.loadSettings();
        }
    }
    
    startWorkout(workoutType) {
        this.currentWorkout = {
            id: Date.now(),
            type: workoutType,
            date: new Date().toISOString(),
            exercises: [],
            completed: false
        };
        
        // Add exercises based on workout type
        if (workoutType === 'A') {
            this.currentWorkout.exercises = this.getWorkoutAExercises();
        } else if (workoutType === 'B') {
            this.currentWorkout.exercises = this.getWorkoutBExercises();
        }
        
        this.showWorkoutModal();
    }
    
    getWorkoutAExercises() {
        // Use custom templates if available, otherwise use defaults
        const customTemplates = JSON.parse(localStorage.getItem('workoutTemplates')) || {};
        const exercises = customTemplates.A || this.getDefaultWorkoutA();
        
        return exercises.map(exercise => ({
            name: exercise.name,
            machine: exercise.machine,
            sets: []
        }));
    }
    
    getWorkoutBExercises() {
        // Use custom templates if available, otherwise use defaults
        const customTemplates = JSON.parse(localStorage.getItem('workoutTemplates')) || {};
        const exercises = customTemplates.B || this.getDefaultWorkoutB();
        
        return exercises.map(exercise => ({
            name: exercise.name,
            machine: exercise.machine,
            sets: []
        }));
    }
    
    showWorkoutModal() {
        const modal = document.getElementById('workoutModal');
        const title = document.getElementById('modalTitle');
        const exercisesContainer = document.getElementById('workoutExercises');
        
        title.textContent = `אימון ${this.currentWorkout.type} - ${this.currentWorkout.type === 'A' ? 'פלג גוף עליון' : 'פלג גוף תחתון'}`;
        
        exercisesContainer.innerHTML = '';
        
        this.currentWorkout.exercises.forEach((exercise, index) => {
            const exerciseCard = this.createExerciseCard(exercise, index);
            exercisesContainer.appendChild(exerciseCard);
        });
        
        modal.classList.add('active');
    }
    
    createExerciseCard(exercise, index) {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        
        card.innerHTML = `
            <div class="exercise-header">
                <div class="exercise-title">${exercise.name}</div>
                <button class="add-set-btn" onclick="fitnessTracker.openSetModal(${index})">+ הוסף סט</button>
            </div>
            <div class="exercise-machine">${exercise.machine}</div>
            <div class="sets-list" id="sets-${index}">
                ${exercise.sets.map(set => `
                    <div class="set-item">
                        <div class="set-info">
                            <span class="set-weight">${set.weight} ק"ג</span>
                            <span class="set-reps">${set.reps} חזרות</span>
                        </div>
                        <div class="set-notes">${set.notes || ''}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        return card;
    }
    
    openSetModal(exerciseIndex) {
        this.currentExerciseIndex = exerciseIndex;
        const modal = document.getElementById('setModal');
        const title = document.getElementById('setModalTitle');
        const exercise = this.currentWorkout.exercises[exerciseIndex];
        
        title.textContent = `הוסף סט - ${exercise.name}`;
        
        // Clear previous values
        document.getElementById('setWeight').value = '';
        document.getElementById('setReps').value = '';
        document.getElementById('setNotes').value = '';
        
        modal.classList.add('active');
    }
    
    addSetToExercise() {
        const weight = parseFloat(document.getElementById('setWeight').value);
        const reps = parseInt(document.getElementById('setReps').value);
        const notes = document.getElementById('setNotes').value;
        
        if (!weight || !reps) {
            alert('אנא הכנס משקל וחזרות');
            return;
        }
        
        const set = { weight, reps, notes, timestamp: new Date().toISOString() };
        this.currentWorkout.exercises[this.currentExerciseIndex].sets.push(set);
        
        this.closeSetModal();
        this.showWorkoutModal(); // Refresh the modal
    }
    
    closeSetModal() {
        document.getElementById('setModal').classList.remove('active');
    }
    
    closeWorkoutModal() {
        document.getElementById('workoutModal').classList.remove('active');
        this.currentWorkout = null;
    }
    
    saveCurrentWorkout() {
        if (!this.currentWorkout) return;
        
        this.currentWorkout.completed = true;
        this.workouts.push(this.currentWorkout);
        this.saveData();
        this.updateDashboard();
        this.closeWorkoutModal();
        
        // Show success message
        this.showNotification('האימון נשמר בהצלחה!', 'success');
    }
    
    updateDashboard() {
        const monthlyWorkouts = this.getMonthlyWorkouts();
        const nextWorkout = this.getNextWorkout();
        const avgWeight = this.getAverageWeight();
        const totalReps = this.getTotalReps();
        
        document.getElementById('monthlyWorkouts').textContent = monthlyWorkouts;
        document.getElementById('nextWorkout').textContent = nextWorkout;
        document.getElementById('avgWeight').textContent = `${avgWeight.toFixed(1)} ק"ג`;
        document.getElementById('totalReps').textContent = totalReps;
        
        this.updateRecentWorkouts();
    }
    
    getMonthlyWorkouts() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        return this.workouts.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate.getMonth() === currentMonth && 
                   workoutDate.getFullYear() === currentYear;
        }).length;
    }
    
    getNextWorkout() {
        if (this.workouts.length === 0) return 'אימון A';
        
        const lastWorkout = this.workouts[this.workouts.length - 1];
        return lastWorkout.type === 'A' ? 'אימון B' : 'אימון A';
    }
    
    getAverageWeight() {
        if (this.workouts.length === 0) return 0;
        
        let totalWeight = 0;
        let totalSets = 0;
        
        this.workouts.forEach(workout => {
            workout.exercises.forEach(exercise => {
                exercise.sets.forEach(set => {
                    totalWeight += set.weight;
                    totalSets++;
                });
            });
        });
        
        return totalSets > 0 ? totalWeight / totalSets : 0;
    }
    
    getTotalReps() {
        let total = 0;
        
        this.workouts.forEach(workout => {
            workout.exercises.forEach(exercise => {
                exercise.sets.forEach(set => {
                    total += set.reps;
                });
            });
        });
        
        return total;
    }
    
    updateRecentWorkouts() {
        const container = document.getElementById('recentWorkoutsList');
        const recentWorkouts = this.workouts.slice(-5).reverse();
        
        container.innerHTML = '';
        
        if (recentWorkouts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #6c757d;">אין אימונים עדיין</p>';
            return;
        }
        
        recentWorkouts.forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.className = 'recent-workout-item';
            
            const date = new Date(workout.date);
            const totalSets = workout.exercises.reduce((sum, exercise) => sum + exercise.sets.length, 0);
            
            workoutItem.innerHTML = `
                <div class="recent-workout-header">
                    <div class="recent-workout-date">${date.toLocaleDateString('he-IL')}</div>
                    <div class="recent-workout-type">אימון ${workout.type}</div>
                </div>
                <div class="recent-workout-summary">
                    ${totalSets} סטים • ${workout.exercises.length} תרגילים
                </div>
            `;
            
            container.appendChild(workoutItem);
        });
    }
    
    updateHistory() {
        const container = document.getElementById('historyList');
        const filter = document.getElementById('historyFilter').value;
        const dateFilter = document.getElementById('historyDate').value;
        
        let filteredWorkouts = this.workouts;
        
        if (filter !== 'all') {
            filteredWorkouts = filteredWorkouts.filter(workout => workout.type === filter);
        }
        
        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            filteredWorkouts = filteredWorkouts.filter(workout => {
                const workoutDate = new Date(workout.date);
                return workoutDate.toDateString() === filterDate.toDateString();
            });
        }
        
        container.innerHTML = '';
        
        if (filteredWorkouts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #6c757d;">אין אימונים למוצג</p>';
            return;
        }
        
        filteredWorkouts.reverse().forEach(workout => {
            const workoutItem = document.createElement('div');
            workoutItem.className = 'history-item';
            
            const date = new Date(workout.date);
            const totalSets = workout.exercises.reduce((sum, exercise) => sum + exercise.sets.length, 0);
            const totalWeight = workout.exercises.reduce((sum, exercise) => {
                return sum + exercise.sets.reduce((setSum, set) => setSum + set.weight, 0);
            }, 0);
            
            workoutItem.innerHTML = `
                <div class="history-header">
                    <div class="history-date">${date.toLocaleDateString('he-IL')} - ${date.toLocaleTimeString('he-IL', {hour: '2-digit', minute:'2-digit'})}</div>
                    <div class="history-type">אימון ${workout.type}</div>
                </div>
                <div class="history-summary">
                    <div>${totalSets} סטים • ${workout.exercises.length} תרגילים • ${totalWeight.toFixed(1)} ק"ג סה"כ</div>
                </div>
            `;
            
            container.appendChild(workoutItem);
        });
    }
    
    filterHistory() {
        this.updateHistory();
    }
    
    loadSettings() {
        document.getElementById('userName').value = this.settings.userName;
        document.getElementById('startWeight').value = this.settings.startWeight;
        document.getElementById('targetWeight').value = this.settings.targetWeight;
    }
    
    exportData() {
        const data = {
            workouts: this.workouts,
            settings: this.settings,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `fitness-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('הנתונים יוצאו בהצלחה!', 'success');
    }
    
    importData(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.workouts) {
                    this.workouts = data.workouts;
                }
                
                if (data.settings) {
                    this.settings = { ...this.settings, ...data.settings };
                    this.loadSettings();
                }
                
                this.saveData();
                this.updateDashboard();
                this.showNotification('הנתונים יובאו בהצלחה!', 'success');
                
            } catch (error) {
                this.showNotification('שגיאה בייבוא הנתונים', 'error');
            }
        };
        
        reader.readAsText(file);
    }
    
    saveData() {
        localStorage.setItem('workouts', JSON.stringify(this.workouts));
        localStorage.setItem('userName', this.settings.userName);
        localStorage.setItem('startWeight', this.settings.startWeight);
        localStorage.setItem('targetWeight', this.settings.targetWeight);
    }
    
    loadData() {
        // Data is loaded in init()
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the app
let fitnessTracker;
document.addEventListener('DOMContentLoaded', () => {
    fitnessTracker = new FitnessTracker();
}); 