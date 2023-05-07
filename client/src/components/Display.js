import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    try {
      let dataArray;
      const Otheraddress = document.querySelector(".address").value;    // we consider address entered by the metamask user(in case he filled it)
      console.log(Otheraddress);
      dataArray = await contract.display(((Otheraddress)? Otheraddress: account));
      console.log(dataArray);
      const isEmpty = Object.keys(dataArray).length === 0;
      if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");
        // console.log(str);
        // console.log(str_array);
        const images = str_array.map((item, i) => {
          return (
            <a className="dsp-blk" href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} key={i} target="_blank">
              {i}
              {/* <img
                key={i}
                src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                alt="new"
                className="image-list"
              ></img> */}
            </a>
          );
        });
        setData(images);
      } else {
        alert("No image to display");
      }
    } catch (e) {
      console.log(e);
      alert("You don't have access");
    }
  };
  return (
    <>
      {/* <div className="image-list">{data}</div> */}
      <div>{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button glow-on-hover" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
