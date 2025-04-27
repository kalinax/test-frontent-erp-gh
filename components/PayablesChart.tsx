import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface PayablesChartProps {
    receivables: number;
    payables: number;
}

export default function PayablesChart({ receivables, payables }: PayablesChartProps) {
    const chartRef = useRef<ApexCharts | null>(null);

    useEffect(() => {
        const options = {
            series: [{
                name: 'Value',
                data: [receivables, payables]
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            colors: ['#22C55E', '#EF4444'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '20%',
                    borderRadius: 4,
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            grid: {
                show: true,
                borderColor: '#f1f1f1',
                strokeDashArray: 4,
            },
            xaxis: {
                categories: ['Receivables', 'Payables'],
                labels: {
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif',
                    }
                }
            },
            yaxis: {
                min: 0,
                max: 130,
                tickAmount: 6,
                labels: {
                    style: {
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                    }
                }
            }
        };

        if (document.getElementById("payables-chart") && typeof ApexCharts !== "undefined") {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new ApexCharts(document.getElementById("payables-chart"), options);
            chartRef.current.render();
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [receivables, payables]);

    return (
        <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex-col items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">PAYABLES AND RECEIVABLES</h3>
                <p className="text-base font-normal text-gray-500">for this month</p>
            </div>
            <div id="payables-chart"></div>
        </div>
    );
} 