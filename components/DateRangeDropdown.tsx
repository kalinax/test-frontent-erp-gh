"use client";

import { Dropdown } from 'flowbite-react';
import { FaCalendar } from 'react-icons/fa';

export default function DateRangeDropdown() {
  return (
      <Dropdown
        label={
          <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FaCalendar className="mr-2 h-5 w-5 text-gray-400" />
            Dec 31 - Jan 31
          </div>
        }
        inline
      >
        <Dropdown.Item>Nov 30 - Dec 31</Dropdown.Item>
        <Dropdown.Item>Oct 31 - Nov 30</Dropdown.Item>
        <Dropdown.Item>Sep 30 - Oct 31</Dropdown.Item>
        <Dropdown.Item>Aug 31 - Sep 30</Dropdown.Item>
      </Dropdown>
  );
} 