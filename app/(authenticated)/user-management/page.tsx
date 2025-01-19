"use client";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserManagementTable from "@/components/UserManagement/UserManagementTable";
import React from "react";

const UserManagementPage = () => {
  return (
    <div className="">
      <UserManagementTable />
    </div>
  );
};

export default UserManagementPage;
