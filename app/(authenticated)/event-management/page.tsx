"use client";
import EventDetailTable from "@/components/EventManagement/EventDetailTable";
import NativeSelect from "@/components/NativeElements/NativeSelect";
import { Input } from "@/components/ui/input";
import { SearchParams } from "@/constants";
import { useListAllEvents } from "@/hooks/useEventManagement";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const EventManagementPage = () => {
  const { changeQueries, getQuery } = useRouterQuery();
  const filter = getQuery(SearchParams.FILTER);
  const intialSearchedTerm = getQuery(SearchParams.SEARCHED_TERM) || "";
  const [inputValue, setInputValue] = useState(intialSearchedTerm);
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const [debouncedValue] = useDebounce(inputValue, 900);

  useEffect(() => {
    changeQueries({
      [SearchParams.SEARCHED_TERM]: debouncedValue,
      [SearchParams.PAGE]: 1,
    });
  }, [debouncedValue]);

  useEffect(() => {
    if (!filter) {
      changeQueries({
        [SearchParams.FILTER]: "ALL",
      });
    }
  }, []);

  return (
    <div className="">
      <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-3">
        <Input
          className="w-full md:w-[300px]"
          placeholder="Search by user mail"
          value={inputValue || undefined}
          onChange={handleInputChange}
        />
        <div className="flex justify-between md:justify-end w-full items-center md:gap-2">
          {/* <NativeSelect
            className="w-[49%] md:w-[180px]"
            onChange={() => console.log("yes")}
            placeholder="Select a country"
            title="Countries"
            options={["USA"]}
          /> */}
          <NativeSelect
            className="w-full md:w-[180px]"
            onChange={(value) =>
              changeQueries({ [SearchParams.FILTER]: value })
            }
            placeholder="Pick status"
            title="Status"
            options={["ALL", "ONGOING", "COMPLETED"]}
            value={filter}
          />
        </div>
      </div>

      <EventDetailTable />
    </div>
  );
};

export default EventManagementPage;
