import { SummaryVideoItem, YoutubeSearchListResponse, YoutubeSearchResultItem } from "~/src/apiService/ResponseTypes";

export type SliderComponentProps = {
    currentItem: YoutubeSearchResultItem;
    handleAction?: () => void;
    getLoadingStatusItem?: (id: number | string) => boolean;
  };
  