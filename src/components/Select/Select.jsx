// import React from "react";
// import * as Select from "@radix-ui/react-select";
// import classnames from "classnames";
// import {
//   CheckIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@radix-ui/react-icons";
// import "./Select.css";

// const SelectDemo = () => (
//   <Select.Root>
//     <Select.Trigger className="SelectTrigger" aria-label="Food">
//       <Select.Value placeholder="Select a fruit…" />
//       <Select.Icon className="SelectIcon">
//         <ChevronDownIcon />
//       </Select.Icon>
//     </Select.Trigger>
//     <Select.Portal>
//       <Select.Content className="SelectContent">
//         <Select.ScrollUpButton className="SelectScrollButton">
//           <ChevronUpIcon />
//         </Select.ScrollUpButton>
//         <Select.Viewport className="SelectViewport">
//           <Select.Group>
//             <SelectItem value="pineapple">Pineapple</SelectItem>
//           </Select.Group>

//           <Select.Separator className="SelectSeparator" />

//           <Select.Separator className="SelectSeparator" />
//         </Select.Viewport>
//         <Select.ScrollDownButton className="SelectScrollButton">
//           <ChevronDownIcon />
//         </Select.ScrollDownButton>
//       </Select.Content>
//     </Select.Portal>
//   </Select.Root>
// );

// // eslint-disable-next-line react/display-name
// const SelectItem = React.forwardRef(
//   ({ children, className, ...props }, forwardedRef) => {
//     return (
//       <Select.Item
//         className={classnames("SelectItem", className)}
//         {...props}
//         ref={forwardedRef}
//       >
//         <Select.ItemText>{children}</Select.ItemText>
//         <Select.ItemIndicator className="SelectItemIndicator">
//           <CheckIcon />
//         </Select.ItemIndicator>
//       </Select.Item>
//     );
//   }
// );

// export default SelectDemo;
