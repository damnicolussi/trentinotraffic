import "./Chart.scss";

interface ChartProps {
  data: number[];
  label: string[];
  cl: string;
}

export default function Chart({ data, label, cl }: ChartProps) {
  let max = Math.max(...data);
  return (
    <div className={`hgraph hg-${cl}`}>
      <div className={`bar_cnt hbc-${cl}`}>
        {data.map((value, index) => (
          <div className="bl">
            <div className="label">{label[index]}</div>
            <div
              key={index}
              className="bar"
              style={{ width: `calc(((100% - 2rem) * ${value}) / ${max})` }}
            >
              {value > 0 ? <p className="value_cnt">{value}</p> : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
