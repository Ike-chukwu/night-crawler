import { LogOutIcon, UserIcon } from "lucide-react";
import {
  ChartIcon,
  ChevronDownIcon,
  CloseIcon,
  EventIcon,
  PlanIcon,
  UserIconInSidenav,
} from "../icons";
import { SiteConfig, siteConfig } from "../../config/site";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClassProp } from "class-variance-authority/types";
import { LoginService } from "@/services/login";
import { useQueryClient } from "@tanstack/react-query";

type Prop = ClassProp & {};

const Icon = ({ title }: { title: string }) => {
  switch (title.toLowerCase()) {
    case "analytics":
      return (
        <div className="w-4">
          <ChartIcon width="17" height="16" />
        </div>
      );
    case "user management":
      return (
        <div className="w-4">
          <UserIconInSidenav width="18" height="18" />
        </div>
      );
    case "event management":
      return (
        <div className="w-4">
          <EventIcon width="14" height="16" />
        </div>
      );
    case "plan management":
      return (
        <div className="w-4">
          <PlanIcon width="18" height="18" />
        </div>
      );
    case "log out":
      return (
        <div className="w-4">
          <LogOutIcon width={20} height={20} />
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
  // if (menu.subMenu) {
  //   return (
  //     <div>
  //       <button
  //         className={clsx(
  //           "flex w-full items-center justify-center gap-2.5 px-2.5 py-3 text-white transition-all group-[.expanded]:justify-start",
  //           {
  //             "font-semibold": active,
  //           }
  //         )}
  //         type="button"
  //         // onClick={() => {
  //         //   setExpanded(!expanded);
  //         //   setTimeout(() => onMenuExpanded?.());
  //         // }}
  //       >
  //         <Icon title={menu.label} />
  //         <span className="hidden text-sm group-[.expanded]:block">
  //           {menu.label}
  //         </span>
  //         <ChevronDownIcon
  //           className={clsx(
  //             "ml-auto hidden text-white group-[.expanded]:inline-block"
  //             // {
  //             //   "rotate-180": expanded,
  //             //   "rotate-0": !expanded,
  //             // }
  //           )}
  //           height={14}
  //           width={14}
  //         />
  //       </button>
  //       <span
  //         className={clsx(
  //           "hidden flex-col gap-3.5 duration-700 transition-height *:text-white group-[.expanded]:flex",
  //           {
  //             "py-3 pe-4 ps-10": true,
  //             // "h-0 overflow-hidden": !expanded,
  //           }
  //         )}
  //       >
  //         {menu.subMenu.map((item) => (
  //           <Link key={item.label} href={menu.href + item.href}>
  //             {item.label}
  //           </Link>
  //         ))}
  //       </span>
  //     </div>
  //   );
  // }
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
      {/* <ChartIcon width="17" height="16" /> */}
      <span
        className={
          "text-[15px] capitalize text-white " +
          (active ? "font-bold" : "font-normal")
        }
      >
        {menu.label}
      </span>
    </Link>
    // <li ref={ref}>
    //   <Link
    //     as={NextLink}
    //     className={clsx(
    //       "flex items-center justify-center gap-2.5 px-2.5 py-3 text-white transition-all group-[.expanded]:justify-start",
    //       {
    //         "font-semibold": active,
    //       }
    //     )}
    //     href={menu.href}
    //     onClick={(e) => {
    //       if (onClick) {
    //         e.preventDefault();
    //         onClick?.();
    //       }
    //     }}
    //   >
    //     <Icon title={menu.label} />
    //     <span className="hidden text-sm group-[.expanded]:block">
    //       {menu.label}
    //     </span>
    //   </Link>
    // </li>
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

  // const menus = siteConfig.navItems.filter((item) => {
  //   if (item?.access?.includes(role)) {
  //     if (item?.subMenu) {
  //       item.subMenu = item?.subMenu.filter((subItem) =>
  //         subItem?.access.includes(role)
  //       );
  //     }
  //     return true;
  //   }
  //   return false;
  // });

  // const setActive = () => {
  //   const basePath = path === "/" ? path : path.split("/")[1];
  //   const index = menus.findIndex((menu) => menu.href.includes(basePath));

  //   if (activeRef.current) {
  //     activeRef.current.style.top = `${
  //       (navRefs.current[index] as HTMLLIElement)?.offsetTop
  //     }px`;
  //   }
  // };

  useEffect(() => {
    // setActive();
    // closeSidebar();
  }, [path]);

  return (
    <div className="flex-col items-start w-full mt-12 ">
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.label}
          setNavStatus={() => {}}
          // ref={(el) => (navRefs.current[index] = el)}
          active={path === menu.href}
          menu={menu}
          // onMenuExpanded={setActive}
        />
      ))}
      <MenuItem
        active={false}
        menu={{ label: "Log out", href: "/login" }}
        onClick={() => {
          // console.log("clicked");
          LoginService.logOut();
          queryClient.removeQueries({ type: "all", stale: true });
          push("https://night-crawler-kq2x.vercel.app/login");
        }}
        setNavStatus={() => {}}

        // onMenuExpanded={setActive}
      />
      {/* <div className="py-4 cursor-pointer pl-3 pr-1 flex gap-3 hover:bg-[#935eff] hover:font-bold ease-in duration-300 rounded-md w-full">
        <ChartIcon width="17" height="16" />
        <span className="text-[15px] capitalize text-white">analytics</span>
      </div>
      <div className="py-4 cursor-pointer pl-3 pr-1 flex gap-3 hover:bg-[#935eff]  rounded-md w-full">
        <ChartIcon width="17" height="16" />
        <span className="text-[15px] capitalize text-white">analytics</span>
      </div>
      <div className="py-4 cursor-pointer pl-3 pr-1 flex gap-3 hover:bg-[#935eff] rounded-md w-full">
        <ChartIcon width="17" height="16" />
        <span className="text-[15px] capitalize text-white">analytics</span>
      </div> */}
    </div>
    // <aside
    //   className={clsx(
    //     className,
    //     "group fixed inset-0 -left-full z-50 w-[95%] bg-background transition-all md:w-2/6 lg:static lg:w-[79px] lg:border-r lg:border-content2"
    //   )}
    //   id="sidebar"
    //   onMouseEnter={openSidebar}
    //   onMouseLeave={closeSidebar}
    // >
    //   <div className="relative">
    //     <Link
    //       as={NextLink}
    //       className="grid h-16 w-full items-center border-b border-content2 px-2.5 lg:h-20 lg:border-0 lg:group-[.expanded]:px-8"
    //       href="/"
    //     >
    //       <AppIcon
    //         className="h-[16px] w-[79px] transition-all lg:h-[11px] lg:w-[55px] lg:group-[.expanded]:h-[19px] lg:group-[.expanded]:w-[93px]"
    //         height={16}
    //         width={79}
    //       />
    //     </Link>
    //     <button
    //       className="absolute -right-3 top-1/2 z-10 grid h-6 w-6 -translate-y-1/2 place-content-center rounded-full bg-primary shadow-md"
    //       onClick={() => {
    //         toggleSidebar();
    //         setActive();
    //       }}
    //     >
    //       <ChevronDownIcon
    //         className="rotate-90 text-white group-[.expanded]:-rotate-90"
    //         height={14}
    //         width={14}
    //       />
    //     </button>
    //   </div>
    //   <h3 className="mb-2.5 px-2.5 py-4 uppercase text-content4 transition-all lg:text-[9px] lg:group-[.expanded]:px-8 lg:group-[.expanded]:text-xs">
    //     Main Menu
    //   </h3>
    //   <ul className="relative flex flex-col gap-3 px-4 transition-all lg:group-[.expanded]:px-5">
    //     <li
    //       ref={activeRef}
    //       className="absolute inset-0 -z-[2] mx-4 h-[50px] w-auto rounded-lg border-2 border-b-[8px] border-white bg-white transition-all"
    //     >
    //       <span className="block h-full w-full rounded-lg bg-primary font-semibold" />
    //     </li>
    //     {menus.map((menu, index) => (
    //       <MenuItem
    //         key={menu.label}
    //         ref={(el) => (navRefs.current[index] = el)}
    //         active={path === menu.href}
    //         menu={menu}
    //         onMenuExpanded={setActive}
    //       />
    //     ))}
    //     <MenuItem
    //       active={false}
    //       menu={{ label: "Log out", href: "/", access: [] }}
    //       onClick={() => {
    //         UserService.logOut();
    //         queryClient.removeQueries({ type: "all", stale: true });
    //         push("/login");
    //       }}
    //     />
    //   </ul>
    // </aside>
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
  // const menus = siteConfig.navItems.filter((item) => {
  //   if (item?.access?.includes(role)) {
  //     if (item?.subMenu) {
  //       item.subMenu = item?.subMenu.filter((subItem) =>
  //         subItem?.access.includes(role)
  //       );
  //     }
  //     return true;
  //   }
  //   return false;
  // });

  // const setActive = () => {
  //   const basePath = path === "/" ? path : path.split("/")[1];
  //   const index = menus.findIndex((menu) => menu.href.includes(basePath));

  //   if (activeRef.current) {
  //     activeRef.current.style.top = `${
  //       (navRefs.current[index] as HTMLLIElement)?.offsetTop
  //     }px`;
  //   }
  // };

  useEffect(() => {
    // setActive();
    // closeSidebar();
    console.log(navStatus);
  }, [navStatus]);

  return (
    <div
      className={`flex flex-col pt-20 pb-4 gap-5 z-40 fixed items-center text-center w-full bg-[#935EFF] right-0 top-0 bottom-0 min-h-[100vh] overflow-y-auto transition-all duration-300 ${
        navStatus ? "left-0" : "left-[-150%]"
      }`}
    >
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.label}
          // ref={(el) => (navRefs.current[index] = el)}
          active={path === menu.href}
          menu={menu}
          setNavStatus={setNavStatus}
          // onMenuExpanded={setActive}
        />
      ))}
      <MenuItem
        active={false}
        menu={{ label: "Log out", href: "/login" }}
        onClick={() => {
          // console.log("clicked");
          LoginService.logOut();
          queryClient.removeQueries({ type: "all", stale: true });
          push("https://night-crawler-kq2x.vercel.app/login");
        }}
        setNavStatus={() => {}}

        // onMenuExpanded={setActive}
      />
      <CloseIcon
        onClick={() => {
          // console.log("yes");
          setNavStatus(false);
        }}
        width="20"
        height="20"
        className="absolute right-2 top-10 cursor-pointer "
      />
      {/* <button
        onClick={() => {
          console.log("yes");
          setNavStatus(false);
        }}
        className="h-4 w-4 bg-black absolute right-2 top-10"
      ></button> */}
      {/* <div className="py-4 cursor-pointer pl-3 pr-1 flex gap-3 hover:bg-[#935eff] hover:font-bold ease-in duration-300 rounded-md w-full">
        <ChartIcon width="17" height="16" />
        <span className="text-[15px] capitalize text-white">analytics</span>
      </div>
      <div className="py-4 cursor-pointer pl-3 pr-1 flex gap-3 hover:bg-[#935eff]  rounded-md w-full">
        <ChartIcon width="17" height="16" />
        <span className="text-[15px] capitalize text-white">analytics</span>
      </div>
      <div className="py-4 cursor-pointer pl-3 pr-1 flex gap-3 hover:bg-[#935eff] rounded-md w-full">
        <ChartIcon width="17" height="16" />
        <span className="text-[15px] capitalize text-white">analytics</span>
      </div> */}
    </div>
    // <aside
    //   className={clsx(
    //     className,
    //     "group fixed inset-0 -left-full z-50 w-[95%] bg-background transition-all md:w-2/6 lg:static lg:w-[79px] lg:border-r lg:border-content2"
    //   )}
    //   id="sidebar"
    //   onMouseEnter={openSidebar}
    //   onMouseLeave={closeSidebar}
    // >
    //   <div className="relative">
    //     <Link
    //       as={NextLink}
    //       className="grid h-16 w-full items-center border-b border-content2 px-2.5 lg:h-20 lg:border-0 lg:group-[.expanded]:px-8"
    //       href="/"
    //     >
    //       <AppIcon
    //         className="h-[16px] w-[79px] transition-all lg:h-[11px] lg:w-[55px] lg:group-[.expanded]:h-[19px] lg:group-[.expanded]:w-[93px]"
    //         height={16}
    //         width={79}
    //       />
    //     </Link>
    //     <button
    //       className="absolute -right-3 top-1/2 z-10 grid h-6 w-6 -translate-y-1/2 place-content-center rounded-full bg-primary shadow-md"
    //       onClick={() => {
    //         toggleSidebar();
    //         setActive();
    //       }}
    //     >
    //       <ChevronDownIcon
    //         className="rotate-90 text-white group-[.expanded]:-rotate-90"
    //         height={14}
    //         width={14}
    //       />
    //     </button>
    //   </div>
    //   <h3 className="mb-2.5 px-2.5 py-4 uppercase text-content4 transition-all lg:text-[9px] lg:group-[.expanded]:px-8 lg:group-[.expanded]:text-xs">
    //     Main Menu
    //   </h3>
    //   <ul className="relative flex flex-col gap-3 px-4 transition-all lg:group-[.expanded]:px-5">
    //     <li
    //       ref={activeRef}
    //       className="absolute inset-0 -z-[2] mx-4 h-[50px] w-auto rounded-lg border-2 border-b-[8px] border-white bg-white transition-all"
    //     >
    //       <span className="block h-full w-full rounded-lg bg-primary font-semibold" />
    //     </li>
    //     {menus.map((menu, index) => (
    //       <MenuItem
    //         key={menu.label}
    //         ref={(el) => (navRefs.current[index] = el)}
    //         active={path === menu.href}
    //         menu={menu}
    //         onMenuExpanded={setActive}
    //       />
    //     ))}
    //     <MenuItem
    //       active={false}
    //       menu={{ label: "Log out", href: "/", access: [] }}
    //       onClick={() => {
    //         UserService.logOut();
    //         queryClient.removeQueries({ type: "all", stale: true });
    //         push("/login");
    //       }}
    //     />
    //   </ul>
    // </aside>
  );
};
