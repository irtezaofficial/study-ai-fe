export type SearchBarProps = {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  defaultValue?: string | undefined;
};
