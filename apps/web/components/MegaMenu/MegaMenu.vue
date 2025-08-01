<template>
  <header ref="referenceRef" :class="headerClass" class="mb-2 w-full top-0 z-20 v1-25-0">
    <div class="hidden w-full mx-auto border-0 bg-red-700 py-1 px-4 xl:px-0">
      <p class="text-center text-white font-medium text-sm">
        Der Versand von Lebendware ist wegen der aktuellen Hitze vorübergehend ausgesetzt. Sobald es kühler wird,
        versenden wir wieder wie gewohnt. Vielen Dank für Ihr Verständnis!
      </p>
    </div>
    <div class="w-full mx-auto border-0 bg-primary-500 border-neutral-200 py-1 px-4 xl:px-0">
      <div
        class="max-w-screen-2xl mx-auto flex justify-between items-center flex-wrap md:flex-nowrap"
        data-testid="navbar-top"
      >
        <div class="hidden sm:flex items-center">
          <div>
            <ul class="flex">
              <li class="mr-2 hidden xl:block">
                <SfIconCheck size="xs" class="text-white" />
                <span class="text-sm font-medium text-white ml-1">Top-Preise</span>
              </li>
              <li class="mr-2 hidden xl:block">
                <SfIconCheck size="xs" class="text-white" />
                <span class="text-sm font-medium text-white ml-1">Hochwertige Qualität</span>
              </li>
              <li class="mr-2 hidden xl:block">
                <SfIconCheck size="xs" class="text-white" />
                <span class="text-sm font-medium text-white ml-1">Bester Service</span>
              </li>
              <li class="mr-2 flex items-center relative z-10">
                <a href="/#bewertung">
                  <SfIconStarFilled size="xs" class="text-orange-400" />
                  <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                  <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                  <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                  <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                  <span class="text-sm font-medium text-white">4,8</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <slot name="navbar-content" />
      </div>
    </div>

    <div class="text-center logo-row">
      <div class="flex justify-between lg:inline-block bg-white border-25 p-2 mx-2 mx-md-3">
        <div class="custom-logo">
          <NuxtLink :to="localePath(paths.home)" :aria-label="t('goToHomepage')" class="flex">
            <UiVsfLogo />
          </NuxtLink>
        </div>

        <UiButton
          square
          :aria-label="t('closeMenu')"
          class="mr-4"
          :noClass="true"
          @click="openMenu([])"
          v-if="viewport.isLessThan('lg')"
        >
          <SfIconMenu class="text-primary-500" />
        </UiButton>
      </div>
    </div>

    <div class="fs-menu-wrapper flex justify-between px-3 xl:px-0 max-w-screen-2xl mx-auto">
      <div v-if="viewport.isGreaterOrEquals('lg')" class="w-full fs-menu">
        <nav ref="floatingRef">
          <ul
            class="flex items-center justify-between px-4 xl:px-0"
            @blur="
              (event: FocusEvent) => {
                if (!(event.currentTarget as Element).contains(event.relatedTarget as Element)) {
                  close();
                }
              }
            "
          >
            <li v-if="categoryTree.length === 0" class="h-10" />

            <template v-for="(menuNode, index) in categoryTree" v-else :key="index">
              <li :class="`cat-${menuNode.id}`">
                <NuxtLink :to="localePath(generateCategoryLink(menuNode))">
                  <div
                    ref="triggerReference"
                    :noClass="true"
                    data-testid="category-button"
                    :class="[
                      'py-2 px-1 border-b-2',
                      isActive(menuNode) ? 'border-primary-500' : 'border-transparent',
                      'hover:border-primary-500',
                    ]"
                    @mouseenter="onCategoryMouseEnter(menuNode)"
                    @click="onCategoryTap(menuNode)"
                  >
                    <span
                      class="text-secondary-500 font-semibold text-sm"
                      :class="categoryTreeGetters.getName(menuNode)"
                      >{{ categoryTreeGetters.getName(menuNode) }}</span
                    >
                  </div>
                </NuxtLink>

                <div
                  v-if="
                    isOpen &&
                    activeMenu &&
                    activeNode.length === 1 &&
                    activeNode[0] === menuNode.id &&
                    menuNode.childCount > 0
                  "
                  :key="activeMenu.id"
                  ref="megaMenuReference"
                  :style="style"
                  class="relative fs-submenu p-6 z-40 w-full"
                  tabindex="0"
                  @mouseleave="onMouseLeave"
                  @keydown.esc="focusTrigger(index)"
                >
                  <div class="flex max-w-screen-2xl mx-auto w-full justify-between">
                    <div class="sub-wrapper md:grid gap-x-6 grid-cols-4">
                      <template v-for="node in activeMenu.children" :key="node.id">
                        <template v-if="node.childCount === 0">
                          <ul class="submenu mb-3">
                            <a
                              :tag="NuxtLink"
                              size="sm"
                              :href="localePath(generateCategoryLink(node))"
                              class="item px-4 py-1"
                              :noClass="true"
                            >
                              {{ categoryTreeGetters.getName(node) }}
                            </a>
                          </ul>
                        </template>
                        <div v-else class="submenu">
                          <a
                            :tag="NuxtLink"
                            size="sm"
                            :href="localePath(generateCategoryLink(node))"
                            class="item px-4 py-1"
                            :noClass="true"
                          >
                            {{ categoryTreeGetters.getName(node) }}
                          </a>
                          <ul class="mt-2">
                            <li v-for="child in node.children" :key="child.id">
                              <SfListItem
                                v-if="categoryTreeGetters.getName(child)"
                                :tag="NuxtLink"
                                size="sm"
                                :href="localePath(generateCategoryLink(child))"
                                :noClass="true"
                                class="typography-text-sm py-1.5"
                              >
                                {{ categoryTreeGetters.getName(child) }}
                              </SfListItem>
                            </li>
                          </ul>
                        </div>
                      </template>
                    </div>
                    <div
                      v-if="menuNode.id === 486"
                      class="static-element w-full min-h-full bg-primary-500 border-25 max-w-80"
                    >
                      <div class="flex flex-col p-5 h-full justify-center">
                        <img
                          src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/prev_logo/Superwurm_Bildmarke_RGB_cropped.png"
                          alt="Superwurm W"
                          class="max-w-8 mx-auto"
                        />
                        <p class="custom-font text-white text-2xl text-center mb-2">Unser Wurmfinder</p>
                        <p class="custom-font text-white text-xl text-center mb-2">
                          Finde den passenden Köder für deinen Fang!
                        </p>
                        <div class="relative text-center mt-3">
                          <a href="#" class="bg-secondary-500 text-white border-25 p-3">Zu unserem Finder!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </nav>
      </div>

      <template v-else>
        <div v-if="isOpen" class="fixed z-[50] inset-0 bg-neutral-500 bg-opacity-50" />
        <SfDrawer
          ref="drawerReference"
          v-model="isOpen"
          placement="left"
          class="right-12 max-w-96 overflow-y-auto z-[1000] mobile-menu"
        >
          <nav class="fs-mobile-menu">
            <div class="flex items-center justify-between px-4 xl:px-0 py-2 max-w-screen-2xl mx-auto">
              <p class="typography-text-base font-medium">Kategorien</p>
              <UiButton variant="tertiary" square :aria-label="t('closeMenu')" class="ml-2" @click="close()">
                <SfIconClose class="text-neutral-500" />
              </UiButton>
            </div>
            <ul v-if="activeMenu" class="mt-2 mb-6">
              <li v-if="activeMenu.id !== 0">
                <SfListItem
                  size="lg"
                  tag="button"
                  type="button"
                  class="border-b border-b-neutral-200 border-b-solid"
                  @click="goBack()"
                >
                  <div class="flex items-center">
                    <SfIconArrowBack class="text-neutral-500" />
                    <p class="ml-5 font-medium">{{ categoryTreeGetters.getName(activeMenu) }}</p>
                  </div>
                </SfListItem>
              </li>
              <template v-for="node in activeMenu.children" :key="node.id">
                <li v-if="node.childCount === 0" :class="`cat-${categoryTreeGetters.getName(node)}`">
                  <SfListItem
                    size="lg"
                    :tag="NuxtLink"
                    :href="localePath(generateCategoryLink(node))"
                    @click="close()"
                    :data-id="node.id"
                  >
                    <div class="flex items-center">
                      <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                      <SfCounter class="ml-2">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                    </div>
                  </SfListItem>
                </li>
                <li v-else :class="`cat-${categoryTreeGetters.getName(node)}`">
                  <SfListItem size="lg" tag="button" type="button" class="!p-0">
                    <div class="flex items-center w-100">
                      <NuxtLink
                        class="flex-1 m-0 p-4 pr-0"
                        :to="localePath(generateCategoryLink(node))"
                        @click="close()"
                        :data-id="node.id"
                      >
                        <div class="flex items-center">
                          <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                          <SfCounter class="ml-2">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                        </div>
                      </NuxtLink>
                      <div
                        class="flex justify-center items-center h-8 w-16 mobile-menu-button"
                        @click="goNext(node.id)"
                      >
                        <SfIconChevronRight class="text-neutral-500" />
                      </div>
                    </div>
                  </SfListItem>
                </li>
              </template>
            </ul>
          </nav>
        </SfDrawer>
      </template>
      <div class="flex ml-5" v-if="viewport.isGreaterOrEquals('lg')">
        <slot name="fswish"></slot>
        <slot name="fsuser"></slot>
        <slot name="fscart"></slot>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import {
  SfIconClose,
  SfDrawer,
  SfListItem,
  SfIconChevronRight,
  SfCounter,
  SfIconArrowBack,
  SfIconMenu,
  useTrapFocus,
  useDropdown,
  SfIconCheck,
  SfIconStarFilled,
} from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';

