import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Table from "../Table";

const getAllBlogData = async () => {
  const data = await axios.get("http://localhost:8080/admin/get-all-FAQ");
  return data;
};

const FAQ = () => {
  const {
    isLoading,
    // isError,
    data: FAQData,
    // error,
    refetch,
  } = useQuery("getAllBlogData", getAllBlogData);
  console.log(FAQData?.data?.data);
  const FAQ = FAQData?.data?.data;

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(`http://localhost:8080/blog-delete/${id}`);
    refetch();
    return data;
  };

  const columns = [
    { Header: "S. No.", accessor: "sno" },
    {
      Header: "Title",
      accessor: "title",
    },

    {
      Header: "Content",
      accessor: "content",
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
            onClick={() => {
              handleEdit(row.original.id);
            }}
          >
            <Link to={`/admin/edit-faq/${row.original.id}`}>
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

  const [filteredData, setFilteredData] = useState();
  const [searchedKeyword, setSearchedKeyword] = useState("");
  useEffect(() => {
    const filteredDataFn = () => {
      const lowercasedKeyword = searchedKeyword?.toLowerCase();

      // Check if the search keyword is not empty
      const filteredResults = lowercasedKeyword
        ? FAQ?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.title?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [searchedKeyword, FAQ]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((FAQ, index) => {
          return {
            sno: index + 1,
            id: FAQ?._id,
            // image: Blog.fileUrl,
            title: FAQ?.title,
            content: FAQ?.extractedText,
          };
        })
      : FAQ?.map((FAQ, index) => {
          return {
            sno: index + 1,
            id: FAQ?._id,
            // image: Blog.fileUrl,
            title: FAQ?.title,
            content: FAQ?.extractedText,
          };
        });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1 flex-col  ">
          <h3 className="m-3">FAQ</h3>
          <div className="">
            <Link to={"/admin/add-faq"}>
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add FAQ
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

          <Table width={"2rem"} columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default FAQ;
