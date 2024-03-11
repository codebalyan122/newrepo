import React, { useContext, useRef, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import Select from "react-select";
import { Button, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Myprovider } from "../../context/contextApi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

async function getToptourCategory() {
  const data = await axios.get("http://localhost:8080/top-tour-get");
  return data;
}

async function getPlacenameForMidToueCategory() {
  const data = await axios("http://localhost:8080/placename-tour-get");
  return data;
}

const MidTourCategoryAdd = () => {
  const {
    // isLoading,
    // isError,
    data: topTour,
    // error,
    // refetch,
  } = useQuery("topTour", getToptourCategory);
  const topCategoryData = topTour?.data?.data;
  console.log("topcategory data from mid add page", topCategoryData);

  const {
    // isLoading: placenameCategoryIsLoading,
    // isError: placenameCategoryIsError,
    data: placenameCategoryData,
    // error: placenameCategoryError,
    // refetch: placenameCategoryRefetch,
  } = useQuery(
    "getplacenameForTourCategoryPage",
    getPlacenameForMidToueCategory
  );

  const placenameCategory = placenameCategoryData?.data;
  console.log(placenameCategory);

  // console.log(placenameCategory);

  const navigate = useNavigate();
  const [overview, setOverView] = useState("");
  const [placenameCategorySelect, setPlacenameCategorySelect] = useState([]);
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const editor = useRef();

  const { midCategory, setMidCategory } = useContext(Myprovider);
  const initialValues = {
    topCategoryName: "",
    midCategoryName: "",
    // placeForMidCategory: placenameCategorySelect,
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
    extractedText: "",
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div>
          <h3 className="ml-3">Add Mid Category</h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values, overview);
              const { file } = values;
              console.log(overview);
              const extractedText = extractPlainText(overview);

              if (file instanceof Blob) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                  const fileUrl = reader.result;
                  const data = { ...values, fileUrl, extractedText };
                  const Resdata = await axios.post(
                    `http://localhost:8080/mid-tour-post`,
                    {
                      ...values,
                      placeForMidCategory: placenameCategorySelect,
                      fileUrl,
                      extractedText,
                    }
                  );
                  console.log(Resdata.data);
                  setMidCategory((prevState) => [...prevState, data]);
                  console.log(midCategory);

                  navigate("/admin/tour-category/mid");
                };
                reader.readAsDataURL(file);
              } else {
                const data = { ...values, extractedText };
                console.log(data);
                setMidCategory((prevState) => [...prevState, data]);
                console.log(midCategory);
                navigate("/admin/tour-category/mid");
              }
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
              <Form noValidate onSubmit={handleSubmit} className="ml-3">
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
                    Top Level Category
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="topCategoryName"
                    value={values.topCategoryName}
                    onChange={handleChange}
                    style={{ width: "67.7vw", marginLeft: "5px" }}
                  >
                    <option> select </option>
                    {topCategoryData?.map((category, index) => {
                      return (
                        <option value={category.topCategoryName} key={index}>
                          {category.topCategoryName}
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
                    className="text-md"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Mid Category name
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw", marginLeft: "5px" }}
                    name="midCategoryName"
                    className="form-control "
                    value={values.midCategoryName}
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
                    Place for Mid Category
                  </Form.Label>

                  <div style={{ width: "85%" }}>
                    <Select
                      isMulti
                      defaultValue={placenameCategorySelect}
                      onChange={setPlacenameCategorySelect}
                      options={placenameCategory?.map((packagesName, index) => {
                        return {
                          value: packagesName._id,
                          label: packagesName.Placename,
                        };
                      })}
                    />
                  </div>
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
                        setOverView(data);
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
                <Form.Group className="flex">
                  <Form.Label
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                    className=" "
                  >
                    Upload image
                  </Form.Label>
                  <Form.Control
                    style={{ width: "67.7vw " }}
                    type="file"
                    required
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("file", file);
                    }}
                    // isInvalid={!!errors.file}
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
                    Seo Title
                  </Form.Label>
                  <TextField
                    style={{ width: "67.7vw" }}
                    type="text"
                    name="seoTitle"
                    className="form-control"
                    value={values.seoTitle}
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
                    Seo Keyword
                  </Form.Label>
                  <TextField
                    style={{ width: "67.7vw" }}
                    type="text"
                    name="seoKeyword"
                    className="form-control"
                    value={values.seoKeyword}
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
                    Seo Description
                  </Form.Label>
                  <TextField
                    style={{ width: "67.7vw" }}
                    type="text"
                    name="seoDescription"
                    className="form-control"
                    value={values.seoDescription}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  disabled={isSubmitting}
                  style={{ marginLeft: "38vw" }}
                  type="submit"
                >
                  {isSubmitting ? "submitting" : "Submit form"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default MidTourCategoryAdd;
