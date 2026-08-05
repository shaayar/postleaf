export const marketingNav = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Journal",
    href: "/journal",
  },
];

export const appNav = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "home",
  },
  {
    label: "Write",
    href: "/write",
    icon: "edit",
  },
  {
    label: "Library",
    href: "/library",
    icon: "book",
  },
  {
    label: "Community",
    href: "/community",
    icon: "globe",
  },
];

export const accountNav = [
  {
    label: "Profile",
    href: "/profile",
    icon: "person",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "settings",
  },
];

export const sidebarPrimaryNav = [
  {
    label: "Home",
    href: appNav[0].href,
    icon: appNav[0].icon,
  },
  {
    label: "Write",
    href: appNav[1].href,
    icon: appNav[1].icon,
  },
  {
    label: "Letters",
    href: appNav[2].href,
    icon: "mail",
  },
  {
    label: "Collections",
    href: appNav[3].href,
    icon: "bookmark",
  },
];

export const sidebarWorkspaceNav = [
  {
    label: "Drafts",
    href: "/library",
    icon: "document",
  },
  {
    label: "Scheduled",
    href: "/profile",
    icon: "calendar",
  },
  {
    label: "Archive",
    href: "/profile/edit",
    icon: "archive",
  },
  {
    label: "Settings",
    href: accountNav[1].href,
    icon: accountNav[1].icon,
  },
];
