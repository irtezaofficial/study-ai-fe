import {useQuery} from '@tanstack/react-query';
import {TUseQueryOptions} from '../services/apiService';
import {QuestionGeneratorResponse} from './ResponseTypes';
import {STORAGE_KEYS} from '../constants/storage';
import {request} from './ApiRequestHandler';
import {API_ROUTES} from '../constants/apiUrls';
import {API_MODES} from '../constants/api';

export function useQuestionGenerator(
  summaryText: string,
  options?: TUseQueryOptions<QuestionGeneratorResponse>,
) {
  return useQuery({
    queryKey: [STORAGE_KEYS.QUESTIONGENERATOR, summaryText],
    queryFn: async () => {
      const {data} = await request({
        url: API_ROUTES.API.QUESTION_GENERATOR,
        method: API_MODES.POST,
        params: {text: summaryText},
      });
      return data;
    },
    ...options,
  });
}
