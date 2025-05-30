import {BASE_URLS} from './api';

export const API_ROUTES = {
  API: {
    SUMMARIZATION: `/summerization/`,
    QUESTION_GENERATOR: `/question-generator/`,
    ANSWER_CHECKER: `${BASE_URLS.BACKEND}/answere-checker/`,
    QUIZ_CHECKER: `${BASE_URLS.BACKEND}/QuizChecker/`,
  },
  GOOGLE: {
    CUSTOM_SEARCH: `customsearch/v1?key=AIzaSyDIbYukksRCTLdscVW9X8q3w215Jm7w4cw&cx=36a9ce76ca8364505&q={q}`,
    YOUTUBE_SEARCH: `youtube/v3/search?key=AIzaSyDIbYukksRCTLdscVW9X8q3w215Jm7w4cw&cx=36a9ce76ca8364505&type=video&part=snippet&q={q}`,
  },
};
