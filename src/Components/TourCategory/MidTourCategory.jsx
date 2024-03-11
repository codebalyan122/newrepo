import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import Table from "../Table";
import { Link } from "react-router-dom";

import axios from "axios";
import { useQuery } from "react-query";

async function getMidtourCategory() {
  const data = await axios.get("http://localhost:8080/mid-tour-get");
  return data;
}

const MidTourCategory = () => {
  const {
    isLoading,

    data: MidTour,

    refetch,
  } = useQuery("MidTour", getMidtourCategory);

  // const Midtour = MidTour?.data;
  // console.log(Midtour);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  const handleEdit = () => {
    console.log("hello");
  };

  const handleDelete = async (id) => {
    console.log(id);
    const data = await axios.delete(
      `http://localhost:8080/mid-tour-delete/${id}`
    );
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
            alt="user"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ),
    },
    { Header: "Place", accessor: "place" },
    { Header: "TopCategory", accessor: "topcategory" },
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
            <Link to={`/admin/package/mid-tour-edit/${row.original.id}`}>
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
      // console.log(Midtour);
      const filteredResults = lowercasedKeyword
        ? MidTour?.data?.filter((placename, index) => {
            const lowercasedName = placename?.midCategoryName?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [MidTour];

      console.log(filteredResults);
      setFilteredData(filteredResults?.data);
    };

    filteredDataFn();
  }, [searchedKeyword, MidTour]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((category, index) => {
          return {
            sno: index + 1,
            id: category?._id,
            image: category?.fileUrl,
            place: category?.midCategoryName,
            topcategory: category?.topCategoryName,
          };
        })
      : MidTour?.data?.map((category, index) => {
          return {
            sno: index + 1,
            id: category?._id,
            image: category?.fileUrl,
            place: category?.midCategoryName,
            topcategory: category?.topCategoryName,
          };
        });

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex ">
        <Aside />
        <div className="flex-1 flex-col   ">
          <h3 className="m-3 font-semibold">Mid Tour category</h3>

          <div className="">
            <Link to="/admin/package/mid-tour-add/">
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add mid Category
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

export default MidTourCategory;
