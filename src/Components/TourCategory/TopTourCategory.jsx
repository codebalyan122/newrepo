import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import Table from "../Table";
import { Link } from "react-router-dom";
// import { Myprovider } from "../../context/contextApi";
import { useQuery } from "react-query";
import axios from "axios";

async function getToptourCategory() {
  const data = await axios.get("http://localhost:8080/top-tour-get");
  return data;
}

const TopTourCategory = () => {
  // const { topcategory, setTopcategory } = useContext(Myprovider);
  const {
    isLoading,
    // isError,
    data: topTour,
    // error,
    refetch,
  } = useQuery("topTour", getToptourCategory);
  console.log(topTour);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  const handleEdit = () => {
    console.log("hello");
  };

  const handleDelete = async (id) => {
    console.log(id);
    const data = await axios.delete(
      `http://localhost:8080/top-tour-delete/${id}`
    );
    refetch();
    return data;
  };
  const columns = [
    { Header: "S. No.", accessor: "sno" },
    { Header: "Category", accessor: "category" },
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
            <Link to={`/admin/package/top-tour-edit/${row.original.id}`}>
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
        ? topTour?.data?.data?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.topCategoryName?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [searchedKeyword, topTour]);

  // console.log(topcategory);
  const data =
    filteredData?.length > 0
      ? filteredData?.map((category, index) => {
          return {
            sno: index + 1,
            id: category._id,
            category: category?.topCategoryName,
            image: category.fileUrl,
          };
        })
      : topTour?.data?.data?.map((category, index) => {
          return {
            sno: index + 1,
            id: category._id,
            category: category?.topCategoryName,
            image: category.fileUrl,
          };
        });

  if (isLoading) {
    return <h4 className="ml-4">Loading...</h4>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex ">
        <Aside />
        <div className="flex-1 flex-col   ">
          <h3 className="m-3 bold">Top tour Category</h3>

          <div className="">
            <Link to="/admin/package/top-tour-add/">
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Tour Category
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

export default TopTourCategory;
