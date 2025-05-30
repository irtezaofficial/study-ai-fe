import {SearchResultItem} from '~/src/apiService/ResponseTypes';

export type SearchResultProps = {
  item: SearchResultItem;
  handleAction?: () => void;
  getLoadingStatusItem?: (id: number | string) => boolean;
};
