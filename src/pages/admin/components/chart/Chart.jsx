import "./chart.scss";

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <div className="chartComponent">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" aspect={2.8 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#d4d4d4" strokeDasharray={"5 5"} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
