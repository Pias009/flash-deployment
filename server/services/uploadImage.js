const { cloudinary } = require("../config/cloudinary.config");

const uploadImage = (buffer, folderName) => {
  if (!buffer) return { url: "" };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder: folderName }, (error, result) => {
      if (error) return reject(error);
      resolve({ url: result.secure_url });
    });

    uploadStream.end(buffer);
  });
};

module.exports = { uploadImage };
