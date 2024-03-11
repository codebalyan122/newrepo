import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import Table from "../Table";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { Myprovider } from "../../context/contextApi";
import { useQuery } from "react-query";
import axios from "axios";

export async function getPackages() {
  const data = await axios.get("http://localhost:8080/add-package-tour-get");
  return data;
}

const Package = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    // isError,
    data: packages,
    // error,
    refetch,
  } = useQuery("packagesData", getPackages);
  // console.log(packages?.data);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  const handleEdit = (id) => {
    navigate(`/admin/add-package-edit-page/${id}`);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(
      `http://localhost:8080/add-package-tour-delete/${id}`
    );
    refetch();
    console.log(data);
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
            alt="user"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ),
    },
    { Header: "Package", accessor: "package" },
    { Header: "Destination.", accessor: "destination" },
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
            <FaEdit />
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
        ? packages?.data?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.packageName?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      // console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [searchedKeyword, packages]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((newPackage, index) => {
          return {
            sno: index + 1,
            id: newPackage._id,
            image: newPackage.featuredPhotoUrl || newPackage.imagesUrl,

            package: newPackage.packageName,
            destination: newPackage.destinationName,
          };
        })
      : packages?.data?.map((newPackage, index) => {
          return {
            sno: index + 1,
            id: newPackage._id,
            image: newPackage.featuredPhotoUrl || newPackage.imagesUrl,

            package: newPackage.packageName,
            destination: newPackage.destinationName,
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
          <h3 className="m-3">Packages</h3>

          <div className="">
            <Link to="/admin/package/package-add/">
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Package
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

export default Package;
