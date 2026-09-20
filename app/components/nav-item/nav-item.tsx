import { NavLink } from "react-router";

import "./nav-item.css";

type NavItemProps = Omit<React.ComponentProps<typeof NavLink>, "className">;

export function NavItem(props: NavItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "nav-item nav-item--active" : "nav-item"
      }
      {...props}
    />
  );
}
