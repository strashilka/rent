import axios from 'axios';
import {API} from "./consts";
import AWS from 'aws-sdk'
import {hashCode} from "./utils";

const S3_BUCKET = 'rent-test-task3';
const REGION = 'eu-north-1';

AWS.config.update({
  accessKeyId: 'AKIA4MTWN5ECNXKAQ65T',
  secretAccessKey: '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'
})

const s3 = new AWS.S3({
  params: {Bucket: S3_BUCKET},
  region: REGION,
})

export async function storeRent(rentData, onUpdateProgress, onFinished) {
  const img = rentData.image;

  const extension = img.name.split('.').pop();
  const fileName = `${hashCode(img.name)}.${extension}`;

  const params = {
    ACL: 'public-read',
    Body: img,
    ContentType: img.type,
    Bucket: S3_BUCKET,
    Key: fileName
  };

  s3.putObject(params)
    .on('httpUploadProgress', (evt) => {
      onUpdateProgress(Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err) => {
      onFinished();
      if (err) console.log(err)
    })

  rentData.image = fileName;

  axios.post(API.fireBase, rentData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function fetchRent() {
  const response = await axios.get(API.fireBase)
  const rents = [];

  for (const key in response.data) {
    const rentObj = {...response.data[key], id: key};
    rents.push(rentObj)
  }

  return rents;
}