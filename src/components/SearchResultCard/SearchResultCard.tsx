import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavigationRoutes } from '~/src/navigation/NavigationRoutes';
import Palette from '~/src/theme/Palette';
import { getOrSetQueryString, getOrSetUrlString } from '~/src/utils/utils';
import { SearchResultProps } from './types';

export default function SearchResultCard({
  item,
}: SearchResultProps) {
  const navigate = useNavigate();

  const handleGetSummary = () => {
    getOrSetUrlString(item.link);
    navigate(
      NavigationRoutes.APP_ROUTES.SUMMARY.replace(
        ':q',
        String(getOrSetQueryString()),
      ),
    );
  };

  return (
    <Box
      component={Card}
      onClick={handleGetSummary}
      mb={2}
      // boxShadow={'0 2px 4px rgba(0,0,0,2)'}
      borderRadius={3}
      sx={{
        boxShadow: '0 2px 4px rgba(0,0,0,1)',
        '&:hover': {
          boxShadow: '0 2px 11px rgba(0,0,0,1)',
        },

        // boxShadow: '0 2px 4px rgba(0,0,0,2)',
        cursor: 'pointer',
      }}>
      <CardContent>
        <Typography
          variant="body1"
          color="primary"
          sx={{display: 'flex', alignItems: 'center', mb: 0.5}}>
          {item.title}
          <AddIcon sx={{fontSize: 16, ml: 0.5}} />
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mb: 0.5}}>
          {item.link}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.snippet}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.displayLink}
        </Typography>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button
            onClick={handleGetSummary}
            variant="contained"
            endIcon={<ArrowForwardIcon sx={{color: 'white'}} />}
            sx={{
              bgcolor: Palette.primary.main,
              '&:hover': {
                bgcolor: Palette.primary.main,
                boxShadow: '0 2px 11px rgba(0,0,0,1)',
              },
            }}>
            <Typography color={'white'}>Get Summary</Typography>
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
}
