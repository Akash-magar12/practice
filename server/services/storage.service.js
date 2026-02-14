import { ImageKit } from "@imagekit/nodejs/client.js";

const imageKit = new ImageKit({
  privateKey:process.env.IK_PRIVATE_KEY
});

const uploadFile = async (file) => {
  const result = await imageKit.files.upload({
    file,
    fileName: "post" + Date.now(),
    folder: "backend/posts",
  });
  return result;
};

export default uploadFile;
