// @ts-nocheck
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { queryClient } from '@Api/Client';
import {
  ProfileResponse,
  TokenResponse,
} from '@Api/ResponseTypes';
import {
  APP_NAME
} from '@Constants/app';
import { STORAGE_KEYS } from '@Constants/storage';
import { getItem, setItem } from '@Services/storageService';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AnyObject } from 'yup';

function setLoggedInUserData(_data: ProfileResponse) {
  setItem(STORAGE_KEYS.USER_INFO, _data);
  queryClient.setQueryData([STORAGE_KEYS.USER_INFO], _data);
}

function getUserToken(): TokenResponse {
  return (
    queryClient.getQueryData([STORAGE_KEYS.TOKEN]) ??
    getItem(STORAGE_KEYS.TOKEN) ??
    ''
  );
}

function setPageTitle(pathname: string) {
  if (pathname === '/') {
    pathname = '| Dashboard';
  }

  pathname = pathname
    .split('/')
    .map(route =>
      route
        .split('-')
        .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(' '),
    )
    .join(' | ');
  document.title = `${APP_NAME}  ${pathname} `;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('');
}

function createDynamicUrl(
  url: string,
  params: AnyObject,
  startIdentifier: string = '{',
  endIdentifier: string = '}',
) {
  return Object.keys(params).reduce((acc, key) => {
    return acc.replace(`${startIdentifier}${key}${endIdentifier}`, params[key]);
  }, url);
}

function getDeviceUUID() {
  let id = getItem(STORAGE_KEYS.DEVICE_UUID);
  if (!id) {
    id = generateId();
    setItem(STORAGE_KEYS.DEVICE_UUID, id);
  }
  return id;
}

export function getOrSetQueryString(q: string | undefined = undefined) {
  if (q) {
    setItem(STORAGE_KEYS.QUERY_STRING, q);
  }

  if (!q) {
    q = getItem(STORAGE_KEYS.QUERY_STRING);
  }

  return q;
}

export function getOrSetUrlString(url: string | undefined = undefined) {
  if (url) {
    setItem(STORAGE_KEYS.URL_STRING, url);
  }

  if (!url) {
    url = getItem(STORAGE_KEYS.URL_STRING);
  }

  return url;
}

export function getOrSetSummaryText(summaryText: string | undefined = undefined) {
  if (summaryText) {
    setItem(STORAGE_KEYS.SUMMARYTEXT, summaryText);
  }

  if (!summaryText) {
    summaryText = getItem(STORAGE_KEYS.SUMMARYTEXT);
  }

  return summaryText;
}

function generateId() {
  return `id-${Math.random().toString(16).slice(2)}`;
}

function getNestedValue(item: AnyObject, key: string = '') {
  if (!key) return item;
  return key.split('.').reduce((acc, curr) => {
    return acc?.[curr];
  }, item);
}

function handleFetchOnScroll(
  {target}: {target: any},
  meta: Partial<UseInfiniteQueryResult<any, any>> = {},
  isHorizontal: boolean = false,
) {
  if (isHorizontal) {
    const {scrollWidth, scrollLeft, clientWidth} = target;
    if (scrollWidth - scrollLeft <= clientWidth) {
      fetchMore(meta);
    }
  } else {
    const {scrollHeight, scrollTop, clientHeight} = target;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      fetchMore(meta);
    }
  }
}

const fetchMore = (meta: any) => {
  const {hasNextPage, isFetchingNextPage, fetchNextPage} = meta;
  if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
};

export {
  createDynamicUrl, fetchMore, generateId, getDeviceUUID, getInitials, getNestedValue, getUserToken, handleFetchOnScroll, setLoggedInUserData, setPageTitle
};

export function removeCharAndCapitalize(value: string, char: string = '-') {
  return value
    .split(char)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .split('%20')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function selectInfiniteQuery(data: InfiniteData<any, any>) {
  return data?.pages.flatMap(data => data.data);
}

export function selectGoogleInfiniteQueryData(data: InfiniteData<any, any>) {
  return data?.pages.flatMap(data => data.items);
}

export function getBreadCrumbs(
  pathname: string,
  overrides?: Record<string, string | null | {title: string; link: string}>,
): Array<{title: string; link: string}> {
  const paths = pathname.split('/').filter(Boolean);

  if (paths.length < 2) return [];

  return paths.reduce((acc, curr) => {
    const override = overrides?.[curr];
    if (!curr || override === null) return acc;
    const title = override ?? removeCharAndCapitalize(curr);

    const link = acc[acc.length - 1]?.link
      ? `${acc[acc.length - 1].link}/${curr}`
      : `/${curr}`;

    acc.push(
      !override || typeof override === 'string' ? {link, title} : override,
    );

    return acc;
  }, [] as Array<{link: string; title: string}>);
}
