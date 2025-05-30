import HomeIcon from '@mui/icons-material/Home';
import {
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetGoogleCustomSearch } from '~/src/apiService/GoogleCustomSearch';
import ListRenderer from '~/src/components/ListRenderer/ListRenderer';
import NoData from '~/src/components/NoData/NoData';
import SearchResultCard from '~/src/components/SearchResultCard/SearchResultCard';
import SearchResultCardSkeleton from '~/src/components/Skeleton/SearchResultSkeleton';
import { GOOGLE_CUSTOM_SEARCH_PLACEHOLDER_DATA } from '~/src/constants/app';
import { NavigationRoutes } from '~/src/navigation/NavigationRoutes';
import { CenteredBox } from '~/src/theme/GeneralStyledComponents';
import Palette from '~/src/theme/Palette';
import { handleFetchOnScroll, selectGoogleInfiniteQueryData } from '~/src/utils/utils';
import SearchBar from '../SearchBar/SearchBar';

export default function SearchResult() {
  const {q} = useParams() as {q: string};

  const {
    data = GOOGLE_CUSTOM_SEARCH_PLACEHOLDER_DATA,
    isLoading, 
    isFetching, 
    isPending, 
    refetch,
    ...meta} = useGetGoogleCustomSearch(q);

  const searchResults = selectGoogleInfiniteQueryData(data);

  const navigate = useNavigate();

  const handleHomeOnClick = () => {
    navigate(NavigationRoutes.APP_ROUTES.DASHBOARD);
  };

  useEffect(() => {
    const el = window.document.getElementById('main-content') as HTMLDivElement | null;
    if (!el) return;

    function handler(e: any) {
      handleFetchOnScroll(e, meta);
    }

    el.addEventListener("scroll", handler);

    return () => {
      el.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <Grid component={'main'} onScroll={(e) => handleFetchOnScroll(e, meta)}>
      <CenteredBox>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={1} sm={1}>
            <Toolbar sx={{justifyContent: 'center'}}>
              <IconButton
                onClick={handleHomeOnClick}
                color="primary"
                aria-label="home">
                <HomeIcon />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item xs={10}>
            <SearchBar autoFocus={false} defaultValue={q} />
          </Grid>
        </Grid>
      </CenteredBox>

      <Container component="main" sx={{mt: 4}}  >
        <Grid container>
          <Grid item md={12} xs={12}>
            <Typography
              variant="h4"
              sx={{
                color: Palette.text.primary,
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 5,
              }}>
              {q}
            </Typography>
            <ListRenderer
              isLoading={isLoading || isFetching}
              isFetching={isFetching || isLoading}
              LoadingComponent={<SearchResultCardSkeleton />}
              NoDataComponent={<NoData title="No Results" />}
              data={searchResults ?? []}
              renderItem={(item, index) => (
                <Grid item xs={12} key={index}>
                  <SearchResultCard item={item} />
                </Grid>
              )}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
