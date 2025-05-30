import { Box, Grid, Typography } from '@mui/material';
import Palette from '~/src/theme/Palette';
import SearchBar from '../SearchBar/SearchBar';

export default function Dashboard() {
  return (
    <Box>
      <Grid
        container
        flexDirection={'column'}
        textAlign={'center'}
        sx={{mt: 12, mb: 1}}>
        <Typography
          variant="h2"
          color={Palette.text.primary}
          fontWeight={'bold'}>
          {' '}
          Study AI{' '}
        </Typography>
        <Typography variant="h5" gutterBottom color={Palette.common.black}>
          {' '}
          Improve your learning in a single step{' '}
        </Typography>
        <SearchBar />
      </Grid>
    </Box>
  );
}
