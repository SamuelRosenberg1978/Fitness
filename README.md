# 💪 Fitness Tracker - מעקב כושר

A comprehensive fitness tracking Progressive Web App (PWA) designed specifically for your workout plan. Track your progress, log exercises, and monitor your fitness journey with a beautiful, mobile-first interface.

## 🌟 Features

### 📱 **Mobile-First Design**
- Optimized for Android devices
- Installable as a PWA (Progressive Web App)
- Responsive design that works on all screen sizes
- Hebrew RTL (Right-to-Left) support

### 💪 **Workout Management**
- **Workout A**: Upper body exercises with specific machine numbers
- **Workout B**: Lower body exercises with specific machine numbers
- **Abdominal Workout**: Core exercises included in every session
- Real-time exercise tracking with sets, reps, and weights

### 📊 **Progress Tracking**
- Monthly workout statistics
- Average weight tracking
- Total repetitions counter
- Workout history with filtering
- Progress visualization

### 🔧 **Advanced Features**
- Local data storage (no internet required)
- Export/Import functionality for data backup
- Customizable user settings
- Machine number tracking for gym equipment
- Notes and comments for each set
- **Custom Workout Editor**: Modify exercises, add new ones, reorder them
- **PWA Support**: Install as native app on Android/iOS

## 🏋️ Your Workout Plan

### 💪 **Workout A – Upper Body**
- Chest Press (Machines 81, 84)
- Butterfly (Machines 77, 78)
- Back Arm (Machine 85)
- Upper Back Pulley (Machines 4, 5, 6)
- Rowing (Machine 79)
- Shoulder Press (Machine 82)
- Shoulder Abduction (Machine 59)
- Front Arm Hammers
- Front Arm Supination
- Roman Chair (Machine 23 - 2 sets × 20 reps)

### 🦵 **Workout B – Lower Body**
- Squat – Smith Machine
- Knee Flexion (Machine 74)
- Hip Adductors (Machine 92)
- Hip Abductors (Machine 93)
- Calf Raises (Machine 71)
- Leg Press (Machine 71)

### 🔥 **Abdominal Workout** (End of every session)
- Static Plank (1 set of 1 minute)
- Diagonal Abs on Mat (2 sets × 20 reps)
- Leg Raises (3 sets × 20 reps)
- Crunches (3 sets × 20 reps)

## 🚀 Getting Started

### **Installation**
1. **Open the app** in your Android browser (Chrome recommended)
2. **Add to Home Screen**:
   - Tap the menu (⋮) in Chrome
   - Select "Add to Home screen"
   - Choose "Add"
3. **Launch from Home Screen** - The app will now work like a native app!

### **First Use**
1. **Set up your profile** in Settings
2. **Enter your starting weight** and target weight
3. **Start your first workout** by tapping "אימון A" or "אימון B"

## 📱 How to Use

### **Starting a Workout**
1. Navigate to "אימונים" (Workouts) tab
2. Tap "התחל אימון" (Start Workout) on your desired workout
3. For each exercise, tap "+ הוסף סט" (Add Set)
4. Enter weight, reps, and optional notes
5. Save your workout when complete

### **Tracking Progress**
- **Dashboard**: View monthly stats and recent workouts
- **History**: Filter workouts by type and date
- **Settings**: Manage your profile and backup data

### **Data Management**
- **Export**: Download your data as JSON file
- **Import**: Restore data from backup file
- **Local Storage**: All data is stored on your device

### **Customizing Your Workout Plan**
- **Workout Editor**: Go to Settings → "עריכת תוכנית אימון"
- **Add Exercises**: Click "+ הוסף תרגיל" to add new exercises
- **Edit Names**: Change exercise names and machine numbers
- **Reorder**: Use ↑↓ buttons to change exercise order
- **Remove**: Click × to delete exercises
- **Save Changes**: Click "שמור שינויים" to apply modifications
- **Reset**: Click "אפס לברירת מחדל" to restore original plan

## 🛠️ Technical Details

### **Technologies Used**
- **HTML5**: Semantic markup with RTL support
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **PWA**: Service Worker and Web App Manifest
- **Local Storage**: Offline data persistence

### **Browser Compatibility**
- Chrome 60+ (Recommended)
- Firefox 55+
- Safari 12+
- Edge 79+

### **PWA Features**
- Offline functionality
- Installable on Android
- App-like experience
- Background sync (when available)

## 📁 File Structure

```
Fitness-Tracker/
├── index.html          # Main HTML file with RTL support
├── styles.css          # Mobile-first CSS with Hebrew styling
├── script.js           # JavaScript application logic
├── manifest.json       # PWA manifest for app installation
└── README.md           # This documentation
```

## 🔧 Customization

### **Adding New Exercises**
Edit the `getWorkoutAExercises()` or `getWorkoutBExercises()` functions in `script.js`:

```javascript
{ name: 'Exercise Name', machine: 'Machine Number', sets: [] }
```

### **Changing Colors**
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... other colors */
}
```

### **Modifying Workout Templates**
Update the exercise arrays in the JavaScript file to match your gym's equipment.

## 📊 Data Structure

### **Workout Object**
```javascript
{
    id: timestamp,
    type: 'A' | 'B',
    date: ISO string,
    exercises: [
        {
            name: 'Exercise Name',
            machine: 'Machine Number',
            sets: [
                {
                    weight: 50,
                    reps: 12,
                    notes: 'Optional notes',
                    timestamp: ISO string
                }
            ]
        }
    ],
    completed: true
}
```

## 🔒 Privacy & Security

- **Local Storage**: All data is stored on your device
- **No Internet Required**: Works completely offline
- **No Data Collection**: No personal information is sent to servers
- **Export Control**: You control your data backup

## 🆘 Troubleshooting

### **App Not Installing**
- Ensure you're using Chrome or a PWA-compatible browser
- Check that the site is served over HTTPS (or localhost)
- Try refreshing the page and trying again

### **Data Not Saving**
- Check browser storage permissions
- Ensure you have sufficient device storage
- Try clearing browser cache and reloading

### **Hebrew Text Issues**
- Ensure your browser supports RTL text
- Check that Hebrew fonts are installed
- Try a different browser if issues persist

## 🎯 Tips for Best Experience

1. **Regular Backups**: Export your data weekly
2. **Consistent Logging**: Log workouts immediately after completion
3. **Use Notes**: Add notes about form, difficulty, or progress
4. **Track Progress**: Review your history regularly
5. **Stay Consistent**: Follow your workout schedule

## 🤝 Contributing

Feel free to submit issues, feature requests, or improvements to make the app better for everyone!

## 📄 License

This project is open source and available under the MIT License.

---

**💪 Start your fitness journey today! Track, progress, and achieve your goals!** 🎯 