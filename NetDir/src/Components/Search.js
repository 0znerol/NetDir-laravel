import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Text } from "react-native";
import FileList from "./FileList";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { accent, background, border, nDark } from "../variables/Colors";

export default function Search() {
  const [sort, setSort] = useState("name");

  return (
    <Grid
      container
      xs={12}
      style={{
        marginTop: 20,
        justifyContent: "center",
        paddingTop: 60,
        width: "100%",
      }}
    >
      <Grid item="true" xs={12}>
        <Grid
          container
          style={{
            justifyContent: "center",
            margin: 10,
            width: "50%",
            margin: "auto",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="sortLable" style={{ color: "lightgray" }}>
              Sort
            </InputLabel>
            <Select
              labelId="sortLable"
              id="sortSelect"
              value={sort}
              label="sort"
              onChange={(e) => {
                setSort(e.target.value);
              }}
              style={{
                color: "lightgray",
                backgroundColor: border,
              }}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      color: "lightgrey",
                      backgroundColor: border,
                    },
                  },
                },
              }}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: accent,
                },
              }}
            >
              <MenuItem
                value={"dateAsc"}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                }}
              >
                Old
              </MenuItem>
              <MenuItem
                value={"dateDes"}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                }}
              >
                New
              </MenuItem>
              <MenuItem
                value={"name"}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                }}
              >
                Name
              </MenuItem>
              <MenuItem
                value={"largest"}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                }}
              >
                Largest
              </MenuItem>
              <MenuItem
                value={"smallest"}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: nDark,
                    color: accent,
                  },
                }}
              >
                Smallest
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container style={{ justifyContent: "center", width: "100%" }}>
          <FileList fileType="/" sort={sort} />
        </Grid>
      </Grid>
    </Grid>
  );
}
