import React, { useEffect, useState } from "react";
import NavbarComponent from "./Navbar";
import Aside from "./Aside";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Table from "./Table";
// import axios from "axios";
// import { useQuery } from "react-query";
import { TextField } from "@mui/material";

const HelicopterEnquiry = () => {
  // const handleEdit = (id) => {
  //   console.log(id);
  // };

  const [searchedKeyword, setSearchedKeyword] = useState("");
  // const handleDelete = async (id) => {
  // const data = await axios.delete(
  //   `http://localhost:8080/slider/delete/${id}`
  // );
  // refetch();
  // return data;
  // };
  const dataForHelicopterEnquiry = [
    {
      sno: "1",
      id: "",
      date: Date.now(),
      name: "Shivam",
      packagename: "Kedarnath",
      email: "Balyancode122@gmail.com",
      phone: "8700045702",
      adult: "3",
      children: "2",
      enquiry_date: Date.now(),
    },
    {
      sno: "2",
      id: "",
      date: Date.now(),
      name: "dinesh",
      packagename: "Kedarnath",
      email: "Balyancode122@gmail.com",
      phone: "8700045702",
      adult: "3",
      children: "2",
      enquiry_date: Date.now(),
    },
  ];
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    { Header: "Date", accessor: "date" },
    { Header: "Name", accessor: "name" },
    { Header: "Package Name", accessor: "packagename" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Adult", accessor: "adult" },
    { Header: "Children", accessor: "children" },
    { Header: "Enquiry Date", accessor: "enquiry_date" },

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

          <span
            style={{
              cursor: "pointer",
              marginRight: "10px",
              marginTop: "1rem",
            }}
            onClick={() => {
              //  handleEdit(row.original.id);
            }}
          >
            <Link to={`/admin/slider/slider-add/${row.original.id}`}>
              <FaEdit />
            </Link>
          </span>

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

  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    const filteredDataFn = () => {
      const lowercasedKeyword = searchedKeyword?.toLowerCase();

      // Check if the search keyword is not empty
      const filteredResults = lowercasedKeyword
        ? dataForHelicopterEnquiry.filter((enquiry) => {
            const lowercasedName = enquiry?.name.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, []);

  const data =
    filteredData?.length > 0 ? filteredData : dataForHelicopterEnquiry;

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1 flex-col  ">
          <h4 className="m-3">Helicopter Enquiry</h4>
          <TextField
            label="search"
            id="fullWidth"
            size="small"
            className=""
            value={searchedKeyword}
            onChange={(e) => setSearchedKeyword(e.target.value)}
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

export default HelicopterEnquiry;
