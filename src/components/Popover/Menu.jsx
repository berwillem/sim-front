import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import "./Menu.css";
import { CiLogout } from "react-icons/ci";
// import { CiGlobe } from "react-icons/ci";

const DropdownMenuDemo = ({ title1, title2, icon, rightslot, rightslot2 }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          {icon}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            {title1}
            <div className="RightSlot">{rightslot}</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem">
            {title2}
            <div className="RightSlot">
              {rightslot2}
              {/* <CiLogout size={18} /> */}
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
