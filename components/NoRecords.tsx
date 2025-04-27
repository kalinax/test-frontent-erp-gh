import { HiClipboard } from 'react-icons/hi';

interface NoRecordsProps {
  message?: string;
}

export default function NoRecords({ message = "There are no records available..." }: NoRecordsProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 mb-6">
        <HiClipboard className="w-12 h-12 text-gray-400" />
      </div>
      <p className="text-gray-400 text-lg font-medium text-center">{message}</p>
    </div>
  );
} 