import {useMutation} from '@tanstack/react-query';
import {API_MODES} from '../constants/api';
import {API_ROUTES} from '../constants/apiUrls';
import {TUseMutationOptions} from '../services/apiService';
import {QuizCheckerRequest} from './RequestTypes';
import {QuizCheckerResponse} from './ResponseTypes';

export function QuizChecker(
  options: TUseMutationOptions<QuizCheckerResponse | null, QuizCheckerRequest>,
) {
  return useMutation({
    mutationFn: async payload => {
      const formData = new FormData();
      formData.append('file', payload.file);
      formData.append('ContextTopic', payload.ContextType);

      const response = await fetch(API_ROUTES.API.QUIZ_CHECKER, {
        method: API_MODES.POST,
        body: formData,
      });

      if (response.ok) {
        var data = await response.json();
        return data;
      }
    },
    ...options,
  });
}
