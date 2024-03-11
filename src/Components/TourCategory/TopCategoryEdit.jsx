import React, { useContext, useRef, useState } from "react";
import { Myprovider } from "../../context/contextApi";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import axios from "axios";
import { Button, Col, Form, Image } from "react-bootstrap";
import { TextField } from "@mui/material";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

async function getTopPackegeById(id) {
  const data = await axios.get(`http://localhost:8080/top-tour-get/${id}`);
  return data;
}

const TopCategoryEdit = () => {
  const navigate = useNavigate();
  const editor = useRef();

  const { id } = useParams();

  const {
    isLoading,
    // isError,
    data: slider,
    // error,
  } = useQuery(["packageById", id], () => getTopPackegeById(id), {});

  const userData = slider?.data?.data;

  console.log(userData);

  const { topcategory, setTopcategory } = useContext(Myprovider);
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const [description, setDescription] = useState();
  const [image, setImage] = useState("");

  const initialValues = {
    topCategoryName: userData ? userData.topCategoryName : "",
    // uploadImage: null,
    // description: "",
    file: "",
    showOnMenu: userData ? userData.showOnMenu : "",
    seoTitle: userData ? userData.seoTitle : "",
    seoKeyword: userData ? userData.seoKeyword : "",
    seoDescription: userData ? userData.seoDescription : "",
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
                  setImage(fileUrl);
                  console.log(extractedText);
                  const data = {
                    ...values,
                    fileUrl,
                    extractedText: description,
                  };

                  console.log(data);
                  setTopcategory((prevState) => {
                    return { ...prevState, data };
                  });
                  console.log(topcategory);

                  const Resdata = await axios.put(
                    `http://localhost:8080/top-tour-edit/${userData?._id}`,
                    data
                  );

                  console.log(Resdata.data);
                  navigate("/admin/tour-category/top");
                };

                reader.readAsDataURL(file);
              } else {
                const data = { ...values, extractedText };
                console.log(data);
                setTopcategory((prevState) => {
                  return { ...prevState, data };
                });
                async function withoutFileData() {
                  const { fileUrl } = userData;
                  const withoutFileData = { fileUrl, ...data };
                  const Resdata = await axios.put(
                    `http://localhost:8080/top-tour-edit/${userData?._id}`,
                    withoutFileData
                  );

                  console.log(Resdata.data);

                  navigate("/admin/tour-category/top");
                }
                withoutFileData();
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
                      data={
                        userData?.extractedText
                          ? userData?.extractedText
                          : description
                      }
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
                  {/* <JoditEditor
                    className="jodit-editor"
                    ref={editor}
                    value={
                      userData?.extractedText
                        ? userData?.extractedText
                        : description
                    }
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
                    Previous Image
                  </Form.Label>
                  <Image
                    src={userData ? userData?.fileUrl : image || ""}
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
                  style={{ marginLeft: "38vw", marginTop: "1rem" }}
                  type="submit"
                >
                  Update Data
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default TopCategoryEdit;
