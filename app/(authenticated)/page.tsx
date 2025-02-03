"use client";
import AnalyticCard from "@/components/Analytics/AnalyticCard";
import {
  EventCreationIcon,
  LinkArrowIcon,
  PlanManagementIcon,
} from "@/components/icons";
import { usePlanSummary, useUserSummary } from "@/hooks/useDashboard";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Chart, { CategoryScale } from "chart.js/auto";
import { BarChart } from "@/components/Analytics/BarChart";
import PieChart from "@/components/Analytics/PieChart";
import MySpinWheel from "@/components/Wheel";

const Home = () => {
  const {
    userStats,
    isLoading: isUserStatsLoading,
    isSuccess,
    isError,
  } = useUserSummary();
  const { planStats, isLoading: isPlanStatsLoading } = usePlanSummary();
  Chart.register(CategoryScale);
  console.log(planStats);

  const [chartDataForBarChart, setChartDataForBarChart] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Users",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  });
  const [chartDataForPieChart, setChartDataForPieChart] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
      hoverOffset: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Plans",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    if (userStats && Object.keys(userStats).length > 0) {
      setChartDataForBarChart({
        labels: Object.entries(userStats).map(([key, value]) =>
          key
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
            .replace(/^\w/, (c) => c.toUpperCase())
        ), // Capitalize first letter, // Fix the error)

        datasets: [
          {
            label: "Users",
            data: Object.entries(userStats).map(([key, value]) => value),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 2,
          },
        ],
      });
    }
  }, [userStats]);

  useEffect(() => {
    if (planStats && Object.keys(planStats).length > 0) {
      setChartDataForPieChart({
        labels: Object.entries(planStats).map(([key, value]) => key),

        datasets: [
          {
            label: "Users",
            data: Object.entries(planStats).map(([key, value]) => value),
            backgroundColor: [
              "rgba(255, 99, 132, 0.9)",
              "rgba(54, 162, 235, 0.9)",
              "rgba(255, 206, 86, 0.9)",
              "rgba(75, 192, 192, 0.9)",
              "rgba(153, 102, 255, 0.9)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 2,
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [planStats]);

  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {/* <div className="py-4 px-4 flex flex-col justify-between h-[350px] rounded-md border-[#c5adf7] border-[0.1px]">
        <div className="flex items-center gap-2">
          <UserIcon width="18" height="18" color="black" />
          <span className="font-bold text-[14px]">User Management</span>
        </div>
        <Image
          alt="barChart"
          src="/barchat.png"
          width={400}
          height={200}
          className="w-full h-[216]"
        />
        <Link
          href=""
          className="self-end text-[#B691FF] flex items-center gap-2 "
        >
          <span className="text-[13px] underline">Go to User Management</span>
          <LinkArrowIcon width={12} height={12} />
        </Link>
      </div> */}
      {/* <BarChart chartData={chartData} /> */}
      {/* <MySpinWheel /> */}
      <AnalyticCard
        icon={<UserIcon width="18" height="18" color="black" />}
        imgLink="/barchat.png"
        linkText="Go to User Management"
        title="User Management"
        href="/user-management"
        graph={<BarChart chartData={chartDataForBarChart} />}
      />
      <AnalyticCard
        icon={<PlanManagementIcon width="18" height="18" color="black" />}
        imgLink="/piechart.png"
        linkText="Go to Plan Management"
        title="Plan Management"
        href="/plan-management"
        graph={<PieChart chartData={chartDataForPieChart} />}
      />
      {/* <AnalyticCard
        icon={<EventCreationIcon width="16" height="16" color="black" />}
        imgLink="/barchat.png"
        title="Top Event Creation Locations"
        filter={true}
        linkText="Go to Event Management"
        href="/event-management"
      />
      <AnalyticCard
        icon={<EventCreationIcon width="16" height="16" color="black" />}
        imgLink="/barchat.png"
        title="Top Event Attendance Locations"
        filter={true}
        linkText="Go to Event Management"
        href="/event-management"
      /> */}
    </div>
  );
};

export default Home;
