"use client";

import { FaShoppingCart, FaFileInvoiceDollar, FaTag } from 'react-icons/fa';

interface FinancialBarProps {
    profit: number;
    expenses: number;
    assets: number;
}

export default function FinancialBar({ profit, expenses, assets }: FinancialBarProps) {
    const total = profit + expenses + assets;
    const formatPercentage = (value: number) => total === 0 ? 0 : Math.round((value / total) * 100);
    const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k`;

    const profitPercentage = formatPercentage(profit);
    const expensesPercentage = formatPercentage(expenses);
    const assetsPercentage = formatPercentage(assets);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <div className="flex items-center mb-3">
                        <div className="p-2 bg-blue-600 rounded-lg mr-3">
                            <FaShoppingCart className="text-white text-lg" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Profit</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-900">{profitPercentage}%</span>
                        <span className="text-sm text-gray-400">{formatCurrency(profit)}</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center mb-3">
                        <div className="p-2 bg-teal-400 rounded-lg mr-3">
                            <FaFileInvoiceDollar className="text-white text-lg" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Expenses</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-900">{expensesPercentage}%</span>
                        <span className="text-sm text-gray-400">{formatCurrency(expenses)}</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center mb-3">
                        <div className="p-2 bg-red-600 rounded-lg mr-3">
                            <FaTag className="text-white text-lg" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Assets</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-900">{assetsPercentage}%</span>
                        <span className="text-sm text-gray-400">{formatCurrency(assets)}</span>
                    </div>
                </div>
            </div>
            {total > 0 && (
                <div className="h-4 flex rounded-full overflow-hidden">
                    <div
                        className="bg-blue-600"
                        style={{ width: `${profitPercentage}%` }}
                    />
                    <div
                        className="bg-teal-400"
                        style={{ width: `${expensesPercentage}%` }}
                    />
                    <div
                        className="bg-red-600"
                        style={{ width: `${assetsPercentage}%` }}
                    />
                </div>
            )}
        </div>
    );
} 