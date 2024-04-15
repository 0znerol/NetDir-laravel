import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { accent, border, background, nDark } from "../variables/Colors";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";
import CollectionsIcon from "@mui/icons-material/Collections";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
export default function FloatingDot() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <SpeedDial
      //   theme="dark"
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 5, left: 5 }}
      direction="right"
      icon={
        <SpeedDialIcon
          openIcon={<CloseIcon />}
          icon={<MenuIcon />}
          sx={{
            rotate: 0,
          }}
        />
      }
      FabProps={{
        sx: {
          bgcolor: border,
          "&:hover": {
            bgcolor: nDark,
          },
        },
      }}
    >
      <SpeedDialAction
        color="lightgray"
        key="1"
        icon={
          <HomeIcon
            color="lightgray"
            style={{
              color: !location.pathname.endsWith("/Home") ? accent : "darkgray",
            }}
          />
        }
        tooltipTitle="Back Home"
        FabProps={{
          sx: {
            bgcolor: border,
            "&:hover": {
              bgcolor: nDark,
            },
          },
        }}
        onClick={() => {
          navigate("/Home");
        }}
      />
      <SpeedDialAction
        color="lightgray"
        key="2"
        icon={
          <FolderOpenIcon
            color="lightgray"
            style={{
              color: !location.pathname.endsWith("/Folders")
                ? accent
                : "darkgray",
            }}
          />
        }
        tooltipTitle="Open Folder"
        FabProps={{
          sx: {
            bgcolor: border,
            "&:hover": {
              bgcolor: nDark,
            },
          },
        }}
        onClick={() => {
          navigate("/Folders");
        }}
      />
      <SpeedDialAction
        color="lightgray"
        key="3"
        icon={
          <CollectionsIcon
            color="lightgray"
            style={{
              color: !location.pathname.endsWith("/GalleryScreen")
                ? accent
                : "darkgray",
            }}
          />
        }
        tooltipTitle="Open Gallery"
        FabProps={{
          sx: {
            bgcolor: border,
            "&:hover": {
              bgcolor: nDark,
            },
          },
        }}
        onClick={() => {
          navigate("/GalleryScreen");
        }}
      />
    </SpeedDial>
  );
}
