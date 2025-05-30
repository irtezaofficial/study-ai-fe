import ListRenderer from '@Components/ListRenderer/ListRenderer';
import {Container, Grid, Skeleton} from '@mui/material';

export default function RelatedVideoCardSkeleton({
  count = 3,
}: {
  count?: number;
}) {
  return (
    <>
      <ListRenderer
        data={Array.from({length: count})}
        renderItem={(_, index) => (
          <Grid item md={11} key={index}>
            <RelatedVideoCardSkeletonItem />
          </Grid>
        )}
      />
    </>
  );
}

export function RelatedVideoCardSkeletonItem() {
  return (
    <Container
      component={'main'}
      sx={{
        mb: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,2)',
        borderRadius: 3,
      }}>
      <Grid container flexDirection={'row'}>
        <Grid item>
          <Skeleton
            variant="rounded"
            width={120}
            height={68}
            sx={{mt: 3, mb: 3, borderRadius: 2}}
          />
        </Grid>
        <Grid item>
          <Skeleton
            variant="text"
            width={100}
            height={30}
            sx={{ml: 0.4, mt: '25%'}}
          />
          <Skeleton variant="text" width={50} height={30} sx={{ml: 0.4}} />
        </Grid>
      </Grid>
    </Container>
  );
}
