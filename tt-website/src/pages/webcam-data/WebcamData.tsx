import { Link, useParams } from "react-router-dom";
import MobileLogo from "../../components/mobilelogo/MobileLogo.tsx";
import { ListOfWebcams } from "../webcams/WebcamList.ts";
import "./WebcamData.scss";
import ScrollToTopOnMount from "../../components/scroll/ScrollToTopOnMount.tsx";

// interface WebcamDataProps {
//   key: number;
//   src: string;
//   data: any;
// }

const WebcamData = () => {
  let { cam } = useParams();
  cam = cam?.toUpperCase();

  console.log(cam);

  let index = 0;
  while (ListOfWebcams[index][2] !== cam) {
    index++;
  }

  let image = ListOfWebcams[index];
  let src = cam.toLowerCase() + ".jpg";

  function addDefaultSrc(ev: any) {
    ev.target.src = "/webcams/error.png";
  }

  return (
    <>
      <main className="content">
        <ScrollToTopOnMount />
        <MobileLogo />
        <h1>Webcam | {image[2]}</h1>
        <div className="content__box wdata__box">
          <div className="frame__box">
            <img src={`/webcams/${src}`} alt={src} onError={addDefaultSrc} />
          </div>
          <div className="data__box">
            <h2>Webcam Data</h2>
            <br></br>
            <div className="webcam__data">
              <p>
                <b>Webcam:</b> {image[2]}
              </p>
              <p>
                <b>Location:</b> {image[5]}, {image[6]}
              </p>
              <p>
                <b>Road:</b> {image[8]}, {image[7]}km
              </p>
              <p>
                <b>Webcam URL:</b>{" "}
                <a href={String(image[4])} target="_blank">
                  {image[4]}
                </a>
              </p>
              <br></br>
              <p>
                <b>Latitude:</b> {image[10]}
              </p>
              <p>
                <b>Longitude:</b> {image[11]}
              </p>
            </div>

            <br></br>
            <div className="vb__container">
              <div className="webcam__vehicles">
                <p>
                  <b>Vehicles detected:</b>
                </p>
                <p className="vehicles"> {image[13]}</p>
              </div>

              <div className="webcam__back">
                <p>
                  <b>Last Update:</b> {image[12]}
                </p>
                <br></br>
                <Link to="/webcams" className="button">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default WebcamData;
