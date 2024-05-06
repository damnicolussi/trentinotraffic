import { NavLink } from "react-router-dom";
import { LastUpdate } from "../webcams/LastUpdate";
import MobileLogo from "../../components/mobilelogo/MobileLogo";
import "./Data.scss";
import Chart from "../../components/chart/Chart";
import { useState } from "react";
import { data, labels } from "./ChartData";
import { title_labels } from "./Label";
import HChart from "../../components/chart/HChart";
import ScrollToTopOnMount from "../../components/scroll/ScrollToTopOnMount";
import DownloadButton from "../../components/download/DownloadButton";

type DataT = {
  hour: number[];
  day: number[];
  month: number[];
  year: number[];
};

type LabelT = {
  hour: string[];
  day: string[];
  month: string[];
  year: string[];
};

const Data = () => {
  let [tab, setTab] = useState("hour");

  return (
    <main className="content">
      <ScrollToTopOnMount />
      <MobileLogo />
      <div className="download__cnt">
        <div>
          <h1>Data</h1>
        </div>
        <div className="download">
          <DownloadButton
            link="/ttdata/analysis.ipynb"
            name="analysis.ipynb"
            placeh="IPYNB"
          />
          <DownloadButton
            link="/ttdata/trentinotraffic_data.csv"
            name="trentinotraffic_data.csv"
            placeh="CSV"
          />
        </div>
      </div>
      <div className="nav">
        <NavLink
          to="/data/hour"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "slink slink__active" : "slink"
          }
          onClick={() => setTab("hour")}
        >
          Hour
        </NavLink>
        <NavLink
          to="/data/day"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "slink slink__active" : "slink"
          }
          onClick={() => setTab("day")}
        >
          Day
        </NavLink>
        <NavLink
          to="/data/month"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "slink slink__active" : "slink"
          }
          onClick={() => setTab("month")}
        >
          Month
        </NavLink>
        <NavLink
          to="/data/year"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? "slink slink__active" : "slink"
          }
          onClick={() => setTab("year")}
        >
          Year
        </NavLink>
      </div>
      <div className="content__box graph__box">
        <h3>
          Veichles per {tab}
          <span className="range">{title_labels[tab as keyof LabelT]}</span>
        </h3>
        <Chart
          data={data[tab as keyof DataT]}
          label={labels[tab as keyof LabelT]}
          cl={tab}
        />
        <HChart
          data={data[tab as keyof DataT]}
          label={labels[tab as keyof LabelT]}
          cl={tab}
        />
      </div>
      <p className="updatedAt">
        Last Update: <b>{LastUpdate}</b>
      </p>
      <p className="updatedAt">
        Counter started: <b>01/01/2024 00:00</b>
      </p>
    </main>
  );
};

export default Data;
