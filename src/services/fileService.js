let path = require("path");
//Upload sigle
const uploadSigleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, "../public/image/upload");
  //   console.log("uploadPath>>> ", uploadPath);

  // Get image extension
  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);
  //   console.log("extName>> ", extName, "baseName>>> ", baseName);
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;
  //   console.log("finalName>>> ", finalName);
  //   console.log("finalPath>> ", finalPath);
  try {
    await fileObject.mv(finalPath);
    return { status: "success", path: finalName, error: null };
  } catch (error) {
    console.log("checkError>>> ", error);
    return { status: "failed", path: null, error: JSON.stringify(error) };
  }
};

//Upload mutiple
const uploadMultipleFiles = async (fileArray) => {
  try {
    let uploadPath = path.resolve(__dirname, "../public/image/upload");
    let resultArr = [];
    let countSuccess = 0;
    for (let i = 0; i < fileArray.length; i++) {
      let extName = path.extname(fileArray[i].name);
      let baseName = path.basename(fileArray[i].name, extName);
      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;
      try {
        await fileArray[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          fileName: fileArray[i].name,
          error: null,
        });
        countSuccess++;
      } catch (error) {
        console.log("checkError>>> ", error);
        resultArr.push({
          status: "failed",
          path: null,
          fileName: fileArray[i].name,
          error: JSON.stringify(error),
        });
      }
    }
    return {
      countSuccess: countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadSigleFile, uploadMultipleFiles };
