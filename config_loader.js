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
                blog: "https://blog.yaten.xyz"
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
        }
        return 'unknown';
    }

    applyPersonalInfo() {
        const { personal } = this.config;

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
        const introTexts = document.querySelectorAll('.intro-text');
        if (introTexts.length >= 3) {
            introTexts[0].textContent = personal.description.short;
            introTexts[1].textContent = personal.description.detail;
            introTexts[2].textContent = personal.description.additional;
        }

        // 设置特长特点
        const skillCards = document.querySelectorAll('.skill-card h3');
        if (personal.characteristics && skillCards.length > 0) {
            personal.characteristics.forEach((skill, index) => {
                if (skillCards[index]) {
                    skillCards[index].textContent = skill;
                }
            });
        }

        // 设置联系方式
        const contactItems = document.querySelectorAll('.contact-item');
        if (contactItems.length >= 4) {
            contactItems[0].querySelector('p').textContent = contact.email;
            contactItems[1].querySelector('p').textContent = contact.qq;
            contactItems[2].querySelector('p').textContent = contact.github;
            contactItems[3].querySelector('p').textContent = contact.messageBoard;
        }
    }

    applyFriendPageConfig() {
        const { friends } = this.config;

        // 设置友链介绍文本
        const introText = document.querySelector('.intro-text');
        if (introText) {
            introText.innerHTML = `
                如果你想要交换友链，请通过邮件联系我：<a href="mailto:${this.config.contact.email}">${this.config.contact.email}</a>
                <br>请在邮件中注明你的博客地址、网站名称、网站图标（或头像）以及介绍，我会尽快添加到这里。
                <br>这里属于友情链接哦！如果你是我的朋友，会同步添加到我的 <a href="links.html">网站</a> 页面。
            `;
        }

        // 生成友链列表
        this.generateFriendLinks(friends);
    }

    generateFriendLinks(friends) {
        const friendLinksGrid = document.querySelector('.friend-links-grid');
        if (!friendLinksGrid || !friends) return;

        // 添加自己的博客作为第一个
        const { links } = this.config;
        const selfBlog = links.personalBlog;
        
        let friendLinksHTML = `
            <a href="${selfBlog.url}" target="_blank" class="friend-card">
                <img class="friend-avatar" src="${this.config.personal.avatar}" alt="${selfBlog.name}">
                <div class="friend-info">
                    <div class="friend-name">${selfBlog.name}</div>
                    <div class="friend-url">${selfBlog.url.replace('https://', '')}</div>
                    <div class="friend-description">${selfBlog.description}</div>
                </div>
            </a>
        `;

        // 添加朋友们的博客
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
        if (!linksContainer || !otherLinks) return;

        let linksHTML = '';

        // 朋友们博客部分
        if (otherLinks.friendsBlogs) {
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
        if (otherLinks.otherPages) {
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
        if (otherLinks.moreExplore) {
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

        // 设置作者信息
        const authorSpan = document.querySelector('footer');
        if (authorSpan && meta.lastUpdated) {
            const footerText = authorSpan.innerHTML;
            // 更新最后更新日期
            const updatedFooter = footerText.replace(/最后更新：[\d年月日]+/, `最后更新：${meta.lastUpdated}`);
            // 更新作者名称
            const finalFooter = updatedFooter.replace(/作者：[^<\/]+/, `作者：${personal.englishName} / ${personal.name}`);
            // 更新主页链接
            const withHomepage = finalFooter.replace(/主页：<a href="[^"]*">.*?<\/a>/, `主页：<a href="${links.homepage}">${personal.name} の 主页</a>`);
            // 更新博客链接
            const withBlog = withHomepage.replace(/博客：<a href="[^"]*">.*?<\/a>/, `博客：<a href="${links.blog}">${links.blogName}</a>`);
            
            authorSpan.innerHTML = withBlog;
        }
    }

    applyCommonConfig() {
        const { meta, links } = this.config;

        // 设置页面标题中的版权信息
        const footers = document.querySelectorAll('.footer');
        footers.forEach(footer => {
            const copyrightP = footer.querySelector('p:first-child');
            if (copyrightP) {
                copyrightP.textContent = meta.copyright;
            }
            
            const copyrightLink = footer.querySelector('a[href*="copyright"]');
            if (copyrightLink) {
                copyrightLink.href = meta.copyrightLink;
            }
        });

        // 设置导航链接
        const blogLinks = document.querySelectorAll('a[href*="blog.yaten.xyz"]');
        blogLinks.forEach(link => {
            link.href = links.blog;
        });
    }
}

// 页面加载完成后初始化配置加载器
document.addEventListener('DOMContentLoaded', function() {
    new ConfigLoader();
});