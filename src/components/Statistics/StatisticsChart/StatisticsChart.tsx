import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { LabelList } from "recharts";
import { useMediaQuery } from "react-responsive";

import type { Props } from "./StatisticsChart.types";

import styles from "./StatisticsChart.module.scss";
const colors = ["#FF751D", "#FED9BF", "#FED9BF", "#FF751D", "#FED9BF", "#FED9BF"];
export const StatisticsChart = ({ data, category }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (!category) {
    return <div className={styles.empty}>Оберіть категорію</div>;
  }

  if (!data.length) {
    return <div className={styles.empty}>Немає даних</div>;
  }

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout={isMobile ? "vertical" : "horizontal"}
          margin={{
            top: 30,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          {isMobile ? (
            <>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              {/* <YAxis /> */}
            </>
          )}

          <Tooltip formatter={(value) => [`${value} грн`, "Сума"]} />

          <Bar dataKey="amount" barSize={15} radius={[8, 8, 0, 0]}>
            <LabelList
              dataKey="amount"
              position="top"
              content={({ x, y, value }) => (
                <text x={Number(x)} y={Number(y) - 10} textAnchor="middle" fontSize={12}>
                  {value} ₴
                </text>
              )}
            />

            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
