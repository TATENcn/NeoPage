// 主题切换功能
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');
            
            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                themeIcon.textContent = '🌙';
                themeText.textContent = '浅色模式';
            } else {
                body.setAttribute('data-theme', 'light');
                themeIcon.textContent = '🌙';
                themeText.textContent = '深色模式';
            }
        }

        // 页面加载时设置主题和添加动画效果
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage?.getItem('theme');
            const themeIcon = document.querySelector('.theme-icon');
            const themeText = document.querySelector('.theme-text');
            
            if (savedTheme === 'light') {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.textContent = '🌙';
                themeText.textContent = '深色模式';
            }
            
            // 为链接部分添加悬停效果
            const linkSections = document.querySelectorAll('.link-section');
            linkSections.forEach(section => {
                section.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.01)';
                });
                
                section.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // 为链接项添加更平滑的动画
            const linkItems = document.querySelectorAll('.link-item');
            linkItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });