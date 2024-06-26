import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import { StatusChip } from "@/components/shared/StatusChip";
import styles from "@/components/shared/StatusDropdown/styles.module.css";

export interface StatusOption {
  value: string;
  color: string;
}

/**
 * All available statuses that can be set using the status dropdown
 */
export const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "Received",
    color: "#e6e6e6",
  },
  {
    value: "Approved",
    color: "#d7eebc",
  },
  {
    value: "Appointment Scheduled",
    color: "#c5e1f6",
  },
  {
    value: "Complete",
    color: "#bfe1f6",
  },
  {
    value: "No-show / Incomplete",
    color: "#f9cfc9",
  },
  {
    value: "Archived",
    color: "#e4cef1",
  },
];

/**
 * A special status-like option for all statuses
 */
export const ALL_STATUSES_OPTION: StatusOption = {
  value: "All Statuses",
  color: "transparent",
};

/**
 * An input component that displays a dropdown menu with all available status
 * options and enables the user to select a status.
 */
export interface StatusDropdownProps {
  value: string;
  onChanged?: (value: string) => void;
  includeAllStatuses: boolean;
}

export function StatusDropdown({ value, onChanged, includeAllStatuses }: StatusDropdownProps) {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setSelectedValue(value), [value]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
    onChanged?.(event.target.value);
  };

  const DropdownIcon = () => (
    <Image
      src={isOpen ? "/keyboard_arrow_up24.svg" : "/keyboard_arrow_down24.svg"}
      width={24}
      height={24}
      alt="dropdown"
      style={{
        // We need these styles in order to make our custom IconComponent clickable.
        // See https://stackoverflow.com/a/73038614
        position: "absolute",
        right: 7,
        pointerEvents: "none",
      }}
    />
  );

  return (
    <div>
      <FormControl sx={{ minWidth: 120, width: "100%" }}>
        <Select
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          className={styles.select}
          value={selectedValue}
          onChange={handleChange}
          displayEmpty
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            ".MuiOutlinedInput-input.MuiSelect-select": {
              padding: "0px",

              // This right padding keeps the dropdown arrow from being
              // colored in like the menu itmes
              ":first-of-type": { paddingRight: "32px" },
            },

            // Override default blue border on Select component when focused
            // See https://stackoverflow.com/a/75937349
            fieldset: {
              border: "none !important",
            },
          }}
          MenuProps={{
            disableScrollLock: true,
            // Left-align menu items with Select component
            // See https://stackoverflow.com/a/64932005
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },

            style: {
              // Add vertical gap between Select component and its menu items
              marginTop: "8px",
            },

            sx: {
              // Set padding on each menu item
              ".MuiMenuItem-root": {
                padding: "12px",
              },
            },
          }}
          IconComponent={DropdownIcon}
        >
          {...(includeAllStatuses ? [ALL_STATUSES_OPTION] : [])
            .concat(STATUS_OPTIONS)
            .map((status) => (
              <MenuItem key={status.value} value={status.value}>
                <StatusChip status={status} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
