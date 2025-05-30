import clsx from 'clsx';
import { BreadCrumb, Title } from './PageLayoutComponents';
import { PageLayoutProps } from './types';

export default function PageLayout({
  showWrapper,
  rootContainerClassName = '',
  titleContainerClassName = '',
  title,
  titleEndComponent,
  titleEndComponentClassName = '',
  children,
  titleClassName = '',
  containerClassName = '',
  childrenContainerClassName = '',
  showRootWrapper = false,
  isForm = false,
  breadCrumbOverrideConfig,
  hideBreadCrumb = false,
  showTitleOutsideWrapper = false,
  wrapperClassName,
}: PageLayoutProps) {
  const showTitleContainer = title || titleEndComponent;

  return (
    <>
      <div
        className={clsx(rootContainerClassName, {
          'max-w-[1296px] m-auto': isForm,
        })}>
        {!hideBreadCrumb && <BreadCrumb overrides={breadCrumbOverrideConfig} />}
        {showTitleOutsideWrapper && showTitleContainer && (
          <Title
            title={title}
            titleEndComponent={titleEndComponent}
            titleContainerClassName={titleContainerClassName}
            titleClassName={titleClassName}
            titleEndComponentClassName={titleEndComponentClassName}
          />
        )}
        <div
          className={clsx(wrapperClassName, {'bg-white p-4': showRootWrapper})}>
          <div
            className={clsx({'bg-white p-4': showWrapper}, containerClassName)}>
            {showTitleContainer && !showTitleOutsideWrapper && (
              <Title
                title={title}
                titleEndComponent={titleEndComponent}
                titleContainerClassName={titleContainerClassName}
                titleClassName={titleClassName}
                titleEndComponentClassName={titleEndComponentClassName}
              />
            )}
          </div>
          <div className={`mt-4 ${childrenContainerClassName}`}>{children}</div>
        </div>
      </div>
    </>
  );
}
