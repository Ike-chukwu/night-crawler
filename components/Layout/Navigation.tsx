import {
  ChartIcon,
  CloseIcon,
  EventIcon,
  LogOutIcon,
  PlanIcon,
  SubContractorIcon,
  UserIconInSidenav,
} from "../icons";
import { SiteConfig, siteConfig } from "../../config/site";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LoginService } from "@/services/login";
import { useQueryClient } from "@tanstack/react-query";
import { BellIcon } from "lucide-react";

const Icon = ({ title }: { title: string }) => {
  switch (title.toLowerCase()) {
    case "analytics":
      return (
        <div className="w-4">
          <ChartIcon className="text-white" width="18" height="18" />
        </div>
      );
    case "user management":
      return (
        <div className="w-4">
          <UserIconInSidenav className="text-white" width="18" height="18" />
        </div>
      );
    case "event management":
      return (
        <div className="w-4">
          <EventIcon className="text-white" width="18" height="18" />
        </div>
      );
    case "plan management":
      return (
        <div className="w-4">
          <PlanIcon className="text-white" width="18" height="18" />
        </div>
      );
    case "subcontractors":
      return (
        <div className="w-4">
          <SubContractorIcon className="text-white" width="18" height="18" />
        </div>
      );
    case "notifications":
      return (
        <div className="w-4">
          <BellIcon className="text-white font-bold" width="20" height="20" />
        </div>
      );
    case "log out":
      return (
        <div className="w-4">
          <LogOutIcon className="text-white font-bold" width={20} height={20} />
        </div>
      );
  }
};

const MenuItem = ({
  menu,
  active,
  navStatus,
  setNavStatus,
  onClick,
}: {
  menu: SiteConfig["navItems"][0];
  active: boolean;
  navStatus?: boolean;
  setNavStatus: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={menu.href}
      className={clsx(
        "py-3 md:py-4 cursor-pointer pl-3 pr-1 flex gap-4 hover:bg-[#935eff] hover:font-bold ease-in duration-300 rounded-md w-full",
        {
          "bg-[#7e4ae6] md:bg-[#935eff]": active,
        }
      )}
      onClick={() => {
        setNavStatus(false);
        onClick?.();
      }}
    >
      <Icon title={menu.label} />
      <span
        className={
          "text-[15px] capitalize text-white " +
          (active ? "font-bold" : "font-normal")
        }
      >
        {menu.label}
      </span>
    </Link>
  );
};

MenuItem.displayName = "MenuItem";

export const Sidebar = ({
  navStatus,
  setNavStatus,
}: {
  navStatus?: boolean;
  setNavStatus: Dispatch<SetStateAction<boolean>>;
}) => {
  const path = usePathname();
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const menus = siteConfig.navItems;

  return (
    <div className="flex-col items-start w-full mt-12 ">
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.label}
          setNavStatus={() => {}}
          active={
            path === menu.href ||
            (menu.href !== "/" && path.startsWith(menu.href))
          }
          menu={menu}
        />
      ))}
      <MenuItem
        active={false}
        menu={{ label: "Log out", href: "/login" }}
        onClick={() => {
          LoginService.logOut();
          queryClient.removeQueries({ type: "all", stale: true });
          push("/login");
        }}
        setNavStatus={() => {}}
      />
    </div>
  );
};

export const MobileNav = ({
  navStatus,
  setNavStatus,
}: {
  navStatus?: boolean;
  setNavStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const path = usePathname();
  const { push } = useRouter();
  const menus = siteConfig.navItems;
  const queryClient = useQueryClient();

  return (
    <div
      className={`flex flex-col pt-20 pb-4 gap-5 z-40 fixed items-center text-center w-full bg-[#935EFF] right-0 top-0 bottom-0 min-h-[100vh] overflow-y-auto transition-all duration-300 ${
        navStatus ? "left-0" : "left-[-150%]"
      }`}
    >
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.label}
          active={
            path === menu.href ||
            (menu.href !== "/" && path.startsWith(menu.href))
          }
          menu={menu}
          setNavStatus={setNavStatus}
        />
      ))}
      <MenuItem
        active={false}
        menu={{ label: "Log out", href: "/login" }}
        onClick={() => {
          LoginService.logOut();
          queryClient.removeQueries({ type: "all", stale: true });
          push("/login");
        }}
        setNavStatus={() => {}}
      />
      <CloseIcon
        onClick={() => {
          setNavStatus(false);
        }}
        width="20"
        height="20"
        className="absolute right-2 top-10 cursor-pointer "
      />
    </div>
  );
};
