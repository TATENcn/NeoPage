// 配置加载器 - 用于同步个人信息到各个页面
class ConfigLoader {
    constructor() {
        this.config = null;
        this.loadConfig();
    }

    async loadConfig() {
        try {
            const response = await fetch('./config.json');
            this.config = await response.json();
            this.applyConfig();
        } catch (error) {
            console.error('加载配置文件失败:', error);
            // 如果加载失败，使用默认配置
            this.useDefaultConfig();
        }
    }

    useDefaultConfig() {
        // 如果config.json加载失败，使用硬编码的默认配置
        this.config = {
            personal: {
                name: "风与路人",
                englishName: "Yaten-Z",
                title: "等那场风，等那个你",
                avatar: "https://s1.imagehub.cc/images/2025/05/30/55439681d8b3c2d988638c133e160a56.jpg",
                avatarFallback: "👨‍💻"
            },
            contact: {
                email: "Yaten-Z@outlook.com"
            },
            links: {
                blog: "https://blog.yaten.xyz",
                homepage: "https://yaten.xyz/"
            },
            meta: {
                copyright: "© 2025 风与路人",
                copyrightLink: "https://yaten.xyz/copyright.html"
            }
        };
        this.applyConfig();
    }

    applyConfig() {
        if (!this.config) return;

        // 应用基本个人信息
        this.applyPersonalInfo();
        
        // 根据页面类型应用特定配置
        const currentPage = this.getCurrentPageType();
        switch (currentPage) {
            case 'index':
                this.applyIndexPageConfig();
                break;
            case 'friend':
                this.applyFriendPageConfig();
                break;
            case 'links':
                this.applyLinksPageConfig();
                break;
            case 'copyright':
                this.applyCopyrightPageConfig();
                break;
            case 'about':
                this.applyAboutPageConfig();
                break;
        }

        // 应用通用配置
        this.applyCommonConfig();
    }

