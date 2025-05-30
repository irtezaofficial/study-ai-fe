import FullPageLoader from '@Components/FullPageLoader/FullPageLoader';
import {DRAWER_WIDTH} from '@Constants/app';

import {Box, styled} from '@mui/material';
import {AnimatePresence} from 'framer-motion';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import {Assets} from '~/src/assets/assets';

export default function Content() {
  return (
    <Suspense fallback={<FullPageLoader zIndex={-1} />}>
      <Main
        component="main"
        id='main-content'
        sx={{
          height: 'auto',
          backgroundImage: `url(${Assets.Images.BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          overflowX: 'scroll',
        }}>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Main>
    </Suspense>
  );
}

const Main = styled(Box)(({theme: {spacing, palette, breakpoints}}) => ({
  background: palette.custom.background,
  padding: spacing(2, 2),
  marginTop: spacing(8),
  height: 'max-content',
  width: `calc(100% - ${DRAWER_WIDTH})`,
  flexGrow: 1,
  [breakpoints.up('md')]: {
    padding: spacing(5, 7),
  },
}));

const Background = styled(Box)(({theme: {spacing, palette, breakpoints}}) => ({
  backgroundImage: `url(${Assets.Images.BackgroundImage})`,
  backgroundSize: 'cover',
  padding: spacing(2, 2),
  marginTop: spacing(8),
  height: '100vh',
  width: `100vw`,
  flexGrow: 1,
  [breakpoints.up('md')]: {
    padding: spacing(5, 7),
  },
  opacity: 0.2,
}));
