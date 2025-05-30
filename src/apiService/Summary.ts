import { useQuery } from "@tanstack/react-query";
import { TUseQueryOptions } from "../services/apiService";
import { SummarizationResponse } from "./ResponseTypes";
import { STORAGE_KEYS } from "../constants/storage";
import { request } from "./ApiRequestHandler";
import { API_ROUTES } from "../constants/apiUrls";
import { API_MODES } from "../constants/api";

export function useGetSummary(
  q: string,
  options?: TUseQueryOptions<SummarizationResponse>,
) {
  return useQuery({
    queryKey: [STORAGE_KEYS.SUMMARIZATION, q],
    queryFn: async () => {
      const {data} = await request({
        url: API_ROUTES.API.SUMMARIZATION,
        method: API_MODES.POST,
        params: {url: q},
      });
      return data;
    },
    ...options,
  });
}
