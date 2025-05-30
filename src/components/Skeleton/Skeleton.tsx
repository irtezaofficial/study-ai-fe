export default function SkeletonLoader({
  children,
  isLoading,
  skeleton,
}: SkeletonLoaderProps) {
  return isLoading ? skeleton : children;
}

export type SkeletonLoaderProps = {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
};
