# Bob Plugin Template

## 使用说明

1. 点击 **Use this template** > [**Create a new repository**](https://github.com/new?template_name=bob-plugin-template)
2. 将你在第 1 步中创建好的仓库**克隆**到本地
3. 进入本地的仓库文件夹并运行依赖安装命令

    ```sh
    pnpm install
    ```

4. 打开 _public/info.json_ 文件，自定义插件信息，详情参见 [Bob 官网文档](https://bobtranslate.com/plugin/quickstart/info.html)。以下是必须修改的字段：
    1. `identifier`：插件的唯一标识符，必须由数字、小写字母和 . 组成。
    2. `name`：插件名称，例如：`openai-translator`。
    4. `homepage`：插件的主页，这里需要你填写你的插件的 GitHub 仓库地址。
    5. `appcast`：插件的更新地址。
5. **（可选）**，更新 _package.json_ 文件，例如 `name` 字段，将其修改为你的插件名称。
6. 开发完成后，记得先更新 _public/info.json_ 文件中的版本号，然后再运行以下命令打包插件

    ```sh
    pnpm run bump
    ```

    这条命令会先将插件打包输出到 _dist_ 文件夹中，而后自动更新 _appcast.json_ 文件。

## 开发环境

- [Node.js@20.16.0](https://nodejs.org/download/release/v20.16.0/)
- [pnpm@@9.7.0](https://github.com/pnpm/pnpm/releases/tag/v9.7.0)
