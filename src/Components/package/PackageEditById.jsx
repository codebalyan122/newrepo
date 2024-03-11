import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Aside from "../Aside";
import NavbarComponent from "../Navbar";
import { TextField } from "@mui/material";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useQuery } from "react-query";

async function getToptourCategory() {
  const data = await axios.get("http://localhost:8080/top-tour-get");
  return data;
}

// async
function getDestinations() {
  const data = axios.get("http://localhost:8080/destination-tour-get");
  return data;
}

async function getPlaceName() {
  const data = await axios.get("http://localhost:8080/placename-tour-get");
  return data;
}

async function getMidtourCategory() {
  const data = await axios.get("http://localhost:8080/mid-tour-get");
  return data;
}

async function getInterestCategory() {
  const data = await axios.get("http://localhost:8080/interest-tour-get");
  return data;
}

async function getRegionCategory() {
  const data = await axios.get("http://localhost:8080/region-tour-get");
  return data;
}
export async function getPackages() {
  const data = await axios.get("http://localhost:8080/add-package-tour-get");
  return data;
}
export async function getPackagesById(id) {
  const data = await axios.get(
    `http://localhost:8080/add-package-tour-get/${id}`
  );
  return data;
}

const PackageEditById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,

    data: topTour,
  } = useQuery("getTopTour", getToptourCategory);
  // console.log("topcategory", topTour?.data.data);
  const {
    isLoading: DestinationsLoading,

    data: destinationData,
  } = useQuery("getDestinationForpackagePage", getDestinations);
  // console.log("Destination Data", destinationData?.data);

  const {
    isLoading: PlacenameLoading,

    data: PlacenameData,
  } = useQuery("getPlaceNameForpackagePageEdit", getPlaceName, {});
  // console.log("placename Data", PlacenameData?.data);

  const {
    isLoading: midTourCategoryisLoading,

    data: midTourCategory,
  } = useQuery("midTourCategoryForpackagepage", getMidtourCategory);
  // console.log("midcategory", midTourCategory?.data);

  const {
    isLoading: interestTourCategoryisLoading,

    data: interestTourCategory,
  } = useQuery("interestTourCategoryForpackagepage", getInterestCategory);
  // console.log(interestTourCategory?.data);

  const {
    isLoading: regionTourCategoryisLoading,

    data: regionTourCategory,
  } = useQuery("regfionTourCategoryForpackagepage", getRegionCategory);
  // console.log(regionTourCategory?.data);

  const {
    isLoading: packagesDataisLoading,

    data: packages,
  } = useQuery("getpackagesData", getPackages);
  //   console.log(packages?.data);

  const {
    isLoading: AddPageEditisLoading,

    data: EditPagepackageById,
  } = useQuery(["getPackagesBYIdEditpackagepage", id], () =>
    getPackagesById(id)
  );
  console.log("Edit package by id", EditPagepackageById?.data?.data);

  // nsole.log(EditPagepackageById?.data)

  const [placenameCategorySelect, setPlacenameCategorySelect] = useState(
    EditPagepackageById?.data?.data?.placeName || []
  );

  // const editor = useRef(null);
  // const editorExclusion = useRef(null);
  const [exlcusion, setExclusion] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [overView, setOverview] = useState("");

  const [Relatedpackages, setRelatedPackages] = useState(
    EditPagepackageById ? EditPagepackageById?.data?.data?.Relatedpackages : []
  );

  const [DestinationOption, setDestinationOption] = useState(
    EditPagepackageById
      ? EditPagepackageById?.data?.data?.DestinationOption
      : []
  );
  const [midCategoryOptions, setmidCategoryOptions] = useState(
    EditPagepackageById
      ? EditPagepackageById?.data?.data?.midCategoryOptions
      : []
  );
  const [tripTypeSelect, setTripType] = useState(
    EditPagepackageById ? EditPagepackageById?.data?.data?.tripTypeSelect : []
  );
  const [regionSelect, setRegion] = useState(
    EditPagepackageById ? EditPagepackageById?.data?.data?.regionSelect : []
  );
  const [featuredPhotoUrl, setFeaturedPhotoUrl] = useState("");
  const [EditImageUrl, setEditImageUrl] = useState("");

  const [itineraryData, setItineraryData] = useState(
    EditPagepackageById
      ? EditPagepackageById?.data?.data?.itineraryData?.map((itenary) => ({
          day: itenary?.day,
          itinerary: itenary?.itinerary,
        }))
      : [{ day: "", itinerary: "" }]
  );

  const handleAddRow = (e) => {
    e.preventDefault();
    setItineraryData([...itineraryData, { day: "", itinerary: "" }]);
  };

  const handleDeleteRow = (index) => {
    const updatedData = [...itineraryData];
    updatedData.splice(index, 1);
    setItineraryData(updatedData);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...itineraryData];
    updatedData[index][field] = value;
    setItineraryData(updatedData);
  };

  const [inclusions, setInclusions] = useState(
    EditPagepackageById
      ? EditPagepackageById?.data?.data?.inclusions?.map((itenary) => itenary)
      : []
  );

  const handleAddRowInclusion = (e) => {
    e.preventDefault();
    setInclusions([...inclusions, ""]);
  };

  const handleDeleteRowInclusion = (index) => {
    const updatedData = [...inclusions];
    updatedData.splice(index, 1);
    setInclusions(updatedData);
  };

  const handleInputChangeInclusion = (index, value) => {
    const updatedData = [...inclusions];
    updatedData[index] = value;
    setInclusions(updatedData);
  };

  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const fileReader = (file) => {
    console.log(file);
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

  const initialValues = {
    destinationName: EditPagepackageById
      ? EditPagepackageById?.data?.data?.destinationName
      : "",
    placeName: EditPagepackageById
      ? EditPagepackageById?.data?.data?.placeName
      : "",
    packageName: EditPagepackageById
      ? EditPagepackageById?.data?.data?.packageName
      : "",
    price: EditPagepackageById ? EditPagepackageById?.data?.data?.price : "",
    day: EditPagepackageById ? EditPagepackageById?.data?.data?.day : "",
    night: EditPagepackageById ? EditPagepackageById?.data?.data?.night : "",
    startingLocation: EditPagepackageById
      ? EditPagepackageById?.data?.data?.startingLocation
      : "",
    endingLocation: EditPagepackageById
      ? EditPagepackageById?.data?.data?.endingLocation
      : "",
    sameDay: EditPagepackageById
      ? EditPagepackageById?.data?.data?.sameDay
      : "",
    seoTitle: EditPagepackageById
      ? EditPagepackageById?.data?.data?.seoTitle
      : "",
    seoKeyword: EditPagepackageById
      ? EditPagepackageById?.data?.data?.seoKeyword
      : "",
    seoDescription: EditPagepackageById
      ? EditPagepackageById?.data?.data?.seoDescription
      : "",
    isRecommended: EditPagepackageById
      ? EditPagepackageById?.data?.data?.isRecommended
      : "",
    isChardham: EditPagepackageById
      ? EditPagepackageById?.data?.data?.isChardham
      : "",
  };
  useEffect(() => {
    if (EditPagepackageById) {
      setOverview(EditPagepackageById?.data?.data?.extractedText || "");
      setExclusion(EditPagepackageById?.data?.data?.exclusionText || "");

      setInclusions(EditPagepackageById?.data?.data?.inclusions || "");
      setItineraryData(EditPagepackageById?.data?.data?.itineraryData || "");
    }
  }, [EditPagepackageById]);

  if (
    isLoading ||
    AddPageEditisLoading ||
    DestinationsLoading ||
    PlacenameLoading ||
    midTourCategoryisLoading ||
    interestTourCategoryisLoading ||
    regionTourCategoryisLoading ||
    packagesDataisLoading
  ) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />

        <div className=" flex-1 ml-3">
          <h3>Edit Package</h3>
          <Formik
            onSubmit={(values) => {
              // console.log("values", values);
              const { featuredPhotos, images, packagePdf, newImages } = values;
              console.log(newImages);
              const extractedText = extractPlainText(overView);
              const exclusionText = extractPlainText(exlcusion);

              // console.log(featuredPhotoUrl);

              const uploadData = async () => {
                const featuredPhotoUrl = await fileReader(featuredPhotos);
                const newImagesUrl = await fileReader(newImages);
                setNewImages(newImagesUrl);
                setFeaturedPhotoUrl(featuredPhotoUrl);

                const imagesUrl = await fileReader(images);
                setEditImageUrl(EditImageUrl);

                const packagePdfUrl = await fileReader(packagePdf);
                const data = {
                  ...values,
                  featuredPhotoUrl: featuredPhotoUrl
                    ? featuredPhotoUrl
                    : EditPagepackageById?.data?.data?.featuredPhotoUrl,

                  imagesUrl: imagesUrl
                    ? imagesUrl
                    : EditPagepackageById?.data?.data?.imagesUrl,
                  packagePdfUrl: EditPagepackageById
                    ? EditPagepackageById?.data?.data?.packagePdfUrl
                    : packagePdfUrl,
                  extractedText,

                  itineraryData,
                  DestinationOption,
                  midCategoryOptions,
                  tripTypeSelect,
                  regionSelect,
                  inclusions,
                  Relatedpackages,
                  exclusionText,
                  newImages: EditPagepackageById
                    ? EditPagepackageById?.data?.data?.newImages
                    : newImages,
                };

                console.log(data);
                const resData = await axios.put(
                  `http://localhost:8080/add-package-tour-edit/${id}`,
                  data
                );
                console.log(resData);
                navigate("/admin/package");
              };

              uploadData();
              // setAddPackage((prevState) => [...prevState, data]);
            }}
            initialValues={initialValues}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Destination Name
                  </Form.Label>
                  <Form.Select
                    style={{ width: "82%", marginLeft: "6rem" }}
                    aria-label="Default select example"
                    name="destinationName"
                    value={values.destinationName}
                    onChange={handleChange}
                  >
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
                  controlId="placeName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Place Name
                  </Form.Label>
                  <div style={{ width: "82%", marginLeft: "6rem" }}>
                    <Select
                      isMulti
                      defaultValue={placenameCategorySelect}
                      onChange={setPlacenameCategorySelect}
                      options={PlacenameData?.data?.map((placename, index) => {
                        return {
                          value: placename._id,
                          label: placename.Placename,
                        };
                      })}
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="packageName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Package Name
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="packageName"
                    className="form-control"
                    value={values.packageName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Price
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="price"
                    className="form-control"
                    value={values.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="destinationName"
                    className="mb-3 flex mt-4"
                  >
                    <Form.Label
                      className="text-md"
                      style={{
                        width: "5rem",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                    >
                      Duration
                    </Form.Label>
                    <TextField
                      style={{ width: "33vw", marginLeft: "6rem" }}
                      type="text"
                      name="day"
                      className="form-control"
                      placeholder="Day"
                      value={values.day}
                      // style={{ marginLeft: "1.3rem" }}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="destinationName"
                    className="mb-3 flex mt-4"
                  >
                    <TextField
                      style={{ width: "32vw", marginLeft: "" }}
                      type="text"
                      name="night"
                      placeholder="Night"
                      className="form-control"
                      value={values.night}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Starting Location
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="startingLocation"
                    className="form-control"
                    value={values.startingLocation}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Ending Location
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="endingLocation"
                    className="form-control"
                    value={values.endingLocation}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    If same Day
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="sameDay"
                    className="form-control"
                    value={values.sameDay}
                    onChange={handleChange}
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
                    src={
                      EditPagepackageById
                        ? EditPagepackageById?.data?.data?.featuredPhotoUrl
                        : featuredPhotoUrl
                    }
                    alt="Image"
                    style={{
                      height: "5rem",
                      style: "5rem",
                      marginBottom: "1rem",
                    }}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "8rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Featured Photo
                  </Form.Label>
                  <Form.Control
                    style={{ marginLeft: "3.0rem", width: "82%" }}
                    type="file"
                    name="featuredPhoto"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("featuredPhotos", file);
                    }}
                    isInvalid={!!errors.file}
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
                    src={
                      EditPagepackageById
                        ? EditPagepackageById?.data?.data?.imagesUrl
                        : EditImageUrl
                    }
                    alt="Image"
                    style={{
                      height: "5rem",
                      style: "5rem",
                      marginBottom: "1rem",
                    }}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "8rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Images
                  </Form.Label>
                  <Form.Control
                    style={{ marginLeft: "3.0rem", width: "82%" }}
                    type="file"
                    name="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("images", file);
                    }}
                    isInvalid={!!errors.file}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "8rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    New Images
                  </Form.Label>
                  <Form.Control
                    style={{ marginLeft: "3.0rem", width: "82%" }}
                    type="file"
                    name="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("newImages", file);
                    }}
                    isInvalid={!!errors.file}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "8rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Package Pdf
                  </Form.Label>
                  <Form.Control
                    style={{ marginLeft: "3.0rem", width: "82%" }}
                    type="file"
                    name="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("packagePdf", file);
                    }}
                    isInvalid={!!errors.file}
                  />
                </Form.Group>
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
                    Overview
                  </Form.Label>
                  <div style={{ width: "82%" }}>
                    <CKEditor
                      editor={Editor}
                      data={EditPagepackageById?.data?.data?.extractedText}
                      onReady={(editor) => {
                        console.log("editor is ready", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setOverview(data);
                        // console.log(event, editor, data);
                      }}
                      onBlur={(event, editor) => {
                        console.log("blur", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("focus", editor);
                      }}
                    />
                    {/* </div> */}
                    {/* <JoditEditor
                      ref={editor}
                      value={sliderContentText}
                      onChange={(newContent) =>
                        setSliderContentText(newContent)
                      }
                    /> */}
                  </div>
                </Form.Group>
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
                    Itenary
                  </Form.Label>

                  <MyTable
                    itenaryData={itineraryData}
                    setItenary={setItineraryData}
                    handleRow={handleAddRow}
                    handleDelete={handleDeleteRow}
                    handleInput={handleInputChange}
                  />
                </Form.Group>
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
                    inclusion
                  </Form.Label>
                  <IclusionTable
                    handleInputChangeInclusion={handleInputChangeInclusion}
                    handleDeleteRowInclusion={handleDeleteRowInclusion}
                    handleAddRowInclusion={handleAddRowInclusion}
                    inclusions={inclusions}
                  />
                </Form.Group>
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
                    Exclusion
                  </Form.Label>
                  <div style={{ width: "82%" }}>
                    <CKEditor
                      editor={Editor}
                      data={EditPagepackageById?.data?.data?.exclusionText}
                      onReady={(editor) => {
                        console.log("editor is ready", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setExclusion(data);
                        // console.log(event, editor, data);
                      }}
                      onBlur={(event, editor) => {
                        console.log("blur", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("focus", editor);
                      }}
                    />
                    {/* </div> */}
                    {/* <JoditEditor
                      ref={editor}
                      value={sliderContentText}
                      onChange={(newContent) =>
                        setSliderContentText(newContent)
                      }
                    /> */}
                  </div>
                </Form.Group>
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
                    Related packages
                  </Form.Label>
                  <div style={{ width: "82%" }}>
                    <Select
                      isMulti
                      defaultValue={Relatedpackages}
                      onChange={setRelatedPackages}
                      options={packages?.data?.map((packagesName, index) => {
                        return {
                          value: packagesName,
                          label: packagesName.packageName,
                        };
                      })}
                    />
                  </div>
                </Form.Group>
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
                    Top packages
                  </Form.Label>
                  <div style={{ width: "82%" }}>
                    <Select
                      isMulti
                      defaultValue={DestinationOption}
                      onChange={setDestinationOption}
                      options={topTour?.data?.data?.map(
                        (packagesName, index) => {
                          return {
                            value: packagesName,
                            label: packagesName.topCategoryName,
                          };
                        }
                      )}
                    />
                  </div>
                </Form.Group>
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
                    Mid category
                  </Form.Label>

                  <div style={{ width: "82%" }}>
                    <Select
                      isMulti
                      defaultValue={midCategoryOptions}
                      onChange={setmidCategoryOptions}
                      options={midTourCategory?.data?.map(
                        (packagesName, index) => {
                          return {
                            value: packagesName,
                            label: packagesName.midCategoryName,
                          };
                        }
                      )}
                    />
                  </div>
                </Form.Group>
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
                    Trip Type
                  </Form.Label>

                  <div style={{ width: "82%" }}>
                    <Select
                      isMulti
                      defaultValue={tripTypeSelect}
                      onChange={setTripType}
                      options={interestTourCategory?.data?.map(
                        (packagesName, index) => {
                          return {
                            value: packagesName,
                            label: packagesName.interestName,
                          };
                        }
                      )}
                    />
                  </div>
                </Form.Group>
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
                    Region
                  </Form.Label>

                  <div style={{ width: "82%" }}>
                    <Select
                      isMulti
                      defaultValue={regionSelect}
                      onChange={setRegion}
                      options={regionTourCategory?.data?.map(
                        (packagesName, index) => {
                          return {
                            value: packagesName,
                            label: packagesName.RegionName,
                          };
                        }
                      )}
                    />
                  </div>
                </Form.Group>
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
                    Is Recommended
                  </Form.Label>
                  <Form.Select
                    style={{ width: "82%" }}
                    aria-label="Default select example"
                    name="isRecommended"
                    value={values.isRecommended}
                    onChange={handleChange}
                  >
                    <option>Is Recommended</option>

                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
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
                    Is chardham
                  </Form.Label>
                  <Form.Select
                    style={{ width: "82%" }}
                    aria-label="Default select example"
                    name="isChardham"
                    value={values.isChardham}
                    onChange={handleChange}
                  >
                    <option>Is chardham</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Seo Title
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="seoTitle"
                    value={values.seoTitle}
                    onChange={handleChange}
                    placeholder="seo Title"
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Seo Keyword
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="seoKeyword"
                    value={values.seoKeyword}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="seo Keyword"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="destinationName"
                  className="mb-3 flex mt-4"
                >
                  <Form.Label
                    className="text-md"
                    style={{
                      width: "5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Seo Description
                  </Form.Label>
                  <TextField
                    style={{ width: "67vw", marginLeft: "6rem" }}
                    type="text"
                    name="seoDescription"
                    value={values.seoDescription}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="seo Description"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="submitButton">
                  <Button
                    style={{ marginLeft: "30rem", marginBottom: "1rem" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default PackageEditById;

export const MyTable = ({
  handleRow,
  itenaryData,
  handleDelete,
  handleInput,
}) => {
  return (
    <div className="flex" style={{ width: "100%" }}>
      <table style={{ width: "82%", marginLeft: "1.2rem" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#E0E0E0", color: "gray" }}>Day</th>
            <th style={{ backgroundColor: "#E0E0E0", color: "gray" }}>
              Itinerary
            </th>
            <th style={{ backgroundColor: "#E0E0E0", color: "gray" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {itenaryData?.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.day}
                  onChange={(e) => handleInput(index, "day", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.itinerary}
                  onChange={(e) =>
                    handleInput(index, "itinerary", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mb-10 border-1 border-200-black rounded text-white mr-2"
        style={{
          height: "3rem",
          backgroundColor: "#04aa6d",
          width: "6rem",
          marginLeft: "0.5rem",
        }}
        onClick={handleRow}
      >
        Add Row
      </button>
      {/* You can use 'itineraryData' for further processing or sending it to the server */}
    </div>
  );
};

export const IclusionTable = ({
  handleInputChangeInclusion,
  handleDeleteRowInclusion,
  handleAddRowInclusion,
  inclusions,
}) => {
  return (
    <div className="flex" style={{ width: "100%" }}>
      <table style={{ width: "82%", marginLeft: "1.2rem" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#E0E0E0", color: "gray" }}>
              Inclusion
            </th>
            <th style={{ backgroundColor: "#E0E0E0", color: "gray" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {inclusions.map((inclusion, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  value={inclusion}
                  onChange={(e) =>
                    handleInputChangeInclusion(index, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDeleteRowInclusion(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mb-10 border-1 border-200-black rounded text-white mr-2"
        style={{
          height: "3rem",
          backgroundColor: "#04aa6d",
          width: "6rem",
          marginLeft: "0.5rem",
        }}
        onClick={handleAddRowInclusion}
      >
        Add Row
      </button>
      {/* You can use 'inclusions' for further processing or sending it to the server */}
    </div>
  );
};
