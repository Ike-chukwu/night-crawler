import RequestsTable from "@/components/SubContractor/RequestsTable";
import SubContractorTable from "@/components/SubContractor/SubContractorTable";
import { Input } from "@/components/ui/input";
import React from "react";

const SubcontractordPage = () => {
  return (
    <div className="">
      <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-3">
        {/* <Input
          className="w-full md:w-[300px]"
          placeholder="Search by user mail"
          value={inputValue || ""}
          onChange={handleInputChange}
        /> */}
      </div>
      <SubContractorTable />
      <RequestsTable />
    </div>
  );
};

export default SubcontractordPage;
