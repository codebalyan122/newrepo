import React, { useRef, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import JoditEditor from "jodit-react";
// import { Myprovider } from "../../context/contextApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegionAdd = () => {
  const navigate = useNavigate();
  const editor = useRef();
  const [overView, setOverview] = useState("");
  // const { region, setRegion } = useContext(Myprovider);
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  const initialValues = {
    RegionName: "",
    file: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  };
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <h3 className="bold" style={{ fontSize: "bold", margin: "1rem" }}>
            Add Region
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              const { file } = values;

              const extractedText = extractPlainText(overView);

              if (file instanceof Blob) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                  const fileUrl = reader.result;

                  // const data = { ...values, fileUrl, extractedText };
                  const Resdata = await axios.post(
                    `http://localhost:8080/region-tour-post`,
                    { ...values, fileUrl, extractedText }
                  );
                  console.log(Resdata.data);

                  // setRegion((prevState) => [...prevState, data]);

                  navigate("/admin/tour-category/region");
                };
                reader.readAsDataURL(file);
              } else {
                // const data = { ...values, extractedText };

                // setRegion((prevState) => [...prevState, data]);

                navigate("/admin/tour-category/region");
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
              <Form noValidate onSubmit={handleSubmit}>
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
                    Region name
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="RegionName"
                    className="form-control "
                    value={values.RegionName}
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
                  <JoditEditor
                    className="jodit-editor"
                    ref={editor}
                    value={overView}
                    //   value={sliderContentText}
                    onChange={(newContent) => setOverview(newContent)}
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
                    Show On Menu?
                  </Form.Label>
                  <Form.Select
                    style={{ width: "67.7vw" }}
                    aria-label="Default select example"
                    name={"showOnMenu"}
                    value={values.showOnMenu}
                    onChange={handleChange}
                  >
                    <option>Select</option>
                    <option value="yes">yes</option>
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
                  style={{ marginLeft: "38vw", marginTop: "1rem" }}
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

export default RegionAdd;
