import { Key } from "react";
import "./Webcam.scss";
import { Link } from "react-router-dom";

interface WebcamProps {
  key: Key | null | undefined;
  src: string;
}

const Webcam = (props: WebcamProps) => {
  function addDefaultSrc(ev: any) {
    ev.target.src = "/webcams/error.png";
  }

  return (
    <Link to={`/webcams/${props.src.replace(".jpg", "")}`} className="webcam">
      <img
        src={`/webcams/${props.src}`}
        alt={props.src}
        id="webcam"
        onError={addDefaultSrc}
      />
    </Link>
  );
};

export default Webcam;
