import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import Table from "../Table";
import Aside from "../Aside";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Myprovider } from "../../context/contextApi";
import { useQuery } from "react-query";
import axios from "axios";

export async function getRegionCategory() {
  const data = await axios.get("http://localhost:8080/region-tour-get");
  return data;
}

const Region = () => {
  // const { region, setRegion } = useContext(Myprovider);

  const {
    isLoading,
    // isError,
    data: Region,
    // error,
    // refetch,
  } = useQuery("RegionCategory", getRegionCategory);
  // console.log(Region?.data);

  const handleEdit = () => {
    console.log("hello");
  };

  const handleDelete = () => {
    console.log("helloDelete");
  };
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    { Header: "Name", accessor: "name" },
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
            <Link to={`/admin/package/Region-tour-edit/${row.original.id}`}>
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

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [filteredData, setFilteredData] = useState();
  useEffect(() => {
    const filteredDataFn = () => {
      const lowercasedKeyword = searchedKeyword?.toLowerCase();

      // Check if the search keyword is not empty
      const filteredResults = lowercasedKeyword
        ? Region?.data?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.RegionName?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };
    filteredDataFn();
  }, [searchedKeyword, Region]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((region, index) => {
          return {
            sno: index + 1,
            id: region._id,
            name: region?.RegionName,
            image: region.fileUrl,
          };
        })
      : Region?.data?.map((region, index) => {
          return {
            sno: index + 1,
            id: region._id,
            name: region?.RegionName,
            image: region.fileUrl,
          };
        });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex ">
        <Aside />
        <div className="flex-1 flex-col   ">
          <h3 className="m-3">Region</h3>

          <div className="">
            <Link to="/admin/package/region-tour-add/">
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Region
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

export default Region;
