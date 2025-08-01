# 个人网站配置系统

## 概述

这个系统通过一个配置文件 `config.json` 来统一管理所有网页的个人信息，实现一处修改、多处同步的效果。

## 文件结构

```
project/
├── config.json          # 个人信息配置文件
├── config-loader.js     # 配置加载器脚本
├── index.html           # 主页
├── friend.html          # 友链页面
├── links.html           # 网站链接页面
└── copyright.html       # 版权声明页面
```

## 使用方法

### 1. 修改个人信息

只需要编辑 `config.json` 文件即可：

```json
{
  "personal": {
    "name": "你的名字",
    "englishName": "YourEnglishName",
    "title": "你的座右铭",
    "avatar": "头像链接",
    "description": {
      "short": "简短介绍",
      "detail": "详细介绍",
      "additional": "补充信息"
    },
    "characteristics": ["特点1", "特点2", "..."]
  },
  "contact": {
    "email": "your@email.com",
    "qq": "你的QQ号",
    "github": "github.com/yourusername"
  }
}
```

### 2. 添加/修改友链

在 `config.json` 的 `friends` 数组中添加或修改：

```json
{
  "friends": [
    {
      "name": "朋友名字",
      "url": "朋友网站链接",
      "avatar": "朋友头像链接",
      "description": "朋友网站描述"
    }
  ]
}
```

### 3. 修改其他链接

在 `config.json` 的 `otherLinks` 部分修改各种链接分类。

### 4. 在HTML文件中引用

每个HTML文件需要引入配置加载器：

```html
<!-- 在</body>标签前添加 -->
<script src="config-loader.js"></script>
```

## 配置项说明

### personal - 个人基本信息
- `name`: 显示名称
- `englishName`: 英文名称
- `title`: 个人标语/座右铭
- `avatar`: 头像图片链接
- `avatarFallback`: 头像加载失败时的替代字符
- `description`: 个人介绍（分为short、detail、additional三部分）
- `characteristics`: 个人特点数组

### contact - 联系方式
- `email`: 邮箱地址
- `qq`: QQ号码
- `github`: GitHub用户名
- `messageBoard`: 留言板链接

### links - 相关链接
- `blog`: 博客链接
- `homepage`: 主页链接
- `personalBlog`: 个人博客信息对象

### friends - 友链列表
数组格式，每个对象包含name、url、avatar、description

### otherLinks - 其他链接分类
- `friendsBlogs`: 朋友们的博客
- `otherPages`: 其他页面
- `moreExplore`: 更多探索

### meta - 元信息
- `copyright`: 版权信息
- `copyrightLink`: 版权页面链接
- `lastUpdated`: 最后更新时间

## 优势

1. **统一管理**: 所有个人信息集中在一个文件中
2. **自动同步**: 修改配置文件后，所有页面自动更新
3. **易于维护**: 不需要逐个修改HTML文件
4. **灵活扩展**: 可以轻松添加新的配置项
5. **降级支持**: 配置文件加载失败时使用默认配置

## 注意事项

1. 确保 `config.json` 文件格式正确（可以使用JSON验证工具检查）
2. 图片链接需要是可访问的URL
3. 如果不需要localStorage功能，配置加载器会自动处理
4. 建议定期备份 `config.json` 文件

## 自定义扩展

如果需要添加新的配置项：

1. 在 `config.json` 中添加新的字段
2. 在 `config-loader.js` 中的相应方法里添加处理逻辑
3. 确保HTML文件中有对应的元素可以被更新

这样就可以实现真正的"一处修改，处处生效"的个人信息管理系统！