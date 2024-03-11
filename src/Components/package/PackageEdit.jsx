import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Aside from "../Aside";
import NavbarComponent from "../Navbar";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { Myprovider } from "../../context/contextApi";
import { TextField } from "@mui/material";
// import JoditEditor from "jodit-react";
// import { FaTrash } from "react-icons/fa";
// import { useTable } from "react-table";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useQuery } from "react-query";

async function getToptourCategory() {
  const data = await axios.get("http://localhost:8080/top-tour-get");
  return data;
}

async function getDestinations() {
  const data = await axios.get("http://localhost:8080/destination-tour-get");

  return data;
}

// async function getPlaceName({ id }) {
//   // console.log(id);
//   if (id) {
//     const data = await axios.get(
//       `http://localhost:8080/placename-tour-getting/${id}`
//     );
//     return data;
//   }
// }

async function getMidtourCategory() {
  const data = await axios.get("http://localhost:8080/mid-tour-get");
  return data;
}

async function getPlaceNameInpackage() {
  const data = await axios.get("http://localhost:8080/placename-tour-get");
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

const initialValues = {
  destinationName: "",
  placeName: [],
  packageName: "",
  price: "",
  day: "",
  night: "",
  startingLocation: "",
  endingLocation: "",
  sameDay: "",
  seoTitle: "",
  seoKeyword: "",
  seoDescription: "",
  isRecommended: "",
  isChardham: "",
};

const PackageEdit = () => {
  const [destinationId, setDestinationId] = useState("");
  const [destinationameForDisplay, setDestinationameForDisplay] = useState("");
  const [placenameCategorySelect, setPlacenameCategorySelect] = useState([]);
  // console.log(destinationId);

  const navigate = useNavigate();

  const {
    isLoading,
    // isError,
    data: topTour,
    // error,
    // refetch,
  } = useQuery("getTopTour", getToptourCategory);
  console.log("topcategory", topTour?.data.data);
  const {
    // isLoading: DestinationsLoading,
    // isError: DestinationsisError,
    data: destinationData,
    // error: DestinationError,
    // refetch: DestionationRefetch,
  } = useQuery("getDestinationForpackagePage", getDestinations);
  // console.log("Destination Data", destinationData?.data);

  // const {
  //   isLoading: PlacenameLoading,
  //   // isError: PlacenameisError,
  //   data: PlacenameData,
  //   // error: placenameError,
  //   refetch: PlacenameRefetch,
  // } = useQuery(
  //   "getPlaceNameForpackagePage",
  //   () => getPlaceName({ id: destinationId }),
  //   { enabled: false }
  // );
  // console.log("placename Data", PlacenameData?.data);

  const {
    isLoading: placenamepackage,
    // isError: PlacenamepackageisError,
    data: PlacenamepackageData,
    // error: placenamepackageError,
    refetch: PlacenamepackageRefetch,
  } = useQuery(
    "getPlaceNameForpackagePageaAll",
    () => getPlaceNameInpackage()
    // { enabled: false }
  );
  // console.log("placename package Data", PlacenamepackageData?.data);

  const {
    // isLoading: midTourCategoryisLoading,
    // isError: midTourCategoryisError,
    data: midTourCategory,
    // error: midTourCategoryError,
    // refetch: topTourCategoryRefetch,
  } = useQuery("midTourCategoryForpackagepage", getMidtourCategory);
  console.log("midcategory", midTourCategory?.data);

  const {
    // isLoading: interestTourCategoryisLoading,
    // isError: interestTourCategoryisError,
    data: interestTourCategory,
    // error: interestTourCategoryError,
    // refetch: interestTourCategoryRefetch,
  } = useQuery("interestTourCategoryForpackagepage", getInterestCategory);
  console.log(interestTourCategory?.data);

  const {
    // isLoading: regionTourCategoryisLoading,
    // isError: regionTourCategoryisError,
    data: regionTourCategory,
    // error: regionTourCategoryError,
    // refetch: regionTourCategoryRefetch,
  } = useQuery("regfionTourCategoryForpackagepage", getRegionCategory);
  console.log(regionTourCategory?.data);

  const {
    // isLoading: packagesDataisLoading,
    // isError: packagesDataisError,
    data: packages,
    // error: packagesDataError,
    // refetch: packagesDataRefetch,
  } = useQuery("getpackagesData", getPackages);
  console.log("packages", packages?.data);

  // const editor = useRef(null);
  // const editorExclusion = useRef(null);
  const [exlcusion, setExclusion] = useState("");
  const [overView, setOverview] = useState("");
  const [Relatedpackages, setRelatedPackages] = useState(null);
  const [DestinationOption, setDestinationOption] = useState(null);
  const [midCategoryOptions, setmidCategoryOptions] = useState(null);
  const [tripTypeSelect, setTripType] = useState(null);
  const [regionSelect, setRegion] = useState(null);

  const [itineraryData, setItineraryData] = useState([
    { day: "", itinerary: "" },
  ]);

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

  const [inclusions, setInclusions] = useState([""]);

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

  // useEffect(() => {
  //   console.log("After setting Destination ID:", destinationId);

  //   if (destinationId !== undefined && destinationId !== null) {
  //     PlacenameRefetch({
  //       id: destinationId,
  //     });
  //   }
  // });
  // if (isLoading || PlacenameLoading) {
  //   return <h3>Loading...</h3>;
  // }

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />

        <div className=" flex-1">
          <h3>Add Package</h3>
          <Formik
            onSubmit={async (values) => {
              // console.log("values", values);
              const { featuredPhotos, images } = values;

              const extractedText = extractPlainText(overView);
              const exclusionText = extractPlainText(exlcusion);
              const featuredPhotoUrl = await fileReader(featuredPhotos);

              const imagesUrl = await fileReader(images);

              // const packagePdfUrl = await fileReader(packagePdf);

              // console.log(featuredPhotoUrl);

              const data = {
                ...values,
                placeName: placenameCategorySelect,
                featuredPhotoUrl,
                imagesUrl,
                extractedText: overView,
                exclusionText: exlcusion,
                itineraryData,
                DestinationOption,
                midCategoryOptions,
                tripTypeSelect,
                regionSelect,
                inclusions,
                Relatedpackages,

                destinationName: destinationameForDisplay,
              };
              console.log(data);
              if (featuredPhotoUrl && imagesUrl) {
                // setAddPackage((prevState) => [...prevState, data]);
                console.log(data);
                const resData = await axios.post(
                  "http://localhost:8080/add-package-tour-post",
                  data
                );
                console.log(resData);
                navigate("/admin/package");
              } else {
                alert("Please Select Images first");
              }
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
                      width: "9.5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Destination Name
                  </Form.Label>
                  <Form.Select
                    style={{ width: "82%" }}
                    aria-label="Default select example"
                    value={destinationId}
                    // onChange={(e) => {
                    //   const selectedDestinationId = e.target.value;
                    //   console.log(selectedDestinationId);
                    //   const destinatioName = destinationData?.data?.find(
                    //     (destination) =>
                    //       destination._id === selectedDestinationId
                    //   );
                    //   setDestinationameForDisplay(
                    //     destinatioName.DestinationName
                    //   );
                    //   setDestinationId(selectedDestinationId);
                    // }}
                  >
                    <option>Select</option>
                    {destinationData?.data?.map((destinationName, index) => {
                      return (
                        <option value={destinationName._id} key={index}>
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
                      width: "9.5rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Place Name
                  </Form.Label>
                  <div style={{ width: "82%" }}>
                    <Select
                      isMulti
                      defaultValue={placenameCategorySelect}
                      onChange={setPlacenameCategorySelect}
                      options={PlacenamepackageData?.data?.map(
                        (placename, index) => {
                          return {
                            value: placename._id,
                            label: placename.Placename,
                          };
                        }
                      )}
                    />
                  </div>
                  {/* <Form.Select
                    aria-label="Default select example"
                    value={values.placeName}
                    onChange={handleChange}
                  >
                    <option>Select</option>
                    {PlacenameData?.data.map((placename, index) => {
                      return (
                        <option value={placename.Placename} key={index}>
                          {placename.Placename}
                        </option>
                      );
                    })}
                  </Form.Select> */}
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="packageName"
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
                    Package Name
                  </Form.Label>
                  <TextField
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Price
                  </Form.Label>
                  <TextField
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
                        width: "11rem",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                    >
                      Duration
                    </Form.Label>
                    <TextField
                      type="text"
                      name="day"
                      className="form-control"
                      placeholder="Day"
                      value={values.day}
                      style={{ marginLeft: "1.3rem" }}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="destinationName"
                    className="mb-3 flex mt-4"
                  >
                    <TextField
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Starting Location
                  </Form.Label>
                  <TextField
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Ending Location
                  </Form.Label>
                  <TextField
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    If same Day
                  </Form.Label>
                  <TextField
                    type="text"
                    name="sameDay"
                    className="form-control"
                    value={values.sameDay}
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Featured Photo
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="featuredPhoto"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("featuredPhotos", file);
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
                    Images
                  </Form.Label>
                  <Form.Control
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Package Pdf
                  </Form.Label>
                  <Form.Control
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
                  </div>
                  {/* <JoditEditor
                    ref={editor}
                    value={overView}
                    onChange={(newContent) => {
                      return setOverview(newContent);
                    }}
                  /> */}
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
                  {/* <MyTable
                    columns={columns}
                    data={data}
                    handleAddField={handleAddField}
                    handleDeleteField={handleDeleteField}
                  /> */}

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
                  {/* <MyTable
                    columns={inclusionColumns}
                    data={inclusionData}
                    handleAddField={handleAddField}
                    handleDeleteField={handleDeleteField}
                  /> */}
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
                  </div>
                  {/* <JoditEditor
                    ref={editorExclusion}
                    value={exlcusion}
                    onChange={(newContent) => setExclusion(newContent)}
                  /> */}
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
                  <div style={{ width: "100%" }}>
                    <Select
                      isMulti
                      defaultValue={Relatedpackages}
                      onChange={setRelatedPackages}
                      options={packages?.data?.map((packagesName, index) => {
                        return {
                          value: packagesName._id,
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
                    Top Category
                  </Form.Label>
                  <div style={{ width: "100%" }}>
                    <Select
                      isMulti
                      defaultValue={DestinationOption}
                      onChange={setDestinationOption}
                      options={topTour?.data?.data?.map(
                        (packagesName, index) => {
                          return {
                            value: packagesName._id,
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

                  <div style={{ width: "100%" }}>
                    <Select
                      isMulti
                      defaultValue={midCategoryOptions}
                      onChange={setmidCategoryOptions}
                      options={midTourCategory?.data?.map(
                        (packagesName, index) => {
                          return {
                            value: packagesName._id,
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

                  <div style={{ width: "100%" }}>
                    <Select
                      isMulti
                      defaultValue={tripTypeSelect}
                      onChange={setTripType}
                      options={interestTourCategory?.data?.map(
                        (packagesName, index) => {
                          return {
                            value: packagesName._id,
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

                  <div style={{ width: "100%" }}>
                    <Select
                      isMulti
                      defaultValue={regionSelect}
                      onChange={setRegion}
                      // options={regionTourCategory?.data?.map(
                      //   (packagesName, index) => {
                      //     return {
                      //       value: packagesName._id,
                      //       label: packagesName.RegionName,
                      //     };
                      //   }
                      // )}
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Seo Title
                  </Form.Label>
                  <TextField
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Seo Keyword
                  </Form.Label>
                  <TextField
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
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Seo Description
                  </Form.Label>
                  <TextField
                    type="text"
                    name="seoDescription"
                    value={values.seoDescription}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="seo Description"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="submitButton">
                  <Button type="submit">Submit</Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PackageEdit;

export const MyTable = ({
  handleRow,
  itenaryData,
  handleDelete,
  handleInput,
}) => {
  return (
    <div className="flex" style={{ width: "100%" }}>
      <table style={{ width: "90%", marginLeft: "1.2rem" }}>
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
          {itenaryData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  value={row.day}
                  onChange={(e) => handleInput(index, "day", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  style={{ width: "100%" }}
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
        style={{ height: "3rem", backgroundColor: "#04aa6d", width: "6rem" }}
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
      <table style={{ width: "90%", marginLeft: "1.2rem" }}>
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
        style={{ height: "3rem", backgroundColor: "#04aa6d", width: "6rem" }}
        onClick={handleAddRowInclusion}
      >
        Add Row
      </button>
      {/* You can use 'inclusions' for further processing or sending it to the server */}
    </div>
  );
};
