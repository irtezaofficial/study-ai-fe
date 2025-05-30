import HomeIcon from '@mui/icons-material/Home';
import {
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetYoutubeSearchListResult } from '~/src/apiService/GoogleCustomSearch';
import { useGetSummary } from '~/src/apiService/Summary';
import ListRenderer from '~/src/components/ListRenderer/ListRenderer';
import NoData from '~/src/components/NoData/NoData';
import PageLayout from '~/src/components/PageLayout/PageLayout';
import RelatedVideoCard from '~/src/components/RelatedVideoCard/RelatedVideoCard';
import RelatedVideoCardSkeleton from '~/src/components/Skeleton/RelatedVideoCardSkeleton';
import { SummarySkeleton } from '~/src/components/Skeleton/SummarySkeleton';
import SliderComponent from '~/src/components/SliderComponent/SliderComponent';
import { SUMMARY_PLACEHOLDERDATA, YOUTUBE_SEARCH_PLACEHOLDER_DATA } from '~/src/constants/app';
import { NavigationRoutes } from '~/src/navigation/NavigationRoutes';
import Palette from '~/src/theme/Palette';
import { getOrSetQueryString, getOrSetSummaryText, getOrSetUrlString, handleFetchOnScroll, selectGoogleInfiniteQueryData } from '~/src/utils/utils';

export default function Summary() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const {q} = useParams() as {q: string};
  const handleHomeOnClick = () => {
    navigate(NavigationRoutes.APP_ROUTES.DASHBOARD);
  };

  const [index, setIndex] = useState(0);

  const { 
    data: ytData= YOUTUBE_SEARCH_PLACEHOLDER_DATA, 
    isLoading: ytIsLoading, 
    isFetching: ytIsFetching, 
    isPending: ytIsPending, 
    ...ytMeta } = useGetYoutubeSearchListResult(q);

  const handleTakeQuiz = () => {
    getOrSetSummaryText(summary?.summary);
    navigate(
      NavigationRoutes.APP_ROUTES.QUIZ.replace(
        ':q',
        String(getOrSetQueryString(q)),
      ),
    );
  };

  const videoData = selectGoogleInfiniteQueryData(ytData);
  
  const url = String(getOrSetUrlString());
  
  const { 
    data: summary = SUMMARY_PLACEHOLDERDATA,
    isPending: summaryIsPending,
    isLoading: summaryIsLoading } = useGetSummary(url);

  return (
    <PageLayout>
      <Grid container spacing={1}>
        {/* Home Navigation */}
        <Grid
          sx={{
            position: 'static',
            marginBottom: isMobile ? theme.spacing(2) : 0,
          }}>
          <Toolbar sx={{justifyContent: 'center'}}>
            <IconButton
              onClick={handleHomeOnClick}
              color="primary"
              aria-label="home">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </Grid>
        <Grid
          item
          xs={12}
          sm={isMobile ? 12 : 8}
          sx={{
            order: isMobile ? 2 : 1,
            paddingX: isMobile ? 0 : theme.spacing(2),
          }}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            align="center"
            fontWeight={'bold'}
            gutterBottom
            color={Palette.text.primary}>
            {q}
          </Typography>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            align="center"
            gutterBottom
            fontWeight={'bold'}>
            Summary
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color={Palette.text.secondary}
            mb={8}
            maxWidth={800}
            mx={'auto'}
            px={isMobile ? 2 : 0}>
            {!summaryIsPending && !summaryIsLoading ? 
            summary?.summary: <SummarySkeleton />}
          </Typography>
          <SliderComponent currentItem={videoData?.[index]} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={isMobile ? 12 : 3}
          sx={{
            position: isMobile ? 'static' : 'fixed',
            right: isMobile ? 'auto' : '5vw',
            order: isMobile ? 3 : 2,
            marginTop: isMobile ? theme.spacing(2) : 0,
          }}>
          <Grid container spacing={2}>
            {/* Quiz Button */}
            <Grid item xs={12} textAlign={'center'} marginBottom={'25px'}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTakeQuiz}
                sx={{
                  width: '100%',
                  borderRadius: 28,
                  px: 4,
                  bgcolor: Palette.primary.main,
                  '&:hover': {
                    bgcolor: Palette.primary.main,
                    boxShadow: '0 2px 11px rgba(0,0,0,1)',
                  },
                }}>
                <Typography color={'white'}>Take Quiz</Typography>
              </Button>
            </Grid>

            {/* Related Videos */}
            <Grid item xs={12} >
              <Typography
                variant="h6"
                gutterBottom
                color={Palette.text.primary}
                fontWeight={'bold'}
                textAlign={'center'}>
                Related Videos
              </Typography>

              <Grid
              onScroll={(e) => handleFetchOnScroll(e, ytMeta)}
               sx={{
                  maxHeight: isMobile ? 'auto' : '55vh',
                  overflowY: isMobile ? 'visible' : 'auto',
                  scrollbarWidth: 'auto',
                  scrollbarColor: Palette.primary.main,
                }}>
                <ListRenderer
                isLoading={ytIsLoading}
                LoadingComponent={<RelatedVideoCardSkeleton />}
                NoDataComponent={<NoData title="No Results" />}
                data={videoData ?? []}
                renderItem={(item, index) => (
                  <Grid key={index} mb={2}>
                    <RelatedVideoCard item={item} onClick={()=>setIndex(index)} />
                  </Grid>
                )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  );
}
