export default {
  fallbackLocale: process.env.DEFAULTLANGUAGE ?? 'de',
  detectBrowserLanguage: false,
  numberFormats: {
    de: {
      currency: {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol',
      },
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'GBP',
        currencyDisplay: 'symbol',
      },
    },
  },
};
