import {ListRequest} from '@Api/RequestTypes';

import {useEffect, useRef, useState} from 'react';

import {AnyObject} from 'yup';
import {SelectChangeEvent} from '@mui/material';
import {useSearchParams} from 'react-router-dom';
import {PAGE_SIZE} from '@Constants/api';

export default function useGridRequest<payload = ListRequest>(props?: payload) {
  const [params, setParams] = useSearchParams({});

  const entries = Object.fromEntries(params.entries());

  const INITIAL_VALUES = {
    pageNumber: 1,
    pageSize: PAGE_SIZE,
    ...props,
  };

  useEffect(() => {
    setGridRequest(prev => ({
      ...prev,
      pageNumber: Number(entries.page) || 1,
    }));
  }, [params]);

  const loadingItemsRef = useRef<{[key: string]: boolean}>({});

  const [gridRequest, setGridRequest] = useState<payload>(
    INITIAL_VALUES as payload,
  );

  const addLoadingItem = (id: string | number) => {
    loadingItemsRef.current[id] = true;
  };
  const removeLoadingItem = (id: string | number) => {
    delete loadingItemsRef.current[id];
  };
  const hasLoadingItem = (id: string | number) => {
    return Boolean(loadingItemsRef.current?.[id]);
  };

  const onSearch = ({
    searchValue,
    fieldName = 'keyword',
    valuePropName,
    searchObject,
  }: SearchPayload) => {
    setGridRequest(prev => ({
      ...prev,
      pageNumber: 1,
      [fieldName]: searchObject?.[valuePropName as string] ?? searchValue,
    }));
  };

  const handleFilters = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>,
  ) => {
    onSearch({
      searchValue: e.target.value as string,
      fieldName: e.target.name || 'keyword',
    });
  };

  const onPagination = (_event: React.ChangeEvent<unknown>, page: number) => {
    setParams({page: page.toString()});
    setGridRequest({...gridRequest, pageNumber: page});
  };

  const onClear = (name?: string) => {
    if (!name) return;
    setGridRequest(prev => {
      const temp = {...prev};
      delete temp[name as keyof payload];
      return temp;
    });
  };

  const onSort = ([sortConfig]: [
    {field: string; sort: 'asc' | 'desc'} | undefined,
  ]) => {};

  const resetPayload = (value: payload) => {
    setGridRequest(value ?? (INITIAL_VALUES as payload));
  };

  return {
    gridRequest,
    onSearch,
    onPagination,
    resetPayload,
    onSort,
    handleFilters,
    addLoadingItem,
    removeLoadingItem,
    hasLoadingItem,
    onClear,
  };
}

export type SearchPayload = {
  searchValue: any;
  fieldName?: string;
  valuePropName?: string;
  searchObject?: AnyObject;
};
