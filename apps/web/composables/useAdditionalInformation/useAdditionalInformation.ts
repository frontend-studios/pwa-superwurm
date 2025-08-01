import type { AdditionalInformationParams, ApiError } from '@plentymarkets/shop-api';
import type {
  UseAdditionalInformationState,
  DoAdditionalInformation,
  DoAdditionalInformationReturn,
  SetShippingPrivacyAgreement,
} from './types';

/**
 * @description Composable for setting additional information.
 * @returns DoAdditionalInformationReturn
 * @example
 * ``` ts
 * const {
 * data, loading, shippingPrivacyAgreement, setShippingPrivacyAgreement, doAdditionalInformation
 * } = useAdditionalInformation();
 * ```
 */
export const useAdditionalInformation: DoAdditionalInformationReturn = () => {
  const state = useState<UseAdditionalInformationState>('useAdditionalInformation', () => ({
    data: null,
    loading: false,
    shippingPrivacyAgreement: false,
    customerWish: null,
    showErrors: false,
  }));

  /**
   * @description Function for setting the additional information.
   * @example
   * ``` ts
   * doAdditionalInformation({
   *   orderContactWish: null,
   *   orderCustomerSign: null,
   *   shippingPrivacyHintAccepted: true,
   *   templateType: 'checkout'
   * });
   * ```
   */
  const doAdditionalInformation: DoAdditionalInformation = async (params: AdditionalInformationParams) => {
    state.value.loading = true;
    try {
      await useSdk().plentysystems.doAdditionalInformation(params);
      state.value.data = null;

      return state.value.data;
    } catch (error) {
      const exception = error as ApiError;
      if (Number(exception?.code) === 1400) {
        await useCustomer().getSession();
        await useSdk().plentysystems.doAdditionalInformation(params);
      } else {
        useHandleError(error as ApiError);
      }
      return state.value.data;
    } finally {
      state.value.loading = false;
    }
  };

  const setShippingPrivacyAgreementErrors = (showErrors: boolean) => {
    state.value.showErrors = showErrors;
  };

  /**
   * @description Function for setting the shipping privacy agreement value.
   * @example
   * ``` ts
   * setShippingPrivacyAgreement({
   *   shippingPrivacyAgreement: true
   * });
   * ```
   */
  const setShippingPrivacyAgreement: SetShippingPrivacyAgreement = (shippingPrivacyAgreement: boolean) => {
    state.value.loading = true;
    state.value.shippingPrivacyAgreement = shippingPrivacyAgreement;
    // setShippingPrivacyAgreementErrors(!shippingPrivacyAgreement);
    state.value.loading = false;
  };

  /**
   * @description Function for setting the customer wish value.
   * @example
   * ``` ts
   * setCustomerWish({
   *   customerWish: 'example custom wish'
   * });
   * ```
   */
  const setCustomerWish = (customerWish: string | null) => {
    state.value.loading = true;
    state.value.customerWish = customerWish;
    state.value.loading = false;
  };

  return {
    setShippingPrivacyAgreementErrors,
    setShippingPrivacyAgreement,
    setCustomerWish,
    doAdditionalInformation,
    ...toRefs(state.value),
  };
};
