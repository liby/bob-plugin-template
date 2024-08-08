import { supportLanguageList } from "./lang";
import { TextTranslate } from "./types/text-translate.type";
/**
 * @description
 *  Bob 主程序调用插件 translate 函数的时候，会设定一个超时时间，防止插件出现不回调的情况
 *
 * @remarks Bob 1.6.0+ 可用
 */
const pluginTimeoutInterval = () => 60;

const supportLanguages = () => {
  return supportLanguageList.map(([standardLang]) => standardLang);
}

const translate: TextTranslate = (_query) => {
  // Implementation here
};

export {
  pluginTimeoutInterval,
  supportLanguages,
  translate,
}