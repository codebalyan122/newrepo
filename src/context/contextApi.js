import { createContext, useState } from "react";

const addPackage = [
  {
    destinationName: "somthing",
    placeName: "happended",
    packageName: "somthing",
    price: "",
    day: "",
    night: "",
    startingLocation: "",
    endingLocation: "",
    sameDay: "",
    overview: "",
    itinerary: "",
    inclusion: "",
    exclusion: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
];

const destinationNames = {};

const RelatedPackages = [
  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },

  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },

  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },

  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
];

const TopCategory = {};

const MidCategory = [
  {
    topCategoryName: "teen dham yatra",
    fileUrl: "",
    overView: "",
    midCategoryName: "somthing  ",
    placeForMidCategory: "somthing",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
];
const TripType = [
  {
    interestName: "",
    file: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
];

const showOnMenu = [
  {
    name: "yes",
  },
  {
    name: "no",
  },
];
const Region = [
  {
    topCategoryName: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
];

const isRecommended = [
  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
];
const isChardham = [
  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
  {
    name: "teen dham yatra",
    img: "",
    description: "",
    showOnMenu: "",
    seoTitle: "",
    seoKeyword: "",
    seoDescription: "",
  },
];

export const Myprovider = createContext();

const Provider = ({ children }) => {
  const [formData, setFormData] = useState();
  const [sliderContentData, setSliderContent] = useState();
  const [DestinationName, setDestinationName] = useState([destinationNames]);
  const [relatedPackages, setRelatedpackages] = useState(RelatedPackages);
  const [topcategory, setTopcategory] = useState(TopCategory);
  const [midCategory, setMidCategory] = useState(MidCategory);
  const [tripType, setTripType] = useState(TripType);
  const [region, setRegion] = useState(Region);
  const [showonMenu, setShowOnMenu] = useState(showOnMenu);
  const [IsRecommended, setIsRecommended] = useState(isRecommended);
  const [Ischardham, setISChardham] = useState(isChardham);
  const [add_Package, setAddPackage] = useState(addPackage);

  return (
    <Myprovider.Provider
      value={{
        formData,
        setFormData,
        sliderContentData,
        setSliderContent,
        DestinationName,
        setDestinationName,
        relatedPackages,
        setRelatedpackages,
        topcategory,
        setTopcategory,
        midCategory,
        setMidCategory,
        tripType,
        setTripType,
        region,
        setRegion,
        IsRecommended,
        setIsRecommended,
        Ischardham,
        setISChardham,
        showonMenu,
        setShowOnMenu,
        add_Package,
        setAddPackage,
      }}
    >
      {children}
    </Myprovider.Provider>
  );
};

export default Provider;
