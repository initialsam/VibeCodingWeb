// ==================== 全域變數 ====================
let currentCategory = "all"; // 初始設定為 "all" 顯示所有分類
let allData = {}; // 儲存所有分類的頻道資料
let isSearching = false;
let isDataLoaded = false; // 標記資料是否已載入

// 分類對應資料
const categories = {
  entertainment: { name: "綜合娛樂", icon: "📺", file: "entertainment.json" },
  diy: { name: "DIY 手作", icon: "🛠️", file: "diy.json" },
  foreignerstaiwan: {
    name: "外國人介紹台灣",
    icon: "🤝",
    file: "foreignerstaiwan.json",
  },
  travel: { name: "旅遊探索", icon: "✈️", file: "travel.json" },
  animation: { name: "動畫頻道", icon: "✨", file: "animation.json" },
};

// ==================== DOM 元素 ====================
const channelGrid = document.getElementById("channelGrid");
const categoryTitle = document.getElementById("categoryTitle");
const channelCount = document.getElementById("channelCount");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const noResults = document.getElementById("noResults");
const categoryNav = document.getElementById("categoryNav");
let categoryBtns = []; // 將在動態生成後填充

// ==================== 初始化 ====================
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

async function initApp() {
  // 動態生成分類按鈕
  generateCategoryButtons();

  // 一次性載入所有分類資料
  await loadAllData();

  // 顯示預設分類
  displayCategory(currentCategory);

  // 綁定搜尋事件
  searchInput.addEventListener("input", handleSearch);
  clearSearchBtn.addEventListener("click", clearSearch);
}

// ==================== 動態生成分類按鈕 ====================
function generateCategoryButtons() {
  // 清空容器
  categoryNav.innerHTML = "";

  // 根據 categories 物件生成按鈕
  Object.keys(categories).forEach((categoryKey) => {
    const category = categories[categoryKey];
    
    // 創建按鈕元素
    const button = document.createElement("button");
    button.className = "category-btn";
    button.setAttribute("data-category", categoryKey);
    button.setAttribute("aria-pressed", "false");
    
    // 創建按鈕內容
    button.innerHTML = `
      <span class="category-icon">${category.icon}</span>
      ${category.name}
    `;
    
    // 綁定點擊事件
    button.addEventListener("click", handleCategoryClick);
    
    // 添加到導航列
    categoryNav.appendChild(button);
  });

  // 更新 categoryBtns 陣列
  categoryBtns = document.querySelectorAll(".category-btn");
}

