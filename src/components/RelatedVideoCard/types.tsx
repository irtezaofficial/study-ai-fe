import {RelatedVideoItem, YoutubeSearchResultItem, YoutubeThumbnail} from '~/src/apiService/ResponseTypes';

export type RelatedVideoProps = {
  item: YoutubeSearchResultItem;
  onClick?: () => void;
  handleAction?: () => void;
  getLoadingStatusItem?: (id: number | string) => boolean;
};
