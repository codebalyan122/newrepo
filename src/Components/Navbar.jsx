import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-screen bg-gray-200 " style={{ height: "4rem" }}>
      <nav className="flex justify-between">
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3
            className="ml-3 mt-3"
            style={{
              marginLeft: "4rem",
              cursor: "pointer",
            }}
          >
            Travel
          </h3>
        </Link>
        <div className="flex  border-red-400">
          {/* <Box
            className="flex"
            sx={{
              width: 500,
              maxWidth: "100%",
              marginLeft: "30%",
            }}
          >
            <TextField
              fullWidth
              label="search"
              id="fullWidth"
              size="small"
              className="mt-3"
            />
            <Button variant="primary" className="bg-blue-500 mt-3 ml-2 ">
              Search
            </Button>
          </Box> */}

          <Dropdown className="mt-3 mr-3 ml-3">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Settings
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/admin/settings">
                Admin Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLogout()}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
