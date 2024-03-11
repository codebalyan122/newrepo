import React, { useEffect, useState } from "react";
import NavbarComponent from "./Navbar";
import Aside from "./Aside";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import Table from "./Table";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

async function getSlider() {
  const data = await axios.get("http://localhost:8080/sliderData");
  return data;
}

const Slider = () => {
  const {
    isLoading,
    // isError,
    data: slider,
    // error,
    refetch,
  } = useQuery("sliders", getSlider);
  const [searchedKeyword, setSearchedKeyword] = useState("");

  // console.log(slider);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(
      `http://localhost:8080/slider/delete/${id}`
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
            <Link to={`/admin/slider/slider-add/${row.original.id}`}>
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

  useEffect(() => {
    const filteredDataFn = () => {
      const lowercasedKeyword = searchedKeyword?.toLowerCase();

      // Check if the search keyword is not empty
      const filteredResults = lowercasedKeyword
        ? slider?.data?.filter((slide, index) => {
            const generatedSno = index + 1;
            const lowercasedGeneratedSno = (generatedSno + "").toLowerCase();
            return lowercasedGeneratedSno.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [searchedKeyword, slider]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((slide, index) => {
          return {
            sno: index + 1,
            id: slide._id,
            image: slide.fileUrl,
          };
        })
      : slider?.data?.map((slide, index) => {
          return {
            sno: index + 1,
            id: slide._id,
            image: slide.fileUrl,
          };
        });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex ">
        <Aside />
        <div className="flex-1 flex-col   ">
          <h3 className="m-3">Slider</h3>

          <div className="">
            <Link to={"/admin/slider/slider-add"}>
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Slider
              </Button>
            </Link>
            <TextField
              label="search"
              id="fullWidth"
              value={searchedKeyword}
              onChange={(e) => setSearchedKeyword(e.target.value)}
              size="small"
              className=" "
              style={{ marginRight: "2rem", float: "right " }}
            />

            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
