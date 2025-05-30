import BasicTextInput from "@Components/Inputs/BasicTextInput";
import { ChangeEvent, ComponentType, Fragment, useRef } from "react";
import SearchIcon from "@Assets/icons/SearchIcon.svg";
import FilterIcon from "@Assets/icons/Filter.svg";
import { Button, Grid } from "@mui/material";
import { ModalRefType, ModalTypes } from "@Components/Modal/Modal";

export default function SearchContainer<F = unknown>({
  showFilter = false,
  Filter,
  onChange,
  filterProps,
  ...props
}: SearchContainerType<F>) {
  const ref = useRef<ModalRefType>();

  const openModal = () => {
    ref.current?.open();
  };

  return (
    <Grid
      columnSpacing={2}
      rowSpacing={1}
      container
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
    >
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <BasicTextInput
          sx={{
            "& .MuiInputBase-root": {
              height: 45,
              borderRadius: 1,
            },
          }}
          placeholder="Search..."
          value={undefined}
          icons={{
            start: {
              icon: SearchIcon,
            },
          }}
          onChange={onChange}
          {...props}
        />
      </Grid>
      {showFilter && Filter && (
        <Grid item alignSelf={{ xs: "flex-end", sm: "center" }}>
          <Filter modalRef={ref} {...filterProps} />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{ height: 40 }}
            onClick={openModal}
          >
            Filter
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

type SearchContainerType<F> = {
  Filter?: ComponentType<ModalTypes> | typeof Fragment;
  showFilter?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filterProps?: Omit<ModalTypes, "modalRef"> & F;
};
