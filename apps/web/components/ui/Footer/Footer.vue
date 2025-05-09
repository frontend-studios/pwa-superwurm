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
                  <span class="font-bold flex items-center justify-center">
                    <svg
                      fill="#000000"
                      width="21px"
                      height="21px"
                      viewBox="0 0 512 512"
                      id="icons"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"
                      ></path>
                    </svg>
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
              <span class="font-semibold">4,8</span>/5, basierend auf <span class="font-semibold">61</span> Bewertungen
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
  <div class="whatsapp">
    <a aria-label="WhatsApp Chat" href="https://wa.me/+4915225432222" target="_blank">
      <img
        alt="WhatsApp Chat"
        src="https://cdn02.plentymarkets.com/ln590pyonzot/frontend/SUPERWURM_Shop/Hauptseite/Logos/WhatsAppButtonGreenMedium.svg"
      />
    </a>
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
