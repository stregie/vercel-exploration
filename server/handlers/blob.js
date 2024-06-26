import path from 'path';
import { fileURLToPath } from 'url';
import { open, readFile } from 'node:fs/promises';
import formidable from 'formidable';
import { del, head, list, put } from '@vercel/blob';
import fetch from 'node-fetch';

// export const config = {
//   runtime: 'edge',
// };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFileList = async (req, res) => {
  const { blobs } = await list();
  res.json(blobs);
};

export const getMetaData = async (req, res) => {
  const blobUrl = req.query.url;

  try {
    const blobMetaData = await head(blobUrl);
    console.log(blobMetaData);
    res.json(blobMetaData);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
};

export const downloadFile = async (req, res) => {
  const downloadUrl = req.query.url;
  const newFilename = "newFileName.001";

  try {
    const response = await fetch(downloadUrl);
    res.setHeader('Content-Disposition', `attachment; filename="${newFilename}"`);
    response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching file: ', error);
    res.status(500).send('Error downloading file');
  }
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
  const filePath = path.join(__dirname, '..', 'assets', 'files-to-upload', fileName)

  try {
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
  const form = formidable({});
  let uploadedFiles = [];

  try {
    const [fields, files] = await form.parse(req);

    for (let i = 0; i < files.file.length; i++){
      let fileName = files.file[i].originalFilename;
      let tempPath = files.file[i].filepath;
      let newPath  = `Blob-test/${fileName}`;
      
      const data = await readFile(tempPath);
      const metadata = await put(`Blob-test/${fileName}`, data, { 
        access: 'public',
        multipart: true
      });

      uploadedFiles.push(metadata.pathname);
    }

    res.send(uploadedFiles.toString());    
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

