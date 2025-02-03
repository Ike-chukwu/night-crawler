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
import { SearchParams } from "@/constants";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const UserManagementPage = () => {
   const { changeQueries, getQuery } = useRouterQuery();
    const iniialSearchTerm = getQuery(SearchParams.SEARCHED_TERM) || "";
    const [inputValue, setInputValue] = useState(iniialSearchTerm);
    const handleInputChange = (event: any) => {
      setInputValue(event.target.value);
    };
    const [debouncedValue] = useDebounce(inputValue, 900);
    const filter = getQuery(SearchParams.FILTER);
    useEffect(() => {
      changeQueries({
        [SearchParams.SEARCHED_TERM]: debouncedValue,
        [SearchParams.PAGE]: 1,
      });
    }, [debouncedValue]);
  return (
    <div className="">
      <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-3">
        <Input
          className="w-full md:w-[300px]"
          placeholder="Search by user mail"
          value={inputValue || undefined}
          onChange={handleInputChange}
        />
        <div className="flex  justify-between md:justify-end w-full items-center md:gap-2">
          {/* <NativeSelect
            onChange={() => console.log("yes")}
            placeholder="Pick a country"
            title="Countries"
            options={["USA", "France"]}
            className="w-[49%] md:w-[180px]"
          /> */}
          <NativeSelect
            onChange={(value) =>
              changeQueries({ [SearchParams.FILTER]: value })
            }
            placeholder="Pick a role"
            title="Roles"
            options={["ADVERTISER", "USER"]}
            className="w-full md:w-[180px]"
            value={filter || undefined}
          />
        </div>
      </div>
      <UserManagementTable />
    </div>
  );
};

export default UserManagementPage;
