import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from '@tanstack/react-query';
import {API_MODES} from '../constants/api';
import {API_ROUTES} from '../constants/apiUrls';
import {STORAGE_KEYS} from '../constants/storage';
import {TUseQueryOptions} from '../services/apiService';
import {createDynamicUrl} from '../utils/utils';
import {requestGoogleApi} from './ApiRequestHandler';
import {
  CustomGoogleSearchResponse,
  YoutubeSearchListResponse,
} from './ResponseTypes';

export const defaultYoutubeOptions = {
  getNextPageParam: (item: any) => {
    if (item?.nextPageToken && item?.nextPageToken !== '') {
      return item.nextPageToken;
    }
  },

  initialPageParam: null,
};

export const defaultGoogleOptions = {
  getNextPageParam: (item: any) => {
    if (item?.queries?.nextPage?.[0]?.startIndex) {
      return item?.queries?.nextPage?.[0]?.startIndex;
    }
  },

  initialPageParam: 1,
};

export function GetGoogleCustomSearch(
  q: string,
  options?: TUseQueryOptions<CustomGoogleSearchResponse>,
) {
  return useQuery({
    queryKey: [STORAGE_KEYS.SEARCHRESULT, q],
    queryFn: async () => {
      const {data} = await requestGoogleApi({
        url: createDynamicUrl(API_ROUTES.GOOGLE.CUSTOM_SEARCH, {q}),
        method: API_MODES.GET,
      });
      return data;
    },
    ...options,
  });
}

export function GetYoutubeSearchListResult(
  q: string,
  options?: TUseQueryOptions<YoutubeSearchListResponse>,
) {
  return useQuery({
    queryKey: [STORAGE_KEYS.YTSEARCHLIST, q],
    queryFn: async () => {
      const {data} = await requestGoogleApi({
        url: createDynamicUrl(API_ROUTES.GOOGLE.YOUTUBE_SEARCH, {q}),
        method: API_MODES.GET,
      });
      return data;
    },
    ...options,
  });
}

export function useGetYoutubeSearchListResult(
  q: string,
  options?: YoutubeSearchListResponse,
): UseInfiniteQueryResult<InfiniteData<YoutubeSearchListResponse>> {
  return useInfiniteQuery({
    queryKey: [STORAGE_KEYS.YTSEARCHLIST, q],
    queryFn: async ({pageParam}) => {
      const {data} = await requestGoogleApi({
        url: createDynamicUrl(API_ROUTES.GOOGLE.YOUTUBE_SEARCH, {q}),
        method: API_MODES.GET,
        params: {
          pageToken: pageParam,
        },
      });

      return data;
    },

    ...defaultYoutubeOptions,
    ...options,
  });
}

export function useGetGoogleCustomSearch(
  q: string,
  options?: YoutubeSearchListResponse,
) {
  return useInfiniteQuery({
    queryKey: [STORAGE_KEYS.SEARCHRESULT, q],
    queryFn: async ({pageParam}) => {
      const {data} = await requestGoogleApi({
        url: createDynamicUrl(API_ROUTES.GOOGLE.CUSTOM_SEARCH, {q}),
        method: API_MODES.GET,
        params: {
          start: pageParam,
        },
      });

      return data;
    },

    ...defaultGoogleOptions,
    ...options,
  });
}
