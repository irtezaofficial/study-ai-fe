import {useMutation} from '@tanstack/react-query';
import {API_MODES} from '../constants/api';
import {API_ROUTES} from '../constants/apiUrls';
import {TUseMutationOptions} from '../services/apiService';
import {AnswerCheckerRequest} from './RequestTypes';
import {AnswerCheckerResponse} from './ResponseTypes';

export function AnswerChecker(
  options: TUseMutationOptions<AnswerCheckerResponse, AnswerCheckerRequest>,
) {
  return useMutation({
    mutationFn: async payload => {
      const response = await fetch(API_ROUTES.API.ANSWER_CHECKER, {
        method: API_MODES.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: payload.question,
          user_answer: payload.answer,
        }),
      });

      var data: AnswerCheckerResponse = {
        payload: payload,
        evaluation: undefined,
      };
      if (response.ok) {
        var apiResponse = await response.json();
        data.evaluation = apiResponse?.evaluation;
      }

      return data;
    },
    ...options,
  });
}
