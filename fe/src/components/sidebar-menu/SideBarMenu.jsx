import React, { useEffect, useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BsPerson, BsMoon } from "react-icons/bs";
import { MdBusinessCenter } from "react-icons/md";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideBarMenu.css";
import { useHistory } from "react-router";
import AuthService from "../../services/auth/auth.service";

const SideBarMenu = () => {
  const currLoggedUser = AuthService.getLoggedUser();
  const [locationHref, setLocationHref] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    setLocationHref(window.location.pathname);
    if (currLoggedUser !== null) {
      if (currLoggedUser.roles.includes("ROLE_BUSINESSOWNER")) {
        setIsOwner(true);
      }
      if (currLoggedUser.roles.includes("ROLE_EMPLOYEE")) {
        setIsEmployee(true);
      }
    }
  }, []);

  const history = useHistory();

  return (
    <>
      <div id="header">
        <ProSidebar>
          <SidebarHeader>
            <div className="logotext">
              <p>HubExp</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                className={locationHref === "/home" ? "active" : ""}
                icon={<FiHome />}
              >
                <a href="/home">Home</a>
              </MenuItem>

              {currLoggedUser !== null && (
                <>
                  <MenuItem
                    className={locationHref === "/profile" ? "active" : ""}
                    icon={<BsPerson />}
                  >
                    <a href="/profile">Profile</a>
                  </MenuItem>
                </>
              )}

              {isOwner === true && (
                <>
                  <MenuItem
                    className={locationHref === "/job" ? "active" : ""}
                    icon={<MdBusinessCenter />}
                  >
                    <a href="/job">Posteaza un job</a>
                  </MenuItem>
                </>
              )}

              {isEmployee === true && (
                <>
                  <MenuItem
                    className={
                      locationHref === "/employee-bookings" ? "active" : ""
                    }
                    icon={<MdBusinessCenter />}
                  >
                    <a href="/employee-bookings">BookingsManager</a>
                  </MenuItem>
                </>
              )}

              <MenuItem icon={<BsMoon />}>Dark mode</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem
                icon={<FiLogOut />}
                onClick={() => AuthService.logout()}
              >
                <a href="/">Logout</a>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBarMenu;
