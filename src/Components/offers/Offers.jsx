import React, { useEffect, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { TextField } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../Table";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";

const getAllOffers = async () => {
  const data = await axios.get("http://localhost:8080/get-All-offers");
  return data;
};

const Offers = () => {
  const {
    isLoading,
    // isError,
    data: OfferData,
    // error,
    // refetch,
  } = useQuery("getAlloffers", getAllOffers);
  console.log(OfferData?.data?.data);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    //  const data = await axios.delete(
    //    `http://localhost:8080/hotel-delete/${id}`
    //  );
    //  refetch();
    //  return data;
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
            className="rounded"
            alt="user"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      ),
    },
    { Header: "Heading", accessor: "heading" },

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
            <Link to={`/admin/hotel-editPage/${row.original.id}`}>
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
        ? OfferData?.data?.data?.filter((placename, index) => {
            // console.log(placename);
            const lowercasedName = placename?.offername?.toLowerCase();
            return lowercasedName.includes(lowercasedKeyword);
          })
        : [];

      console.log(filteredResults);
      setFilteredData(filteredResults);
    };

    filteredDataFn();
  }, [OfferData, searchedKeyword]);

  const data =
    filteredData?.length > 0
      ? filteredData?.map((offer, index) => {
          return {
            sno: index + 1,
            id: offer._id,
            image: offer.fileUrl,
            heading: offer.offername,
          };
        })
      : OfferData?.data?.data?.map((offer, index) => {
          return {
            sno: index + 1,
            id: offer._id,
            image: offer.fileUrl,
            heading: offer.offername,
          };
        });
  if (isLoading) {
    return <h3>Loading..</h3>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1 flex-col  ">
          <h3 className="m-3">Offers Or Deals</h3>
          <div className="">
            <Link to={"/admin/offer-addPage"}>
              <Button
                style={{ float: "right" }}
                variant="primary"
                className="bg-blue-500 mb-3 mr-3 "
              >
                Add Offer
              </Button>
            </Link>
            <TextField
              label="search"
              id="fullWidth"
              size="small"
              value={searchedKeyword}
              onChange={(e) => setSearchedKeyword(e.target.value)}
              className=" "
              style={{ marginRight: "2rem", float: "right " }}
            />
          </div>

          <Table columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default Offers;
