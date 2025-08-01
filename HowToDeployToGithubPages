## 如何部署至Github Pages

### Step 0. importantce

请给我们的项目点上一个 Star，这对我们来说真的很重要

确保你的电脑上已经安装 Git，Github Desktop（可选，推荐）已经注册 GitHub

### Step 1 获取仓库
```bash
单击右上角的Fork按钮
设置好仓库名后点击Create Fork
将会自动跳转至你所Fork的仓库
```


### Step 2. 下拉仓库
####1.通过Github Desktop
```bash
如已安装Github Desktop，单击“Code”按钮，点击“Open With Github Desktop”，设置好存储库位置后单击Clone
然后单击Open in XXX（你的IDE）
```
####2.通过Git
```bash
单击“Code”按钮，此时会出现Clone所需的地址（如https://github.com/XXX/Home-Pages.git）
在合适的地方打开终端（推荐PowerShell7 或者 Git Bash），运行：
git clone 你的仓库地址
# Example git clone https://github.com/XXX/Home-Pages.git
```

### Step 3.修改个人信息
使用你的IDE打开Clone后仓库所在的文件夹
编辑 `config.json` 文件即可：

### Step 4.提交更改
####1.通过Github Desktop
```bash
保存更改后的Json文件
在GitHub Desktop的左下角单击Commit to main 
等待提交后点击右侧的Push Origin
```
####2.通过Git
```bash
保存更改后的Json文件
在存储库的根目录打开终端（推荐PowerShell7 或者 Git Bash），运行：
git push origin main
```
### Step 5.配置Github Pages
```bash
进入你存储库的Github页面
依次点击Settings > Pages
将Build and deployment下的Source更改为Github Actions
然后单击顶部的Action标签，单击"I understand my workflows, go ahead and enable them"
之后单击左侧的"Deploy static content to Pages"
单击右侧的"Run Workflow"，并再单击一次"Run Workflow"
稍等片刻（可刷新几次），当左侧的黄色圆圈变成绿色对勾时，单击该Workflow的标题
此时如果不出意外的话就会在Summary中显示部署后网页的链接
```
### Step 6.Enjoy it
