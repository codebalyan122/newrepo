import React from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { FaTrash } from "react-icons/fa";
import Table from "../Table";
import { TextField } from "@mui/material";

const PackageEnquire = () => {
  // const handleEdit = (id) => {
  //   console.log(id);
  // };
  // const handleDelete = async (id) => {};
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Package", accessor: "package" },
    { Header: "Departure Date", accessor: "departure_Date" },
    { Header: "Adult", accessor: "adult" },
    { Header: "Children", accessor: "children" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },

    { Header: "Message", accessor: "message" },

    // { Header: "Destination Place", accessor: "destination_place" },

    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Edit Icon */}

          {/* Delete Icon */}
          <span
            style={{ cursor: "pointer", marginTop: "1rem" }}
            onClick={
              () => {}

              // handleDelete(row.original.id)
            }
          >
            <FaTrash className="text-red-500" />
          </span>
        </div>
      ),
    },
  ];
  const data = [
    {
      sno: "1",
      id: "",
      booking_date: Date.now(),
      name: "Shivam",
      packagename: "Kedarnath",
      email: "Balyancode122@gmail.com",
      phone: "8700045702",
      adult: "3",
      children: "2",
      enquiry_date: Date.now(),
    },
  ];
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1 flex-col  ">
          <h4 className="m-3">Package Enquiry</h4>
          <TextField
            label="search"
            id="fullWidth"
            size="small"
            className=" "
            style={{
              marginRight: "2rem",
              float: "right",
              marginBottom: "1rem",
            }}
          />

          <Table columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default PackageEnquire;
