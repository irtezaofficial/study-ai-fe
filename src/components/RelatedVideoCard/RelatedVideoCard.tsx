import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import Palette from '~/src/theme/Palette';
import { RelatedVideoProps } from './types';

export default function RelatedVideoCard({
  item,
  onClick
}: RelatedVideoProps) {
  return (
    <Card
      sx={{
        mr: 1,
        ml: 1,
        mb: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,1)',
        borderRadius: 3,
      }}>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Box sx={{position: 'relative', mr: 1}}>
          <img
            src={item?.snippet?.thumbnails?.high?.url}
            alt={item?.snippet?.title}
            style={{width: 120, height: 68, borderRadius: 8}}
          />
          <IconButton
          onClick={onClick}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255,0,0,0.5)',
              '&:hover': {backgroundColor: 'rgba(255,0,0,1)'},
            }}>
            <YouTubeIcon sx={{color: Palette.common.white}} />
          </IconButton>
        </Box>
        <Typography variant="body2">{item?.snippet?.title}</Typography>
      </CardContent>
    </Card>
  );
}
