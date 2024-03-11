import React from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { FaTrash } from "react-icons/fa";
import { TextField } from "@mui/material";
import Table from "../Table";

const PlanMyHolidayEnquiry = () => {
  // const handleEdit = (id) => {
  //   console.log(id);
  // };
  // const handleDelete = async (id) => {};
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    // { Header: "Date", accessor: "date" },
    { Header: "Name", accessor: "name" },
    // { Header: "Booking Date", accessor: "booking_date" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "From", accessor: "from" },
    { Header: "Where", accessor: "where" },
    { Header: "Departure Date", accessor: "departureDate" },

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

      name: "Shivam",

      email: "Balyancode122@gmail.com",
      phone: "8700045702",

      departureDate: Date.now(),
    },
  ];
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1 flex-col  ">
          <h4 className="m-3">Plan My Holiday Enquiry</h4>
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

export default PlanMyHolidayEnquiry;
