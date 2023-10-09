const axios = require('axios')
const FormData = require('form-data')
const fs = require('browserify-fs')
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YjYyYzFhZi05MDRmLTRiZGEtYjI2Ny03ZmY5OTk4ZjhlMTUiLCJlbWFpbCI6ImthbmljaGk3M0BtZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2IwZTlmMzdkMmI3MzRlYzczNzkiLCJzY29wZWRLZXlTZWNyZXQiOiJjOTU4YjkxZDcxYjY3NDcwNzMwOTI4ZmQ0NmQwZWQzNmNhMGVjODI2YTg2Y2UwMDAwMjg4ZmM1Y2NjMGJiYzAxIiwiaWF0IjoxNjY3OTIzMTU5fQ.xp51bcMF7PwvEWZFPLDmvQWZTERMYDEJPaIJK8YGlRM'

console.log(JWT)
console.log("testpinata start");


export const pinFileToIPFS = async (selectedFile) => {
    console.log("222");
    const formData = new FormData();
  
    // const src = "src/title.png";
    // const file = fs.createReadStream(src)

    formData.append('file', selectedFile)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
      return {
        success: true,
        pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
    };
    }
}

export const uploadJSONToIPFS = async(JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios 
      .post(url, JSONBody, {
          headers: {
              pinata_api_key: process.env.KEY,
              pinata_secret_api_key: process.env.SECRET,
          }
      })
      .then(function (response) {
         return {
             success: true,
             pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
         };
      })
      .catch(function (error) {
          console.log(error)
          return {
              success: false,
              message: error.message,
          }

  });
};


export const pinJSONToIPFS = async (jsonObject) => {
  console.log("Uploading JSON to IPFS...");

  const jsonData = JSON.stringify(jsonObject);

  const formData = new FormData();
  const blob = new Blob([jsonData], { type: 'application/json' });
  formData.append('file', blob, 'filename.json');

  const pinataMetadata = JSON.stringify({
    name: 'JSON file name',
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: JWT
      }
    });
    console.log(res.data);
    return {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
}



// pinFileToIPFS();