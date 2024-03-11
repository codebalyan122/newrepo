import React from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import NavbarComponent from "./Navbar";
import Aside from "./Aside";
import Logo from "../logo.svg";
import axios from "axios";
// import { Myprovider } from "../context/contextApi";
import * as formik from "formik";
import * as yup from "yup";
import { useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const settingData = () => {
  const data = axios.get("http://localhost:8080/get/settings");
  return data;
};

const Setting = () => {
  const {
    isLoading,
    data: settings,
    refetch,
  } = useQuery("getSettingsSchema", settingData);
  // console.log(settings?.data);
  const { Formik } = formik;
  // const { formData, setFormData } = useContext(Myprovider);
  // const [image, setImage] = useState("");

  // console.log(formData);
  let setting;
  if (settings && Array.isArray(settings.data) && settings.data.length > 0) {
    [setting] = settings.data;
    // console.log(setting);
  } else {
    // Handle the case where settings or settings.data is not as expected
  }
  const schema = yup.object().shape({
    email: yup.string(),
    contact_Number: yup.string(),
    whatsapp_Number: yup.number(),
    address: yup.string(),
    footer_copyRight: yup.string(),
    zip: yup.string(),
    file: yup.mixed(),
    terms: yup.bool().oneOf([true], "terms must be accepted"),
  });
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
  const initialValues = {
    email: setting ? setting.email : "",
    contact_Number: setting ? setting.contact_Number : "9811408178",
    whatsapp_Number: setting ? setting.whatsapp_Number : "",
    address: setting ? setting.address : "",
    footer_copyRight: setting ? setting.footer_copyRight : "",
    companyName: setting ? setting.companyName : "",
    file: null,
    facebookLink: setting ? setting.facebookLink : "",
    twitter: setting ? setting.twitter : "",
    instagram: setting ? setting.instagram : "",
    youtube: setting ? setting.youtube : "",
    linkedin: setting ? setting.linkedin : "",
  };
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex">
        <Aside />
        <div
          className=" flex-1 "
          style={{
            backgroundImage:
              "linear-gradient(174.2deg, rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4%)",
          }}
        >
          <h3 style={{ marginLeft: "1.8rem" }}>Settings</h3>
          <Formik
            validate={schema}
            initialValues={initialValues}
            onSubmit={(values) => {
              const { file } = values;
              const uploadData = async () => {
                console.log(setting?.fileUrl);
                let fileUrl;
                if (!file) {
                  fileUrl = setting?.fileUrl;

                  const data = {
                    ...values,
                    fileUrl,
                  };
                  console.log(data);
                  try {
                    const Resdata = await axios.put(
                      `http://localhost:8080/setting-update-data`,
                      data
                    );
                    console.log(Resdata.data);
                    refetch();
                    // navigate("/admin/settings");
                  } catch (error) {
                    console.error("Error uploading data:", error);
                  }
                } else if (file) {
                  fileUrl = await fileReader(file);

                  const data = {
                    ...values,
                    fileUrl,
                  };
                  console.log(data);
                  try {
                    const Resdata = await axios.put(
                      `http://localhost:8080/setting-update-data`,
                      data
                    );
                    console.log(Resdata.data);
                    refetch();
                    toast.success("Settings updated successfully!", {
                      duration: 4000, // Optional duration in milliseconds
                    });
                    // navigate("/admin/settings");
                  } catch (error) {
                    console.error("Error uploading data:", error);
                    toast.error("Error updating settings. Please try again.", {
                      duration: 4000, // Optional duration in milliseconds
                    });
                  }
                }
              };
              uploadData();
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit} className="ml-3">
                <Form.Group className="position-relative flex">
                  <Form.Label
                    style={{
                      marginTop: "1.7rem",
                      marginLeft: "1rem",
                      fontSize: "1rem",
                    }}
                  >
                    Previous Logo
                  </Form.Label>
                  <Image
                    src={setting?.fileUrl || Logo}
                    alt="Image"
                    style={{
                      height: "5rem",
                      width: "5rem",
                      marginLeft: "2rem",
                      marginBottom: "1rem",
                    }}
                  />
                </Form.Group>

                <Form.Group className="position-relative mb-3 flex">
                  <Form.Label style={{ marginLeft: "1rem" }}>Logo</Form.Label>

                  <Form.Control
                    style={{ marginLeft: "6rem", width: "90%" }}
                    type="file"
                    required
                    name="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("file", file);
                    }}
                    isInvalid={!!errors.file}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik101"
                    className="position-relative"
                  >
                    <Form.Label style={{ marginLeft: "1rem" }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                    />
                    <Form.Control.Feedback tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik102"
                    className="position-relative"
                  >
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact_Number"
                      value={values.contact_Number}
                      onChange={handleChange}
                      isValid={touched.contact_Number && !errors.contact_Number}
                    />

                    <Form.Control.Feedback tooltip>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormikUsername2"
                  >
                    <Form.Label>whatsapp Number</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Whatsapp Number"
                        aria-describedby="inputGroupPrepend"
                        name="whatsapp_Number"
                        value={values.whatsapp_Number}
                        onChange={handleChange}
                        isInvalid={!!errors.whatsapp_Number}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label style={{ marginLeft: "1rem" }}>
                      address
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormik104"
                    className="position-relative"
                  >
                    <Form.Label>footer copyRight</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="footerCopyRight"
                      name="footer_copyRight"
                      value={values.footer_copyRight}
                      onChange={handleChange}
                      isInvalid={!!errors.footer_copyRight}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormik105"
                    className="position-relative"
                  >
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="companyName"
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      isInvalid={!!errors.companyName}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.companyName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="position-relative mb-3">
                  <Form.Label style={{ marginLeft: "1rem" }}>
                    FacebookLink
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="facebookLink"
                    value={values.facebookLink}
                    onChange={handleChange}
                    placeholder="facebookLink"
                    isInvalid={!!errors.facebookLink}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.facebookLink}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                  <Form.Label style={{ marginLeft: "1rem" }}>
                    instagram
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="instagram"
                    value={values.instagram}
                    onChange={handleChange}
                    placeholder="Instagram"
                    isInvalid={!!errors.instagram}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.instagram}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                  <Form.Label style={{ marginLeft: "1rem" }}>
                    twitter
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="twitter"
                    value={values.twitter}
                    onChange={handleChange}
                    placeholder="twitter"
                    isInvalid={!!errors.twitter}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.twitter}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                  <Form.Label style={{ marginLeft: "1rem" }}>
                    Youtube
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="youtube"
                    value={values.youtube}
                    onChange={handleChange}
                    placeholder="youtube"
                    isInvalid={!!errors.youtube}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.youtube}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                  <Form.Label style={{ marginLeft: "1rem" }}>
                    Linkedin
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="linkedin"
                    value={values.linkedin}
                    onChange={handleChange}
                    placeholder="Linkedin"
                    // isInvalid={!!errors.linkedin}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.linkedin}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  style={{
                    marginLeft: "27rem",
                    marginBottom: "1rem ",
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

export default Setting;
