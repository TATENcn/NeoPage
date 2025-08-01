document.addEventListener('DOMContentLoaded', function() {
    // 为技能卡片添加悬停效果
    addHoverEffect('.skill-card');
    
    // 为联系方式卡片添加点击效果
    addPulseEffect('.contact-item');
});

// 主题切换功能
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');
            
            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                themeIcon.textContent = '🌙';
                themeText.textContent = '浅色模式';
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                themeIcon.textContent = '🌙';
                themeText.textContent = '深色模式';
                localStorage.setItem('theme', 'light');
            }
        }

        // 页面加载时设置主题
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme');
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');
            
            if (savedTheme === 'light') {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.textContent = '🌙';
                themeText.textContent = '深色模式';
            }
            
            // 为技能卡片添加悬停效果
            const skillCards = document.querySelectorAll('.skill-card');
            skillCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // 为联系方式卡片添加点击效果
            const contactItems = document.querySelectorAll('.contact-item');
            contactItems.forEach(item => {
                item.addEventListener('click', function() {
                    this.style.animation = 'pulse 0.3s ease';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 300);
                });
            });
        });
        
        // 添加脉冲动画的CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);