// ==================== 載入所有資料 ====================
async function loadAllData() {
  // 顯示載入動畫
  channelGrid.innerHTML =
    '<p style="text-align: center; color: var(--text-gray); padding: 2rem;">正在載入所有頻道資料...</p>';
  channelCount.textContent = "載入中...";

  try {
    // 同時載入所有分類的 JSON 檔案
    const loadPromises = Object.keys(categories).map(async (categoryKey) => {
      const response = await fetch(`data/${categories[categoryKey].file}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { categoryKey, data };
    });

    // 等待所有資料載入完成
    const results = await Promise.all(loadPromises);

    // 將資料存入 allData 物件
    results.forEach(({ categoryKey, data }) => {
      allData[categoryKey] = data;
    });

    isDataLoaded = true;
    console.log("所有資料載入完成:", allData);
  } catch (error) {
    console.error("載入資料失敗:", error);
    channelGrid.innerHTML = `
            <p style="text-align: center; color: var(--primary-color); padding: 2rem;">
                <span style="font-size: 2rem; display: block; margin-bottom: 1rem;">⚠️</span>
                載入頻道資料失敗，請重新整理頁面
            </p>
        `;
    channelCount.textContent = "載入失敗";
  }
}

// ==================== 分類切換 ====================
function handleCategoryClick(e) {
  const btn = e.currentTarget;
  const category = btn.getAttribute("data-category");

  // 如果點擊的是當前已選中的分類，則取消選取並回到全部分類
  if (category === currentCategory && !isSearching) {
    // 移除所有按鈕的 active 狀態
    categoryBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });

    // 清除搜尋
    clearSearch(false);

    // 切換回全部分類
    currentCategory = "all";
    displayCategory("all");
    return;
  }

  // 更新按鈕狀態
  categoryBtns.forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  btn.classList.add("active");
  btn.setAttribute("aria-pressed", "true");

  // 清除搜尋
  clearSearch(false);

  // 切換分類
  currentCategory = category;
  displayCategory(category);
}

// ==================== 顯示分類資料 ====================
function displayCategory(category) {
  if (!isDataLoaded) {
    console.error("資料尚未載入完成");
    return;
  }

  // 如果是顯示所有分類
  if (category === "all") {
    categoryTitle.textContent = "全部分類";
    const allChannels = [];

    // 收集所有分類的頻道並標記分類
    Object.keys(allData).forEach((categoryKey) => {
      const channels = allData[categoryKey] || [];
      channels.forEach((channel) => {
        allChannels.push({
          ...channel,
          category: categoryKey,
          categoryName: categories[categoryKey].name,
        });
      });
    });

    // 渲染所有頻道（顯示分類標籤）
    renderChannels(allChannels, true);
    return;
  }

  const categoryData = categories[category];
  const channels = allData[category] || [];

  // 更新標題
  categoryTitle.textContent = categoryData.name;

  // 渲染頻道卡片
  renderChannels(channels);
}

// ==================== 渲染頻道卡片 ====================
function renderChannels(channels, isSearchMode = false) {
  // 清空容器
  channelGrid.innerHTML = "";

  // 更新計數
  if (isSearchMode) {
    channelCount.textContent = `找到 ${channels.length} 個頻道`;
  } else {
    channelCount.textContent = `共 ${channels.length} 個頻道`;
  }

  // 如果沒有頻道
  if (channels.length === 0) {
    noResults.style.display = "block";
    channelGrid.style.display = "none";
    return;
  }

  // 顯示頻道網格
  noResults.style.display = "none";
  channelGrid.style.display = "grid";

  // 創建卡片
  channels.forEach((channel, index) => {
    const card = createChannelCard(channel, index, isSearchMode);
    channelGrid.appendChild(card);
  });
}

// ==================== 創建單一頻道卡片 ====================
function createChannelCard(channel, index, isSearchMode = false) {
  const card = document.createElement("div");
  card.className = "channel-card";
  card.setAttribute("role", "listitem");
  card.style.animationDelay = `${index * 0.05}s`;

  // 如果是搜尋模式，顯示分類標籤
  const categoryBadge =
    isSearchMode && channel.categoryName
      ? `<span class="category-badge">${
          categories[channel.category].icon
        } ${escapeHtml(channel.categoryName)}</span>`
      : "";

  card.innerHTML = `
        ${categoryBadge}
        <h3 class="channel-title">${escapeHtml(channel.name)}</h3>
        <p class="channel-desc">${escapeHtml(channel.description)}</p>
        <a 
            href="${escapeHtml(channel.link)}" 
            class="channel-link" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="前往 ${escapeHtml(channel.name)} 頻道"
        >
            前往頻道
        </a>
    `;

  return card;
}

// ==================== 搜尋功能（全站搜尋）====================
function handleSearch(e) {
  const keyword = e.target.value.trim().toLowerCase();

  // 顯示/隱藏清除按鈕
  if (keyword) {
    clearSearchBtn.classList.add("show");
    isSearching = true;
  } else {
    clearSearchBtn.classList.remove("show");
    isSearching = false;
  }

  // 如果沒有關鍵字，顯示當前分類的所有頻道
  if (!keyword) {
    displayCategory(currentCategory);
    return;
  }

  // 搜尋全站所有頻道
  const allChannels = [];

  // 收集所有分類的頻道並標記分類
  Object.keys(allData).forEach((categoryKey) => {
    const channels = allData[categoryKey] || [];
    channels.forEach((channel) => {
      allChannels.push({
        ...channel,
        category: categoryKey,
        categoryName: categories[categoryKey].name,
      });
    });
  });

  // 過濾符合關鍵字的頻道
  const filteredChannels = allChannels.filter((channel) => {
    const nameMatch = channel.name.toLowerCase().includes(keyword);
    const descMatch = channel.description.toLowerCase().includes(keyword);
    return nameMatch || descMatch;
  });

  // 更新標題顯示搜尋結果
  categoryTitle.textContent = `搜尋結果：「${keyword}」`;

  // 渲染過濾結果（搜尋模式）
  renderChannels(filteredChannels, true);
}

// ==================== 清除搜尋 ====================
function clearSearch(shouldFocus = true) {
  searchInput.value = "";
  clearSearchBtn.classList.remove("show");
  isSearching = false;
  displayCategory(currentCategory);
  if (shouldFocus) {
    searchInput.focus();
  }
}

// ==================== 工具函數 ====================
// HTML 轉義，防止 XSS 攻擊
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ==================== 鍵盤快捷鍵 ====================
document.addEventListener("keydown", (e) => {
  // ESC 清除搜尋
  if (e.key === "Escape" && searchInput.value) {
    clearSearch();
  }

  // Ctrl/Cmd + K 聚焦搜尋框
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    searchInput.focus();
  }
});
