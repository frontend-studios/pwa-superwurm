export const metaDefaults = {
  title: process.env.METATITLE || process.env.NUXT_PUBLIC_META_TITLE || 'SUPERWURM | Angelwürmer, Garten-/ Kompostwürmer, Futterwürmer',
  description: process.env.METADESC || process.env.NUXT_PUBLIC_META_DESCRIPTION || 'Kompostwürmer, Angelwürmer, Futterwürmer, Nützlinge und Wurmhumus mit Lebendgarantie für Bestellungen in Deutschland – jetzt online kaufen!',
  keywords: process.env.METAKEYWORDS || process.env.NUXT_PUBLIC_META_KEYWORDS || 'Würmer, Wurm, Angelwürmer, Gartenwürmer, Kompostwürmer, Futterwürmer',
  robots: process.env.NUXT_PUBLIC_ROBOTS || 'all',
};

export const openGraph = {
  title: process.env.OG_TITLE || process.env.NUXT_PUBLIC_OG_TITLE || 'SUPERWURM',
  image: process.env.OG_IMG || process.env.NUXT_PUBLIC_OG_IMG || 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/Superwurm_Bildmarke_RGB_cropped.png',
  type: process.env.OG_TYPE || process.env.NUXT_PUBLIC_OG_TYPE || 'website',
};

export const favicon = {
  icon: process.env.FAVICON || process.env.NUXT_PUBLIC_FAVICON || 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/Superwurm_Bildmarke_RGB_cropped.png',
  appleTouchIcon: process.env.FAVICON || process.env.NUXT_PUBLIC_FAVICON || 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/Superwurm_Bildmarke_RGB_cropped.png',
};

export const appConfiguration = {
  head: {
    viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
    htmlAttrs: {
      lang: process.env.DEFAULTLANGUAGE ?? 'de',
    },
    meta: [
      { name: 'description', content: metaDefaults.description },
      { name: 'keywords', content: metaDefaults.keywords },
      { name: 'robots', content: metaDefaults.robots },

      { name: 'theme-color', content: '#0C7992' },      
      { property: 'og:title', content: openGraph.title },
      { property: 'og:type', content: openGraph.type },
      { property: 'og:image', content: openGraph.image },
    ],
    link: [
      { rel: 'icon', href: favicon.icon },
      { rel: 'apple-touch-icon', href: favicon.appleTouchIcon },
    ],    
    title: metaDefaults.title,
  },
};
