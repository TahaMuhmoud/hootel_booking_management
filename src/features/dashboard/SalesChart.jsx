import PropTypes from "prop-types";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { randomColor } from "../../utils/helpers";
import { PRIMARY_COLOR } from "../../utils/constants";

function SalesChart({ bookings, numDays }) {
  const today = new Date();
  const startDate = subDays(today, numDays - 1);

  let sales = eachDayOfInterval({
    start: startDate,
    end: today,
  });
  const data = sales.map((item) => {
    return {
      label: format(item, "MMM dd"),
      totalSales: bookings
        .filter((book) => isSameDay(item, book["created_at"]))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      totalExtras: bookings
        .filter((book) => isSameDay(item, book["created_at"]))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });
  let clr1 = randomColor("00");
  let clr2 = randomColor("99");
  return (
    <div className="bg-third text-primary p-3 sm:p-5 w-full h-fit rounded-2xl col-span-4">
      <h3 className="text-3xl font-semibold mb-5">
        Sales from {format(startDate, "MMM dd")} to {format(today, "MMM dd")}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="label" stroke={PRIMARY_COLOR} />
          <YAxis dataKey="totalSales" unit="$" stroke={PRIMARY_COLOR} />
          <CartesianGrid text />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={clr1}
            fill={clr1}
            fillOpacity={"0.4"}
            strokeWidth={2}
          />
          <Area
            dataKey="totalExtras"
            type="monotone"
            fill={clr2}
            stroke={clr2}
            strokeWidth={2}
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

SalesChart.propTypes = {
  bookings: PropTypes.array,
  numDays: PropTypes.number,
};

export default SalesChart;
