import { Table, TextInput, Button, Pagination } from 'flowbite-react';
import { useState } from 'react';
import { HiSearch, HiRefresh, HiArrowUp } from 'react-icons/hi';
import NoRecords from './NoRecords';

export interface Invoice {
  id: string;
  customer_name: string;
  description: string;
  type: string;
  date: string;
  amount: number;
  ar_ap: 'Receivables' | 'Payables';
  status: 'Completed' | 'In progress' | 'Cancelled';
  payment_due_date: string;
}

export interface Receipt {
  id: string;
  customer_name: string;
  description: string;
  type: string;
  date: string;
  amount: number;
  status: 'Completed' | 'In progress' | 'Cancelled';
  payment_method: string;
}

export interface InventoryItem {
  id: string;
  item_name: string;
  category: string;
  stock_level: number;
  unit_price: number;
  total_value: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

type TableData = Invoice | Receipt | InventoryItem;

interface DashboardTableProps {
  title: string;
  data: TableData[];
  type: 'invoice' | 'receipt' | 'inventory';
}

export default function DashboardTable({ data, title, type }: DashboardTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getSearchableFields = (item: TableData): string[] => {
    switch (type) {
      case 'invoice':
        const invoice = item as Invoice;
        return [
          invoice.id,
          invoice.customer_name,
          invoice.description,
          invoice.type,
          invoice.date,
          invoice.amount.toString(),
          invoice.status,
        ];
      case 'receipt':
        const receipt = item as Receipt;
        return [
          receipt.id,
          receipt.customer_name,
          receipt.description,
          receipt.type,
          receipt.date,
          receipt.amount.toString(),
          receipt.status,
          receipt.payment_method,
        ];
      case 'inventory':
        const inventory = item as InventoryItem;
        return [
          inventory.id,
          inventory.item_name,
          inventory.category,
          inventory.stock_level.toString(),
          inventory.unit_price.toString(),
          inventory.total_value.toString(),
          inventory.status,
        ];
      default:
        return [];
    }
  };

  const filteredData = data.filter(item => {
    const searchString = searchTerm.toLowerCase();
    return getSearchableFields(item).some(field =>
      field.toLowerCase().includes(searchString)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderTableHeaders = () => {
    switch (type) {
      case 'invoice':
        return (
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Customer</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>AR/AP</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Payment Due Date</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
        );
      case 'receipt':
        return (
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Payment Method</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
        );
      case 'inventory':
        return (
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Stock Level</Table.HeadCell>
            <Table.HeadCell>Unit Price</Table.HeadCell>
            <Table.HeadCell>Total Value</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
        );
    }
  };

  const renderTableRow = (item: TableData) => {
    switch (type) {
      case 'invoice':
        const invoice = item as Invoice;
        return (
          <Table.Row key={invoice.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="font-medium text-gray-900 dark:text-white">{invoice.id}</Table.Cell>
            <Table.Cell>{invoice.customer_name}</Table.Cell>
            <Table.Cell>{invoice.description}</Table.Cell>
            <Table.Cell>{invoice.type}</Table.Cell>
            <Table.Cell>{invoice.date}</Table.Cell>
            <Table.Cell>${invoice.amount.toLocaleString()}</Table.Cell>
            <Table.Cell>{invoice.ar_ap}</Table.Cell>
            <Table.Cell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${invoice.status === 'Completed' ? 'bg-green-100 text-green-800' :
                invoice.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                {invoice.status}
              </span>
            </Table.Cell>
            <Table.Cell>{invoice.payment_due_date}</Table.Cell>
          </Table.Row>
        );
      case 'receipt':
        const receipt = item as Receipt;
        return (
          <Table.Row key={receipt.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="font-medium text-gray-900 dark:text-white">{receipt.id}</Table.Cell>
            <Table.Cell>{receipt.customer_name}</Table.Cell>
            <Table.Cell>{receipt.description}</Table.Cell>
            <Table.Cell>{receipt.type}</Table.Cell>
            <Table.Cell>{receipt.date}</Table.Cell>
            <Table.Cell>${receipt.amount.toLocaleString()}</Table.Cell>
            <Table.Cell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${receipt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                receipt.status === 'In progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                {receipt.status}
              </span>
            </Table.Cell>
            <Table.Cell>{receipt.payment_method}</Table.Cell>
          </Table.Row>
        );
      case 'inventory':
        const inventory = item as InventoryItem;
        return (
          <Table.Row key={inventory.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="font-medium text-gray-900 dark:text-white">{inventory.id}</Table.Cell>
            <Table.Cell>{inventory.item_name}</Table.Cell>
            <Table.Cell>{inventory.category}</Table.Cell>
            <Table.Cell>{inventory.stock_level}</Table.Cell>
            <Table.Cell>${inventory.unit_price.toLocaleString()}</Table.Cell>
            <Table.Cell>${inventory.total_value.toLocaleString()}</Table.Cell>
            <Table.Cell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${inventory.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                inventory.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                {inventory.status}
              </span>
            </Table.Cell>
          </Table.Row>
        );
    }
  };

  if (filteredData.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-4 md:p-6 min-h-[300px]">
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <div className="flex-1 flex items-center justify-center p-4">
            <NoRecords />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <div className="w-72">
            <TextInput
              icon={HiSearch}
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" color="light">
            <HiRefresh className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" color="light">
            <HiArrowUp className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <Table hoverable>
          {renderTableHeaders()}
          <Table.Body className="divide-y">
            {paginatedData.map(item => renderTableRow(item))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
          <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span> of{' '}
          <span className="font-medium">{filteredData.length}</span> results
        </p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}