import { GetProfile } from '@Api/Personal';
import { Box, Typography } from '@mui/material';
import { CenteredBox } from '@Theme/GeneralStyledComponents';
import { getInitials } from '@Utils/utils';
import { ProfileAvatar } from './Styles';

export default function Settings() {
  const data = GetProfile();
  const name = `${data?.firstName} ${data?.lastName}`;

  return (
    <>
      <Box display="flex" alignItems="center" gap={2}>
        <Box display="flex" alignItems="center">
          <CenteredBox gap={1}>
            <ProfileAvatar
              sx={{height: 32, width: 32, fontSize: 14}}
              src={data?.profilePicture?.accessURL}>
              {getInitials(name)}
            </ProfileAvatar>
            <Typography
              color="text.secondary"
              display={{xs: 'none', sm: 'block'}}>
              {data?.firstName} {data?.lastName}
            </Typography>
          </CenteredBox>
        </Box>
      </Box>
    </>
  );
}
