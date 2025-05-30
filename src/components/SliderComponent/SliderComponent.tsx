import {Box, styled} from '@mui/material';
import SummaryVideoCard from '../SummaryVideoCard/SummaryVideoCard';
import {useState} from 'react';
import { SliderComponentProps } from './types';

export default function SliderComponent({
  currentItem,
}: SliderComponentProps) {
  const SliderContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    margin: 'auto',
    // overflow: 'hidden',
  });

  const SliderContent = styled(Box)({
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    // height: '400px',
  });

  const Slide = styled(Box)({
    minWidth: '100%',
    height: '100%',
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Box sx={{width: '100%', position: 'relative'}}>
      <SliderContainer>
        <SliderContent
          sx={{
            gap: 0,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}>
          <Slide key={currentIndex}>
            <Box display={'grid'} gridAutoFlow={'column'}>
              <SummaryVideoCard item={currentItem} />
            </Box>
          </Slide>
        </SliderContent>
      </SliderContainer>
    </Box>
  );
}
