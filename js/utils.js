// 为元素添加悬停效果
function addHoverEffect(selector, scale = 1.02, translateY = -5) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(${translateY}px) scale(${scale})`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 为元素添加点击脉冲效果
function addPulseEffect(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}