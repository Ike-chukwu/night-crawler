export type SiteConfig = typeof siteConfig;


export const siteConfig = {
    name: "Night Crawler",
    description: "An app that monitors events",
    navItems: [
        {
            label: "Analytics",
            href: "/",
            // subMenu: [{
            //     label: "All Films",
            //     href: "/",
            // },]
            // access
        },
        {
            label: "User Management",
            href: "/user-management",
            // access
        },
        {
            label: "Event Management",
            href: "/event-management",
            // access
        },
        {
            label: "Plan Management",
            href: "/plan-management",
            // access
        }
    ]
}