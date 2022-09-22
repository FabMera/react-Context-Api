import "../styles.css"
import ContextApi from "./Context/ContextApi";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./views/Home";
import Favoritos from "./views/Favoritos";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {

  const endpoint = "/fotos.json";

/* Funcion para traer los datos del JSON o de la API segun sea con AXIOS . */

  const  cargarImagenes= async() =>{
    const res = await axios.get(endpoint)
    const pics = res.data.photos;
    const filtradoImages = pics.map((ele) =>({
      id:ele.id,
      src:ele.src.tiny,
      descr:ele.alt,
      favorite:ele.liked
    }))
    console.log(filtradoImages)
    setImages(filtradoImages);
  }
/* Creo el estado del componente que trae los datos del JSON */
  const [images, setImages] = useState([]);
  const totalImages = { images, setImages };


  useEffect(() => {
    cargarImagenes();
  }, []);

  return (
    <div className="App">
      <ContextApi.Provider value={totalImages}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </ContextApi.Provider>
    </div>
  );
}
