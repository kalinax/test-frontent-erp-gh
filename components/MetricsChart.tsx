"use client";

import { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import StatCard from './StatCard';

interface MetricsChartProps {
    revenue: number;
    expenses: number;
    stockValue: number;
    revenueChange: number;
    expensesChange: number;
    stockValueChange: number;
}

export default function MetricsChart({
    revenue,
    expenses,
    stockValue,
    revenueChange,
    expensesChange,
    stockValueChange
}: MetricsChartProps) {
    useEffect(() => {
        const revenueOptions = {
            chart: {
                height: 100,
                maxWidth: 100,
                type: "area",
                fontFamily: "Inter, sans-serif",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: "#1C64F2",
                    gradientToColors: ["#1C64F2"],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 6,
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: 0
                },
            },
            series: [
                {
                    name: "Revenue",
                    data: [6500, 6418, 6456, 6526, 6356, 6456],
                    color: "#1A56DB",
                },
            ],
            xaxis: {
                categories: ['31 December', '08 January', '015 January', '20 January', '25 January', '01 January', '31 January'],
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
        };

        const expensesOptions = {
            ...revenueOptions,
            series: [
                {
                    name: "Expenses",
                    data: [3500, 6218, 5456, 6556, 6346, 2456],
                    color: "#1A56DB",
                },
            ]
        };

        const stockOptions = {
            ...revenueOptions,
            series: [
                {
                    name: "Stock Value",
                    data: [2200, 1300, 3250, 1400, 2350, 1300],
                    color: "#1A56DB",
                },
            ],
        };

        let revenueChart: ApexCharts | null = null;
        let expensesChart: ApexCharts | null = null;
        let stockChart: ApexCharts | null = null;

        if (document.getElementById("revenue-chart") && typeof ApexCharts !== 'undefined' && revenue > 0) {
            revenueChart = new ApexCharts(document.getElementById("revenue-chart"), revenueOptions);
            revenueChart.render();
        }
        if (document.getElementById("expenses-chart") && typeof ApexCharts !== 'undefined' && expenses > 0) {
            expensesChart = new ApexCharts(document.getElementById("expenses-chart"), expensesOptions);
            expensesChart.render();
        }
        if (document.getElementById("stock-chart") && typeof ApexCharts !== 'undefined' && stockValue > 0) {
            stockChart = new ApexCharts(document.getElementById("stock-chart"), stockOptions);
            stockChart.render();
        }

        return () => {
            if (revenueChart) {
                revenueChart.destroy();
            }
            if (expensesChart) {
                expensesChart.destroy();
            }
            if (stockChart) {
                stockChart.destroy();
            }
        }
    }, [revenue, expenses, stockValue]);

    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="min-w-[300px] bg-white p-4 rounded-lg shadow-sm">
                    <StatCard
                        title="Revenue"
                        value={revenue}
                        change={revenueChange}
                        formatValue={(value) => `$${value.toLocaleString()}`}
                    />
                    {revenue > 0 && <div id="revenue-chart" className="mt-4"></div>}
                </div>
                <div className="min-w-[300px] bg-white p-4 rounded-lg shadow-sm">
                    <StatCard
                        title="Expenses"
                        value={expenses}
                        change={expensesChange}
                        formatValue={(value) => `$${value.toLocaleString()}`}
                    />
                    {expenses > 0 && <div id="expenses-chart" className="mt-4"></div>}
                </div>
                <div className="min-w-[300px] bg-white p-4 rounded-lg shadow-sm">
                    <StatCard
                        title="Stock Value"
                        value={stockValue}
                        change={stockValueChange}
                        formatValue={(value) => `$${value.toLocaleString()}`}
                    />
                    {stockValue > 0 && <div id="stock-chart" className="mt-4"></div>}
                </div>
            </div>
        </div>
    );
} 