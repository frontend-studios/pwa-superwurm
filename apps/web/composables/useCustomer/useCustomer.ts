import {
  AddressType,
  type ApiError,
  type RegisterParams,
  type SessionResult,
  type UserChangePasswordParams,
  userGetters,
} from '@plentymarkets/shop-api';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';
import type {
  ChangePassword,
  GetSession,
  Login,
  LoginAsGuest,
  Logout,
  Register,
  UseCustomerReturn,
  UseCustomerState,
} from '~/composables/useCustomer/types';
import { scrollToHTMLObject } from '~/utils/scollHelper';

const CONTACT_INFORMATION = '#contact-information';

/**
 * @description Composable managing Customer data
 * @returns UseCustomerReturn
 * @example
 * ``` ts
 * const {
 * data, loading, isAuthorized, isGuest, privacyPolicy, setUser, getSession, login, logout, register, loginAsGuest,
 * setPrivacyPolicy, changePassword } = useCustomer();
 * ```
 */
export const useCustomer: UseCustomerReturn = () => {
  const { emit } = usePlentyEvent();
  const { $i18n } = useNuxtApp();
  const state = useState<UseCustomerState>(`useCustomer`, () => ({
    data: {} as SessionResult,
    loading: false,
    isAuthorized: false,
    isGuest: false,
    validGuestEmail: false,
  }));

  /** Function for checking if user is guest or authorized
   * @example
   * ``` ts
   * checkUserState();
   * ```
   */
  const checkUserState = () => {
    if (state.value.data?.user?.guestMail) {
      state.value.isGuest = true;
      state.value.validGuestEmail = true;
      state.value.isAuthorized = false;
      return;
    }

    state.value.isGuest = false;
    state.value.validGuestEmail = false;
    state.value.isAuthorized = !!state.value.data?.user?.email;
  };

  /** Function for getting current user/cart data from session
   * @example
   * ``` ts
   * getSession();
   * ```
   */
  const getSession: GetSession = async () => {
    state.value.loading = true;
    try {
      const { data } = await useSdk().plentysystems.getSession();
      state.value.data = data ?? null;
      checkUserState();
      useWishlist().setWishlistItemIds(Object.values(state.value.data?.basket?.itemWishListIds || []));
    } catch (error) {
      useHandleError(error as ApiError);
    } finally {
      state.value.loading = false;
    }

    return state.value.data;
  };

  /** Function for setting user data
   * @param data { SessionResult }
   * @example
   * ``` ts
   * setUser(data: SessionResult);
   * ```
   */
  const setUser = (data: SessionResult) => {
    state.value.data = data;
    checkUserState();
  };

  /** Function for login a user as guest
   * @param email
   * @return LoginAsGuest
   * @example
   * ``` ts
   * loginAsGuest('user@example.com');
   * ```
   */
  const loginAsGuest: LoginAsGuest = async (email: string) => {
    try {
      state.value.loading = true;
      await useSdk().plentysystems.doLoginAsGuest({ email: email });
    } catch (error) {
      useHandleError(error as ApiError);
    } finally {
      state.value.loading = false;
    }
    checkUserState();
  };

  /** Function for user login.
   * @param email
   * @param password
   * @return Login
   * @example
   * ``` ts
   * login('user@example.com', 'password');
   * ```
   */
  const login: Login = async (email: string, password: string) => {
    state.value.loading = true;

    try {
      await useSdk()
        .plentysystems.doLogin({ email: email, password: password })
        .then(async () => {
          await getSession();

          if (state.value.data?.user) {
            emit('frontend:login', { user: state.value.data.user });
          }
        });

      return state.value.isAuthorized;
    } catch (error) {
      useHandleError(error as ApiError);
      state.value.loading = false;
      return false;
    }
  };

  /** Function for user logout.
   * @return Logout
   * @example
   * ``` ts
   * logout();
   * ```
   */
  const logout: Logout = async () => {
    try {
      state.value.loading = true;
      await useSdk().plentysystems.doLogoutUser();
      state.value.data.user = null;
      useCheckoutAddress(AddressType.Shipping).clear();
      useCheckoutAddress(AddressType.Billing).clear();
    } catch (error) {
      useHandleError(error as ApiError);
    } finally {
      state.value.loading = false;
    }

    checkUserState();
    useWishlist().setWishlistItemIds([]);
  };

  /** Function for registering a user.
   * @param params { RegisterParams }
   * @return Register
   * @example
   * ``` ts
   * register({ email: 'example', password: 'example', 'cf-turnstile-response': '' });
   * ```
   */
  const register: Register = async (params: RegisterParams) => {
    try {
      state.value.loading = true;
      const { data } = await useSdk().plentysystems.doRegisterUser(params);
      if (data) {
        await getSession();

        if (state.value.data?.user) {
          emit('frontend:signUp', { user: state.value.data.user });
        }
      }
      return data;
    } catch (error) {
      useHandleError(error as ApiError);
    } finally {
      state.value.loading = false;
    }
    return null;
  };

  /** Function for changing the user password
   * @param params { UserChangePasswordParams }
   * @return ChangePassword
   * @example
   * ``` ts
   * changePassword({
   *   oldPassword: 'oldPassword',
   *   password: 'newPassword',
   *   password2: 'newPassword',
   * });
   * ```
   */
  const changePassword: ChangePassword = async (params: UserChangePasswordParams) => {
    state.value.loading = true;

    try {
      await useSdk().plentysystems.doChangeUserPassword(params);
      return true;
    } catch (error) {
      useHandleError(error as ApiError);
    } finally {
      state.value.loading = false;
    }
    return false;
  };

  const emailValidationSchema = toTypedSchema(
    object({
      customerEmail: string()
        .required($i18n.t('errorMessages.email.required'))
        .test('is-valid-email', $i18n.t('errorMessages.email.valid'), (email: string) =>
          userGetters.isValidEmailAddress(email),
        )
        .default(state.value.data?.user?.email ?? state.value.data?.user?.guestMail ?? ''),
    }),
  );

  const missingGuestCheckoutEmail = computed(
    () => (state.value.isGuest || (!state.value.isGuest && !state.value.isAuthorized)) && !state.value.validGuestEmail,
  );

  const backToContactInformation = (): boolean => {
    const classList = ['bg-primary-50', 'rounded-md'];
    const opacityClass = 'opacity-0';
    const targetId = CONTACT_INFORMATION;

    const targetElement = document.querySelector(targetId);
    const firstDivider = document.querySelector('#top-contact-information-divider');
    const secondDivider = document.querySelector('#top-shipping-divider');

    scrollToHTMLObject(targetId);

    targetElement?.classList.add(...classList);
    [firstDivider, secondDivider].forEach((divider) => divider?.classList.add(opacityClass));

    setTimeout(() => {
      targetElement?.classList.remove(...classList);
      [firstDivider, secondDivider].forEach((divider) => divider?.classList.remove(opacityClass));
    }, 1000);

    return false;
  };

  return {
    setUser,
    getSession,
    login,
    logout,
    register,
    loginAsGuest,
    changePassword,
    emailValidationSchema,
    missingGuestCheckoutEmail,
    backToContactInformation,
    showNetPrices: state?.value?.data?.user?.showNetPrices,
    ...toRefs(state.value),
  };
};
