import {UploadDocumentEnums} from '@Constants/enums';
import {AnswerCheckerRequest} from './RequestTypes';

export enum UserStatus {
  Unconfirmed = 100,
  Blocked = 200,
  Active = 300,
  Deactive = 400,
}

export type FileResponse = {
  id: number;
  accessURL: string;
  originalFileName: string;
};

export type TokenResponse = {
  userId: string;
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  status: UserStatus;
  isOnboarded: boolean;
};

export type ProfileResponse = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: FileResponse;
  isOnboarded: boolean;
};

export type UploadDocumentInitResponse = {
  documentId: number;
  sasUrl: string;
};

export type SearchResultItem = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: {
    cse_thumbnail?: Array<{
      src: string;
      width: string;
      height: string;
    }>;
    metatags?: Array<Record<string, string>>;
    cse_image?: Array<{
      src: string;
    }>;
  };
};

export type CustomGoogleSearchResponse = {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: {
    request: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
    nextPage?: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
  };
  context: {
    title: string;
  };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items?: Array<SearchResultItem>;
};

export type YoutubeSearchListResponse = {
  kind: 'youtube#searchListResponse';
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeSearchResultItem[];
};

export type YoutubeSearchResultItem = {
  kind: 'youtube#searchResult';
  etag: string;
  id: {
    kind: 'youtube#video' | 'youtube#playlist' | 'youtube#channel';
    videoId?: string;
    playlistId?: string;
    channelId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YoutubeThumbnail;
      medium: YoutubeThumbnail;
      high: YoutubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

export type YoutubeThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type RelatedVideoItem = {
  title: string;
  thumbnail: string;
  duration: string;
};

export type SummarizationResponse = {
  summary: string;
};

export type QuestionGeneratorResponse = {
  questions: string[];
};

export type AnswerCheckerResponse = {
  evaluation?: string | null | undefined;
  payload: AnswerCheckerRequest;
};

export interface QuizCheckerResponse {
  ReviewedAnswer: string;
}

export type SummaryVideoItem = {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
};

export type MediaResponse = {
  id: number;
  accessURL: string;
  originalFileName: string;
  documentType: UploadDocumentEnums;
};
