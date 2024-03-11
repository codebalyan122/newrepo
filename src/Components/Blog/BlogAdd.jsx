import React, { useRef, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import { Button, Col, Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import fileReader from "../utils/fileReader";

const BlogAdd = () => {
  const navigate = useNavigate();

  const editor = useRef();

  const [blogContent, setBlogContent] = useState("");

  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const initialValues = {
    title: "",
    url: "",
    postBy: "",
    seoTitle: "",
    seoKeyword: "",
    SeoDescription: "",
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <h3 className="bold" style={{ fontSize: "bold", margin: "1rem" }}>
            Add Blog
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values);
              const { file } = values;

              const extractedText = extractPlainText(blogContent);

              const uploadData = async () => {
                const fileUrl = await fileReader(file);
                const data = {
                  ...values,
                  fileUrl,
                  extractedText,
                };

                console.log(data);
                const Resdata = await axios.post(
                  `http://localhost:8080/admin/blog-Add`,
                  data
                );
                console.log(Resdata.data);

                navigate("/admin/blog");
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
                  controlId="title"
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
                    Title
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="title"
                    className="form-control "
                    value={values.title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="url" className="mb-3 flex mt-4">
                  <Form.Label
                    className="text-md "
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    URL
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="url"
                    className="form-control "
                    value={values.url}
                    onChange={handleChange}
                  />
                </Form.Group>
                <p
                  className="text-gray-500"
                  style={{ marginLeft: "11.4rem", marginTop: "-1rem" }}
                >
                  Don't leave any space between letters or words in URL. words
                  break with (-) or (_).
                </p>
                <Form.Group className="flex">
                  <Form.Label
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                    className=""
                  >
                    Image
                  </Form.Label>
                  <Form.Control
                    style={{ width: "67.7vw ", marginBottom: "1rem" }}
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
                <Form.Group className="position-relative mb-3 flex">
                  <Form.Label
                    className="text-md "
                    style={{
                      width: "11rem",
                      marginTop: "5px",
                      marginLeft: "5px",
                    }}
                  >
                    Blog Content
                  </Form.Label>
                  <JoditEditor
                    className="jodit-editor"
                    ref={editor}
                    value={blogContent}
                    //   value={sliderContentText}
                    onChange={(newContent) => setBlogContent(newContent)}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="postBy"
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
                    Post By
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="postBy"
                    className="form-control "
                    value={values.postBy}
                    onChange={handleChange}
                  />
                </Form.Group>{" "}
                <Form.Group
                  as={Col}
                  controlId="seoTitle"
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
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="seoTitle"
                    className="form-control "
                    value={values.seoTitle}
                    onChange={handleChange}
                  />
                </Form.Group>{" "}
                <Form.Group
                  as={Col}
                  controlId="seoKeyword"
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
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="seoKeyword"
                    className="form-control "
                    value={values.seoKeyword}
                    onChange={handleChange}
                  />
                </Form.Group>{" "}
                <Form.Group
                  as={Col}
                  controlId="SeoDescription"
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
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="SeoDescription"
                    className="form-control "
                    value={values.SeoDescription}
                    onChange={handleChange}
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

export default BlogAdd;
