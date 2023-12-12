"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useGetProfile from '../hooks/user/useGetProfile';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

export default function Navbar1() {
  const router = useRouter();
  const { userProfile, isLoading, isError } = useGetProfile();
  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('accessToken');
    router.push('/signin'); 
  };
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-lg">股漲</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            委託查詢
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            交易紀錄
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            庫存明細
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            損益試算
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              //   color="secondary"
              name="Jason Hughes"
              size="md"
              src="/photo.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="myaccount">帳戶概覽</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                登出
              </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <p>安安 {userProfile?.username}</p>
    </Navbar>
  );
}
