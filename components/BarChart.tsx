"use client";

import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { Button } from 'flowbite-react';
import { HiArrowUp, HiOutlineArrowRight } from 'react-icons/hi';
import NoRecords from './NoRecords';

interface BarChartProps {
  profit: number;
  sales: number;
  expenses: number;
}

export default function BarChart({ profit, sales, expenses }: BarChartProps) {
  const chartRef = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: "Sales",
          color: "#2563EB",
          data: ["1420", "1620", "1820", "1420", "1650", "2120"],
        },
        {
          name: "Expenses",
          data: ["788", "810", "866", "788", "1100", "1200"],
          color: "#2DD4BF",
        }
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: {
          show: false,
        }
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        },
        categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        }
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20
        },
      }
    }

    if (document.getElementById('bar-chart') && typeof ApexCharts !== 'undefined') {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ApexCharts(document.getElementById('bar-chart'), options);
      chartRef.current.render();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex-col items-start">
        <div className="flex justify-between items-center w-full">
          <div className="flex-col items-start">
            <div className="flex items-center self-center text-2xl font-bold text-gray-900">
              ${profit.toLocaleString()}
            </div>
            <p className="text-base font-normal text-gray-500">Total Profit</p>
          </div>
          {profit > 0 && <div className="flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
            <HiArrowUp className="w-4 h-4" />
            <span>Profit Rate 23%</span>
          </div>}
        </div>
        <div className="border-b border-gray-200 my-4"></div>
        <div className="flex gap-8 mt-4 pl-2">
          <div className="flex-col items-start">
            <div className="flex items-center self-center text-lg font-semibold text-blue-600">
              ${sales.toLocaleString()}
            </div>
            <p className="text-sm font-normal text-gray-500">Sales</p>
          </div>
          <div className="flex-col items-start">
            <div className="flex items-center self-center text-lg font-semibold text-teal-400">
              ${expenses.toLocaleString()}
            </div>
            <p className="text-sm font-normal text-gray-500">Expenses</p>
          </div>
        </div>
      </div>
      {profit === 0 && sales === 0 && expenses === 0 ? (
        <NoRecords />
      ) : (
        <div id="bar-chart"></div>
      )}
      <div className="flex justify-between w-full mt-4">
        <Button color="white" size="sm">
          Last 6 months
          <HiOutlineArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button color="blue" size="sm">
          Revenue Report
        </Button>
      </div>
    </div>
  );
} 