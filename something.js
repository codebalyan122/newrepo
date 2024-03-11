//     const [searchedKeyword, setSearchedKeyword] = useState("");
//   const [filteredData, setFilteredData] = useState();
//   useEffect(() => {
//     const filteredDataFn = () => {
//       const lowercasedKeyword = searchedKeyword?.toLowerCase();

//       // Check if the search keyword is not empty
//       const filteredResults = lowercasedKeyword
//         ? topTour?.data?.data?.filter((placename, index) => {
//             // console.log(placename);
//             const lowercasedName = placename?.topCategoryName?.toLowerCase();
//             return lowercasedName.includes(lowercasedKeyword);
//           })
//         : [];

//       console.log(filteredResults);
//       setFilteredData(filteredResults);
//     };
//     filteredDataFn();
//   }, [searchedKeyword]);


    // filteredData?.length > 0
    //   ? filteredData?.map((category, index) => {
    //       return {
    //         sno: index + 1,
    //         id: category._id,
    //         category: category?.topCategoryName,
    //         image: category.fileUrl,
    //       };
    //     })
    //   :

    //   value={searchedKeyword}
    //           onChange={(e) => setSearchedKeyword(e.target.value)}
