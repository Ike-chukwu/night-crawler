"use client";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import AddUserModal from "@/components/Plan Management/AddUserModal";
import PlanDetailTable from "@/components/Plan Management/PlanDetailTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useRouterQuery } from "@/app/hooks/useRouterQuery";
import { SearchParams } from "@/constants";

const PlanManagementPage = () => {
  const { getQuery, changeQueries } = useRouterQuery();

  const handleCloseDialog = () => {
    //get the id fromm the query and run the delete event api trigger
    // the code below this can be in the onSuccess the way bolu did to show the modal until request is successfful
    //check the kind of action in the url so as to know which endpint to call i.e use if calls here for that
    changeQueries({ [SearchParams.FORM_ACTION]: undefined });
  };

  return (
    <div className="">
      <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-3">
        <Input
          className="w-full md:w-[300px]"
          placeholder="Search by user mail"
        />
        <Button
          onClick={() =>
            changeQueries({ [SearchParams.FORM_ACTION]: "addUser" })
          }
          className="text-[14px] bg-[#7940EC] capitalize "
        >
          add new plan
        </Button>
      </div>
      <AddUserModal handleCloseDialog={handleCloseDialog} />
      <PlanDetailTable />
    </div>
  );
};

export default PlanManagementPage;
