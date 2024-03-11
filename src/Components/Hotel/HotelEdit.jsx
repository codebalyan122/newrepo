import React, { useEffect, useRef, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Image } from "react-bootstrap";
import { TextField } from "@mui/material";
import JoditEditor from "jodit-react";
import { useQuery } from "react-query";
const getDesinationForHotelEdit = async () => {
  const data = await axios.get("http://localhost:8080/destination-tour-get");
  return data;
};
const getPlaceNameForHotelEdit = async () => {
  const data = await axios.get("http://localhost:8080/placename-tour-get");
  return data;
};

const HotelDataForEditPageById = async (id) => {
  // console.log(id);
  const data = axios.get(`http://localhost:8080/get-All-hotels-ById/${id}`);
  return data;
};

const HotelEdit = () => {
  const { id } = useParams();
  const {
    isLoading,

    data: destinationData,
  } = useQuery("getDestinationForHotelEdit", getDesinationForHotelEdit);

  const {
    // isLoading: placeNameDataForHotelPage,
    // isError: isErrorForHotelPage,
    data: placeNameData,
    // error: errorForHotelPage,
    // refetch: refetchForHotelPage,
  } = useQuery("getPlaceNameForHotelEdit", getPlaceNameForHotelEdit);

  const {
    isLoading: HotelPageEditLoading,
    // isError: HotelPageEditIsError,
    data: hotelPageEditData,
    // error: HotelPageEditError,
    // refetch: HotelPageEditRefetch,
  } = useQuery("getHotelDataForEditPageById", () =>
    HotelDataForEditPageById(id)
  );

  const hotelData = hotelPageEditData?.data?.data;
  // console.log(hotelPageEditData);

  const navigate = useNavigate();
  const editor = useRef();
  // const [featuredPhotoUrl, setFeaturePhoto] = useState("");
  // const [newImages, setNewImages] = useState();

  const [hotelDescription, setHotelDescription] = useState("");

  useEffect(() => {
    setHotelDescription(
      hotelPageEditData ? hotelPageEditData?.data?.data?.extractedText : ""
    );
    // setNewImages(hotelData?.otherPhotos);
  }, [hotelPageEditData, hotelData]);

  // console.log(hotelData);
  const initialValues = {
    destinationName: hotelData ? hotelData?.destinationName : "",
    Placename: hotelData ? hotelData?.Placename : "",
    hotelName: hotelData ? hotelData?.hotelName : "",
    hotelStartingPrice: hotelData ? hotelData?.hotelStartingPrice : "",
  };
  const fileReader = (file) => {
    console.log(file);
    console.log(file instanceof Blob);
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
  if (isLoading || HotelPageEditLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <h3 className="bold" style={{ fontSize: "bold", margin: "1rem" }}>
            Edit Hotel
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              // console.log(values);
              const { file, newPhotos } = values;

              const extractedText = extractPlainText(hotelDescription);

              const uploadData = async () => {
                console.log(hotelData?.fileUrl);
                let fileUrl, otherPhotosUrl;
                if (!file && !newPhotos) {
                  fileUrl = hotelData?.fileUrl;
                  otherPhotosUrl = [...hotelData?.otherPhotos];
                  const data = {
                    ...values,
                    fileUrl,
                    otherPhotos: otherPhotosUrl,
                    extractedText,
                  };
                  try {
                    const Resdata = await axios.put(
                      `http://localhost:8080/add-hotel-tour-edit/${id}`,
                      data
                    );
                    console.log(Resdata.data);

                    navigate("/admin/hotel");
                  } catch (error) {
                    console.error("Error uploading data:", error);
                  }
                } else if (file && !newPhotos) {
                  fileUrl = await fileReader(file);
                  otherPhotosUrl = [...hotelData?.otherPhotos];
                  const data = {
                    ...values,
                    fileUrl,
                    otherPhotos: otherPhotosUrl,
                    extractedText,
                  };
                  try {
                    const Resdata = await axios.put(
                      `http://localhost:8080/add-hotel-tour-edit/${id}`,
                      data
                    );
                    console.log(Resdata.data);

                    navigate("/admin/hotel");
                  } catch (error) {
                    console.error("Error uploading data:", error);
                  }
                } else if (!file && newPhotos) {
                  fileUrl = hotelData?.fileUrl;
                  otherPhotosUrl = await fileReader(newPhotos);
                  const data = {
                    ...values,
                    fileUrl,
                    otherPhotos: [...hotelData?.otherPhotos, otherPhotosUrl],
                    extractedText,
                  };
                  try {
                    const Resdata = await axios.put(
                      `http://localhost:8080/add-hotel-tour-edit/${id}`,
                      data
                    );
                    console.log(Resdata.data);

                    navigate("/admin/hotel");
                  } catch (error) {
                    console.error("Error uploading data:", error);
                  }
                } else {
                  fileUrl = await fileReader(file);
                  otherPhotosUrl = await fileReader(newPhotos);
                  const data = {
                    ...values,
                    fileUrl,
                    otherPhotos: otherPhotosUrl,
                    extractedText,
                  };
                  try {
                    const Resdata = await axios.put(
                      `http://localhost:8080/add-hotel-tour-edit/${id}`,
                      data
                    );
                    console.log(Resdata.data);

                    navigate("/admin/hotel");
                  } catch (error) {
                    console.error("Error uploading data:", error);
                  }
                }
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
                    className=" font-semibold"
                  >
                    Previous Image
                  </Form.Label>
                  <Image
                    src={hotelData ? hotelData?.fileUrl : ""}
                    alt="Image"
                    style={{
                      height: "5rem",
                      style: "5rem",
                      marginBottom: "1rem",
                    }}
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
                    className=" font-semibold"
                  >
                    Previous Image
                  </Form.Label>
                  <Image
                    src={
                      hotelData
                        ? hotelData?.otherPhotos[
                            hotelData?.otherPhotos.length - 1
                          ]
                        : ""
                    }
                    alt="Image"
                    style={{
                      height: "5rem",
                      style: "5rem",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
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
                    New Images
                  </Form.Label>
                  <Form.Control
                    style={{ width: "67.7vw", marginTop: "1.5rem" }}
                    type="file"
                    required
                    multiple
                    accept="image/*"
                    name="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("newPhotos", file);
                    }}
                    // isInvalid={!!errors.file}
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

export default HotelEdit;
