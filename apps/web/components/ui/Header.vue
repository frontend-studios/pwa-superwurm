<template>
  <MegaMenu :categories="categoryTree">
    <template #navbar-content>
      <nav class="flex md:flex-row md:flex-nowrap items-center w-full md:w-auto justify-between">
        <UiButton
          v-if="viewport.isLessThan('lg')"
          variant="tertiary"
          class="group relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md cursor-pointer"
          square
          :aria-label="t('openSearchModalButtonLabel')"
          @click="searchModalOpen"
        >
          <SfIconSearch />
        </UiButton>

        <UiSearch class="opensearch flex-1 mr-2 z-20" v-if="viewport.isGreaterOrEquals('lg')" @click="close()" />

        <!-- Modal toggle -->
        <UiButton
          @click="openContactModal"
          class="group relative z-10 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md cursor-pointer"
          variant="tertiary"
          square
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="16px"
            height="14px"
            viewBox="0 0 16 14"
            version="1.1"
          >
            <g id="Page-1" stroke="none" stroke-width="2" fill="none" fill-rule="evenodd">
              <g id="Artboard" transform="translate(-1, 0)" stroke="#FFFFFF" stroke-width="2">
                <g id="noun-chat-336479" transform="translate(2, 1)">
                  <path
                    d="M4.866,1.631 C4.866,0.731 5.597,8.8817842e-16 6.497,8.8817842e-16 L12.235,8.8817842e-16 C13.135,8.8817842e-16 13.866,0.731 13.866,1.631 L13.866,4.893 C13.866,5.794 13.135,6.524 12.235,6.524 L11.123,6.524 L12.066,8.513 L9.591,6.524 L6.497,6.524 C5.597,6.524 4.866,5.794 4.866,4.893 L4.866,3.224 L4.866,1.631 Z"
                    id="Path"
                  ></path>
                  <path
                    d="M4.866,3.228 L4.866,4.893 C4.866,5.794 5.597,6.524 6.497,6.524 L9,6.524 L9,8.122 C9,9.022 8.269,9.753 7.369,9.753 L4.275,9.753 L1.8,11.742 L2.925,9.753 L1.631,9.753 C0.731,9.753 8.8817842e-16,9.022 8.8817842e-16,8.122 L8.8817842e-16,4.859 C8.8817842e-16,3.959 0.731,3.228 1.631,3.228 L4.866,3.228 Z"
                    id="Path"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <span class="hidden xl:inline text-sm">Service & Automaten</span>
        </UiButton>
        <!-- Main modal -->
        <UiModal
          v-if="isContactModalOpen"
          v-model="isContactModalOpen"
          tag="section"
          class="h-full md:w-[750px] max-w-xl md:h-fit m-0 p-0 overflow-y-auto contact-modal z-40"
        >
          <header>
            <UiButton
              :aria-label="t('closeDialog')"
              square
              variant="tertiary"
              class="absolute right-2 top-2"
              @click="closeContactModal"
            >
              <SfIconClose />
            </UiButton>
          </header>
          <div class="p-4">
            <p class="pt-2 custom-font text-secondary-500 text-xl">Öffnungszeiten:</p>
            <ul>
              <li>Montag: 08:00 – 13:30</li>
              <li>Dienstag: 08:00 – 13:30</li>
              <li>Mittwoch: 08:00 – 13:30</li>
              <li>Donnerstag: 08:00 – 13:30</li>
              <li>Freitag - Sonntag: Geschlossen</li>
            </ul>

            <p class="mt-5 custom-font text-secondary-500 text-xl">Kontakt:</p>
            <ul>
              <li class="mb-2">
                WhatsApp oder Telefon:
                <a href="tel:+4915225432222" class="underline hover:text-primary-500">+49 1522 5432222</a>
              </li>
              <li class="mb-2">
                E-Mail:
                <a href="mailto:info@superwurm.de" class="underline hover:text-primary-500">info@superwurm.de</a>
              </li>
            </ul>

            <p class="mt-5 custom-font text-secondary-500 text-xl">
              Adresse der Hauptzentrale<br />
              (Abholung an der Tür möglich)
            </p>
            <p>
              <span class="font-semibold">Superwurm GmbH & Co. KG</span> <br />
              Marktplatz 6 <br />
              52391 Vettweiß
            </p>

            <p class="mt-5 custom-font text-secondary-500 text-xl">Adressen unserer 24/7 Köderautomaten:</p>
            <ul>
              <li class="mb-2">
                <b class="block text-secondary-500">Köderautomat Düren</b>Dechant-Bohnekamp-Straße 116, 52349 Düren
              </li>
              <li class="mb-2">
                <b class="block text-secondary-500">Köderautomat Jülich</b>An der Rur 17, 52428 Jülich
              </li>
              <li>Weitere folgen...</li>
            </ul>
          </div>
        </UiModal>

        <UiButton
          v-if="viewport.isLessThan('lg') && viewport.isGreaterOrEquals('md')"
          class="group relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
          :tag="NuxtLink"
          :to="localePath(paths.wishlist)"
          :aria-label="t('numberInWishlist', { count: wishlistItemIds.length })"
          variant="tertiary"
          square
          data-testid="wishlist-page-navigation"
        >
          <template #prefix>
            <SfIconFavorite />
            {{ wishlistItemIds.length }}
          </template>
        </UiButton>

        <SfDropdown
          v-if="isAuthorized && viewport.isLessThan('lg')"
          v-model="isAccountDropdownOpen"
          placement="bottom-end"
          class="z-50"
        >
          <template #trigger>
            <UiButton
              variant="tertiary"
              class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 rounded-md"
              :class="{ 'bg-primary-700 text-white': isAccountDropdownOpen }"
              data-testid="account-dropdown-button"
              @click="accountDropdownToggle()"
            >
              <template #prefix>
                <SfIconPerson />
              </template>
              {{ user.user?.firstName }}
            </UiButton>
          </template>
          <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
            <li v-for="({ label, link }, labelIndex) in accountDropdown" :key="`label-${labelIndex}`">
              <template v-if="label === t('account.logout')">
                <UiDivider class="my-2" />
                <SfListItem tag="button" class="text-left" data-testid="account-dropdown-logout-item" @click="logOut()">
                  {{ label }}
                </SfListItem>
              </template>
              <SfListItem
                v-else
                :tag="NuxtLink"
                :to="link"
                :class="{ 'bg-neutral-200': route.path === link }"
                data-testid="account-dropdown-list-item"
              >
                {{ label }}
              </SfListItem>
            </li>
          </ul>
        </SfDropdown>
        <UiButton
          v-else-if="viewport.isLessThan('lg')"
          class="group relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
          variant="tertiary"
          :tag="NuxtLink"
          @click="navigateToLogin"
          :aria-label="t('auth.login.openLoginForm')"
          square
        >
          <SfIconPerson />
        </UiButton>

        <UiButton
          v-if="viewport.isLessThan('lg')"
          class="group relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
          :tag="NuxtLink"
          :to="localePath(paths.cart)"
          :aria-label="t('numberInCart', { count: cartItemsCount })"
          variant="tertiary"
          square
          @mouseover="isHovered = true"
          @mouseleave="isHovered = false"
        >
          <template #prefix>
            <img
              v-if="cartItemsCount == 0"
              src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/header/basket-hover.png"
              alt="Warenkorb"
              class="basket-icons"
            />
            <img
              v-else
              src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/header/basket-full-hover.png"
              alt="voller Warenkorb"
              class="basket-icons"
            />

            <span class="text-sm font-bold"
              >{{
                cartTotalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              }}
              €</span
            >
          </template>
        </UiButton>
      </nav>
    </template>
    <template #fscart>
      <UiButton
        class="cart-button group relative text-secondary-500 hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
        :tag="NuxtLink"
        :to="localePath(paths.cart)"
        :aria-label="t('numberInCart', { count: cartItemsCount })"
        variant="tertiary"
        square
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <template #prefix>
          <img
            :src="cartImageSrc"
            :alt="cartItemsCount === 0 ? 'Warenkorb' : 'voller Warenkorb'"
            class="basket-icons"
          />
          <span class="text-sm font-bold text-nowrap"
            >{{
              cartTotalPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }}
            €</span
          >
        </template>
      </UiButton>
    </template>
    <template #fsuser>
      <SfDropdown v-if="isAuthorized" v-model="isAccountDropdownOpen" placement="bottom-end" class="z-50">
        <template #trigger>
          <UiButton
            variant="tertiary"
            class="relative text-secondary-500 hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 rounded-md"
            :class="{ 'bg-primary-700': isAccountDropdownOpen }"
            data-testid="account-dropdown-button"
            @click="accountDropdownToggle()"
          >
            <template #prefix>
              <SfIconPerson />
            </template>
            {{ user.user?.firstName }}
          </UiButton>
        </template>
        <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
          <li v-for="({ label, link }, labelIndex) in accountDropdown" :key="`label-${labelIndex}`">
            <template v-if="label === t('account.logout')">
              <UiDivider class="my-2" />
              <SfListItem tag="button" class="text-left" data-testid="account-dropdown-logout-item" @click="logOut()">
                {{ label }}
              </SfListItem>
            </template>
            <SfListItem
              v-else
              :tag="NuxtLink"
              :to="link"
              :class="{ 'bg-neutral-200': route.path === link }"
              data-testid="account-dropdown-list-item"
            >
              {{ label }}
            </SfListItem>
          </li>
        </ul>
      </SfDropdown>
      <UiButton
        v-else
        class="group relative text-secondary-500 hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
        variant="tertiary"
        :aria-label="t('auth.login.openLoginForm')"
        square
        @click="navigateToLogin"
      >
        <SfIconPerson />
      </UiButton>
    </template>

    <template #fswish>
      <UiButton
        class="group relative text-secondary-500 hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
        :tag="NuxtLink"
        :to="localePath(paths.wishlist)"
        :aria-label="t('numberInWishlist', { count: wishlistItemIds.length })"
        variant="tertiary"
        square
        data-testid="wishlist-page-navigation"
      >
        <template #prefix>
          <SfIconFavoriteFilled v-if="wishlistItemIds.length > 0" />
          <SfIconFavorite v-else />
        </template>
      </UiButton>
    </template>
  </MegaMenu>
  <LanguageSelector />
  <UiModal
    v-if="isAuthenticationOpen"
    v-model="isAuthenticationOpen"
    tag="section"
    class="login-modal h-full md:w-[500px] md:h-fit m-0 p-0 overflow-y-auto"
  >
    <header>
      <UiButton
        :aria-label="t('closeDialog')"
        square
        variant="tertiary"
        class="absolute right-2 top-2"
        @click="closeAuthentication"
      >
        <SfIconClose />
      </UiButton>
    </header>
    <LoginComponent v-if="isLogin" :is-modal="true" @change-view="isLogin = false" @logged-in="closeAuthentication" />
    <Register v-else :is-modal="true" @change-view="isLogin = true" @registered="closeAuthentication" />
  </UiModal>

  <NuxtLazyHydrate when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="w-full h-full z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <UiButton square variant="tertiary" class="absolute right-4 top-2" @click="searchModalClose" :aria-label="t('closeDialog')">
          <SfIconClose class="text-neutral-500" />
        </UiButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">
          {{ t('search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import {
  SfBadge,
  SfDropdown,
  SfIconClose,
  SfIconLanguage,
  SfIconPerson,
  SfIconSearch,
  SfIconShoppingCart,
  SfIconTune,
  SfListItem,
  SfModal,
  SfIconFavorite,
  SfIconFavoriteFilled,
  useDisclosure,
  SfIconContactSupport,
  SfIconEmail,
} from '@storefront-ui/vue';
import LanguageSelector from '~/components/LanguageSelector/LanguageSelector.vue';
import { paths } from '~/utils/paths';

const isLogin = ref(true);
const { data: cart } = useCart();
const { wishlistItemIds } = useWishlist();
const cartItemsCount = ref(0);
const { iconColor, headerBackgroundColor } = useSiteConfiguration();
const { close } = useMegaMenu();

const NuxtLink = resolveComponent('NuxtLink');
// const { t, localeCodes } = useI18n();
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isAuthenticationOpen, open: openAuthentication, close: closeAuthentication } = useDisclosure();
const { open: searchModalOpen, isOpen: isSearchModalOpen, close: searchModalClose } = useDisclosure();

const { toggle: toggleLanguageSelect, isOpen: isLanguageSelectOpen } = useLocalization();
const { data: categoryTree } = useCategoryTree();
const { data: user, isAuthorized, logout } = useCustomer();
const viewport = useViewport();
const runtimeConfig = useRuntimeConfig();
const showConfigurationDrawer = runtimeConfig.public.showConfigurationDrawer;
const { isEditing, disableActions } = useEditor();
const isActive = computed(() => isLanguageSelectOpen);

onNuxtReady(() => {
  cartItemsCount.value = cart.value?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
});

const { isOpen, open } = useDisclosure();
const cartTotalPrice = computed(() => {
  return cart.value?.items?.reduce((total, { quantity, price }) => total + quantity * price, 0) ?? 0;
});

cartItemsCount.value = cart.value?.items?.reduce((count, { quantity }) => count + quantity, 0) ?? 0;
// Beobachte Änderungen an `cart.value?.items`, um `cartItemsCount` zu aktualisieren
watch(
  () => cart.value?.items,
  (cartItems) => {
    cartItemsCount.value = cartItems?.reduce((count, { quantity }) => count + quantity, 0) ?? 0;
  },
  { deep: true },
);

watch(
  () => isAuthenticationOpen.value,
  async () => {
    isLogin.value = true;
  },
);

const logOut = async () => {
  accountDropdownToggle();
  await logout();
  navigateTo(localePath(paths.home));
};

const accountDropdown = computed(() => [
  {
    label: t('account.heading'),
    link: localePath(paths.account),
  },
  {
    label: t('account.ordersAndReturns.section.myOrders'),
    link: localePath(paths.accountMyOrders),
  },
  {
    label: t('account.ordersAndReturns.section.returns'),
    link: localePath(paths.accountReturns),
  },
  {
    label: t('account.logout'),
  },
]);
const navigateToLogin = () => {
  if (route.path !== localePath(paths.authLogin)) {
    openAuthentication();
  }
};

const isContactModalOpen = ref(false);

const openContactModal = () => {
  isContactModalOpen.value = true;
};

const closeContactModal = () => {
  isContactModalOpen.value = false;
};

const isHovered = ref(false);

const cartImageSrc = computed(() => {
  if (cartItemsCount.value === 0) {
    return isHovered.value
      ? 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/header/basket-hover.png'
      : 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/header/basket.png';
  } else {
    return isHovered.value
      ? 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/header/basket-full-hover.png'
      : 'https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/header/basket-full.png';
  }
});
</script>
