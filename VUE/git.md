Git 命令全面指南
一、基础工作流命令
1. 初始化与克隆
# 初始化新仓库
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-project # 克隆到指定目录

2. 添加与提交
# 添加文件到暂存区
git add file.txt         # 添加单个文件
git add .                # 添加所有修改和新文件
git add -u               # 添加所有修改（不包括新文件）

# 提交更改
git commit -m "提交信息"
git commit -am "提交信息" # 添加并提交所有已跟踪文件的修改

3. 状态与日志
# 查看状态
git status
git status -s            # 简洁状态显示

# 查看提交历史
git log
git log --oneline        # 简洁单行显示
git log --graph          # 图形化分支显示
git log -p               # 显示修改内容

二、分支管理
1. 分支操作
# 创建分支
git branch new-feature   # 创建新分支
git checkout -b hotfix   # 创建并切换到新分支

# 切换分支
git checkout main
git switch main          # Git 2.23+ 推荐方式

# 合并分支
git merge feature-branch

# 删除分支
git branch -d old-branch # 安全删除（已合并）
git branch -D force-delete # 强制删除（未合并）

2. 远程分支
# 推送分支到远程
git push origin new-feature

# 跟踪远程分支
git checkout --track origin/remote-branch

# 删除远程分支
git push origin --delete old-branch

三、远程仓库操作
1. 远程仓库管理
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add upstream https://github.com/other/repo.git

# 重命名远程仓库
git remote rename origin new-origin

# 移除远程仓库
git remote remove upstream

2. 拉取与推送
# 拉取远程更新
git pull                 # 等同于 fetch + merge
git pull --rebase        # 使用 rebase 代替 merge

# 推送到远程
git push
git push -u origin main  # 首次推送设置上游分支
git push --force         # 强制推送（谨慎使用）

四、撤销与重置
1. 撤销工作区修改
# 丢弃工作区修改
git restore file.txt     # Git 2.23+
git checkout -- file.txt # 旧版本方式

# 取消暂存
git restore --staged file.txt
git reset HEAD file.txt  # 旧版本方式

2. 提交操作
# 修改最后一次提交
git commit --amend

# 撤销提交
git reset HEAD~1         # 保留修改（软重置）
git reset --hard HEAD~1  # 丢弃修改（硬重置）

# 创建撤销提交
git revert commit-id

五、高级操作
1. 储藏与标签
# 储藏修改
git stash                # 储藏当前修改
git stash save "消息"     # 带消息储藏
git stash list           # 查看储藏列表
git stash apply          # 应用最近储藏
git stash pop            # 应用并删除储藏

# 标签管理
git tag v1.0             # 创建轻量标签
git tag -a v1.1 -m "版本1.1" # 创建附注标签
git push origin --tags   # 推送所有标签

2. 比较与查找
# 比较差异
git diff                 # 工作区与暂存区
git diff --staged        # 暂存区与最新提交
git diff commit1 commit2 # 两次提交间差异

# 查找内容
git grep "搜索词"         # 代码中搜索
git blame file.txt       # 查看文件修改历史

3. 配置与别名
# 用户配置
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 创建别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# 查看配置
git config --list

六、工作流示例
1. 标准功能开发流程
# 1. 获取最新代码
git checkout main
git pull

# 2. 创建功能分支
git checkout -b feature/new-login

# 3. 开发并提交
git add .
git commit -m "实现登录功能"

# 4. 推送到远程
git push -u origin feature/new-login

# 5. 创建Pull Request（在代码托管平台操作）

# 6. 合并后清理
git checkout main
git branch -d feature/new-login

2. 紧急修复流程
# 1. 基于生产分支创建修复分支
git checkout -b hotfix/issue-123 production

# 2. 修复并提交
git add .
git commit -m "修复问题#123"

# 3. 合并到生产和开发分支
git checkout production
git merge hotfix/issue-123

git checkout develop
git merge hotfix/issue-123

# 4. 删除修复分支
git branch -d hotfix/issue-123

七、实用技巧
1. 清理仓库
# 删除已合并的分支
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d

# 清理远程已删除的分支
git fetch --prune

2. 重写历史
# 交互式变基（修改最近3次提交）
git rebase -i HEAD~3

# 修改提交信息
git rebase -i HEAD~3
# 将需要修改的提交前的pick改为reword

3. 子模块管理
# 添加子模块
git submodule add https://github.com/user/repo.git

# 初始化子模块
git submodule init
git submodule update

# 更新子模块
git submodule update --remote

八、常见问题解决
1. 冲突解决
# 合并时发生冲突
git merge feature
# 解决冲突后
git add resolved-file.txt
git commit

2. 恢复丢失提交
# 查找丢失的提交
git reflog

# 恢复提交
git reset --hard commit-id

3. 大文件处理
# 安装Git LFS
git lfs install

# 跟踪大文件类型
git lfs track "*.psd"
git lfs track "*.zip"

# 查看跟踪的文件
git lfs ls-files

九、Git 可视化工具推荐

GitKraken - 跨平台GUI工具SourceTree - 免费Git GUIVS Code Git集成 - 内置Git支持GitHub Desktop - GitHub官方客户端Lazygit - 终端Git界面

提示：使用 git help <command> 查看任何命令的详细帮助文档。例如：git help rebase

