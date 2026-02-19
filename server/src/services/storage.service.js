import { ImageKit } from "@imagekit/nodejs/client.js";
const imageKit = new ImageKit({
  privateKey: process.env.PRIVATE_KEY,
});

const uploadFile = async (fileBuffer) => {
  const base64File = fileBuffer.toString("base64");
  const result = await imageKit.files.upload({
    file: base64File,
    fileName: "post" + Date.now(),
    folder: "backend/posts",
  });
  return result;
};

export default uploadFile;
