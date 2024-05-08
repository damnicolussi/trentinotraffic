import MobileLogo from "../../components/mobilelogo/MobileLogo";
import Profile from "../../components/profile/Profile";
import ScrollToTopOnMount from "../../components/scroll/ScrollToTopOnMount";
import { data, labels } from "../data/ChartData";
import { IoSend } from "react-icons/io5";
import "./Home.scss";

const Home = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <main className="content">
        <ScrollToTopOnMount />
        <MobileLogo />
        <h1>Home</h1>
        <div className="content__box">
          <h2>TrentinoTraffic</h2>
          <p>
            TrentinoTraffic is a Python script designed for real-time vehicle
            counting using YOLOv8 and OpenCV. It analyzes webcam frames provided
            by{" "}
            <a href="https://www.viaggiareintrentino.it/" target="_blank">
              viaggiareintrentino.it
            </a>{" "}
            every 5 minutes, excluding parked vehicles to focus on the dynamic
            traffic flow. This project is an evolution of the original "
            <a
              href="https://github.com/napo/veicoliviaggiareintrentino"
              target="_blank"
            >
              veicoliviaggiareintrentino
            </a>
            " by{" "}
            <a href="https://github.com/napo" target="_blank">
              Maurizio Napolitano
            </a>
            .
          </p>
        </div>
        <div className="content__box traffic__data">
          <h3>Latest Data</h3>
          <div className="traffic__data__container">
            <div>
              <h2>{data["year"][data["year"].length - 1]}</h2>
              <p>
                Total vehicles in {labels["year"][labels["year"].length - 1]}
              </p>
            </div>
            <div>
              <h2>{data["month"][new Date().getMonth()]}</h2>
              <p>Total vehicles in {month[new Date().getMonth()]}</p>
            </div>
          </div>
          <div>
            <h2>
              {labels["hour"][data["hour"].indexOf(Math.max(...data["hour"]))] +
                ":00"}
            </h2>
            <p>Current peak traffic time</p>
          </div>
        </div>
        <br></br>
        <h3>The Github Repositories:</h3>
        <div className="profiles__box">
          <Profile
            src="https://github.com/damnicolussi.png"
            name="@damnicolussi"
            role="TrentinoTraffic"
            link="damnicolussi/trentinotraffic"
          />
          <Profile
            src="https://github.com/napo.png"
            name="@napo"
            role="veicoliviaggiareintrentino"
            link="napo/veicoliviaggiareintrentino"
          />
        </div>
        <br></br>
        <h3>Contact Me:</h3>
        <a
          className="contact__box"
          href="mailto:damiano@nicolussi.dev?subject=TrentinoTraffic | "
          target="_blank"
        >
          <p>damiano@nicolussi.dev</p>
          <IoSend className="i" />
        </a>
      </main>
    </>
  );
};

export default Home;
