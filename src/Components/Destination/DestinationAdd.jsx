import React, { useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import { Button, Col, Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../../App.css";
import "./destination.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fileReader from "../utils/fileReader";
import toast from "react-hot-toast";

const DestinationAdd = () => {
  const [response, setResponse] = useState();
  const navigate = useNavigate();

  // const extractPlainText = (html) => {
  //   console.log("html", html);
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent || "";
  // };

  const [description, setDescription] = useState("welcome ");

  const initialValues = {
    DestinationName: "",
    file: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
    extractedText: "",
  };
  // console.log(response);

  // const handleEditorChange = (content, editor) => {
  //   console.log(content);
  //   setDescription(content);
  // };
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        {response ? toast.success(response?.msg) : ""}
        <div className="flex-1">
          <h3
            className="bold"
            style={{ fontSize: "bold", marginLeft: 4, fontFamily: "nunito" }}
          >
            Add Destinations
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              const { file } = values;

              // const extractedText = extractPlainText(description);
              // console.log(extractedText);

              const uploadData = async () => {
                const fileUrl = await fileReader(file);
                try {
                  console.log(description);
                  // const data = { ...values, fileUrl, extractedText };
                  const Resdata = await axios.post(
                    `http://localhost:8080/destination-tour-post`,
                    { ...values, fileUrl, extractedText: description }
                  );
                  // console.log();
                  setResponse(Resdata.data);

                  navigate("/admin/destination");
                } catch (error) {
                  alert(error);
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
                    className="text-md font-semibold"
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Destination Name
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="DestinationName"
                    className="form-control "
                    value={values.DestinationName}
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
                  {/* <CKEditor data="hello" className="h-96 w-96" /> */}
                  {/* <Editor
                    apiKey="gj5xxf6lxg78prtuutq5tlc4jkyel8vj21y2q79j84oshscy"
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                    }}
                    // initialValue="Welcome to TinyMCE!"
                    // ref={editor}
                    initialValue={description}
                    onEditorChange={handleEditorChange}
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
                  {/* 
                  <JoditEditor
                    className="jodit-editor"
                    ref={editor}
                    value={description}
                    onChange={(newContent) => setDescription(newContent)}
                  /> */}
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

export default DestinationAdd;
