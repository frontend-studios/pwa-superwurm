<template>
  <footer class="max-w-screen-2xl mx-auto border-25 px-6 lg:px-10 md:py-6 pb-5 md:pb-10">
    <div class="flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <div class="order-2 md:order-1">
        <div class="pt-2 font-semibold text-lg">Newsletter</div>
        <div id="footer_newsletter2go"><div class="inner-container"></div></div>
      </div>
      <div class="order-1 md:order-2 mx-auto md:mx-0">
        <div class="py-2">
          <div class="custom-logo">
            <NuxtLink :to="localePath(paths.home)" :aria-label="t('goToHomepage')" class="flex">
              <UiVsfLogo />
            </NuxtLink>
          </div>

          <div class="flex justify-center order-3 max-w-64">
            <div class="social-item">
              <a href="https://www.facebook.com/Wurmfarm/" target="_blank">
                <div class="p-3">
                  <span class="font-bold flex items-center justify-center"
                    ><SfIconFacebook alt="Facebook" size="base" />
                  </span>
                </div>
              </a>
            </div>
            <div class="social-item">
              <a href="https://www.youtube.com/user/SuperwurmTV" target="_blank">
                <div class="p-3">
                  <span class="font-bold flex items-center justify-center"
                    ><SfIconYoutube alt="Youtube" size="base" />
                  </span>
                </div>
              </a>
            </div>
            <div class="social-item">
              <a href="https://www.instagram.com/superwurm.de/" target="_blank">
                <div class="p-3">
                  <span class="font-bold flex items-center justify-center"
                    ><SfIconInstagram alt="Instagram" size="base" />
                  </span>
                </div>
              </a>
            </div>
            <div class="social-item">
              <a href="https://www.tiktok.com/@superwurm.de" target="_blank">
                <div class="p-3">
                  <span class="font-bold flex items-center justify-center"
                    ><img
                      src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/TikTok_SocialMediaIcon.png"
                      alt="tiktok"
                    />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="order-3">
        <div class="pt-2 font-semibold text-lg">Bewertung</div>
        <div class="flex">
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/Google.svg"
            alt="Google Bewertung"
            class="mr-5"
          />
          <div class="text-sm">
            <SfIconStarFilled size="xs" class="text-black" />
            <SfIconStarFilled size="xs" class="text-black -ml-1" />
            <SfIconStarFilled size="xs" class="text-black -ml-1" />
            <SfIconStarFilled size="xs" class="text-black -ml-1" />
            <SfIconStarFilled size="xs" class="text-black -ml-1" />
            <div>
              <span class="font-semibold">4.9</span>/5, basierend auf <span class="font-semibold">61</span> Bewertungen
            </div>
            <a
              href="https://www.google.com/search?sca_esv=3d6848995d8cd9b4&rlz=1C1CHBD_deDE892DE892&tbm=lcl&sxsrf=AHTn8zra5aAkQiN_OMOl8LAGlBmVTUD8gQ:1742562473685&q=Superwurm+GmbH+%26+Co.+KG+Rezensionen&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2tjQzMTQxMza3BFImhqYGBkYbGBlfMSoHlxakFpWXFuUquOcmeSioKTjn6yl4uysEpVal5hVn5uel5i1iJUYVAKmEYxNmAAAA&rldimm=3964146379414415002&hl=de-DE&sa=X&ved=2ahUKEwiOv_iJn5uMAxU1zQIHHUUWJeMQ9fQKegQIRBAF&biw=1920&bih=945&dpr=1#lkt=LocalPoiReviews"
              class="underline"
              target="_blank"
              >Zu den Bewertungen</a
            >
          </div>
        </div>
      </div>
    </div>
    <hr class="border-primary-500 border-1 my-10" />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
      <div class="payment">
        <div class="pt-2 font-semibold text-lg text-center md:text-left">Bequem bezahlen</div>
        <div class="grid grid-cols-4 gap-2 md:grid-cols-4 items-center">
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/Paypal_logo.svg"
            alt="PayPal"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/amazon_pay.svg"
            alt="AmazonPay"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/visa.svg"
            alt="Visa"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/mastercard.svg"
            alt="MasterCard"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/rechnung.svg"
            alt="Rechnung"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/vorkasse.svg"
            alt="Vorkasse"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/Ratenkauf.svg"
            alt="Ratenkauf"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/Lastschrift.svg"
            alt="Lastschrift"
          />
        </div>
      </div>
      <div class="">
        <div class="pt-2 font-semibold text-lg text-center md:text-left">Versandoption</div>
        <div class="flex items-center justify-center md:grid gap-2 md:grid-cols-4 mb-4 delivery">
          <img src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/DHL.svg" alt="DHL" />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/Abholung.svg"
            alt="Abholung"
          />
        </div>
        <ul class="list-disc text-sm list-inside">
          <li>Schneller Versand in Deutschland & Österreich</li>
          <li>Versand von Mo-Do nach ganz Europa</li>
          <li>Für Versand am selben Tag - bis 12 Uhr bestellen</li>
        </ul>
      </div>
      <div class="">
        <div class="pt-2 font-semibold text-lg text-center md:text-left">Kauf ohne Risiko</div>
        <div class="flex justify-center md:grid gap-2 md:grid-cols-4 mb-4 security">
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/Trust.svg"
            alt="Käuferschutz & Datenschutz"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/Trusted.svg"
            alt="Sichere SSL-Verschlüsselung"
          />
          <img
            src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/PWA_Superwurm/footer/new/Honesty.svg"
            alt="Widerrufsrecht"
          />
        </div>
        <ul class="list-disc text-sm list-inside">
          <li>Käuferschutz & Datenschutz</li>
          <li>Sichere SSL-Verschlüsselung</li>
          <li>Widerrufsrecht</li>
        </ul>
      </div>
    </div>
  </footer>
  <div class="sub-footer">
    <div class="max-w-screen-2xl mx-auto px-3 pt-3 md:px-6 lg:px-10 py-6 md:pt-6 lg:pt-10 bg-secondary-500">
      <div class="flex justify-between flex-wrap flex-col md:flex-row mt-5">
        <p class="text-white text-sm my-3 lg:my-0">© SUPERWURM GmbH & Co. KG</p>
        <ul class="text-white text-sm flex flex-wrap flex-col md:flex-row justify-between">
          <li class="mb-3 md:mb-0"><a href="/legal-disclosure">Impressum</a></li>
          <li class="mb-3 md:mb-0 md:ml-3"><a href="/privacy-policy">Datenschutz</a></li>
          <li class="mb-3 md:mb-0 md:ml-3"><a href="/zahlung-versand">Zahlung & Versand</a></li>
          <li class="mb-3 md:mb-0 md:ml-3"><a href="/cancellation-rights">Widerrufsrecht</a></li>
          <li class="mb-3 md:mb-0 md:ml-3"><a href="/terms-and-conditions">AGB</a></li>
          <li class="mb-3 md:mb-0 md:ml-3"><a href="/os-plattform">OS-Plattform</a></li>
          <li class="mb-3 md:mb-0 md:ml-3"><a href="/haendler-versender">Händler und Versender</a></li>
        </ul>
      </div>

      <div class="copyright text-white text-xs text-center pt-8">
        <p>
          * Alle Preise verstehen sich inkl. MwSt. zzgl. Versandkosten. Alle Angebote sind freibleibend zzgl.
          Versandkosten und bei Nachnahme Übermittlungsentgelt. Irrtümer, Druckfehler und Preisänderungen vorbehalten.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SfLink,
  SfListItem,
  SfIconFacebook,
  SfIconYoutube,
  SfIconInstagram,
  SfIconStarFilled,
} from '@storefront-ui/vue';
import { categories } from '~/mocks';
import type { FooterProps } from './types';

import { paths } from '~/utils/paths';
const { t } = useI18n();

const storename: string = useRuntimeConfig().public.storename;

const companyName: string = `© ${storename} ${new Date().getFullYear()}`;

const { simplifiedFooter = false } = defineProps<FooterProps>();

const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');
</script>
