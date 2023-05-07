import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import testAuthentication from "./testPinata";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [nachricht, setNachricht] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // add picturesque data to pinata P2P blockchain network
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `8c03d31d88531abe42dc`,
            'pinata_secret_api_key': `950ca8bb2917ba89e252729c4698cf092263af6252cb7a2046161bf95d8e6008`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        // const signer = contract.connect(provider.getSigner());
        contract.add(account, ImgHash);                             // invoking add function of our smart contract(to add image url)
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to IPFS");
      }
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {        // when file fully read
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();                 // to avoid reloading
  };
  const saveNachricht = async (e) => {
    e.preventDefault();
    try {
      // testAuthentication();
      var json = JSON.stringify({
        "text" : nachricht
      });
      console.log(json);      
      var config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNTg2YzFiMS0wNDEwLTRiMDEtYmQyYi0xNGFjYjU5NGI0ZWMiLCJlbWFpbCI6ImhhcnNoY2hhdWhhbjA5OTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjhjMDNkMzFkODg1MzFhYmU0MmRjIiwic2NvcGVkS2V5U2VjcmV0IjoiOTUwY2E4YmIyOTE3YmE4OWUyNTI3MjljNDY5OGNmMDkyMjYzYWY2MjUyY2I3YTIwNDYxNjFiZjk1ZDhlNjAwOCIsImlhdCI6MTY4MzEzNjQyM30.O1BRh8hsRXl6gYmw87Lz0XJOn536InzUv17zTrFkBBw'
        },
        data : json
      };
      const res = await axios(config);
      console.log(res.data);
      const txtHash = `ipfs://${res.data.IpfsHash}`;
      contract.add(account, txtHash);                             // invoking add function of our smart contract(to add image url)
      alert("Successfully textual Uploaded");
    } catch (error) {
      alert("Unable to save texts to IPFS");
    }

  } 
  const retrieveNachricht = (e) => {
    const eltexto = e.target.value;        // onChange hook retrieve hook
    console.log(eltexto);
    setNachricht(eltexto);
    e.preventDefault();                     // to avoid reloading
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose glow-on-hover">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="">Image: {fileName}</span>
        <button type="submit" className="upload glow-on-hover" disabled={!file}>
          Upload File
        </button>
      </form>
      <form onSubmit={saveNachricht}>
        <textarea name="nachricht" id="" cols="30" rows="10" onChange={retrieveNachricht}>
          
        </textarea>
        <button type="submit">PINATA EPITOME</button>
      </form>
    </div>
  );
};
export default FileUpload;

// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";
// function FileUpload({ contract, provider, account }) {
//   // const [urlArr, setUrlArr] = useState([]);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (file) {
//         try {
//           const formData = new FormData();
//           formData.append("file", file);

//           const resFile = await axios({
//             method: "post",
//             url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//             data: formData,
//             headers: {
//               pinata_api_key: `95f328a012f1634eab8b`,
//               pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//           const signer = contract.connect(provider.getSigner());
//           signer.add(account, ImgHash);

//           //setUrlArr((prev) => [...prev, ImgHash]);

//           //Take a look at your Pinata Pinned section, you will see a new file added to you list.
//         } catch (error) {
//           alert("Error sending File to IPFS");
//           console.log(error);
//         }
//       }

//       alert("Successfully Uploaded");
//       setFileName("No image selected");
//       setFile(null); //to again disable the upload button after upload
//     } catch (error) {
//       console.log(error.message); //this mostly occurse when net is not working
//     }
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0];
//     console.log(data);

//     const reader = new window.FileReader();

//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };
//   return (
//     <div className="top">
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           {/*turn around for avoding choose file */}
//           Choose Image
//         </label>
//         <input
//           disabled={!account} //disabling button when metamask account is not connected
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         {/* choose file */}
//         <button type="submit" disabled={!file} className="upload">
//           Upload file
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FileUpload;