import type { MegaMenuProps } from '~/components/MegaMenu/types';
const props = defineProps<MegaMenuProps>();
import { paths } from '~/utils/paths';
const NuxtLink = resolveComponent('NuxtLink');

const { t } = useI18n();
const viewport = useViewport();
const localePath = useLocalePath();
const { buildCategoryMenuLink } = useLocalization();
const { getSetting: getHeaderBackgroundColor } = useSiteSettings('headerBackgroundColor');
const headerBackgroundColor = computed(() => getHeaderBackgroundColor());
const router = useRouter();

const { close, open, isOpen, activeNode, category, setCategory } = useMegaMenu();
const { setDrawerOpen } = useDrawerState();
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom-start',
  middleware: [],
});

const isTouchDevice = ref(false);
const categoryTree = ref(categoryTreeGetters.getTree(props.categories));
const drawerReference = ref();
const megaMenuReference = ref();
const triggerReference = ref();
const tappedCategories = ref<Map<number, boolean>>(new Map());
let removeHook: () => void;
const trapFocusOptions = {
  activeState: isOpen,
  arrowKeysUpDown: true,
  initialFocus: 'container',
} as const;
const activeMenu = computed(() => (category.value ? findNode(activeNode.value, category.value) : null));
const headerClass = computed(() => ({ 'z-[10]': isOpen.value }));
const route = useRoute();

