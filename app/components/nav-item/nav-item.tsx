import { NavLink } from "react-router";

import { classNames } from "~/utils/class-names";

import "./nav-item.css";

type NavItemProps = Omit<React.ComponentProps<typeof NavLink>, "className">;

export function NavItem(props: NavItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames("nav-item", isActive && "nav-item--active")
      }
      {...props}
    />
  );
}
