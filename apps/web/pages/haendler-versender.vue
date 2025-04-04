<template>
  <div class="max-w-screen-2xl relative mx-auto p-5 overflow-x-auto no-preflight text-secondary-500 os-page">
    <h1><strong>Händler &amp; Versender</strong></h1>
    <p><strong class="color-black">Profitieren Sie von unseren Top Preisen und Produkten</strong></p>
    <p>
      <span class="color-black"
        >Als spezialisiertes Unternehmen für Kompostwürmer, Angelwürmer, Futterwürmer und Bio Wurmhumus<br />würden wir
        auch Sie gerne als Händler gewinnen.&nbsp;Nutzen Sie unser attraktives Angebot zu Ihrem Vorteil.</span
      >
    </p>
    <p>
      <span class="color-#2b2624"
        >************************************************************************************************************</span
      >
    </p>
    <p><strong class="color-#2b2624">RUBELINO&nbsp;* Neues Konzept für den stationären Handel. </strong></p>
    <p><strong class="color-#2b2624">Mehr Umsatz * Mehr Produkte *Keine Vorabkosten * Kein Warenlager</strong></p>
    <p><br /></p>
    <p><strong>Was ist RUBELINO?</strong></p>
    <p>
      Rubelinos sind Produktkarten für den stationären Handel.<br />Der Kunde kauft bei ihnen im Geschäft ein Produkt
      (z.B. Kompostwürmer) in Form einer Produktkarte<br />und bekommt dieses nach einlösen des Codes auf rubelino.de
      bequem per Post nach Hause geschickt.<br />Das Produkt selbst muss nicht im Geschäft gelagert werden.
    </p>
    <p>
      <span class="color-#2b2624"
        >Sie haben ein Ladenlokal und wollen von Rubelino profitieren?<br />Rufen Sie an (02421/2085955) oder melden Sie
        sich einfach per Email (</span
      ><span class="color-primary">info@superwurm.de</span><span class="color-green">)</span>
    </p>
    <p>
      <span class="color-#2b2624"
        >************************************************************************************************************</span
      >
    </p>
    <p><strong class="color-black">Unser weiteres Angebot für:</strong></p>
    <p><strong class="color-black">• Blumenhandel, Gartenbedarf usw.</strong></p>
    <p><strong>&nbsp;&nbsp;</strong><span class="color-black">Kompostwürmer, Gartenwürmer, Wurmhumus</span></p>
    <p><strong class="color-black">• Angelgeschäfte, Zoogeschäfte und Jagdgeschäfte</strong></p>
    <p><span class="color-black">&nbsp;&nbsp;Riesen-Rotwürmer (Dendrobena), Wurmerde, Wurmfutter, Tauwürmer</span></p>
    <p><strong class="color-black">• Versandhandel/ Internetshops</strong></p>
    <p>
      <span class="color-black"
        >&nbsp;&nbsp;&nbsp;&nbsp;Wir übernehmen Lagerhaltung, Risiko und Versand<br />&nbsp;&nbsp;&nbsp;&nbsp;Fragen Sie
        nach unserem speziellen Konzept für den Versandhandel</span
      >
    </p>
    <p>
      <span class="color-black"
        >Bitte beachten Sie, dass dieses Angebot nur für Fachhändler mit Gewerbenachweis gilt.</span
      ><br /><span class="color-black"
        >Registrieren sie sich als Kunde im Shop und lassen sie dann den Zugang als Fachhändler freischalten,<br />stellen
        sie dazu einfach eine Anfrage an:</span
      >&nbsp;<span class="color-primary">info@superwurm.de</span>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageType: 'static',
});
const { setPageMeta } = usePageMeta();

const { data, fetchCategoryTemplate } = useCategoryTemplate();
const runtimeConfig = useRuntimeConfig();
await fetchCategoryTemplate(Number(runtimeConfig.public.shippingTextCategoryId));
const { t } = useI18n();

const icon = 'page';
setPageMeta(t('orderConfirmation.shipping'), icon);

const text = computed(() => data?.value?.data);
</script>
