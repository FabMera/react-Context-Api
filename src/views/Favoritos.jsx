import ContextApi from "../Context/ContextApi";
import { useContext } from "react";

import "../css/galeria.css";

export default function Favoritos() {
  const { images, setImages } = useContext(ContextApi);

  const filtrarPic = (img) => {
    const favoritas = [...images]; //copia del array original
    const index = favoritas.findIndex((item) => item.id === img.id);
    favoritas[index].favorite = !favoritas[index].favorite;
    setImages(favoritas);
  };
  //AQUI HAGO LO MISMO MUESTRO LA GALERIA PERO DEBO FILTRAR ELIMINANDO LOS QUE SALEN CON FAVORITE = FALSE;

  return (
    <>
      <h1>Fotos favoritas</h1>
      <div className="galeria grid-columns-5 p-3">
        {images
          .filter((img) => img.favorite)
          .map((img) => (
            <div key={img.id}>
              <div
                onClick={() => filtrarPic(img)}
                className="foto"
                style={{ backgroundImage: `url(${img.src})` }}
              >
                <p>{img.descr}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
