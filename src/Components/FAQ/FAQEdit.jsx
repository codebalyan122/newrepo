import React, { useEffect, useRef, useState } from "react";
import NavbarComponent from "../Navbar";
import Aside from "../Aside";
import { Formik } from "formik";
import axios from "axios";
import { Button, Col, Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useQuery } from "react-query";

const getFAQById = async (id) => {
  const data = await axios.get(`http://localhost:8080/get-FAQ-ById/${id}`);
  return data;
};
const FAQEdit = () => {
  const { id } = useParams();
  const {
    isLoading,
    // isError: HotelPageEditIsError,
    data: FAQIDataById,
    // error: HotelPageEditError,
    // refetch: HotelPageEditRefetch,
  } = useQuery("getFAQById", () => getFAQById(id));

  const FAQIData = FAQIDataById?.data?.data;
  //   console.log(FAQIData);
  const navigate = useNavigate();

  const editor = useRef();

  const [faqContent, setfaqContent] = useState("");
  const initialValues = {
    title: FAQIData ? FAQIData?.title : "",
  };

  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    setfaqContent(FAQIData ? FAQIData?.extractedText : "");
  }, [FAQIDataById, FAQIData]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <h3 className="bold" style={{ fontSize: "bold", margin: "1rem" }}>
            Edit FAQ
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values);
              //   const { file } = values;

              const extractedText = extractPlainText(faqContent);

              const uploadData = async () => {
                // const fileUrl = await fileReader(file);

                const data = {
                  ...values,
                  //   fileUrl,
                  extractedText,
                };

                console.log(data);
                const Resdata = await axios.post(
                  `http://localhost:8080/admin/Faq-Add`,
                  data
                );
                console.log(Resdata.data);

                navigate("/admin/faq");
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
                    required
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
                    FAQ Content
                  </Form.Label>
                  <div style={{ width: "68vw" }}>
                    <JoditEditor
                      className="jodit-editor"
                      ref={editor}
                      value={faqContent}
                      onChange={(newContent) => setfaqContent(newContent)}
                    />
                  </div>
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

export default FAQEdit;
