import React from "react";
import { Pie } from "react-chartjs-2";

type Props = {
  chartData: any;
};
function PieChart({ chartData }: Props) {
  return (
    <div className=" h-[220px] md:h-[250px] flex items-center justify-center md:w-full">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Plans",
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;
