// ============================================
// DeepThought Frontend Challenge - Script.js
// Dynamic rendering with reusable components
// ============================================

// Configuration - No hardcoding!
const CONFIG = {
    API_URL: "https://dev.deepthought.education/assets/uploads/files/files/others/front_end_subset.json",
    FALLBACK_URL: "./data.json", // Local fallback if CORS blocks external API
    ANIMATION_DURATION: 300
};

// ============================================
// 1. SIDEBAR TOGGLE FUNCTIONALITY
// ============================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const btn = document.getElementById('toggle-btn');
    const isCollapsed = sidebar.classList.toggle('collapsed');
    btn.innerText = isCollapsed ? "⬅️" : "➡️";
}

// ============================================
// 2. REUSABLE COMPONENT: ASSET CARD
// ============================================
function createAssetCard(asset) {
    const card = document.createElement('div');
    card.className = 'asset-card';

    // Generate content based on asset type
    const contentHTML = generateAssetContent(asset);

    card.innerHTML = `
        <div class="card-header">
            ${asset.asset_title}
            <span class="info-icon" title="${asset.asset_description}">ℹ️</span>
        </div>
        <div class="card-description-wrapper">
            <div class="card-description" id="desc-${asset.asset_id}">
                <strong>Description:</strong> ${asset.asset_description}
            </div>
            <button class="expand-btn" onclick="toggleDescription('${asset.asset_id}')">
                <span id="arrow-${asset.asset_id}">▼</span>
            </button>
        </div>
        <div class="card-body">
            ${contentHTML}
        </div>
    `;

    return card;
}

// ============================================
// 3. GENERATE CONTENT BY ASSET TYPE
// ============================================
function generateAssetContent(asset) {
    const contentType = asset.asset_content_type;
    const title = asset.asset_title;

    // Video content
    if (contentType === "video" || asset.asset_content.includes("youtube") || asset.asset_content.includes("vimeo")) {
        return `<iframe src="${asset.asset_content.trim()}" frameborder="0" allowfullscreen></iframe>`;
    }

    // Threadbuild interactive form
    if (title.toLowerCase().includes("threadbuild") || title.toLowerCase().includes("thread")) {
        return `
            <div class="thread-container">
                <div class="thread-header">Thread A</div>
                <div class="thread-inputs">
                    <div class="input-group">
                        <label>Sub Interpretation 1</label>
                        <textarea placeholder="Enter your interpretation here" rows="4"></textarea>
                    </div>
                    <div class="input-group">
                        <label>Sub Reflection 1</label>
                        <textarea placeholder="Enter your reflection here" rows="4"></textarea>
                    </div>
                </div>
                <button class="add-sub-thread-btn">+ Add Sub-thread</button>
            </div>
        `;
    }

    // Structure pointers form
    if (title.toLowerCase().includes("structure") || title.toLowerCase().includes("pointer")) {
        return `
            <div class="structure-container">
                <div class="input-group">
                    <label>Title</label>
                    <input type="text" placeholder="Enter title here" />
                </div>
                <div class="input-group">
                    <label>Content</label>
                    <textarea rows="8" placeholder="Enter content here"></textarea>
                </div>
            </div>
        `;
    }

    // Default: Article/Document with link
    return `
        <div class="article-content">
            <p>${asset.asset_description}</p>
            ${asset.asset_content ? `<a href="${asset.asset_content}" target="_blank" class="resource-link">📄 View Full Resource</a>` : ''}
        </div>
    `;
}

// ============================================
// 4. TOGGLE DESCRIPTION EXPAND/COLLAPSE
// ============================================
function toggleDescription(assetId) {
    const desc = document.getElementById(`desc-${assetId}`);
    const arrow = document.getElementById(`arrow-${assetId}`);

    if (desc.classList.contains('collapsed')) {
        desc.classList.remove('collapsed');
        arrow.innerText = '▼';
    } else {
        desc.classList.add('collapsed');
        arrow.innerText = '▶';
    }
}

// ============================================
// 5. RENDER JOURNEY BOARD (SIDEBAR)
// ============================================
function renderJourneyBoard(tasks) {
    const journeyList = document.getElementById('journey-list');
    journeyList.innerHTML = ''; // Clear existing content

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.task_title;
        li.className = index === 0 ? 'active' : '';
        li.onclick = () => selectTask(index, tasks);
        journeyList.appendChild(li);
    });
}

// ============================================
// 6. SELECT TASK FROM JOURNEY BOARD
// ============================================
function selectTask(index, tasks) {
    const task = tasks[index];

    // Update active state in journey board
    const items = document.querySelectorAll('#journey-list li');
    items.forEach((item, i) => {
        item.className = i === index ? 'active' : '';
    });

    // Update main content
    document.getElementById('task-title').innerText = task.task_title;
    document.getElementById('task-description').innerText = task.task_description;

    // Render assets for this task
    renderAssets(task.assets);
}

// ============================================
// 7. RENDER ALL ASSETS (REUSABLE COMPONENTS)
// ============================================
function renderAssets(assets) {
    const container = document.getElementById('asset-container');
    container.innerHTML = ''; // Clear existing content

    // Use reusable component function for each asset
    assets.forEach(asset => {
        const card = createAssetCard(asset);
        container.appendChild(card);
    });
}

// ============================================
// 8. FETCH DATA AND INITIALIZE APP
// ============================================
async function init() {
    try {
        // Show loading state
        const container = document.getElementById('asset-container');
        container.innerHTML = '<div class="loading">Loading assets...</div>';

        let data;

        // Try fetching from primary API
        try {
            const response = await fetch(CONFIG.API_URL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            data = await response.json();
            console.log('✅ Data loaded from external API');
        } catch (apiError) {
            // Fallback to local JSON if external API fails
            console.warn('⚠️ External API failed, trying local fallback...', apiError.message);
            const fallbackResponse = await fetch(CONFIG.FALLBACK_URL);
            if (!fallbackResponse.ok) {
                throw new Error('Both external API and local fallback failed');
            }
            data = await fallbackResponse.json();
            console.log('✅ Data loaded from local fallback');
        }

        // Update project title
        document.getElementById('main-project-title').innerText = data.title;

        // Render journey board with all tasks
        renderJourneyBoard(data.tasks);

        // Render first task by default
        const firstTask = data.tasks[0];
        document.getElementById('task-title').innerText = firstTask.task_title;
        document.getElementById('task-description').innerText = firstTask.task_description;
        renderAssets(firstTask.assets);

        console.log('✅ Application initialized successfully');

    } catch (err) {
        console.error('❌ Failed to load data:', err);
        const container = document.getElementById('asset-container');
        container.innerHTML = `
            <div class="error-message">
                <h3>Failed to load content</h3>
                <p>Error: ${err.message}</p>
                <p>Please make sure you're running the app via http://localhost:8000</p>
            </div>
        `;
    }
}

// ============================================
// 9. START THE APPLICATION
// ============================================
init();