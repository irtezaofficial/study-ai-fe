import {InfiniteData} from '@tanstack/react-query';
import {
  AnswerCheckerResponse,
  CustomGoogleSearchResponse,
  QuestionGeneratorResponse,
  SummarizationResponse,
  YoutubeSearchListResponse,
} from '../apiService/ResponseTypes';
import {FileTypeEnums} from './enums';

export const TAB_SIZE = '980px';
export const DRAWER_WIDTH = '270px';
export const DRAWER_WIDTH_NUMBER = 270;
export const CLOSE_SIDEBAR_ON = 'xl';
export const APP_NAME = 'Study AI';

export const AllowedFileTypes = {
  [FileTypeEnums.Image]: ['image/png', 'image/jpeg', 'image/jpg'],
  [FileTypeEnums.Video]: ['video/mp4'],
  [FileTypeEnums.Application]: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ],
};

export const GOOGLE_CUSTOM_SEARCH_PLACEHOLDER_DATA: InfiniteData<CustomGoogleSearchResponse> =
  {
    pages: [
      {
        kind: '',
        url: {
          type: '',
          template: '',
        },
        queries: {
          request: [
            {
              title: '',
              totalResults: '0',
              searchTerms: '',
              count: 0,
              startIndex: 0,
              inputEncoding: 'utf8',
              outputEncoding: 'utf8',
              safe: 'off',
              cx: '',
            },
          ],
          nextPage: [
            {
              title: '',
              totalResults: '0',
              searchTerms: '',
              count: 0,
              startIndex: 0,
              inputEncoding: 'utf8',
              outputEncoding: 'utf8',
              safe: 'off',
              cx: '',
            },
          ],
        },
        context: {
          title: '',
        },
        searchInformation: {
          searchTime: 0,
          formattedSearchTime: '0.00',
          totalResults: '0',
          formattedTotalResults: '0',
        },
        items: [],
      },
    ],
    pageParams: [null],
  };

export const YOUTUBE_SEARCH_PLACEHOLDER_DATA: InfiniteData<YoutubeSearchListResponse> =
  {
    pages: [
      {
        kind: 'youtube#searchListResponse',
        etag: '',
        nextPageToken: '',
        regionCode: '',
        pageInfo: {
          totalResults: 0,
          resultsPerPage: 0,
        },
        items: [],
      },
    ],
    pageParams: [null],
  };

export const SUMMARY_PLACEHOLDERDATA: SummarizationResponse = {
  summary: '',
};

export const QUESTION_GENERATOR_PLACEHOLDERDATA: QuestionGeneratorResponse = {
  questions: [],
};

export const ANSWER_CHECKER_PLACEHOLDERDATA: AnswerCheckerResponse = {
  evaluation: '',
  payload: {
    answer: '',
    question: '',
  },
};
