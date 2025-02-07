export const appConfiguration = {
  head: {
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
    htmlAttrs: {
      lang: process.env.DEFAULTLANGUAGE ?? 'de',
    },
    meta: [
      { name: 'shop-name', content: process.env.STORENAME || 'SUPERWURM' },
      {
        name: 'description',
        content: process.env.METADESC || 'SUPERWURM | Angelwürmer, Garten-/ Kompostwürmer, Futterwürmer',
      },
      {
        name: 'keywords',
        content: process.env.METAKEYWORDS || 'Würmer, Wurm, Angelwürmer, Gartenwürmer, Kompostwürmer, Futterwürmer',
      },
      { name: 'theme-color', content: '#0C7992' },
      { property: 'og:title', content: process.env.OGTITLE || 'SUPERWURM' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: process.env.OGIMAGE || '' },
      { property: 'og:url', content: process.env.API_ENDPOINT },
    ],
    link: [
      {
        rel: 'icon',
        href: 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/ListItemIcon-preview.png',
      },
      {
        rel: 'apple-touch-icon',
        href: 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/ListItemIcon-preview.png',
      },
    ],
    title: process.env.STORENAME || 'SUPERWURM | Angelwürmer, Garten-/ Kompostwürmer, Futterwürmer',
  },
};
