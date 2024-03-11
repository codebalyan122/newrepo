import React, { useEffect } from "react";
import { useRef, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import NavbarComponent from "./Navbar";
import Aside from "./Aside";
import { Button, Form, Image } from "react-bootstrap";
import * as formik from "formik";
// import { Myprovider } from "../context/contextApi";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import fileReader from "./utils/fileReader";

async function getSlideById(id) {
  const data = await axios.get(`http://localhost:8080/slider/slide/${id}`);
  return data;
}

const SliderEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [sliderContentText, setSliderContentText] = useState("");

  const {
    isLoading,
    // isError,
    data: slider,
    // error,
  } = useQuery(["slidersByid", id], () => getSlideById(id), {});

  console.log(slider?.data?.data);

  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  // console.log(extractPlainText(sliderContentText));
  // const { sliderContentData, setSliderContent } = useContext(Myprovider);

  const editor = useRef(null);
  useEffect(() => {
    setSliderContentText(slider?.data?.data?.text);
  }, [slider]);

  // const fileReader = (file) => {
  //   console.log(file);
  //   console.log(file instanceof Blob);
  //   if (file instanceof Blob) {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();

  //       reader.onloadend = () => {
  //         const fileUrl = reader.result;
  //         return resolve(fileUrl);
  //       };

  //       reader.onerror = (error) => {
  //         reject(error);
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   } else {
  //     return "file is not type of blob";
  //   }
  // };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div className=" flex-1  flex flex-col ">
          <h4 className="mt-2 " style={{ marginLeft: "1rem" }}>
            Slider Edit
          </h4>

          <formik.Formik
            onSubmit={(values) => {
              const { file } = values;
              // console.log(sliderContentText);
              // console.log(extractPlainText(sliderContentText));
              const uploadData = async () => {
                const text = extractPlainText(sliderContentText);
                let fileUrl;
                if (!file) {
                  fileUrl = slider?.data?.data?.fileUrl;
                  const data = {
                    text: sliderContentText,
                    fileUrl,
                  };
                  const resData = await axios.put(
                    `http://localhost:8080/slider/update/${id}`,
                    data
                  );

                  console.log(resData.data);
                  navigate("/admin/slider");
                } else {
                  fileUrl = await fileReader(file);
                  const data = {
                    fileUrl,
                    text,
                  };
                  const resData = await axios.put(
                    `http://localhost:8080/slider/update/${id}`,
                    data
                  );

                  console.log(resData.data);
                  navigate("/admin/slider");
                }
              };
              uploadData();

              // if (file instanceof Blob) {
              //   const reader = new FileReader();
              //   reader.onloadend = async () => {
              //     const fileUrl = reader.result;
              //     console.log(fileUrl);
              //     setImage(fileUrl);
              //     setSliderContent((prevState) => {
              //       return {
              //         ...prevState,
              //         text,
              //         fileUrl,
              //       };
              //     });
              //     const data = await axios.put(
              //       `http://localhost:8080/slider/update/${id}`,
              //       sliderContentData
              //     );

              //     console.log(data.data);
              //     navigate("/admin/slider");
              //   };

              //   reader.readAsDataURL(file);
              // }
            }}
            initialValues={{
              file: null,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="position-relative mt-5">
                  <Form.Group className="flex">
                    <Form.Label
                      style={{ marginBottom: "13px", marginLeft: "1rem" }}
                    >
                      Previous content
                    </Form.Label>
                    <div style={{ width: "82%", marginLeft: "3rem" }}>
                      <CKEditor
                        editor={Editor}
                        data={sliderContentText}
                        onReady={(editor) => {
                          console.log("editor is ready", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setSliderContentText(data);
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
                      style={{ marginTop: "3rem", marginLeft: "1rem" }}
                    >
                      Previous Image
                    </Form.Label>
                    <Image
                      src={
                        slider?.data?.data?.fileUrl
                          ? slider?.data?.data?.fileUrl
                          : ""
                      }
                      alt="Image"
                      style={{
                        height: "3rem",
                        style: "3rem",
                        marginTop: "3rem",
                        marginLeft: "3.5rem",
                        marginBottom: "1rem",
                      }}
                    />
                  </Form.Group>

                  <Form.Control
                    type="file"
                    required
                    name="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];

                      setFieldValue("file", file);
                    }}
                    style={{ marginLeft: "11.4rem" }}
                    // isInvalid={!!errors.file}
                  />
                </Form.Group>

                <Button
                  style={{ marginLeft: "30rem", marginTop: "2rem" }}
                  type="submit"
                >
                  Submit form
                </Button>
              </Form>
            )}
          </formik.Formik>
        </div>
      </div>
    </>
  );
};

export default SliderEdit;
