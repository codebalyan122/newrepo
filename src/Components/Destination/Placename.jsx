import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import Table from "../Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Myprovider } from "../../context/contextApi";
import axios from "axios";
import { useQuery } from "react-query";

export async function getPlacenameDestinationPage() {
  const data = await axios.get("http://localhost:8080/placename-tour-get");
  return data;
}

const Placename = () => {
  const {
    isLoading,
    // isError,
    data: placename,
    // error,
    refetch,
  } = useQuery("placename", getPlacenameDestinationPage);
  // console.log(placename?.data);

  const handleEdit = () => {
    console.log("hello");
  };
  const [searchedKeyword, setSearchedKeyword] = useState("");

  // const { DestinationName, setDestinationName } = useContext(Myprovider);

  const handleDelete = async (id) => {
    console.log(id);
    const data = await axios.delete(
      `http://localhost:8080/placename-tour-delete/${id}`
    );
    refetch();
    return data;
  };
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    { Header: "Place", accessor: "place" },
    { Header: "Destination", accessor: "destination" },

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
              to={`/admin/destination/placename-edit-page/${row.original.id}`}
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
        ? placename?.data?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.Placename?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [searchedKeyword, placename]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((destination, index) => {
          return {
            sno: index + 1,
            place: destination?.Placename,
            id: destination?._id,
            destination: destination?.destinationName,
            image: destination?.fileUrl,
          };
        })
      : placename?.data?.map((destination, index) => {
          return {
            sno: index + 1,
            place: destination?.Placename,
            id: destination._id,
            destination: destination.destinationName,
            image: destination.fileUrl,
          };
        });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex ">
        <Aside />
        <div className="flex-1 flex-col   ">
          <h3 className="m-3"> All Placenames</h3>

          <div className="">
            <Link to="/admin/destination/placename-Add-page">
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Placename
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

export default Placename;
