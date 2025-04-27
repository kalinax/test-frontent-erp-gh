export interface Invoice {
    ID: string;
    Customer: string;
    Description: string;
    Type: string;
    Date: string;
    Amount: string;
    ARAP: 'Receivables' | 'Payables';
    Status: 'Completed' | 'In progress' | 'Cancelled';
    PaymentDueDate: string;
}

export const mockInvoices: Invoice[] = [
    {
        ID: "INV-001",
        Customer: "John Doe",
        Description: "Car servicing",
        Type: "Insurance",
        Date: "2024-06-01",
        Amount: "$500.00",
        ARAP: "Receivables",
        Status: "Completed",
        PaymentDueDate: "2024-06-30"
    },
    {
        ID: "INV-002",
        Customer: "Tesla Motors",
        Description: "Battery Pack",
        Type: "Business",
        Date: "2024-06-15",
        Amount: "$12,500.00",
        ARAP: "Payables",
        Status: "In progress",
        PaymentDueDate: "2024-07-15"
    },
    {
        ID: "INV-003",
        Customer: "AutoZone Corp",
        Description: "Bulk Parts Order",
        Type: "Supplier",
        Date: "2024-06-18",
        Amount: "$8,750.00",
        ARAP: "Payables",
        Status: "Completed",
        PaymentDueDate: "2024-07-18"
    },
    {
        ID: "INV-004",
        Customer: "Sarah Smith",
        Description: "Engine Repair",
        Type: "Individual",
        Date: "2024-06-20",
        Amount: "$1,200.00",
        ARAP: "Receivables",
        Status: "In progress",
        PaymentDueDate: "2024-07-20"
    },
    {
        ID: "INV-005",
        Customer: "Mike Johnson",
        Description: "Transmission Service",
        Type: "Insurance",
        Date: "2024-06-22",
        Amount: "$2,300.00",
        ARAP: "Receivables",
        Status: "Cancelled",
        PaymentDueDate: "2024-07-22"
    },
    {
        ID: "INV-006",
        Customer: "NAPA Auto Parts",
        Description: "Monthly Supply",
        Type: "Business",
        Date: "2024-06-25",
        Amount: "$5,600.00",
        ARAP: "Payables",
        Status: "Completed",
        PaymentDueDate: "2024-07-25"
    },
    {
        ID: "INV-007",
        Customer: "Emma Davis",
        Description: "Brake Replacement",
        Type: "Individual",
        Date: "2024-06-28",
        Amount: "$450.00",
        ARAP: "Receivables",
        Status: "In progress",
        PaymentDueDate: "2024-07-28"
    },
    {
        ID: "INV-008",
        Customer: "O'Reilly Auto",
        Description: "Parts Inventory",
        Type: "Supplier",
        Date: "2024-06-30",
        Amount: "$7,800.00",
        ARAP: "Payables",
        Status: "Completed",
        PaymentDueDate: "2024-07-30"
    }
];

export interface Receipt {
  ID: string;
  CustomerName: string;
  Description: string;
  Type: string;
  Date: string;
  Amount: string;
  Status: 'Completed' | 'In progress' | 'Cancelled';
  PaymentMethod: string;
}

