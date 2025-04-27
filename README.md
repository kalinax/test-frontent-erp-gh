# Frontend Dashboard

A dashboard built with Next.js 14, featuring real-time financial metrics, interactive charts, and a responsive design.

## Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Flowbite React
- **Charts**: ApexCharts
- **Icons**: React Icons

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd test-frontend-erp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_BACKEND_API_V1_KEY=your_api_key
```

## Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   └── dashboard/       # Dashboard pages
├── components/          # Reusable components
├── services/            # API services
├── styles/             # Global styles
└── types/              # TypeScript types
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
