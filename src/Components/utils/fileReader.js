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

export default fileReader;
