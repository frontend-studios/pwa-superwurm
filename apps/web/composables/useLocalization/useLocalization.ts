import type { CategoryTreeItem } from '@plentymarkets/shop-api';
import { categoryTreeGetters } from '@plentymarkets/shop-api';
import type { Locale } from '#i18n';
import { createSharedComposable } from '@vueuse/core';

export const useLocalization = createSharedComposable(() => {
  const isOpen = ref(false);
  const toggle = () => (isOpen.value = !isOpen.value);

  /**
   * @description Function for wrapping the category language path.
   *
   * @param path category path that is provided by the category response to redirect after a language switch
   * @returns category path that is then navigated to
   * @example buildCategoryLanguagePath('')
   */
  const buildCategoryLanguagePath = (path: string) => {
    const localePath = useLocalePath();

    return localePath(path);
  };

  /**
   * @description Function for wrapping the product language path.
   *
   * @param path product path that is provided by the product response to redirect after a language switch
   * @returns product path that is then navigated to
   * @example buildProductLanguagePath('')
   */
  const buildProductLanguagePath = (path: string) => {
    const localePath = useLocalePath();

    return localePath(path);
  };

  /**
   * @description Used to generate the category path inside the mega menu and other navigation trees.
   *
   * @param category
   * @param categoryTree
   * @returns product path that is then navigated to
   * @example buildCategoryMenuLink(category, categoryTree)
   */
  const buildCategoryMenuLink = (category: CategoryTreeItem, categoryTree: CategoryTreeItem[]) => {
    return categoryTreeGetters.generateCategoryLink(categoryTree, category, '');
  };

  /**
   * @description Used to generate the category path inside the mega menu and other navigation trees.
   *
   * @param path
   * @example getCategoryUrlFromRoute('')
   */
  const getCategoryUrlFromRoute = (path: string): string => {
    const parts = path.split('/');

    const { $i18n } = useNuxtApp();
    const { locale, defaultLocale, strategy } = $i18n;

    const shouldRemoveLocale = (strategy: string, locale: string, defaultLocale: string) => {
      if (strategy === 'prefix') {
        return true;
      }

      if (strategy === 'prefix_except_default') {
        return locale !== defaultLocale;
      }

      if (strategy === 'prefix_and_default') {
        return locale !== defaultLocale || parts[1] === locale;
      }

      return false;
    };

    if (shouldRemoveLocale(strategy, locale.value, defaultLocale)) {
      const localeIndex = parts.indexOf(locale.value);
      if (localeIndex !== -1) {
        parts.splice(localeIndex, 1);
      }
    }

    return parts.map((part) => (part.includes('?') ? part.split('?')[0] : part)).join('/');
  };

  /**
   * @description Function for creating a path with a specific locale. (useLocaleRoute or useLocalePath)
   * @param path  e.g. '/login'
   * @param locale to be added to the path
   * @returns localized path with the locale prefix if necessary
   * @example createLocalePath('/login', 'de');
   */
  const createLocalePath = (path: string, locale: string) => {
    const { locales } = useNuxtApp().$i18n;
    const localeCodes = locales.value.map((_locale) => _locale.code.toString());
    const localeSupported = localeCodes.includes(locale);
    const localeRoute = useLocaleRoute();
    const localePath = useLocalePath();

    if (localeSupported) {
      return localeRoute(path, locale as Locale);
    }
    return localePath(path);
  };

  /**
   * @description Function for switching app locale.
   * @param language
   *
   * @param hideMenu
   * @example switchLocale('en')
   */
  const switchLocale = async (language: Locale, hideMenu = true) => {
    const { getCart } = useCart();
    const switchLocalePath = useSwitchLocalePath();
    const route = useRoute();

    if (hideMenu) {
      toggle();
    }

    await navigateTo({
      path: switchLocalePath(language),
      query: route.query,
    });
    await getCart();
  };

  return {
    getCategoryUrlFromRoute,
    buildCategoryMenuLink,
    buildCategoryLanguagePath,
    buildProductLanguagePath,
    isOpen,
    toggle,
    switchLocale,
    createLocalePath,
  };
});
