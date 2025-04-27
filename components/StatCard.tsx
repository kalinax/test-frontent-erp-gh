"use client";

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    showLabel?: boolean;
    formatValue?: (value: string | number) => string;
}

export default function StatCard({ title, value, change, showLabel, formatValue }: StatCardProps) {
    const formattedValue = formatValue ? formatValue(value) : value;

    return (
        <div className="flex flex-col p-4">
            <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
            <div className="flex items-center mt-2">
                <p className="text-2xl font-semibold">{formattedValue}</p>
                <div className="flex items-center bg-green-50 text-green-600 px-2 py-1 rounded text-xs ml-2">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    {change}%
                </div>
            </div>
            {showLabel && <p className="text-xs text-gray-400 mt-1">vs last month</p>}
        </div>
    );
} 