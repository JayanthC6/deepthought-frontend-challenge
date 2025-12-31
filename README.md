# DeepThought Frontend Challenge

> A dynamic project management interface built with vanilla HTML, CSS, and JavaScript

## 🎯 Project Overview

This project is a solution to the DeepThought Frontend Challenge, implementing a dynamic webpage that fetches and renders project data from a JSON API using reusable components with **zero hardcoding**.

## ✨ Features

- **Dynamic JSON Rendering**: Fetches data from API and renders content dynamically
- **Reusable Components**: Modular functions for asset cards and journey board
- **Expandable Descriptions**: Click to collapse/expand asset descriptions
- **Journey Board Navigation**: Interactive sidebar with task switching
- **Multiple Asset Types**: Supports Video, Threadbuild, Structure Pointers, and Articles
- **Responsive Design**: Mobile-friendly layout with smooth animations
- **Error Handling**: Graceful fallback to local JSON if API fails
- **No Hardcoding**: All content loaded from variables and JSON data

## 🚀 Quick Start

### Prerequisites
- Python 3.x installed

### Running the Application

1. **Clone or download this repository**

2. **Navigate to the project directory**
   ```bash
   cd db-frontend-challenge
   ```

3. **Start the local server**
   ```bash
   python server.py
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
db-frontend-challenge/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # Dynamic rendering logic
├── data.json           # Local JSON fallback data
├── server.py           # Python HTTP server with CORS
├── assets/             # Images and resources
└── README.md           # This file
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)**: Async/await, fetch API, DOM manipulation
- **Python**: Simple HTTP server

## 🔧 Key Implementation Details

### Reusable Components

**Asset Card Component**
```javascript
function createAssetCard(asset) {
    // Single template for all asset types
    // Returns complete HTML element
}
```

**Journey Board Renderer**
```javascript
function renderJourneyBoard(tasks) {
    // Populates sidebar dynamically
    // No hardcoded task items
}
```

### Asset Types Supported

1. **Video**: YouTube/Vimeo embeds via iframe
2. **Threadbuild**: Interactive form with interpretation/reflection inputs
3. **Structure Pointers**: Title and content input fields
4. **Articles**: Description with external link

### No Hardcoding

All data comes from:
- JSON API responses
- Configuration variables
- Function parameters

## 🧪 Testing

All features have been tested and verified:

- ✅ Sidebar collapse/expand
- ✅ Journey board navigation
- ✅ Expandable descriptions
- ✅ All asset types rendering
- ✅ API data fetching
- ✅ Fallback to local JSON
- ✅ Responsive design
- ✅ Cross-browser compatibility

## 📋 Requirements Met

### Task 1: Webpage Creation
- ✅ Collapsible journey board
- ✅ Reusable asset containers
- ✅ Expandable descriptions
- ✅ Professional styling

### Task 2: Dynamic Functionality
- ✅ Fetch JSON from API
- ✅ Parse project/task/asset hierarchy
- ✅ Render dynamically using reusable components
- ✅ Support multiple asset types
- ✅ No hardcoded values

### Code Quality
- ✅ Clean, readable code
- ✅ Proper error handling
- ✅ Meaningful comments
- ✅ DRY principle followed

## 🎓 Learning Outcomes

This project demonstrates:
- Dynamic web development with vanilla JavaScript
- Component-based architecture without frameworks
- API integration with error handling
- Responsive design principles
- Clean code practices

## 📝 Notes

- The application tries to fetch from the external API first
- If CORS blocks the request, it falls back to `data.json`
- All styling follows modern web design principles
- Code is written to be simple and understandable (no AI over-engineering)

## 👤 Author

**Jayanth**

## 📄 License

This project is created as part of the DeepThought Frontend Challenge.

---

**Status**: ✅ Complete and ready for submission
