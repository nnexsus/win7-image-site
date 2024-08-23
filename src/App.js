import { useEffect, useState } from "react";
import axios from "axios";

import Window from "./components/window.js";

import Browser from "./components/browser.js";
import Player from "./components/player.js";
import Files from "./components/files.js";
import Map from "./components/map.js";

function App() {

  const AppWrapper = () => {

    const [files, setFiles] = useState({"images": [], "folders": [
      {
        "id": 0,
        "title": "Pictures",
        "icon": "/images/bgs/image-folder.png"
      },
      {
          "id": 1,
          "title": "Videos",
          "icon": "/images/bgs/video-folder.png"
      }]}
    )

    useEffect(() => {
      axios.get('https://arina.lol/api/win7/files').then((res) => {
        setFiles(res.data)
      })
    }, [])

    return (
      <>
        <div className="file-explorer aero-border">
          <Window window={<Files files={files}/>} title={"File Explorer"} iconpath={"/images/bgs/file-folder.png"} />
        </div>
        <div className="map aero-border">
          <Window window={<Map/>} title={"Map Explorer"} iconpath={"/images/bgs/earth.png"} />
        </div>
        <ImageReliant files={files} />
      </>
    )
  }
  
  const ImageReliant = ({files}) => {

    const [imagedata, setImagedata] = useState({
      "id": 0,
      "title": "Welcome!",
      "date": "",
      "short": "Welcome to nnexsus.net!",
      "description": "Click on an image or navigate through different folders in the File Explorer tab to get started!",
      "source": null,
      "thumb": null,
      "rating": null,
      "folder": 0,
      "type": "image",
      "location": [41.836405543203604, -89.4198049096924]
    })
    const [fileStore, setFileStore] = useState({"images": [], "folders": [
      {
        "id": 6,
        "title": "Pictures",
        "icon": "/images/bgs/image-folder.png"
      },
      {
          "id": 7,
          "title": "Videos",
          "icon": "/images/bgs/video-folder.png"
      }]})

    const fetchImageData = () => {
      if (localStorage.getItem('activeImage') !== null) {
        fileStore.images.forEach((el) => {
          if (el.id === parseInt(localStorage.getItem('activeImage'))) setImagedata(el)
        })
        document.getElementById("panmap").click()
      }
    }

    useEffect(() => {
      setFileStore(files)
    }, [files])

    return (
      <>
        <button id="fetchImageData" style={{opacity: 0}} onClick={() => fetchImageData()} ></button>
        <div className="media-player aero-border">
          <Window window={<Player imgdata={imagedata}/>} title={"Windows Media Player"} iconpath={"/images/bgs/mediaplayer.png"} />
        </div>
        <div className="browser aero-border">
          <Window window={<Browser imgdata={imagedata}/>} title={"Internet Explorer"} iconpath={"/images/bgs/iexplore.png"} />
        </div>
        <div className="mobile-hide short-hide" style={{gridColumnStart: 20, gridColumnEnd: 25, gridRowStart: 23, gridRowEnd: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src="/signature-logo-white-512.png" height={'100%'} style={{aspectRatio: '1/1'}} />
        </div>
      </>
    )
  }

  return (
    <div className="desktop">
      <AppWrapper/>
    </div>
  );
}

export default App;
