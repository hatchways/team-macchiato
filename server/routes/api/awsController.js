const aws = require('aws-sdk')
aws.config.update({
   region: 'us-east-2', // Put your aws region here
   accessKeyId: process.env.AWS_ACCESS_KEY,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const S3_BUCKET = process.env.S3_BUCKET
const s3 = new aws.S3()

export const awsController = {
   handleRetrieve,
   handleUpload,
   handleDelete,
}

async function handleDelete(key) {
   let deleteParams = {
      Bucket: S3_BUCKET,
      Key: key
   }

   return new Promise((resolve, reject) => {
      s3.deleteObject(deleteParams, function (err, data) {
         if (err) reject({ error: err })
         resolve(data)
      })
   })
}

async function handleRetrieve(key) {
   let getParams = {
      Bucket: S3_BUCKET,
      Key: key
   }

   return new Promise((resolve, reject) => {
      s3.getObject(getParams, function (err, data) {
         if (err) reject({ error: err })
         resolve(data)
         /* Example return value
         data:
            {
               "AcceptRanges": "bytes",
               "LastModified": "2019-09-09T19:07:54.000Z",
               "ContentLength": 84257,
               "ETag": "\"36bac1f605b776e2ddedfbe80f773952\"",
               "ContentType": "image/png",
               "Metadata": {},
               "Body": {
                  "type": "Buffer",
                  "data": [
                     137,
                     80,
                     ...
                  ]
               }
            }
           
          */
      })
   });
}

async function handleUpload(key, imageData, userId) {
   let buf = new Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64')
   let fileType = imageData.split(';')[0].split(':')[1]
   // bucketName var below crates a "folder" for each user
   var bucketName = S3_BUCKET + '/user_' + userId
   // var bucketName = S3_BUCKET + '/' + userEmail

   var params = {
      Bucket: bucketName,
      Key: key,
      Body: buf,
      ContentType: fileType,
   };

   return new Promise((resolve, reject) => {
      let err = false
      s3.upload(params, function (err, data) {
         if (err) {
            console.log(err)
            reject({ error: err })
         }
         resolve(data)
         // Example of what handleUpload returns
         /*
         { 
            ETag: '"36bac1f605b776e2ddedfbe80f773952"',
            Location:
            'https://teammacchiatoapp.s3.us-east-2.amazonaws.com/myUserNameAndId/INSTALL_GENTOO.png',
            key: 'myUserNameAndId/INSTALL_GENTOO.png',
            Key: 'myUserNameAndId/INSTALL_GENTOO.png',
            Bucket: 'teammacchiatoapp' 
         }
          */
      })
   });
}