import { Container, Grid, Skeleton } from "@mui/material";

export function SummarySkeleton() {
  return (
    <Container
      component={'main'}>
      <Grid container flexDirection={'row'}>
        <Grid item>
          <Skeleton variant="text" width={750} height={40} />
          <Skeleton variant="text" width={600} height={40} />
          <Skeleton variant="text" width={500} height={40} />
          <Skeleton variant="text" width={600} height={40} />
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={500} height={40} />
          <Skeleton variant="text" width={600} height={40} />
          <Skeleton variant="text" width={300} height={40} />
        </Grid>
      </Grid>
    </Container>
  );
}