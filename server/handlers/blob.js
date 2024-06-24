import path from 'path';
import { fileURLToPath } from 'url';
import { open, readFile } from 'node:fs/promises';
import formidable from 'formidable';
import { del, head, list, put } from '@vercel/blob';

// export const config = {
//   runtime: 'edge',
// };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFileList = async (req, res) => {
  const { blobs } = await list();
  res.json(blobs);
};

export const deleteFile = async (req, res) => {
  const blobUrl = req.query.url;
  
  try {
    const blobDetails = await head(blobUrl);
    await del(blobUrl);
    res.send(`${blobDetails.pathname} deleted`);
  } catch (error) {
    console.log(error.message, blobUrl);
    if (error.message.includes("The requested blob does not exist")){
      res.status(404).send("This file does not exist.");
    } else {
      res.status(500).send("Unexpected error has occured.");
    }
  }
};

export const uploadLocalFile = async (req, res) => {
  const fileName = req.query.filename;
  try {
    const filePath = path.join(__dirname, '..', 'assets', 'files-to-upload', fileName)
    const data = await readFile(filePath);
    const blob = await put(`Blob-test/${fileName}`, data, { 
      access: 'public',
      multipart: true
    });
    res.json(blob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const uploadFile = async (req, res) => {
  console.log("uploadFile called");
  const form = formidable({});
  
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(err.statusCode).send("Parsing was unsuccessful. " + err.code);
    }
    console.log("form.parse called");
  });

  form.on('file', (formname, file) => {
    console.log('form.on file.filepath', file.filepath);
    console.log('form.on file.originalFilename', file.originalFilename);
    // try {
    //   const blob = await put(file.originalFilename, file, {
    //     access: 'public'
    //   });
    //   console.log("blob response", blob);
    // } catch (error) {
    //   console.log("blob error", error);
    // }
  });

  form.once('end', () => {
    console.log("The End");
    res.send("Files received");
  });
};

//     if (err) console.log('form.parse err', err);
//     // console.log('form.parse files', files);
//     // console.log('form.parse files fired');
//   });
// 
//   form.on('file', (formname, file) => {
//     // console.log('form.on file.filepath', file.filepath);
//     // console.log('form.on file.originalFilename', file.originalFilename);
// 
//     let awsKey = awsFolder + file.originalFilename;
// 
//     fs.readFile(file.filepath, (err, data) => {
//       if (err) console.log('readFile err', err);
//       // console.log('readFile data', data);
// 
//       let awsParams = {
//         Bucket: process.env.CYCLIC_BUCKET_NAME,
//         Key: awsKey,
//         Body: data
//       };
// 
//       s3.putObject(awsParams, (err, data) => {
//         if(err) {
//           console.log(err);
//           res.status(err.statusCode).send("Upload was not successful: " + err.code);
//         } else {
//           console.log(`S3: ${awsKey} uploaded successfully`);
//         }
//       });
//     });
//   });
// 
//   form.once('end', () => {
//     // console.log('form.once end');
//     res.send(`Files uploaded successfully.`);
//   });