const findNode = (keys: number[], node: CategoryTreeItem): CategoryTreeItem => {
  if (keys.length > 1) {
    const [currentKey, ...restKeys] = keys;
    return findNode(restKeys, node.children?.find((child) => child.id === currentKey) || node);
  } else {
    return node.children?.find((child) => child.id === keys[0]) || node;
  }
};

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};

const openMenu = (menuType: number[]) => {
  activeNode.value = menuType;
  open();
  setDrawerOpen(true);
};

const goBack = () => {
  activeNode.value = activeNode.value.slice(0, -1);
};

const goNext = (key: number) => {
  activeNode.value = [...activeNode.value, key];
};

const focusTrigger = (index: number) => {
  unrefElement(triggerReference.value[index]).focus();
};

const isActive = (menuNode: CategoryTreeItem) => {
  return route.path === localePath(generateCategoryLink(menuNode));
};

const onMouseLeave = () => {
  close();
  tappedCategories.value.clear();
};
const onCategoryMouseEnter = (menuNode: CategoryTreeItem) => {
  if (!viewport.isGreaterOrEquals('lg')) return;
  if (menuNode.childCount > 0) {
    activeNode.value = [menuNode.id];
    open();
    setCategory([menuNode]);
    return;
  }
  if (category.value !== null) category.value = null;
};
const handleFirstTouch = (menuNode: CategoryTreeItem) => {
  tappedCategories.value.set(menuNode.id, true);
  onCategoryMouseEnter(menuNode);
};
const onCategoryTap = (menuNode: CategoryTreeItem) => {
  if (menuNode.childCount > 0 && isTouchDevice.value && !tappedCategories.value.get(menuNode.id)) {
    return handleFirstTouch(menuNode);
  }
  router.push(localePath(generateCategoryLink(menuNode)));
};
onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  removeHook = router.afterEach(() => close());
});
onBeforeUnmount(() => removeHook?.());

watch(
  () => props.categories,
  (categories: CategoryTreeItem[]) => {
    categoryTree.value = categoryTreeGetters.getTree(categories);
    setCategory(categoryTree.value);
  },
);

setCategory(categoryTree.value);
useTrapFocus(
  computed(() => megaMenuReference.value?.[0]),
  trapFocusOptions,
);
useTrapFocus(drawerReference, trapFocusOptions);

const isScrolled = ref(false);
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

const SCROLL_THRESHOLD = 50;
const SCROLL_HYSTERESIS = 10; // Pufferbereich

const handleScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > SCROLL_THRESHOLD + SCROLL_HYSTERESIS && !isScrolled.value) {
      isScrolled.value = true;
    } else if (currentScrollY < SCROLL_THRESHOLD - SCROLL_HYSTERESIS && isScrolled.value) {
      isScrolled.value = false;
    }
  }, 100);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  window.removeEventListener('scroll', handleScroll);
});
</script>
