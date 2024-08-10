#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在 CI 环境中运行
if [ -n "$CI" ]; then
    echo -e "${YELLOW}检测到 CI 环境，自动跳过版本号确认。${NC}"
    exit 0
fi

# 提示用户是否已更新 info.json 中的版本号
echo -e "${YELLOW}请确认您是否已经更新了 ${GREEN}info.json${YELLOW} 中的版本号！${NC}"
echo -e "${YELLOW}如果已经更新，请按 ${GREEN}[y]${YELLOW} 继续。如果还没更新，请按 ${RED}[n]${YELLOW} 退出并更新版本号。${NC}"
read -p "您是否已更新版本号？(y/n): " -n 1 -r
echo    # move to a new line

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${RED}请先更新 info.json 中的版本号，然后再运行构建命令！${NC}"
    exit 1
else
    echo -e "${GREEN}版本号已确认。继续构建...${NC}"
fi
