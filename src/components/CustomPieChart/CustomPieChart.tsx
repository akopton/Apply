import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

export const CustomPieChart = ({
  data,
}: {
  data: { label: string; value: number }[];
}) => {
  const colors = ["#FF6F59", "#71A9F7", "#6B5CA5", "#72195A", "#4C1036"];

  const renderColorfulLegendText = (value: string) => {
    return <span style={{ color: "white" }}>{value}</span>;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent === 0) {
      return;
    } else {
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
  };

  return (
    <PieChart height={300} width={300}>
      <Pie
        dataKey="value"
        nameKey="label"
        data={data}
        innerRadius={0}
        outerRadius={100}
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {data.map((el, idx) => (
          <Cell key={`cell-${idx}`} fill={colors[idx]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        formatter={renderColorfulLegendText}
        iconSize={20}
        iconType="rect"
      />
    </PieChart>
  );
};
