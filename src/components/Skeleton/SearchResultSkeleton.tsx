import ListRenderer from '@Components/ListRenderer/ListRenderer';
import {Container, Grid, Skeleton} from '@mui/material';

export default function SearchResultCardSkeleton({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <>
      <ListRenderer
        data={Array.from({length: count})}
        renderItem={(_, index) => (
          <Grid item md={11} key={index}>
            <SearchResultCardSkeletonItem />
          </Grid>
        )}
      />
    </>
  );
}

export function SearchResultCardSkeletonItem() {
  return (
    <Container
      component={'main'}
      sx={{
        mb: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,2)',
        borderRadius: 3,
      }}>
      <Grid container>
        <Grid item xs={11}>
          <Skeleton variant="text" width={300} height={40} />
        </Grid>

        <Grid item xs={11}>
          <Skeleton variant="text" width={400} height={30} sx={{}} />
        </Grid>

        <Grid item xs={11}>
          <Skeleton variant="text" width="100%" height={60} sx={{}} />
        </Grid>
      </Grid>
    </Container>
  );
}
