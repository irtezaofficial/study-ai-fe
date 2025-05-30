import {API_MODES, BASE_URLS} from '@Constants/api';

import {getUserToken} from '@Utils/utils';
import {UseMutationOptions, UseQueryOptions} from '@tanstack/react-query';
import {ApisauceConfig, PROBLEM_CODE, create} from 'apisauce';

export const BASE_URL = BASE_URLS.BACKEND;
export const GOOGLE_BASE_URL = BASE_URLS.GOOGLE;

const googleCustomSearchApiSauceInstance = create({
  baseURL: GOOGLE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export async function requestGoogleCustomSearchApi<T, TPayload>(
  url: string,
  method: API_MODES,
  queryParams?: TPayload,
  config?: ApisauceConfig,
) {
  const response = await googleCustomSearchApiSauceInstance[method]<any>(
    url,
    queryParams,
    config,
  );

  const mutatedResponse: TErrorResponse | TSuccessResponse<T> = {
    ok: response?.ok,
    data: response?.data,
    status: response?.status ?? 0,
    problem: response?.problem,
  };

  return mutatedResponse;
}

const apiSauceInstance = create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function requestApi<T, TPayload>(
  url: string,
  method: API_MODES,
  queryParams?: TPayload,
  config?: ApisauceConfig,
) {
  const response = await apiSauceInstance[method]<any>(
    url,
    queryParams,
    config,
  );

  const mutatedResponse: TErrorResponse | TSuccessResponse<T> = {
    ok: response?.ok,
    data: response?.data,
    status: response?.status ?? 0,
    problem: response?.problem,
  };

  return mutatedResponse;
}

apiSauceInstance.addAsyncRequestTransform(async ({headers}) => {
  headers!['Authorization'] = `Bearer ${getUserToken()?.token}`;
  headers!['ngrok-skip-browser-warning'] = true;
});

export const ERROR_TYPES = {
  NETWORK_ERROR: 'Network not available',
  SERVER_ERROR: 'Something went wrong',
  TIMEOUT_ERROR: "Server didn't respond in time",
};

export default requestApi;

type MutatedResponse<TData, TOk> = {
  ok: TOk;
  data: TData;
  status?: number;
  problem: PROBLEM_CODE | null;
};

export type TErrorResponse = MutatedResponse<
  {
    metadata: {
      type: string;
      statusCode: number;
      message: string;
      errorId: string;
    };
  },
  false
>;

export type TSuccessResponse<T> = MutatedResponse<T, true>;

export type TUseQueryOptions<TData, TFnData = TData> = Omit<
  UseQueryOptions<TData, any, TFnData>,
  'queryKey'
>;

export type TUseMutationOptions<
  TData = unknown,
  TVariables = void,
> = UseMutationOptions<TData, any, TVariables>;
