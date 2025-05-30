import {TokenResponse, UserStatus} from '@Api/ResponseTypes';
import {Login} from '@Api/Tokens';
import {useAuthStore} from '@Store/authStore';

export default function useLogin() {
  // const navigate = useNavigate();

  const {mutate: login, isPending} = Login({
    onSuccess: onLoginSuccess,
  });

  function onLoginSuccess(data: TokenResponse) {
    switch (data?.status) {
      case UserStatus.Active:
        useAuthStore.getState().setUserAuthentication(true, data);
        break;
    }
  }

  function handleLogin() {
    login({});
  }

  return {
    submitForm: handleLogin,
    isLoading: isPending,
  };
}
