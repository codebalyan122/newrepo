import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import Table from "../Table";
import axios from "axios";
import { useQuery } from "react-query";

const getAllBlogData = async () => {
  const data = await axios.get("http://localhost:8080/admin/get-all-blogs");
  return data;
};

const Blog = () => {
  const {
    isLoading,
    // isError,
    data: BlogData,
    // error,
    refetch,
  } = useQuery("getAllBlogData", getAllBlogData);
  console.log(BlogData?.data?.data);
  const Blogs = BlogData?.data?.data;

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
            <Link to={`/admin/Blog-editPage/${row.original.id}`}>
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
        ? Blogs?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.title?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [searchedKeyword, Blogs]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((Blog, index) => {
          return {
            sno: index + 1,
            id: Blog._id,
            image: Blog.fileUrl,
            title: Blog.title,
          };
        })
      : Blogs?.map((Blog, index) => {
          return {
            sno: index + 1,
            id: Blog._id,
            image: Blog.fileUrl,
            title: Blog.title,
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
          <h3 className="m-3">Blog</h3>
          <div className="">
            <Link to={"/admin/Blog-addPage"}>
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Blog
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

export default Blog;
