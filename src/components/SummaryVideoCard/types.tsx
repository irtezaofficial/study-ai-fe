import { SummaryVideoItem, YoutubeSearchResultItem } from "~/src/apiService/ResponseTypes";

export type SummaryVideoProps = {
    item: YoutubeSearchResultItem;
    handleAction?: () => void;
    getLoadingStatusItem?: (id: number | string) => boolean;
  };
  