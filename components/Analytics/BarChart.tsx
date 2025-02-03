import { Bar } from "react-chartjs-2";

type Props = {
  chartData: any;
};
export const BarChart = ({ chartData }: Props) => {
  return (
    <div className=" h-[150px] md:h-[250px] flex items-center justify-center md:w-full">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Summary",
            },
            legend: {
              display: false,
            },
          },
          indexAxis: "y",
        }}
      />
    </div>
  );
};
