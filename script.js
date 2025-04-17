// 等待DOM加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 頁面載入動畫
    const loader = document.querySelector('.loader');
    
    // 模擬載入時間
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 1500);
    
    // 滾動進度條
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // 黑暗模式切換
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // 檢查本地存儲中的主題設置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // 切換主題
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // 更新圖標
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // 添加滾動動畫效果
    const sections = document.querySelectorAll('.section');
    
    // 檢查元素是否在視窗中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // 添加滾動事件監聽器
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    });
    
    // 初始化檢查
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('visible');
        }
    });
    
    // 添加圖片點擊放大效果
    const images = document.querySelectorAll('.image-container img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            // 創建模態框
            const modal = document.createElement('div');
            modal.classList.add('modal');
            
            // 創建模態框內容
            const modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');
            
            // 創建關閉按鈕
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('close-btn');
            closeBtn.innerHTML = '&times;';
            
            // 創建圖片元素
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            
            // 組裝模態框
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalImg);
            modal.appendChild(modalContent);
            
            // 添加到頁面
            document.body.appendChild(modal);
            
            // 點擊關閉按鈕關閉模態框
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // 點擊模態框外部關閉模態框
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    // 添加導航菜單
    const container = document.querySelector('.container');
    const mainTitle = document.querySelector('.main-title');
    
    // 創建導航菜單
    const nav = document.createElement('nav');
    nav.classList.add('main-nav');
    
    // 創建導航列表
    const navList = document.createElement('ul');
    
    // 添加導航項目
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionTitle = section.querySelector('h2').textContent;
        
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.href = `#${sectionId}`;
        navLink.textContent = sectionTitle;
        
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    });
    
    // 組裝導航菜單
    nav.appendChild(navList);
    
    // 插入導航菜單
    container.insertBefore(nav, mainTitle);
    
    // 添加平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // 添加返回頂部按鈕
    const backToTopBtn = document.createElement('button');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
    
    // 顯示/隱藏返回頂部按鈕
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 點擊返回頂部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});