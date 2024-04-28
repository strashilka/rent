import axios from 'axios';
import {API} from "./consts";
import AWS from 'aws-sdk'
import {hashCode} from "./utils";

const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


const S3_BUCKET ='rent-test-task3';
const REGION ='eu-north-1';

AWS.config.update({
  accessKeyId: 'AKIA4MTWN5ECNXKAQ65T',
  secretAccessKey: '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'
})

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

export async function storeRent(rentData, onUpdateProgress, onFinished) {
  console.log(s3)
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
      // console.log();
      //setProgress
    })
    .send((err) => {
      onFinished();
      if (err) console.log(err)
    })

  // const args = {
  //   Bucket: 'rent-test-task',
  //   Key: img.name,
  //   Body: img,//Buffer.from(bufferedImage),
  //   ContentType: img.type,
  //   // ACL:'public-read',
  //   withCredentials: false
  // }

  // try {
  //   // console.log(s3.config.credentials);
  //   // console(s3.config.credentialDefaultProvider())
  //   await s3.putObject(args).then((a) => {
  //     console.log("Image is saved")
  //   });
  // } catch (error) {
  //   console.log(error)
  // }

  console.log(555)

  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log('Файл успешно загружен в S3', data.Location);
  //   // Теперь вы можете использовать data.Location для отображения загруженного изображения
  // });


  // book.image = fileName;
  // const jsonData = JSON.stringify(book);
  // const parsedData = JSON.parse(jsonData);
  // delete parsedData._id;
  // const data = JSON.stringify(parsedData);
  //

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
    // console.log(rentObj);
    rents.push(rentObj)
  }

  console.log(rents)
  return rents;
}


//---------------

// import React, { useState } from 'react';
// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//   accessKeyId: 'AKIA4MTWN5ECNZSLUAUP',
//   secretAccessKey: 'ВАШ_SECRET_ACCESS_KEY',
//   region: 'ВАША_РЕГИОН',
// });

// const S3_BUCKET = 'ИМЯ_ВАШЕГО_Bucket';
/*
const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = () => {
    if (!image) {
      console.log('Выберите изображение для загрузки');
      return;
    }

    const params = {
      Bucket: S3_BUCKET,
      Key: image.name,
      Body: image,
      ACL: 'public-read',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Файл успешно загружен в S3', data.Location);
      // Теперь вы можете использовать data.Location для отображения загруженного изображения
    });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={uploadImage}>Загрузить изображение</button>
    </div>
  );
};

export default UploadImage;*/