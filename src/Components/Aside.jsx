import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import ExploreIcon from "@mui/icons-material/Explore";
import TourIcon from "@mui/icons-material/Tour";
import { FaHotel, FaBlog } from "react-icons/fa";
// import { BiSolidOffer } from "react-icons/bi";
import { VscDash } from "react-icons/vsc";
// import { MdOutlineTempleHindu } from "react-icons/md";
// import { FiMessageSquare } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";

const Aside = () => {
  return (
    <Sidebar
      className={` `}
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
      }}
    >
      <Menu className="font-bold">
        <MenuItem
          component={<Link to={"/dashboard"}></Link>}
          icon={<AiOutlineHome />}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          component={<Link to={"/admin/settings"}></Link>}
          icon={<SettingsIcon />}
        >
          Setting
        </MenuItem>

        {/* <MenuItem
          component={<Link to={"/admin/helicopter-enquiry"}></Link>}
          icon={<FaHelicopter />}
        >
          Helicopter Enquiry
        </MenuItem> */}
        <MenuItem
          component={<Link to={"/admin/slider"}></Link>}
          icon={<TuneIcon />}
        >
          Slider
        </MenuItem>

        <SubMenu label="Destination" icon={<TourIcon />}>
          <MenuItem
            icon={<VscDash />}
            // className="bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
            component={<Link to="/admin/destination"></Link>}
          >
            Destination
          </MenuItem>
          <MenuItem
            icon={<VscDash />}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
            component={<Link to="/admin/destination/placename"></Link>}
          >
            Place Name
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={<ExploreIcon />}
          component={<Link to="/admin/package"></Link>}
        >
          Packages
        </MenuItem>
        <SubMenu label="Tour Category" icon={<TourIcon />}>
          <MenuItem
            icon={<VscDash />}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
            component={<Link to="/admin/tour-category/top"></Link>}
          >
            Top Tour Category
          </MenuItem>
          <MenuItem
            icon={<VscDash />}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
            component={<Link to="/admin/tour-category/mid"></Link>}
          >
            Mid Tour Category
          </MenuItem>
          <MenuItem
            icon={<VscDash />}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
            component={<Link to="/admin/tour-category/region"></Link>}
          >
            Region
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/tour-category/interest"></Link>}
            icon={<VscDash />}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Interest
          </MenuItem>
        </SubMenu>

        <SubMenu label="Hotel" icon={<FaHotel />}>
          <MenuItem
            component={<Link to="/admin/hotel"></Link>}
            icon={<VscDash />}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Hotel
          </MenuItem>
        </SubMenu>

        {/* <SubMenu
          label="Offers Or Deals"
          icon={<BiSolidOffer style={{ fontSize: "1.3rem" }} />}
        > */}
        {/* <MenuItem
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
            icon={<VscDash />}
            component={<Link to={"/admin/offer"}></Link>}
          >
            Offers
          </MenuItem> */}
        {/* <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/offer-content"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Offer Content
          </MenuItem> */}
        {/* </SubMenu> */}

        {/* <SubMenu
          label="Temples"
          icon={<MdOutlineTempleHindu style={{ fontSize: "1.3rem" }} />}
        >
          <MenuItem
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
            icon={<VscDash />}
            component={<Link to={"/admin/temple"}></Link>}
          >
            Temple
          </MenuItem>
          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/temple-location"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Temple Location
          </MenuItem>
        </SubMenu> */}
        <SubMenu label="Blog" icon={<FaBlog style={{ fontSize: "1.3rem" }} />}>
          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/blog"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Blog
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="FAQ"
          icon={<FaQuestion style={{ fontSize: "1.3rem" }} />}
        >
          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/faq"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            FAQ
          </MenuItem>
        </SubMenu>
        {/* <SubMenu
          label="Enquiry"
          icon={<FiMessageSquare style={{ fontSize: "1.3rem" }} />}
        >
          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/Helicopter-Eqnuiry"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Helicopter Enquiry
          </MenuItem>

          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/plan-my-day-Eqnuiry"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Plan My Holiday
          </MenuItem>

          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/package-Eqnuiry"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Package Enquiry
          </MenuItem>

          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/Hotel-Eqnuiry"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Hotel Enquiry
          </MenuItem>
          <MenuItem
            icon={<VscDash />}
            component={<Link to={"/admin/taxi-Eqnuiry"}></Link>}
            style={{
              backgroundImage:
                "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
            }}
          >
            Taxi Enquiry
          </MenuItem>
        </SubMenu> */}
      </Menu>
    </Sidebar>
  );
};

export default Aside;
