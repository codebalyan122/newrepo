import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Blog from "./Components/Blog/Blog";
import FAQ from "./Components/FAQ/FAQ";
import Destination from "./Components/Destination/Destination";
import Placename from "./Components/Destination/Placename";
import Slider from "./Components/Slider";
import Package from "./Components/package/Package";
import TopTourCategory from "./Components/TourCategory/TopTourCategory";
import MidTourCategory from "./Components/TourCategory/MidTourCategory";
import Region from "./Components/TourCategory/Region";
import Interest from "./Components/TourCategory/Interest";
import Setting from "./Components/Setting";
import SliderContent from "./Components/SliderContent";
import SliderEdit from "./Components/SliderEdit";
import PackageEdit from "./Components/package/PackageEdit";
import TourTypeAddPage from "./Components/TourCategory/TourTypeAddPage";
import MidTourCategoryAdd from "./Components/TourCategory/MidTourCategoryAdd";
import RegionAdd from "./Components/TourCategory/RegionAdd";
import InterestAdd from "./Components/TourCategory/InterestAdd";
import TopCategoryEdit from "./Components/TourCategory/TopCategoryEdit";
import MidCategoryEdit from "./Components/TourCategory/MidCategoryEdit";
// import NotFoundPage from "./Components/404NotFounfPage";
import InterestEdit from "./Components/TourCategory/InterestEdit";
import RegionEdit from "./Components/TourCategory/RegionEdit";
import DestinationAdd from "./Components/Destination/DestinationAdd";
import DestinationEdit from "./Components/Destination/DestinationEdit";
import PlacenameEdit from "./Components/Destination/PlacenameEdit";
import PlacenameAddPage from "./Components/Destination/PlacenameAddPage";
import Hotel from "./Components/Hotel/Hotel";
import HelicopterEnquiry from "./Components/HelicopterEnquiry";
import Offers from "./Components/offers/Offers";
import OffersContent from "./Components/offers/OffersContent";
import Temples from "./Components/Temples/Temples";
import TemplesLocation from "./Components/Temples/TemplesLocation";
import HotelAddPage from "./Components/Hotel/HotelAddPage";
import PackageEditById from "./Components/package/PackageEditById";
import HotelEdit from "./Components/Hotel/HotelEdit";
import OffersAdd from "./Components/offers/OffersAdd";
import BlogAdd from "./Components/Blog/BlogAdd";
import BlogEdit from "./Components/Blog/BlogEdit";
import AddFAQ from "./Components/FAQ/AddFAQ";
import FAQEdit from "./Components/FAQ/FAQEdit";
import HeliCopterEnquiries from "./Components/Enquiry/HelicopterEnquiry";
import PlanMyHolidayEnquiry from "./Components/Enquiry/PlanMyHolidayEnquiry";
import HotelEnquiry from "./Components/Enquiry/HotelEnquiry";
import PackageEnquire from "./Components/Enquiry/PackageEnquire";
import TaxiEnquiry from "./Components/Enquiry/TaxiEnquiry";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

import { React } from "react";
// import Authetication from "./Components/utils/Auth";
import ProtectedRoute from "./Components/utils/ProtectedRoutes";
import Somethingurg from "./Somethingurg";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/blog" element={<Blog />} />

          <Route path="/admin/destination" element={<Destination />}></Route>
          <Route
            path="/admin/destination/placename"
            element={<Placename />}
          ></Route>
          <Route path="/admin/slider" element={<Slider />}></Route>
          <Route path="/admin/settings" element={<Setting />}></Route>
          <Route path="/admin/package" element={<Package />}></Route>
          <Route
            path="/admin/tour-category/top"
            element={<TopTourCategory />}
          ></Route>
          <Route
            path="/admin/tour-category/mid"
            element={<MidTourCategory />}
          ></Route>
          <Route
            path="/admin/tour-category/region"
            element={<Region />}
          ></Route>
          <Route
            path="/admin/tour-category/interest"
            element={<Interest />}
          ></Route>
          <Route
            path="/admin/slider/slider-add/"
            element={<SliderContent />}
          ></Route>
          <Route
            path="/admin/slider/slider-add/:id"
            element={<SliderEdit />}
          ></Route>
          <Route
            path="/admin/package/package-add/"
            element={<PackageEdit />}
          ></Route>
          <Route
            path="/admin/add-package-edit-page/:id"
            element={<PackageEditById />}
          ></Route>

          <Route
            path="/admin/package/top-tour-add/"
            element={<TourTypeAddPage />}
          ></Route>
          <Route
            path="/admin/package/mid-tour-add/"
            element={<MidTourCategoryAdd />}
          ></Route>
          <Route
            path="/admin/package/region-tour-add/"
            element={<RegionAdd />}
          ></Route>
          <Route
            path="/admin/package/interest-tour-add/"
            element={<InterestAdd />}
          ></Route>
          <Route
            path="/admin/package/top-tour-edit/:id"
            element={<TopCategoryEdit />}
          ></Route>
          <Route
            path="/admin/package/mid-tour-edit/:id"
            element={<MidCategoryEdit />}
          ></Route>
          <Route
            path="/admin/package/interest-tour-edit/:id"
            element={<InterestEdit />}
          ></Route>
          <Route
            path="/admin/package/Region-tour-edit/:id"
            element={<RegionEdit />}
          ></Route>
          <Route
            path="/admin/destination/destination-add-page/"
            element={<DestinationAdd />}
          ></Route>
          <Route
            path="/admin/destination/destination-edit-page/:id"
            element={<DestinationEdit />}
          ></Route>
          <Route
            path="/admin/destination/placename-edit-page/:id"
            element={<PlacenameEdit />}
          ></Route>
          <Route
            path="/admin/destination/placename-Add-page"
            element={<PlacenameAddPage />}
          ></Route>
          <Route
            path="/admin/helicopter-enquiry"
            element={<HelicopterEnquiry />}
          ></Route>
          <Route path="/admin/hotel" element={<Hotel />}></Route>
          <Route path="/admin/offer" element={<Offers />}></Route>
          <Route
            path="/admin/offer-content"
            element={<OffersContent />}
          ></Route>
          <Route
            path="/admin/temple-location"
            element={<TemplesLocation />}
          ></Route>
          <Route path="/admin/temple" element={<Temples />}></Route>
          <Route path="/admin/faq" element={<FAQ />}></Route>
          <Route path="/admin/add-faq" element={<AddFAQ />}></Route>
          <Route path="/admin/add-faq" element={<AddFAQ />}></Route>
          <Route path="/admin/edit-faq/:id" element={<FAQEdit />}></Route>

          <Route path="/admin/hotel-addPage" element={<HotelAddPage />}></Route>
          <Route
            path="/admin/hotel-editPage/:id"
            element={<HotelEdit />}
          ></Route>
          <Route path="/admin/offer-addPage" element={<OffersAdd />}></Route>
          <Route path="/admin/Blog-addPage" element={<BlogAdd />}></Route>
          <Route path="/admin/Blog-editPage/:id" element={<BlogEdit />}></Route>

          <Route
            path="/admin/Helicopter-Eqnuiry"
            element={<HeliCopterEnquiries />}
          ></Route>

          <Route
            path="/admin/plan-my-day-Eqnuiry"
            element={<PlanMyHolidayEnquiry />}
          ></Route>

          <Route path="/admin/Hotel-Eqnuiry" element={<HotelEnquiry />}></Route>
          <Route
            path="/admin/package-Eqnuiry"
            element={<PackageEnquire />}
          ></Route>
          <Route path="/admin/taxi-Eqnuiry" element={<TaxiEnquiry />}></Route>
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
