/**
 * For more information please refer to documentation
 * https://github.com/vinissimus/next-translate#add-i18njs-config-file
 */

module.exports = {
  locales: ["en", "bm", "vi"],
  defaultLocale: process.env.DEFAULT_LOCALE,
  //option to detect computer / browser Accept-Language header. Setting false to enable locale set by nextjs
  //localeDetection: false,
  pages: {
    "*": ["common", "screen"]
  },
  loadLocaleFrom: (lang, ns) => {
    // You can use a dynamic import, fetch, whatever. You should
    // return a Promise with the JSON file.
    const translationFile = require(`./public/locales/${lang}/${ns}.json`);
    return Promise.resolve(translationFile);
  }
};
