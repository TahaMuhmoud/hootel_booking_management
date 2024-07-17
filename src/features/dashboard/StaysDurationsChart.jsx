import PropTypes from "prop-types";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { randomColor } from "../../utils/helpers";

function StaysDurationsChart({ confirmedStays }) {
  const durations = Array.from(
    new Set(
      confirmedStays
        .map((item) => {
          return `${item.numNights} night`;
        })
        .sort()
    )
  );

  const data = durations.map((item) => {
    return {
      duration: item,
      value: confirmedStays.filter(
        (stay) => stay.numNights == item.split(" ")[0]
      ).length,
      color: randomColor(),
    };
  });

  return (
    <div className="bg-third text-primary p-3 sm:p-5 w-full h-fit rounded-2xl col-span-4 lg:col-span-2">
      <h3 className="text-3xl font-semibold mb-5">Stays Durations</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="duration"
          >
            {data.map((entry) => (
              <Cell key={entry.duration} fill={entry.color} />
            ))}
          </Pie>
          <Legend width="100%" layout="horizontal"></Legend>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

StaysDurationsChart.propTypes = { confirmedStays: PropTypes.array };

export default StaysDurationsChart;
