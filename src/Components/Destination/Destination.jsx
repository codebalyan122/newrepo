import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import Table from "../Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

export async function getDestination() {
  const data = await axios.get("http://localhost:8080/destination-tour-get");
  return data;
}

const Destination = () => {
  const {
    isLoading,
    // isError,
    data: destination,
    // error,
    refetch,
  } = useQuery("destinationTour", getDestination);
  // console.log(destination?.data);

  const handleEdit = () => {
    console.log("hello");
  };
  const [searchedKeyword, setSearchedKeyword] = useState("");

  // const { DestinationName, setDestinationName } = useContext(Myprovider);

  const handleDelete = async (id) => {
    console.log(id);
    const data = await axios.delete(
      `http://localhost:8080/destination-tour-delete/${id}`
    );
    refetch();
    return data;
  };
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    { Header: "Heading", accessor: "heading" },
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
            alt="user"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ),
    },
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
            onClick={() => handleEdit(row.original.id)}
          >
            <Link
              to={`/admin/destination/destination-edit-page/${row.original.id}`}
            >
              <FaEdit />
            </Link>
          </span>
          {/* Delete Icon */}
          <span
            style={{ cursor: "pointer", marginTop: "1rem" }}
            onClick={() => handleDelete(row.original.id)}
          >
            <FaTrash />
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
        ? destination?.data?.filter((destination, index) => {
            console.log(destination);
            const lowercasedName = destination?.DestinationName?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [searchedKeyword, destination?.data]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((destination, index) => {
          return {
            sno: index + 1,
            heading: destination?.DestinationName,
            id: destination._id,
            image: destination.fileUrl,
          };
        })
      : destination?.data?.map((destination, index) => {
          return {
            sno: index + 1,
            heading: destination?.DestinationName,
            id: destination._id,
            image: destination.fileUrl,
          };
        });
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex ">
        <Aside />
        <div className="flex-1 flex-col   ">
          <h3 className="m-3">All Destination</h3>

          <div className="">
            <Link to="/admin/destination/destination-add-page/">
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Destination
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

            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;
