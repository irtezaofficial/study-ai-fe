import { CenteredBox } from "@Theme/GeneralStyledComponents";
import EmptyListIcon from "@Assets/icons/EmptyList.svg";
import { Grid, Typography } from "@mui/material";

export default function NoData({
  title = "No Data",
  icon = <EmptyListIcon />,
}: NoDataProps) {
  return (
    <Grid item xs={12}>
      <CenteredBox
        p={4}
        width="100%"
        borderRadius={2}
        flexDirection="column"
        gap={2}
      >
        {icon}
        <Typography color="primary.main">{title}</Typography>
      </CenteredBox>
    </Grid>
  );
}

export type NoDataProps = {
  title?: string;
  icon?: React.ReactNode;
};
