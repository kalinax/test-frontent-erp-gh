"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Navbar as FlowbiteNavbar, Button, TextInput, Avatar, Dropdown, Sidebar } from 'flowbite-react';
import { HiMenu, HiSearch, HiBell, HiChat, HiCog, HiUser, HiLogout, HiQuestionMarkCircle, HiInformationCircle } from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <FlowbiteNavbar fluid className="bg-white border-b border-gray-200 relative z-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Image
              src="/gh_small_logo.svg"
              alt="Garage Hero Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <Button
              color="gray"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HiMenu className="h-5 w-5" />
            </Button>
            <div className="w-64">
              <TextInput
                icon={HiSearch}
                placeholder="Search..."
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <HiBell className="h-5 w-5" />
            <HiChat className="h-5 w-5" />
            <HiCog className="h-5 w-5" />
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                  size="sm"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiUser}>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={HiLogout} onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </FlowbiteNavbar>

      <Sidebar
        aria-label="Sidebar"
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiQuestionMarkCircle}>
              FAQ
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInformationCircle}>
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
} 