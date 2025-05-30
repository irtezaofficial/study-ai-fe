import { Card } from '@mui/material';
import { SummaryVideoProps } from './types';

export default function SummaryVideoCard({
  item,
}: SummaryVideoProps) {
  return (
    <Card
      sx={{
        height: '100%',
        mx: 'auto',
        maxWidth: '800px',
        boxShadow: 'none',
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        
      <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${item?.id?.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          />
    </Card>
  );
}
