import {STORAGE_KEYS} from '@Constants/storage';
import {TUseMutationOptions} from '@Services/apiService';
import {getItem} from '@Services/storageService';
import {useMutation} from '@tanstack/react-query';
import {getDeviceUUID} from '@Utils/utils';
import {DeviceType, TokenRequest} from './RequestTypes';
import {TokenResponse, UserStatus} from './ResponseTypes';

export function getBasePayload() {
  return {
    fcmToken: getItem(STORAGE_KEYS.DEVICE_TOKEN) ?? 'string',
    deviceId: getDeviceUUID(),
    deviceName: '',
    appVersion: '',
    deviceType: DeviceType.Web,
  };
}

export function Login(
  options: TUseMutationOptions<TokenResponse, TokenRequest>,
) {
  return useMutation({
    mutationFn: async payload => {
      // const { data } = await request({
      //   url: API_ROUTES.TOKENS.LOGIN,
      //   method: API_MODES.POST,
      //   params: { ...getBasePayload(), ...payload },
      // });
      const data = {
        userId: 'string',
        token: 'string',
        refreshToken: 'string',
        refreshTokenExpiryTime: 'string',
        status: UserStatus.Active,
        isOnboarded: true,
        ...getBasePayload(),
        ...payload,
      };
      return data;
    },
    ...options,
  });
}
