import {ModalRefType} from '../Modal/Modal';

export interface PageLayoutProps {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScroll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showWrapper?: boolean;
  hideSearch?: boolean;
  hideFilters?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  titleEndComponent?: React.ReactNode;
  titleEndComponentClassName?: string;
  titleClassName?: string;
  containerClassName?: string;
  filterFields?: Record<string, any>[];
  fetchingData?: boolean;
  useFiltersModal?: boolean;
  rootContainerClassName?: string;
  titleContainerClassName?: string;
  wrapperClassName?: string;
  endComponent?: React.ReactNode;
  childrenContainerClassName?: string;
  underConstruction?: boolean;
  showRootWrapper?: boolean;
  listRequest?: Record<string, any>;
  showBackButton?: boolean;
  backTitle?: string;
  backLink?: string;
  form?: boolean;
  isForm?: boolean;
  showTitleOutsideWrapper?: boolean;
  breadCrumbOverrideConfig?: BreadCrumbConfigType;
  hideBreadCrumb?: boolean;
  showTitleOutside?: boolean;
}

export type BreadCrumbConfigType = Record<
  string,
  React.ReactNode | {title: string; link: string}
>;

export interface PageLayoutBackButtonProps {
  handleBack: () => void;
  backTitle: string;
}

export type PageLayoutTitleProps = Pick<
  PageLayoutProps,
  | 'title'
  | 'titleEndComponent'
  | 'titleContainerClassName'
  | 'titleClassName'
  | 'titleEndComponentClassName'
>;

export type FilterComponentsProps = {
  modalRef: React.RefObject<ModalRefType>;
} & Pick<
  PageLayoutProps,
  | 'hideFilters'
  | 'hideSearch'
  | 'fetchingData'
  | 'useFiltersModal'
  | 'onSearch'
  | 'endComponent'
  | 'listRequest'
  | 'filterFields'
>;
