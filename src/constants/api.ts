export enum API_MODES {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
  PAYLOAD_TOO_LARGE = 413,
}

export enum CONTENT_TYPE {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
}

export const BASE_URLS = {
  BACKEND: 'http://127.0.0.1:8000/api',
  GOOGLE: 'https://www.googleapis.com',
};

export const PAGE_SIZE = 12;

export const STALE_TIME = 60 * 1000;

export const CACHE_TIME = 1000 * 60 * 60 * 24;
