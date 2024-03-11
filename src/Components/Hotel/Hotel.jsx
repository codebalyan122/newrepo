import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { TextField } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../Table";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";

const getAllHotels = async () => {
  const data = axios.get("http://localhost:8080/get-All-hotels");
  return data;
};

const Hotel = () => {
  const {
    isLoading,
    // isError,
    data: hotelData,
    // error,
    refetch,
  } = useQuery("getAllHotels", getAllHotels);
  console.log(hotelData?.data);
  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(`http://localhost:8080/hotel-delete/${id}`);
    refetch();
    return data;
  };
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ value }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={value}
            className="rounded"
            alt="user"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ),
    },
    { Header: "Name", accessor: "name" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Place", accessor: "place" },

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
              handleEdit(row.original.id);
            }}
          >
            <Link to={`/admin/hotel-editPage/${row.original.id}`}>
              <FaEdit />
            </Link>
          </span>

          {/* Delete Icon */}
          <span
            style={{ cursor: "pointer", marginTop: "1rem" }}
            onClick={() => handleDelete(row.original.id)}
          >
            <FaTrash className="text-red-500" />
          </span>
        </div>
      ),
    },
  ];

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [filteredData, setFilteredData] = useState();
  useEffect(() => {
    const filteredDataFn = () => {
      const lowercasedKeyword = searchedKeyword?.toLowerCase();

      // Check if the search keyword is not empty
      const filteredResults = lowercasedKeyword
        ? hotelData?.data?.data?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.hotelName?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };
    filteredDataFn();
  }, [searchedKeyword, hotelData]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((hotel, index) => {
          return {
            sno: index + 1,
            id: hotel._id,
            image: hotel.fileUrl,
            name: hotel.hotelName,
            destination: hotel.destinationName,
            place: hotel.Placename,
          };
        })
      : hotelData?.data?.data?.map((hotel, index) => {
          return {
            sno: index + 1,
            id: hotel._id,
            image: hotel.fileUrl,
            name: hotel.hotelName,
            destination: hotel.destinationName,
            place: hotel.Placename,
          };
        });

  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1 flex-col  ">
          <h3 className="m-3">Hotel</h3>
          <div className="">
            <Link to={"/admin/hotel-addPage"}>
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Hotel
              </Button>
            </Link>
            <TextField
              label="search"
              id="fullWidth"
              size="small"
              className=" "
              value={searchedKeyword}
              onChange={(e) => setSearchedKeyword(e.target.value)}
              style={{ marginRight: "2rem", float: "right " }}
            />
          </div>

          <Table columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default Hotel;
