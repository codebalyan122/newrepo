import React from "react";
import Aside from "../Aside";
import NavbarComponent from "../Navbar";
import { Button, Col, Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OffersAdd = () => {
  const navigate = useNavigate();
  const initialValues = {
    offername: "",
  };

  const fileReader = (file) => {
    // console.log(file);
    // console.log(file instanceof Blob);
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

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className="flex-1">
          <h3 className="bold" style={{ fontSize: "bold", margin: "1rem" }}>
            Add Offer Or Deal
          </h3>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              // console.log(values);
              const { file } = values;
              const uploads = async () => {
                const fileUrl = await fileReader(file);
                const data = { ...values, fileUrl };
                console.log(data);
                const Resdata = await axios.post(
                  `http://localhost:8080/offer-add-Page`,
                  data
                );
                console.log(Resdata.data);
                navigate("/admin/offer");
              };
              uploads();
              //   const uploadData = async () => {
              //     const fileUrl = await fileReader(file);
              //     const otherPhotoUrl = await fileReader(OtherPhotos);
              //     console.log(fileUrl, otherPhotoUrl);
              //     // otherPhotos.push(otherPhotoUrl);
              //     setOtherPhotos((prevOtherPhotos) => [
              //       ...prevOtherPhotos,
              //       otherPhotoUrl,
              //     ]);
              //     console.log("otherPhoto", otherPhotos);
              //     const data = {
              //       ...values,
              //       fileUrl,
              //       otherPhotos: [...otherPhotos, otherPhotoUrl],
              //       extractedText,
              //     };
              //     const Resdata = await axios.post(
              //       `http://localhost:8080/add-hotel-package`,
              //       data
              //     );
              //     console.log(Resdata.data);

              //     navigate("/admin/hotel");
              //   };

              //   uploadData();
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
                  controlId="name"
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
                    Name
                  </Form.Label>
                  <TextField
                    type="text"
                    style={{ width: "67.7vw" }}
                    name="offername"
                    className="form-control "
                    value={values.offername}
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
                    className=""
                  >
                    Image
                  </Form.Label>
                  <Form.Control
                    style={{ width: "67.7vw " }}
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

export default OffersAdd;
