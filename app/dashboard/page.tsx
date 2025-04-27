"use client";
import { useEffect, useState, useRef } from 'react';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import BarChart from '@/components/BarChart';
import MonthlyTarget from '@/components/MonthlyTarget';
import PayablesChart from '@/components/PayablesChart';
import DashboardTable from '@/components/Table';
import DashboardCharts from '@/components/DashboardCharts';
import LoadingSpinner from '@/components/LoadingSpinner';
import ModalSessionExpired from '@/components/ModalSessionExpired';
import ErrorModal from '@/components/ErrorModal';

const currentDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

export default function Dashboard() {
	const { user, handleApiError } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [dashboardData, setDashboardData] = useState<any>(null);
	const [invoicesData, setInvoicesData] = useState<any>(null);
	const [receiptsData, setReceiptsData] = useState<any>(null);
	const [inventoryData, setInventoryData] = useState<any>(null);
	const dataFetched = useRef(false);

	useEffect(() => {
		if (dataFetched.current) return;
		dataFetched.current = true;

		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await api.getAccountantDashboard();
				setDashboardData(data);
				
				const invoicesData = await api.getAccountantInvoices();
				setInvoicesData(invoicesData);

				const receiptsData = await api.getAccountantReceipts();
				setReceiptsData(receiptsData);

				const inventoryData = await api.getAccountantInventory();
				setInventoryData(inventoryData);

			} catch (error: any) {
				try {
					await handleApiError(error);
				} catch (e) {
					if (error.detail === 'You do not have permission to access this resource') {
						setError('You do not have permission to access this resource. Please try again.');
					} else {
						setError('An unexpected error occurred. Please try again.');
					}
				}
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, [handleApiError]);

	if (loading) {
		return <LoadingSpinner text="Loading dashboard data..." />;
	}

	if (error === 'token_expired') {
		return <ModalSessionExpired />;
	}

	if (error) {
		return <ErrorModal message={error} />;
	}

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-gray-100">
				<Navbar />
				<div className="container mx-auto px-4 py-8">
					<h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.first_name} {user?.last_name}</h1>
					<p className="text-gray-600 mt-2" style={{ paddingBottom: '20px' }}>{currentDate}</p>
					<DashboardCharts data={dashboardData} />
					<div className="grid grid-cols-2 gap-4" style={{ paddingTop: '20px' }}>
						<div>
							<BarChart
								profit={dashboardData?.financials.revenue || 0}
								sales={dashboardData?.financials.revenue || 0}
								expenses={dashboardData?.financials.expenses || 0}
							/>
						</div>
						<div className="flex flex-col gap-4">
							<MonthlyTarget revenue={dashboardData?.financials.revenue || 0} />
							<PayablesChart
								receivables={100}
								payables={80}
							/>
						</div>
					</div>
					<div className="mt-6">
						<DashboardTable 
							data={invoicesData?.data || []}
							title="Invoices" 
							type="invoice" 
						/>
					</div>
					<div className="mt-6">
						<DashboardTable 
							data={receiptsData?.data || []} 
							title="Receipts" 
							type="receipt" 
						/>
					</div>
					<div className="mt-6">
						<DashboardTable 
							data={inventoryData?.data || []} 
							title="Inventory" 
							type="inventory" 
						/>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
} 