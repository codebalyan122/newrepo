import React, { useRef, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import NavbarComponent from "./Navbar";
import Aside from "./Aside";
import { Button, Form } from "react-bootstrap";
import * as formik from "formik";
// import { Myprovider } from "../context/contextApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SliderContent = () => {
  const navigate = useNavigate();

  // const [image, setImage] = useState("");
  const [sliderContentText, setSliderContentText] = useState("");

  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  // console.log(extractPlainText(sliderContentText));
  // const { sliderContentData, setSliderContent } = useContext(Myprovider);

  const editor = useRef(null);

  const fileReader = (file) => {
    console.log(file);
    console.log(file instanceof Blob);
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
        <div className=" flex-1   flex-col ">
          <h4 className="mb-6 ml-3 " style={{ marginTop: "2rem" }}>
            Slider content
          </h4>

          <formik.Formik
            onSubmit={(values) => {
              const { file } = values;
              // console.log(sliderContentText);
              // console.log(extractPlainText(sliderContentText));
              const text = extractPlainText(sliderContentText);

              const uploadData = async () => {
                if (!file) {
                  alert("Please select a image");
                } else {
                  const fileUrl = await fileReader(file);

                  const data = {
                    fileUrl,
                    text,
                  };
                  const resData = await axios.post(
                    "http://localhost:8080/sliderData/post",
                    data
                  );

                  console.log(resData.data);
                  navigate("/admin/slider");
                }
              };
              uploadData();
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
              <Form
                noValidate
                onSubmit={handleSubmit}
                style={{ marginLeft: "1rem" }}
              >
                <Form.Group className="position-relative mb-3 flex">
                  <Form.Label
                    style={{
                      marginTop: "2rem",
                    }}
                  >
                    Slider Content
                  </Form.Label>
                  {/* <div style={{ marginLeft: "3rem", marginTop: "1rem" }}> */}
                  <div style={{ width: "82%", marginLeft: "6rem" }}>
                    <CKEditor
                      editor={Editor}
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
                  <Form.Label style={{ marginTop: "2.5rem" }}>
                    Slider Image
                  </Form.Label>
                  <Form.Control
                    style={{
                      marginTop: "2rem",
                      width: "82%",
                      marginLeft: "5.7rem",
                    }}
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
                <div
                  style={{
                    width: "100%",

                    justifyContent: "center",
                  }}
                  className=" flex"
                >
                  <Button style={{ marginTop: "2rem" }} type="submit">
                    Submit form
                  </Button>
                </div>
              </Form>
            )}
          </formik.Formik>
        </div>
      </div>
    </>
  );
};

export default SliderContent;
