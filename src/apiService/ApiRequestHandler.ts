import {API_MODES, HTTP_STATUS} from '@Constants/api';
import requestApi, {requestGoogleCustomSearchApi} from '@Services/apiService';
import {ApisauceConfig} from 'apisauce';
import {toast} from 'react-toastify';

export async function requestGoogleApi<T = any, TPayload = object>({
  url,
  method,
  params,
  config,
  showToast = true,
}: RequestTypes<TPayload>) {
  const response =
    (await requestGoogleCustomSearchApi<T, TPayload>(
      url,
      method,
      params,
      config,
    )) || {};

  if (response.ok) {
    return response;
  }
  console.log(response);
  const error = response.data?.metadata;

  if (error?.statusCode !== HTTP_STATUS.UNAUTHORIZED) {
    showToast && toast.error(error?.message || 'Something went wrong');
  }

  throw new Error(error?.message, {cause: response.status});
}

export async function request<T = any, TPayload = object>({
  url,
  method,
  params,
  config,
  showToast = true,
}: RequestTypes<TPayload>) {
  const response =
    (await requestApi<T, TPayload>(url, method, params, config)) || {};

  if (response.ok) {
    return response;
  }
  console.log(response);
  const error = response.data?.metadata;

  if (error?.statusCode !== HTTP_STATUS.UNAUTHORIZED) {
    showToast && toast.error(error?.message || 'Something went wrong');
  }

  throw new Error(error?.message, {cause: response.status});
}

type RequestTypes<TPayload> = {
  url: string;
  method: API_MODES;
  params?: TPayload;
  config?: ApisauceConfig;
  showToast?: boolean;
};
