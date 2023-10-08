import React, { ReactNode, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../theme";
import { Link } from "react-router-dom";
import { LoginState } from "../reducers/LoginReducerSlice";
import { useSelector } from "react-redux";
import SchoolIcon from "@mui/icons-material/School";

interface ItemType {
  title: string;
  to: string;
  icon: ReactNode;
  selected: string;
  setSelected(name: string): void;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemType) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      //look like we can't put <Link to={to} /> between <MenuItem></MenuItem>,
      // or we get Warning: validateDOMNesting(…): <a> cannot appear as a descendant of <a>
      // the reason is maybe MenuItem contains <a> tag, so when the dom parse the MenuItem and Link component,
      //it will generate <a><a></a></a>, this is why we get the error
      //guiquansun 20230825
      component={<Link to={to} />}
    >
      <Typography sx={{ fontSize: 16 }}>{title}</Typography>
    </MenuItem>
  );
};

const SidebarMenu = () => {
  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );

  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  //if the sidebar collapses or not
  const [collapsedFlag, setCollapsedFlag] = useState<boolean>(false);
  //which item in sidebar is clicked
  const [selected, setSelected] = useState<string>("Dashboard");

  return (
    <Box
      // the below css style comes from browser console
      //ctrl+shift+i: open browser console
      //click the italic arrow in the left top corner
      //click whatever element in the page to get the class
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .MuiTypography-root": {
          padding: "5px 10px 5px 0px !important",
        },
        "& .MuiTypography-root:hover": {
          color: "#868dfb !important",
        },
        "& .MuiTypography-root.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar
        collapsed={collapsedFlag}
        transitionDuration={1000}
        rootStyles={{
          height: "100%",
          width: "100%",
        }}
      >
        <Menu>
          <MenuItem
            onClick={() => setCollapsedFlag(!collapsedFlag)}
            icon={collapsedFlag && <MenuOutlinedIcon />}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!collapsedFlag && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  SpringBootDemo
                </Typography>
                <IconButton onClick={() => setCollapsedFlag(!collapsedFlag)}>
                  {/** collapse the side bar */}
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/**user profile */}
          {!collapsedFlag && (
            <Box mb="25x">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src="https://img0.baidu.com/it/u=3361482875,3939563024&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?imageView2/1/w/80/h/80"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  sx={{
                    m: "10px 0 0 0",
                    fontWeight: "bold",
                    color: colors.grey[100],
                  }}
                >
                  {loginStateObject?.loginName}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: `${colors.greenAccent[600]}` }}
                >
                  Admin Role
                </Typography>
              </Box>
            </Box>
          )}

          {/**menu items */}
          <Box paddingLeft={collapsedFlag ? undefined : "10%"}>
            {/**Dashboard */}
            <Item
              title="Dashboard"
              to="/mainPage/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <SubMenu label="System" icon={<AdminPanelSettingsIcon />}>
              <Item
                title="Users"
                to="/mainPage/users"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu label="School" icon={<SchoolIcon />}>
              <Item
                title="Teacher"
                to="/mainPage/teachers"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;
