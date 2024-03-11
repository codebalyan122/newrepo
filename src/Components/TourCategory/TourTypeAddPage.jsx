import React, { useContext, useRef, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import { Button, Col, Form } from "react-bootstrap";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { TextField } from "@mui/material";
import "../../App.css";
import { Myprovider } from "../../context/contextApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TourTypeAddPage = () => {
  const navigate = useNavigate();
  const editor = useRef();

  const { topcategory, setTopcategory } = useContext(Myprovider);
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const [description, setDescription] = useState();

  const initialValues = {
    topCategoryName: "",
    // uploadImage: null,
    // description: "",
    file: "",
    showOnMenu: "",
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
        <div className="flex-1">
          <h3
            style={{ fontSize: "bold", marginLeft: "1rem", marginTop: "1rem" }}
          >
            Add Tour Packages
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              const { file } = values;

              const extractedText = extractPlainText(description);

              if (file instanceof Blob) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                  const fileUrl = reader.result;

                  const data = { ...values, fileUrl, extractedText };
                  const Resdata = await axios.post(
                    `http://localhost:8080/top-tour-post`,
                    { ...values, fileUrl, extractedText: description }
                  );
                  console.log(Resdata.data);

                  // console.log(data);
                  setTopcategory(async (prevState) => {
                    return { ...prevState, data };
                  });
                  console.log(topcategory);

                  navigate("/admin/tour-category/top");
                };

                reader.readAsDataURL(file);
              } else {
                const data = { ...values, extractedText };
                // console.log(data);
                setTopcategory((prevState) => [...prevState, data]);

                // console.log(data);
                navigate("/admin/tour-category/top");
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
                    className="text-md font-semibold"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Top Category name
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="topCategoryName"
                    className="form-control "
                    value={values.topCategoryName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="position-relative mb-3 flex">
                  <Form.Label
                    className="text-md font-semibold"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Description
                  </Form.Label>
                  <div style={{ width: "82%" }}>
                    <CKEditor
                      editor={Editor}
                      onReady={(editor) => {
                        console.log("editor is ready", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
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
                    Upload image
                  </Form.Label>
                  <Form.Control
                    style={{ width: "67.7vw " }}
                    type="file"
                    required
                    name="file"
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
                    className="text-md font-semibold"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Show On Menu
                  </Form.Label>
                  <Form.Select
                    style={{ width: "67.7vw" }}
                    aria-label="Default select example"
                    name={"showOnMenu"}
                    value={values.showOnMenu}
                    onChange={handleChange}
                  >
                    <option>Select</option>

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
                    className="text-md font-semibold"
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
                    className="text-md font-semibold"
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
                    className="text-md font-semibold"
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
                  style={{ marginLeft: "38vw", marginBottom: "2rem" }}
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

export default TourTypeAddPage;
