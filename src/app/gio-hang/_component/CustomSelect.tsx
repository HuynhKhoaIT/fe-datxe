import React, { useState } from "react";
import { Select, Paper } from "@mantine/core";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  data: Option[];
  placeholder: string;
  onChange: (value: string | null) => void;
  value: string | null;
}
const CustomSelect: React.FC<CustomSelectProps> = ({
  data,
  placeholder,
  onChange,
  value,
}) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const handleSelectChange = (selected: string | null) => {
    onChange(selected);
    setMenuOpened(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Select
        data={data}
        placeholder={placeholder}
        value={value}
        onChange={handleSelectChange}
        dropdownOpened={menuOpened}
        // onToggle={handleToggleMenu}
        // itemComponent={(label: any) => (
        //   <Paper p="sm" style={{ cursor: "pointer" }}>
        //     {label}
        //   </Paper>
        // )}
        nothingFoundMessage={data.length === 0 ? "No Data" : null}
      />
      {menuOpened && (
        <Paper
          style={{
            position: "absolute",
            bottom: "-10px",
            width: "100%",
            borderTop: "1px solid #ccc",
            marginTop: "10px",
          }}
        >
          Footer content here
        </Paper>
      )}
    </div>
  );
};
