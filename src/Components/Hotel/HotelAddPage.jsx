import React, { useRef, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import JoditEditor from "jodit-react";
import { useQuery } from "react-query";
const getDesinationForHotel = async () => {
  const data = await axios.get("http://localhost:8080/destination-tour-get");
  return data;
};
const getPlaceNameForHotel = async () => {
  const data = await axios.get("http://localhost:8080/placename-tour-get");
  return data;
};

const HotelAddPage = () => {
  const {
    isLoading,

    data: destinationData,
  } = useQuery("getDestinationForHotel", getDesinationForHotel);

  const {
    // isLoading: placeNameDataForHotelPage,
    // isError: isErrorForHotelPage,
    data: placeNameData,
    // error: errorForHotelPage,
    // refetch: refetchForHotelPage,
  } = useQuery("getPlaceNameForHotel", getPlaceNameForHotel);
  // console.log(placeNameData);
  const [otherPhotos, setOtherPhotos] = useState([]);

  const navigate = useNavigate();
  const editor = useRef();

  const [hotelDescription, setHotelDescription] = useState();

  const initialValues = {
    destinationName: "",
    Placename: "",
    hotelName: "",
    hotelStartingPrice: "",
  };
  const fileReader = (file) => {
    // console.log(file);
    // console.log(file instanceof Blob);
    if (file instanceof Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const fileUrl = reader.result;
          return resolve(fileUrl);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    } else {
      return "file is not type of blob";
    }
  };
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <h3 className="bold" style={{ fontSize: "bold", margin: "1rem" }}>
            Add Hotel
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              // console.log(values);
              const { file, OtherPhotos } = values;

              const extractedText = extractPlainText(hotelDescription);

              const uploadData = async () => {
                const fileUrl = await fileReader(file);
                const otherPhotoUrl = await fileReader(OtherPhotos);
                console.log(fileUrl, otherPhotoUrl);
                // otherPhotos.push(otherPhotoUrl);
                setOtherPhotos((prevOtherPhotos) => [
                  ...prevOtherPhotos,
                  otherPhotoUrl,
                ]);
                console.log("otherPhoto", otherPhotos);
                const data = {
                  ...values,
                  fileUrl,
                  otherPhotos: [...otherPhotos, otherPhotoUrl],
                  extractedText,
                };
                const Resdata = await axios.post(
                  `http://localhost:8080/add-hotel-package`,
                  data
                );
                console.log(Resdata.data);

                navigate("/admin/hotel");
              };

              uploadData();
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Destination Name
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ width: "67.7vw" }}
                    value={values.destinationName}
                    onChange={handleChange}
                  >
                    <option>Select</option>
                    {destinationData?.data?.map((destinationName, index) => {
                      return (
                        <option
                          value={destinationName.DestinationName}
                          key={index}
                        >
                          {destinationName.DestinationName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="Placename"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Place Name
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    style={{ width: "67.7vw" }}
                    value={values.Placename}
                    onChange={handleChange}
                  >
                    <option>Select</option>
                    {placeNameData?.data?.map((packageName, index) => {
                      return (
                        <option value={packageName.Placename} key={index}>
                          {packageName.Placename}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md "
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Hotel Starting Price
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="hotelStartingPrice"
                    className="form-control "
                    value={values.hotelStartingPrice}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md "
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Hotel name
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="hotelName"
                    className="form-control "
                    value={values.hotelName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="position-relative mb-3 flex">
                  <Form.Label
                    className="text-md "
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Hotel Description
                  </Form.Label>
                  <JoditEditor
                    className="jodit-editor"
                    ref={editor}
                    value={hotelDescription}
                    //   value={sliderContentText}
                    onChange={(newContent) => setHotelDescription(newContent)}
                  />
                </Form.Group>
                <Form.Group className="flex">
                  <Form.Label
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                    className=""
                  >
                    Hotel Featured image
                  </Form.Label>
                  <Form.Control
                    style={{ width: "67.7vw " }}
                    type="file"
                    required
                    name="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("file", file);
                    }}
                    // isInvalid={!!errors.file}
                  />
                </Form.Group>

                <Form.Group className="flex">
                  <Form.Label
                    style={{
                      width: "11rem",
                      marginTop: "2rem",
                      marginLeft: "5px",
                    }}
                    className=" "
                  >
                    Other Photos
                  </Form.Label>
                  <Form.Control
                    style={{ width: "67.7vw", marginTop: "1.5rem" }}
                    type="file"
                    required
                    accept="image/*"
                    name="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("OtherPhotos", file);
                    }}
                  />
                </Form.Group>

                <Button
                  disabled={isSubmitting}
                  style={{
                    marginLeft: "38vw",
                    marginTop: "1rem",
                    marginBottom: "1.7rem",
                  }}
                  type="submit"
                >
                  Submit form
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default HotelAddPage;
