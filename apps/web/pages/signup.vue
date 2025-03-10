<template>
  <NuxtLayout name="auth" :heading="$t('auth.signup.heading')">
    <UiAlert class="w-full p-4 md:p-6 mb-6 !justify-start typography-text-base" variant="neutral">
      <i18n-t keypath="auth.signup.bannerText" scope="global">
        <template #login>
          <SfLink
            :tag="NuxtLink"
            :to="localePath(paths.authLogin)"
            class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
            data-testid="signup-page-login-button"
          >
            {{ $t('auth.login.heading') }}
          </SfLink>
        </template>
      </i18n-t>
    </UiAlert>

    <form
      data-testid="signup-form"
      class="flex flex-col md:border md:border-neutral-200 rounded-md gap-4 md:p-6"
      @submit.prevent="open"
    >
      <label>
        <UiFormLabel>{{ $t('form.firstNameLabel') }} {{ $t('form.required') }}</UiFormLabel>
        <SfInput v-model="firstNameModel" name="firstName" autocomplete="given-name" required />
      </label>
      <label>
        <UiFormLabel>{{ $t('form.lastNameLabel') }} {{ $t('form.required') }}</UiFormLabel>
        <SfInput v-model="lastNameModel" name="lastName" autocomplete="family-name" required />
      </label>
      <label>
        <UiFormLabel>{{ $t('form.emailLabel') }} {{ $t('form.required') }}</UiFormLabel>
        <SfInput v-model="emailModel" name="email" type="email" autocomplete="email" required />
      </label>
      <div>
        <label>
          <UiFormLabel>{{ $t('form.passwordLabel') }} {{ $t('form.required') }}</UiFormLabel>
          <UiFormPasswordInput v-model="passwordModel" name="password" autocomplete="current-password" required />
          <UiFormHelperText class="mb-2">{{ $t('form.passwordHint') }}</UiFormHelperText>
        </label>
      </div>

      <div class="flex items-center">
        <SfCheckbox id="terms" v-model="termsAndConditionsModel" value="value" class="peer" required />
        <label class="ml-3 text-base text-neutral-900 cursor-pointer peer-disabled:text-disabled-900" for="terms">
          {{ $t('form.required') }}
          <i18n-t keypath="form.termsAndConditionsLabel">
            <template #terms>
              <SfLink
                href="#"
                class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
              >
                {{ $t('termsAndConditions') }}
              </SfLink>
            </template>
          </i18n-t>
        </label>
      </div>

      <div class="flex mb-2">
        <SfCheckbox id="subscription" v-model="subscriptionsModel" value="value" class="peer mt-0.5" />
        <label
          class="ml-3 text-base text-neutral-900 cursor-pointer peer-disabled:text-disabled-900"
          for="subscription"
        >
          {{ $t('form.subscriptionLabel') }}
        </label>
      </div>

      <p class="text-sm text-neutral-500 mt-0.5 mb-2">{{ $t('form.asterixHint') }}</p>

      <UiButton type="submit" size="lg" class="w-full">
        {{ $t('auth.signup.createButton') }}
      </UiButton>
    </form>

    <UiModal
      v-model="isOpen"
      class="max-w-[480px] inset-x-4 md:inset-x-0"
      tag="section"
      role="alertdialog"
      disable-click-away
      aria-labelledby="signUpModalTitle"
      aria-describedby="signUpModalDesc"
    >
      <header class="flex items-center flex-col">
        <NuxtImg
          src="/images/signup-success.svg"
          :alt="$t('auth.signup.modal.imageAlt')"
          width="192"
          height="192"
          class="my-6"
          loading="lazy"
        />
        <h2 id="signUpModalTitle" class="mt-6 mb-4 font-bold typography-headline-3">
          {{ $t('auth.signup.modal.heading') }}
        </h2>
      </header>
      <UiAlert class="w-full p-4 mb-6 !justify-start typography-text-base" variant="neutral">
        <i18n-t id="signUpModalDesc" keypath="auth.signup.modal.description" scope="global" tag="p">
          <template #information>
            <SfLink
              :tag="NuxtLink"
              :to="localePath(paths.account)"
              class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
            >
              {{ $t('auth.signup.modal.information') }}
            </SfLink>
          </template>
        </i18n-t>
      </UiAlert>

      <footer class="flex justify-end">
        <UiButton :tag="NuxtLink" :to="localePath(paths.home)" class="w-full">
          {{ $t('auth.signup.modal.button') }}
        </UiButton>
      </footer>
    </UiModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SfInput, SfCheckbox, SfLink, useDisclosure } from '@storefront-ui/vue';
import { paths } from '~/utils/paths';

definePageMeta({
  layout: false,
});

const localePath = useLocalePath();

const { isOpen, open } = useDisclosure();

const firstNameModel = ref('');
const lastNameModel = ref('');
const emailModel = ref('');
const passwordModel = ref('');
const termsAndConditionsModel = ref<boolean>();
const subscriptionsModel = ref<boolean>();
const NuxtLink = resolveComponent('NuxtLink');
</script>
