import MobileLogo from "../../components/mobilelogo/MobileLogo";
import Webcam from "../../components/webcams/Webcam";
import "./Webcams.scss";
import { ListOfWebcams } from "./WebcamList.ts";
import { LastUpdate, LastUpdateTS } from "./LastUpdate.ts";
import { FaCircle } from "react-icons/fa6";
import ScrollToTopOnMount from "../../components/scroll/ScrollToTopOnMount.tsx";

const Webcams = () => {
  let ts_l = LastUpdateTS;
  let ts_n = Math.floor(Date.now() / 1000);
  let difference = ts_n - ts_l;
  let status = "";
  if (difference <= 3.5 * 60) {
    status = "ok";
  } else if (difference > 3.5 * 60 && difference <= 7 * 60) {
    status = "load";
  } else {
    status = "err";
  }

  return (
    <>
      <main className="content">
        <ScrollToTopOnMount />
        <MobileLogo />
        <div className="update__cnt">
          <div>
            <h1>Webcams</h1>
          </div>
          <div className="update">
            <FaCircle className={status} />
            Last update: {LastUpdate}
          </div>
        </div>
        <div className="webcams__box">
          {ListOfWebcams.map((image: any, index) => (
            <Webcam
              key={index}
              src={image[4].replace("http://vit.trilogis.it/cam/", "")}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Webcams;