export const mockReceipts: Receipt[] = [
    {
        ID: "REC-001",
        CustomerName: "John Doe",
        Description: "Car Service Payment",
        Type: "Insurance",
        Date: "2024-06-01",
        Amount: "$500.00",
        Status: "Completed",
        PaymentMethod: "Credit Card"
    },
    {
        ID: "REC-002",
        CustomerName: "Sarah Smith",
        Description: "Partial Payment",
        Type: "Individual",
        Date: "2024-06-20",
        Amount: "$600.00",
        Status: "In progress",
        PaymentMethod: "Bank Transfer"
    },
    {
        ID: "REC-003",
        CustomerName: "AutoZone Corp",
        Description: "Parts Payment",
        Type: "Business",
        Date: "2024-06-18",
        Amount: "$8,750.00",
        Status: "Completed",
        PaymentMethod: "Wire Transfer"
    },
    {
        ID: "REC-004",
        CustomerName: "Emma Davis",
        Description: "Service Deposit",
        Type: "Individual",
        Date: "2024-06-28",
        Amount: "$200.00",
        Status: "In progress",
        PaymentMethod: "Cash"
    },
    {
        ID: "REC-005",
        CustomerName: "Mike Johnson",
        Description: "Cancelled Service",
        Type: "Insurance",
        Date: "2024-06-22",
        Amount: "$2,300.00",
        Status: "Cancelled",
        PaymentMethod: "Credit Card"
    },
    {
        ID: "REC-006",
        CustomerName: "Tesla Motors",
        Description: "Parts Payment",
        Type: "Business",
        Date: "2024-06-15",
        Amount: "$12,500.00",
        Status: "Completed",
        PaymentMethod: "Wire Transfer"
    },
    {
        ID: "REC-007",
        CustomerName: "NAPA Auto Parts",
        Description: "Monthly Payment",
        Type: "Business",
        Date: "2024-06-25",
        Amount: "$5,600.00",
        Status: "Completed",
        PaymentMethod: "Bank Transfer"
    }
];

export interface InventoryItem {
  ID: string;
  ItemName: string;
  Category: string;
  StockLevel: number;
  UnitPrice: string;
  TotalValue: string;
  Status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export const mockInventory: InventoryItem[] = [
    {
        ID: "ITM-001",
        ItemName: "Brake Pads - Premium",
        Category: "Brakes",
        StockLevel: 85,
        UnitPrice: "$120.00",
        TotalValue: "$10,200.00",
        Status: "In Stock"
    },
    {
        ID: "ITM-002",
        ItemName: "Engine Oil - Synthetic",
        Category: "Fluids",
        StockLevel: 150,
        UnitPrice: "$45.00",
        TotalValue: "$6,750.00",
        Status: "In Stock"
    },
    {
        ID: "ITM-003",
        ItemName: "Air Filter - Standard",
        Category: "Filters",
        StockLevel: 5,
        UnitPrice: "$15.00",
        TotalValue: "$75.00",
        Status: "Low Stock"
    },
    {
        ID: "ITM-004",
        ItemName: "Spark Plugs - Performance",
        Category: "Ignition",
        StockLevel: 0,
        UnitPrice: "$22.00",
        TotalValue: "$0.00",
        Status: "Out of Stock"
    },
    {
        ID: "ITM-005",
        ItemName: "Transmission Fluid",
        Category: "Fluids",
        StockLevel: 95,
        UnitPrice: "$28.00",
        TotalValue: "$2,660.00",
        Status: "In Stock"
    },
    {
        ID: "ITM-006",
        ItemName: "Battery - Heavy Duty",
        Category: "Electrical",
        StockLevel: 12,
        UnitPrice: "$180.00",
        TotalValue: "$2,160.00",
        Status: "Low Stock"
    },
    {
        ID: "ITM-007",
        ItemName: "Windshield Wipers",
        Category: "Accessories",
        StockLevel: 200,
        UnitPrice: "$25.00",
        TotalValue: "$5,000.00",
        Status: "In Stock"
    },
    {
        ID: "ITM-008",
        ItemName: "Brake Fluid DOT 4",
        Category: "Fluids",
        StockLevel: 0,
        UnitPrice: "$12.00",
        TotalValue: "$0.00",
        Status: "Out of Stock"
    },
    {
        ID: "ITM-009",
        ItemName: "Oil Filter - Premium",
        Category: "Filters",
        StockLevel: 75,
        UnitPrice: "$18.00",
        TotalValue: "$1,350.00",
        Status: "In Stock"
    },
    {
        ID: "ITM-010",
        ItemName: "Timing Belt Kit",
        Category: "Engine",
        StockLevel: 8,
        UnitPrice: "$220.00",
        TotalValue: "$1,760.00",
        Status: "Low Stock"
    }
]; 

