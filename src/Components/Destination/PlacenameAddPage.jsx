import React, { useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import { Button, Col, Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../App.css";
// import { Myprovider } from "../../context/contextApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { getDestination } from "./Destination";
import { useQuery } from "react-query";

export async function getDestination() {
  const data = await axios.get("http://localhost:8080/destination-tour-get");
  return data;
}

const PlacenameAddPage = () => {
  const navigate = useNavigate();
  // const editor = useRef();

  const {
    isLoading,
    // isError,
    data: destination,
    // error,
    // refetch,
  } = useQuery("destinationTourplacepage", getDestination);
  // console.log(destination?.data);

  // const extractPlainText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent || "";
  // };

  const [description, setDescription] = useState();

  const initialValues = {
    DestinationName: "",
    Placename: "",
    file: "",
    showOnMenu: "",
    showForHotel: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
    extractedText: "",
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <h3 className="bold" style={{ fontSize: "bold" }}>
            Add Placename
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              const { file } = values;

              // const extractedText = extractPlainText(description);

              if (file instanceof Blob) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                  const fileUrl = reader.result;

                  // const data = { ...values, fileUrl, extractedText };
                  const Resdata = await axios.post(
                    `http://localhost:8080/placename-tour-post`,
                    { ...values, fileUrl, extractedText: description }
                  );
                  console.log(Resdata.data);

                  // console.log(data);
                  //   setDestinationName(async (prevState) => {
                  //     return { ...prevState, data };
                  //   });

                  navigate("/admin/destination/placename");
                };

                reader.readAsDataURL(file);
              } else {
                // const data = { ...values, extractedText };
                console.log("data from placename else");
                // setDestinationName((prevState) => {
                //   return { ...prevState, data };
                // });

                // console.log(data);
                navigate("/admin/destination/placename");
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
                    Destination name
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="DestinationName"
                    value={values.DestinationName}
                    onChange={handleChange}
                    style={{ width: "67.7vw", marginLeft: "5px" }}
                  >
                    <option> select </option>
                    {destination?.data?.map((category, index) => {
                      return (
                        <option value={category.DestinationName} key={index}>
                          {category.DestinationName}
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
                    className="text-md font-semibold"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Placename
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="Placename"
                    className="form-control "
                    value={values.Placename}
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
                  {/* <JoditEditor
                    className="jodit-editor"
                    ref={editor}
                    value={description}
                    onChange={(newContent) => setDescription(newContent)}
                  /> */}
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
                    Show for Hotel
                  </Form.Label>
                  <Form.Select
                    style={{ width: "67.7vw" }}
                    aria-label="Default select example"
                    name={"showForHotel"}
                    value={values.showForHotel}
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

export default PlacenameAddPage;
