"use client";

import { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { Button, Modal, TextInput, Label } from 'flowbite-react';
import { HiPencil } from 'react-icons/hi';
import NoRecords from './NoRecords';

interface MonthlyTargetProps {
  revenue: number;
}

interface MonthlyTargetState {
  startDate: string;
  endDate: string;
  target: number;
  currentRevenue: number;
  percentage: number;
}

export default function MonthlyTarget({ revenue }: MonthlyTargetProps) {
  const chartRef = useRef<ApexCharts | null>(null);
  const [openModal, setOpenModal] = useState(false);
  
  const [monthlyTarget, setMonthlyTarget] = useState<MonthlyTargetState>({
    startDate: '',
    endDate: '',
    target: 0,
    currentRevenue: revenue,
    percentage: 0
  });

  const calculatePercentage = (target: number, current: number): number => {
    if (target === 0) return 0;
    return Math.round((current / target) * 100);
  };

  const handleSave = () => {
    const targetValue = parseFloat(revenueTarget) || 0;
    const percentage = calculatePercentage(targetValue, revenue);

    setMonthlyTarget({
      startDate,
      endDate,
      target: targetValue,
      currentRevenue: revenue,
      percentage
    });

    if (chartRef.current) {
      chartRef.current.updateSeries([percentage, 100 - percentage]);
    }

    setOpenModal(false);
  };

  useEffect(() => {
    const options = {
      chart: {
        height: 240,
        width: 240,
        type: 'donut',
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '85%',
            background: 'transparent',
          },
          expandOnClick: false
        }
      },
      stroke: {
        colors: ['transparent'],
        lineCap: '',
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif'
        },
        y: {
          formatter: function(value: number) {
            if (value === monthlyTarget.percentage) {
              return `$${monthlyTarget.currentRevenue.toLocaleString()} (${value}%)`;
            }
            const endDate = new Date(monthlyTarget.endDate);
            const today = new Date();
            const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return `${daysRemaining}, to generate $${(monthlyTarget.target - monthlyTarget.currentRevenue).toLocaleString()} (${value}%)`;
          }
        }
      },
      labels: ['Target Reached', 'Days To Go'],
      dataLabels: {
        enabled: false
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      series: [monthlyTarget.percentage, 100 - monthlyTarget.percentage],
      colors: [
        'rgb(37, 99, 235)',
        'rgb(45, 212, 191)',
      ],
    };

    if (document.getElementById('donut-chart')) {
      chartRef.current = new ApexCharts(document.getElementById('donut-chart'), options);
      chartRef.current.render();
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [monthlyTarget.percentage]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revenueTarget, setRevenueTarget] = useState('');

  const isFormValid = () => {
    return startDate !== '' && 
           endDate !== '' && 
           revenueTarget !== '' && 
           parseFloat(revenueTarget) > 0;
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Monthly Target</h3>
          <Button disabled={revenue === 0} size="sm" color="gray" pill onClick={() => setOpenModal(true)}>
            <HiPencil className="h-4 w-4" />
          </Button>
        </div>
        {monthlyTarget.target > 0 ? (
          <>
            <div className="flex justify-center">
              <div id="donut-chart"></div>
            </div>
          </>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <NoRecords message="No target set. Click the edit button to set a target." />
          </div>
        )}
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Set Monthly Target</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="startDate" className="mb-2">Start Date</Label>
                  <TextInput
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    icon={HiPencil}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="endDate" className="mb-2">End Date</Label>
                  <TextInput
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    icon={HiPencil}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="revenueTarget" className="mb-2">Revenue Target</Label>
                <TextInput
                  id="revenueTarget"
                  type="number"
                  value={revenueTarget}
                  onChange={(e) => setRevenueTarget(e.target.value)}
                  placeholder="Enter target amount"
                  required
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full">
            <hr className="my-4" />
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={!isFormValid()}>Save</Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
} 