    getCurrentPageType() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        if (filename.includes('index') || filename === '' || filename === '/') {
            return 'index';
        } else if (filename.includes('friend')) {
            return 'friend';
        } else if (filename.includes('links')) {
            return 'links';
        } else if (filename.includes('copyright')) {
            return 'copyright';
        } else if (filename.includes('about')) {
            return 'about';
        }
        return 'unknown';
    }

    applyPersonalInfo() {
        const { personal } = this.config;

        // 设置页面标题
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const currentPage = this.getCurrentPageType();
            let pageName = '';
            switch (currentPage) {
                case 'index':
                    pageName = '主页';
                    break;
                case 'friend':
                    pageName = '友链';
                    break;
                case 'links':
                    pageName = '网站';
                    break;
                case 'copyright':
                    pageName = '声明';
                    break;
                case 'about':
                    pageName = '关于';
                    break;
                default:
                    pageName = '页面';
            }
            titleElement.textContent = `${personal.name} の ${pageName}`;
        }

        // 设置头像
        const avatarImg = document.querySelector('.sidebar-avatar img');
        if (avatarImg) {
            avatarImg.src = personal.avatar;
            avatarImg.alt = personal.name;
            avatarImg.onerror = () => {
                avatarImg.style.display = 'none';
                avatarImg.parentElement.innerHTML = personal.avatarFallback;
            };
        }

        // 设置名字
        const nameElements = document.querySelectorAll('.sidebar-name');
        nameElements.forEach(el => {
            el.textContent = personal.name;
        });

        // 设置标题/介绍
        const titleElements = document.querySelectorAll('.sidebar-title');
        titleElements.forEach(el => {
            el.textContent = personal.title;
        });
    }

    applyIndexPageConfig() {
        const { personal, contact } = this.config;

        // 设置个人介绍文本
        const introHeading = Array.from(document.querySelectorAll('.main-content .section h2')).find(h2 => h2.textContent.trim() === '个人介绍');
        if (introHeading) {
            const introSection = introHeading.parentElement;
            const existingParagraphs = introSection.querySelectorAll('p');
            existingParagraphs.forEach(p => p.remove());

            if (personal.description && personal.description.paragraphs) {
                personal.description.paragraphs.forEach(p_text => {
                    const p = document.createElement('p');
                    p.className = 'intro-text';
                    p.textContent = p_text;
                    introSection.appendChild(p);
                });
            }
        }

        // 动态生成特长特点卡片
        const skillsHeading = Array.from(document.querySelectorAll('.main-content .section h2')).find(h2 => h2.textContent.trim() === '特长与特点');
        if (skillsHeading) {
            const skillsGrid = skillsHeading.nextElementSibling;
            if (skillsGrid && personal.characteristics) {
                skillsGrid.innerHTML = '';
                personal.characteristics.forEach(skill => {
                    const card = document.createElement('div');
                    card.className = 'skill-card';
                    const h3 = document.createElement('h3');
                    h3.textContent = skill;
                    card.appendChild(h3);
                    skillsGrid.appendChild(card);
                });
            }
        }

        // 设置联系方式
        const contactItems = document.querySelectorAll('.contact-item');
        if (contactItems.length >= 3) {
            // 邮箱
            if (contactItems[0]) {
                const emailP = contactItems[0].querySelector('p');
                if (emailP) emailP.textContent = contact.email;
            }
            // QQ
            if (contactItems[1] && contact.qq) {
                const qqP = contactItems[1].querySelector('p');
                if (qqP) qqP.textContent = contact.qq;
            }
            // GitHub
            if (contactItems[2] && contact.github) {
                const githubP = contactItems[2].querySelector('p');
                if (githubP) githubP.textContent = contact.github;
            }
        }
    }

    applyAboutPageConfig() {
        const { personal } = this.config;

        // 设置个人介绍文本
        const aboutHeading = Array.from(document.querySelectorAll('.main-content .section h2')).find(h2 => h2.textContent.trim() === '个人介绍');
        if (aboutHeading) {
            const aboutSection = aboutHeading.parentElement;
            const existingParagraphs = aboutSection.querySelectorAll('p');
            existingParagraphs.forEach(p => p.remove());

            if (personal.about && personal.about.paragraphs) {
                personal.about.paragraphs.forEach(p_text => {
                    const p = document.createElement('p');
                    p.className = 'about-intro-text';
                    p.textContent = p_text;
                    aboutSection.appendChild(p);
                });
            }
        }
    }

    applyFriendPageConfig() {
        const { friends, contact, friendPage } = this.config;

        // 设置友链介绍文本
        const introText = document.querySelector('.intro-text');
        if (introText && friendPage && friendPage.intro) {
            introText.innerHTML = friendPage.intro.replace(/{email}/g, contact.email);
        }

        // 生成友链列表
        this.generateFriendLinks(friends);
    }

    generateFriendLinks(friends) {
        const friendLinksGrid = document.querySelector('.friend-links-grid');
        if (!friendLinksGrid) return;

        // 添加自己的博客作为第一个
        const { links, personal } = this.config;
        const selfBlog = links.personalBlog || {
            name: links.blogName || "我的博客",
            url: links.blog,
            description: "我的个人博客"
        };
        
        let friendLinksHTML = `
            <a href="${selfBlog.url}" target="_blank" class="friend-card">
                <img class="friend-avatar" src="${personal.avatar}" alt="${selfBlog.name}">
                <div class="friend-info">
                    <div class="friend-name">${selfBlog.name}</div>
                    <div class="friend-url">${selfBlog.url.replace('https://', '')}</div>
                    <div class="friend-description">${selfBlog.description}</div>
                </div>
            </a>
        `;

        // 添加朋友们的博客
        if (friends && friends.length > 0) {
            friends.forEach(friend => {
                friendLinksHTML += `
                    <a href="${friend.url}" target="_blank" class="friend-card">
                        <img class="friend-avatar" src="${friend.avatar}" alt="${friend.name}">
                        <div class="friend-info">
                            <div class="friend-name">${friend.name}</div>
                            <div class="friend-url">${friend.url.replace('https://', '').replace('http://', '')}</div>
                            <div class="friend-description">${friend.description}</div>
                        </div>
                    </a>
                `;
            });
        }

        friendLinksGrid.innerHTML = friendLinksHTML;
    }

    applyLinksPageConfig() {
        const { otherLinks } = this.config;

        // 设置介绍文本
        const introText = document.querySelector('.intro-text');
        if (introText) {
            introText.innerHTML = `
                什么？你说你想要找点有用的链接？没问题！这里是我精心整理的一些链接，包含了我的朋友们的博客、其他有趣的网站以及一些实用的资源。希望你能在这里找到你需要的东西！如果你有任何建议或想法，欢迎通过邮件联系我哦！
            `;
        }

        // 生成链接部分
        this.generateLinksSection(otherLinks);
    }

    generateLinksSection(otherLinks) {
        const linksContainer = document.querySelector('.links-container');
        if (!linksContainer) return;

        let linksHTML = '';

        if (!otherLinks) {
            linksHTML = `
                <div class="link-section">
                    <h3 class="link-section-title">暂无链接</h3>
                    <div class="links-grid">
                        <div class="link-item">
                            <a href="#" target="_blank">敬请期待</a>
                            <div class="link-description">更多链接正在整理中...</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // 朋友们博客部分
            if (otherLinks.friendsBlogs && otherLinks.friendsBlogs.length > 0) {
                linksHTML += `
                    <div class="link-section">
                        <h3 class="link-section-title">朋友们 Blogger</h3>
                        <div class="links-grid">
                            ${otherLinks.friendsBlogs.map(link => `
                                <div class="link-item">
                                    <a href="${link.url}" target="_blank">${link.name}</a>
                                    <div class="link-description">${link.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // 其他网页部分
            if (otherLinks.otherPages && otherLinks.otherPages.length > 0) {
                linksHTML += `
                    <div class="link-section">
                        <h3 class="link-section-title">其他网页</h3>
                        <div class="links-grid">
                            ${otherLinks.otherPages.map(link => `
                                <div class="link-item">
                                    <a href="${link.url}" target="_blank">${link.name}</a>
                                    <div class="link-description">${link.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // 更多探索部分
            if (otherLinks.moreExplore && otherLinks.moreExplore.length > 0) {
                linksHTML += `
                    <div class="link-section">
                        <h3 class="link-section-title">更多探索</h3>
                        <div class="links-grid">
                            ${otherLinks.moreExplore.map(link => `
                                <div class="link-item">
                                    <a href="${link.url}" ${link.url.startsWith('mailto:') ? '' : 'target="_blank"'}>${link.name}</a>
                                    <div class="link-description">${link.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }

        linksContainer.innerHTML = linksHTML;
    }

    applyCopyrightPageConfig() {
        const { contact, meta, personal, links } = this.config;

        // 设置联系邮箱
        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink) {
            emailLink.href = `mailto:${contact.email}`;
            emailLink.textContent = contact.email;
        }

        // 设置页脚信息
        const footer = document.querySelector('footer');
        if (footer && meta.lastUpdated) {
            const footerHTML = `
                最后更新：${meta.lastUpdated}<br/>
                作者：${personal.englishName} / ${personal.name}<br/>
                主页：<a href="${links.homepage || '#'}">${personal.name} の 主页</a><br/>
                博客：<a href="${links.blog}">${links.blogName || "博客"}</a>
            `;
            footer.innerHTML = footerHTML;
        }
    }

    applyCommonConfig() {
        const { meta, links, personal } = this.config;

        // 设置页脚版权信息
        const footers = document.querySelectorAll('.footer');
        footers.forEach(footer => {
            const copyrightP = footer.querySelector('p:first-child');
            if (copyrightP) {
                // 使用配置中的版权信息，如果没有则动态生成
                const copyrightText = meta.copyright || `© ${new Date().getFullYear()} ${personal.name}`;
                copyrightP.textContent = copyrightText;
            }
            
            const secondP = footer.querySelector('p:nth-child(2)');
            if (secondP) {
                const copyrightLink = meta.copyrightLink || './copyright.html';
                secondP.innerHTML = `<a href="${copyrightLink}">Copyright</a> - ${personal.englishName}`;
            }
        });

        // 设置导航中的博客链接
        const blogLinks = document.querySelectorAll('a[href*="blog.yaten.xyz"], .sidebar-nav-link[href*="blog"]');
        blogLinks.forEach(link => {
            if (links.blog) {
                link.href = links.blog;
            }
        });

        // 设置所有"加载中..."的默认文本
        this.replaceLoadingTexts();
    }

    replaceLoadingTexts() {
        const { personal } = this.config;
        
        // 替换所有"加载中..."文本
        const loadingElements = document.querySelectorAll('*');
        loadingElements.forEach(element => {
            if (element.textContent === '加载中...' && element.children.length === 0) {
                // 根据元素的类名或上下文提供适当的替代文本
                if (element.classList.contains('sidebar-name')) {
                    element.textContent = personal.name;
                } else if (element.classList.contains('sidebar-title')) {
                    element.textContent = personal.title;
                } else if (element.classList.contains('intro-text')) {
                    element.textContent = '欢迎访问我的网站！';
                }
            }
        });
    }
}

// 页面加载完成后初始化配置加载器
document.addEventListener('DOMContentLoaded', function() {
    new ConfigLoader();
});