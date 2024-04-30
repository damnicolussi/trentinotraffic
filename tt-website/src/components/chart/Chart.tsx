import "./Chart.scss";

interface ChartProps {
  data: number[];
  label: string[];
  cl: string;
}

export default function Chart({ data, label, cl }: ChartProps) {
  let max = Math.max(...data);
  return (
    <div className={`graph g-${cl}`}>
      <div className={`bar_cnt bc-${cl}`}>
        {data.map((value, index) => (
          <div className="bl">
            <div
              key={index}
              className={value > 0 ? "bar" : "bar empty"}
              style={{ height: `calc((100% * ${value}) / ${max})` }}
            >
              {value > 0 ? <p className="value_cnt">{value}</p> : ""}
            </div>
            <div className="label">{label[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
