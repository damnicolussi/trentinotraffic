import { PiDownloadSimpleBold } from "react-icons/pi";
import "./DownloadButton.scss";

interface DownloadButtonProps {
  link: string;
  name: string;
  placeh: string;
}

const DownloadButton = (props: DownloadButtonProps) => {
  return (
    <a
      href={props.link}
      download={props.name}
      target="_blank"
      className="download__button"
    >
      <div className="data">
        <PiDownloadSimpleBold className="i" />
        <p>{props.placeh}</p>
      </div>
    </a>
  );
};

export default DownloadButton;
