const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// 读取插件信息和发布信息
const pluginInfo = require('../public/info.json');
const appcast = require('../appcast.json');
const githubReleaseBaseURL = `${pluginInfo.homepage}/releases/download`;

function calculateSHA256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256');
  hash.update(fileBuffer);
  return hash.digest('hex');
}

function outputJSONSync(filePath, data) {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonString, 'utf8');
}

function createZipFile(version) {
  const distDir = path.join(__dirname, '../dist');
  const outputFilePath = path.join(distDir, `${pluginInfo.name}-${version}.bobplugin`);
  const command = `zip -j -r ${outputFilePath} ${distDir}/*`;

  execSync(command);
  return outputFilePath;
}

function updateAppcast(versionInfo, appcastDataPath) {
  let appcastVersions = appcast?.versions ?? [];

  const existingVersionIndex = appcastVersions.findIndex(item => item.version === versionInfo.version);

  if (existingVersionIndex === -1) {
    appcastVersions.unshift(versionInfo);  // 添加到开头
  } else {
    appcastVersions[existingVersionIndex] = versionInfo;  // 更新已有版本信息
  }

  const updatedAppcastData = {
    identifier: pluginInfo.identifier,
    versions: appcastVersions,
  };

  outputJSONSync(appcastDataPath, updatedAppcastData);
}

function main() {
  const versionNumber = pluginInfo.version;
  const pluginFileName = `${pluginInfo.name}-${versionNumber}.bobplugin`;
  const appcastFilePath = path.join(__dirname, '../appcast.json');

  // 创建 ZIP 文件
  const pluginFilePath = createZipFile(versionNumber);

  // 计算 SHA256
  const pluginSHA256 = calculateSHA256(pluginFilePath);

  // 更新 appcast.json
  const newVersionInfo = {
    version: versionNumber,
    desc: `${pluginInfo.homepage}/releases/tag/v${versionNumber}`,
    sha256: pluginSHA256,
    url: `${githubReleaseBaseURL}/v${versionNumber}/${pluginFileName}`,
    minBobVersion: pluginInfo.minBobVersion,
  };

  updateAppcast(newVersionInfo, appcastFilePath);
}

main();
