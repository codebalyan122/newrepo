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

export async function getInterestCategory() {
  const data = await axios.get("http://localhost:8080/interest-tour-get");
  return data;
}

const Interest = () => {
  const {
    isLoading,
    // isError,
    data: interest,
    // error,
    refetch,
  } = useQuery("interestTour", getInterestCategory);
  // console.log(interest?.data);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  const handleEdit = () => {
    console.log("hello");
  };

  const handleDelete = async (id) => {
    console.log(id);
    const data = await axios.delete(
      `http://localhost:8080/interests-tour-delete/${id}`
    );
    refetch();
    return data;
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
            <Link to={`/admin/package/interest-tour-edit/${row.original.id}`}>
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
    // console.log(interest);
    const filteredDataFn = () => {
      const lowercasedKeyword = searchedKeyword?.toLowerCase();
      const filteredResults = lowercasedKeyword
        ? interest?.data?.filter((placename, index) => {
            //  console.log(placename)
            const lowercasedName = placename?.interestName?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [interest];

      console.log(filteredResults);
      setFilteredData(filteredResults?.data);
    };
    filteredDataFn();
  }, [searchedKeyword, interest]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((interest, index) => {
          return {
            sno: index + 1,
            name: interest?.interestName,
            id: interest?._id,
            image: interest.fileUrl,
          };
        })
      : interest?.data?.map((interest, index) => {
          return {
            sno: index + 1,
            name: interest?.interestName,
            id: interest?._id,
            image: interest?.fileUrl,
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
          <h3 className="m-3">Interest</h3>

          <div className="">
            <Link to="/admin/package/interest-tour-add/">
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Interest
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

export default Interest;
