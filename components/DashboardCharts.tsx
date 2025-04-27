"use client";

import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import StatCard from './StatCard';
import MetricsChart from './MetricsChart';
import FinancialBar from './FinancialBar';
import DateRangeDropdown from './DateRangeDropdown';

interface DashboardData {
  stats: {
    outstanding_invoices: number;
    average_collection_period: string;
    gross_profit_margin: number;
    inventory_turnover: string;
    online_payments: number;
  };
  change: {
    outstanding_invoices: number;
    average_collection_period: number;
    gross_profit_margin: number;
    inventory_turnover: number;
    online_payments: number;
    revenue: number;
    expenses: number;
    stock_value: number;
  };
  financials: {
    revenue: number;
    expenses: number;
    stock_value: number;
  };
  period:{
    start: string;
    end: string;
  }
}

interface DashboardChartsProps {
  data: DashboardData | null;
}

export default function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
						<div className="flex justify-between items-center mb-6">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-1">
								<StatCard
									title="Outstanding Invoices"
									value={data?.stats.outstanding_invoices || 0}
									change={data?.change.outstanding_invoices}
									showLabel={true}
								/>
								<StatCard
									title="Average Collection Period"
									value={data?.stats.average_collection_period || 0}
									change={data?.change.average_collection_period}
									showLabel={true}
								/>
								<StatCard
									title="Gross Profit Margin"
									value={data?.stats.gross_profit_margin || 0}
									change={data?.change.gross_profit_margin}
									formatValue={(value) => `$${Number(value).toLocaleString()}`}
									showLabel={true}
								/>
								<StatCard
									title="Inventory Turnover"
									value={data?.stats.inventory_turnover || 0}
									change={data?.change.inventory_turnover}
									showLabel={true}
								/>
								<StatCard
									title="Online Payments"
									value={data?.stats.online_payments || 0}
									change={data?.change.online_payments}
									showLabel={true}
								/>
							</div>
							<DateRangeDropdown />
						</div>
						<div className="flex items-center justify-center gap-6">
							<MetricsChart
								revenue={data?.financials.revenue || 0}
								expenses={data?.financials.expenses || 0}
								stockValue={data?.financials.stock_value || 0}
								revenueChange={data?.change.revenue || 0}
								expensesChange={data?.change.expenses || 0}
								stockValueChange={data?.change.stock_value || 0}
							/>
							<FinancialBar
								profit={data?.financials.revenue || 0}
								expenses={data?.financials.expenses || 0}
								assets={data?.financials.stock_value || 0}
							/>
						</div>
						<div className="mt-6">
							<Button color="gray" outline={true} size="sm">
								View Financial Reports
								<HiOutlineArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>
  );
} 