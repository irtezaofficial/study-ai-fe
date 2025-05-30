import {PageLayoutProps, PageLayoutTitleProps} from './types';
import {Link, useLocation} from 'react-router-dom';
import {memo} from 'react';
import {getBreadCrumbs} from '~/src/utils/utils';
import {Grid} from '@mui/material';

export const Title = ({
  title,
  titleEndComponent,
  titleContainerClassName,
  titleClassName,
  titleEndComponentClassName,
}: PageLayoutTitleProps) => (
  <div
    className={`flex items-center justify-between mb-4 ${titleContainerClassName}`}>
    {title && (
      <h1 className={`text-[22px] font-semibold font-outfit ${titleClassName}`}>
        {title}
      </h1>
    )}
    {titleEndComponent && (
      <div
        className={`flex items-center gap-4 font-extrabold ${titleEndComponentClassName}`}>
        {titleEndComponent}
      </div>
    )}
  </div>
);

export const BreadCrumb = memo(function ({
  overrides,
}: {
  overrides: PageLayoutProps['breadCrumbOverrideConfig'];
}) {
  const {pathname} = useLocation();
  const crumbs = getBreadCrumbs(pathname, overrides);

  if (!crumbs.length) return null;

  return (
    <Grid container>
      {crumbs.map(({title, link}, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <>
            <Grid item>
              <Link to={link}>
                <Grid item paddingRight={'5px'}>
                  {title}
                  {!isLast && ' /'}
                </Grid>
              </Link>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
});
