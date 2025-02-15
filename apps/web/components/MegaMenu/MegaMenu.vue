<template>
  <header ref="referenceRef" :class="headerClass" class="relative w-full md:sticky z-10">
    <div class="w-full mx-auto border-0 bg-primary-500 border-neutral-200 py-1 px-4 xl:px-0">
      <div
        class="max-w-screen-2xl mx-auto flex justify-between items-center flex-wrap md:flex-nowrap"
        data-testid="navbar-top"
      >
        <div class="flex items-center">
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
              <li class="mr-2 flex items-center">
                <SfIconStarFilled size="xs" class="text-orange-400" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                <SfIconStarFilled size="xs" class="text-orange-400 -ml-1" />
                <span class="text-sm font-medium text-white">4,3</span>
              </li>
            </ul>
          </div>
        </div>

        <slot />
      </div>
    </div>

    <div v-if="viewport.isLessThan('lg')">
      <div class="flex justify-between bg-white border-25 m-3 p-2">
        <div class="custom-logo">
          <NuxtLink :to="localePath(paths.home)" :aria-label="t('goToHomepage')" class="flex">
            <UiVsfLogo />
          </NuxtLink>
        </div>

        <UiButton square :aria-label="t('closeMenu')" class="mr-4" :noClass="true" @click="openMenu([])">
          <SfIconMenu class="text-primary-500" />
        </UiButton>
      </div>
    </div>

    <div v-if="viewport.isGreaterOrEquals('lg')">
      <nav ref="floatingRef" class="fs-menu">
        <ul
          class="flex items-center justify-between px-4 xl:px-0 py-2 max-w-screen-2xl mx-auto"
          @blur="
            (event) => {
              if (!(event.currentTarget as Element).contains(event.relatedTarget as Element)) {
                close();
              }
            }
          "
        >
          <li v-if="categoryTree.length === 0" class="h-10" />

          <template v-for="(menuNode, index) in categoryTree" v-else :key="index">
            <li>
              <NuxtLink :to="localePath(generateCategoryLink(menuNode))">
                <button
                  ref="triggerReference"
                  :noClass="true"
                  data-testid="category-button"
                  class=""
                  @mouseenter="menuNode.childCount > 0 ? openMenu([menuNode.id]) : openMenu([])"
                  @click="menuNode.childCount > 0 ? openMenu([menuNode.id]) : openMenu([])"
                >
                  <span
                    class="text-secondary-500 font-semibold text-sm"
                    :class="categoryTreeGetters.getName(menuNode)"
                    >{{ categoryTreeGetters.getName(menuNode) }}</span
                  >
                  <SfIconChevronRight
                    v-if="menuNode.childCount > 0"
                    class="rotate-90 text-neutral-500 group-hover:text-neutral-700 group-active:text-neutral-900"
                  />
                </button>
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
                class="hidden md:grid gap-x-6 grid-cols-4 bg-white shadow-lg p-6 left-0 right-0 outline-none z-40"
                tabindex="0"
                @mouseleave="close()"
                @keydown.esc="focusTrigger(index)"
              >
                <template v-for="node in activeMenu.children" :key="node.id">
                  <template v-if="node.childCount === 0">
                    <ul>
                      <SfListItem
                        :tag="NuxtLink"
                        size="sm"
                        :href="localePath(generateCategoryLink(node))"
                        class="typography-text-sm mb-2"
                      >
                        {{ categoryTreeGetters.getName(node) }}
                      </SfListItem>
                    </ul>
                  </template>
                  <div v-else>
                    <SfListItem
                      :tag="NuxtLink"
                      size="sm"
                      :href="localePath(generateCategoryLink(node))"
                      class="typography-text-base font-medium text-neutral-900 whitespace-nowrap px-4 py-1.5 border-b border-b-neutral-200 border-b-solid"
                    >
                      {{ categoryTreeGetters.getName(node) }}
                    </SfListItem>
                    <ul class="mt-2">
                      <li v-for="child in node.children" :key="child.id">
                        <SfListItem
                          v-if="categoryTreeGetters.getName(child)"
                          :tag="NuxtLink"
                          size="sm"
                          :href="localePath(generateCategoryLink(child))"
                          class="typography-text-sm py-1.5"
                        >
                          {{ categoryTreeGetters.getName(child) }}
                        </SfListItem>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </li>

            <li v-if="index === 1" class="custom-logo bg-white border-25">
              <NuxtLink :to="localePath(paths.home)" :aria-label="t('goToHomepage')" class="flex px-5 py-1">
                <UiVsfLogo />
              </NuxtLink>
            </li>

            <!-- Statisches <li> wird nach dem vorletzten Element eingefügt -->
            <li v-if="index === categoryTree.length - 2" class="static">
              <a href="#"><span class="text-secondary-500 font-semibold text-sm">statischer Text</span></a>
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
        class="right-12 max-w-96 bg-white overflow-y-auto z-[1000]"
      >
        <nav class="fs-menu">
          <div class="flex items-center justify-between px-4 xl:px-0 py-2 max-w-screen-2xl mx-auto">
            <p class="typography-text-base font-medium">Browse products</p>
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
              <li v-if="node.childCount === 0">
                <SfListItem size="lg" :tag="NuxtLink" :href="localePath(generateCategoryLink(node))" @click="close()">
                  <div class="flex items-center">
                    <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                    <SfCounter class="ml-2">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                  </div>
                </SfListItem>
              </li>
              <li v-else>
                <SfListItem size="lg" tag="button" type="button" class="!p-0">
                  <div class="flex items-center w-100">
                    <NuxtLink class="flex-1 m-0 p-4 pr-0" :to="localePath(generateCategoryLink(node))" @click="close()">
                      <div class="flex items-center">
                        <p class="text-left">{{ categoryTreeGetters.getName(node) }}</p>
                        <SfCounter class="ml-2">{{ categoryTreeGetters.getCount(node) }}</SfCounter>
                      </div>
                    </NuxtLink>
                    <div class="flex justify-center items-center h-8 w-16" @click="goNext(node.id)">
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
  </header>
</template>

<script lang="ts" setup>
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
import { paths } from '~/utils/paths';

const { t } = useI18n();
const viewport = useViewport();
const localePath = useLocalePath();
const { buildCategoryMenuLink } = useLocalization();
const NuxtLink = resolveComponent('NuxtLink');
const props = defineProps<MegaMenuProps>();
const { close, open, isOpen, activeNode, category, setCategory } = useMegaMenu();
const { referenceRef, floatingRef, style } = useDropdown({
  isOpen,
  onClose: close,
  placement: 'bottom-start',
  middleware: [],
});
const categoryTree = ref(categoryTreeGetters.getTree(props.categories));

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

const drawerReference = ref();
const megaMenuReference = ref();
const triggerReference = ref();

const activeMenu = computed(() => (category.value ? findNode(activeNode.value, category.value) : null));

const trapFocusOptions = {
  activeState: isOpen,
  arrowKeysUpDown: true,
  initialFocus: 'container',
} as const;
useTrapFocus(
  computed(() => megaMenuReference.value?.[0]),
  trapFocusOptions,
);
useTrapFocus(drawerReference, trapFocusOptions);

const openMenu = (menuType: number[]) => {
  activeNode.value = menuType;
  open();
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

setCategory(categoryTree.value);

watch(
  () => props.categories,
  async (categories: CategoryTreeItem[]) => {
    categoryTree.value = categoryTreeGetters.getTree(categories);
    setCategory(categoryTree.value);
  },
);

const headerClass = computed(() => ({
  'z-[10]': isOpen.value,
}));
</script>
