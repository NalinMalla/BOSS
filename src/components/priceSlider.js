import * as React from "react";
import Slider from "@mui/material/Slider";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const minDistance = 5000;

export default function PriceSlider() {
  const [value, setValue] = React.useState([0, 100000]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100000 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <div
      style={{
        width: 240,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        size="small"
        min={0}
        max={100000}
        style={{ width: 220 }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: -3,
        }}
      >
        <FormControl
          fullWidth
          style={{ marginTop: 5, flex: 4.2 }}
          variant="filled"
        >
          <InputLabel htmlFor="filled-adornment-amount" size="small">
            Min
          </InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={value[0]}
            startAdornment={
              <InputAdornment position="start">Rs.</InputAdornment>
            }
            size="small"
          />
        </FormControl>
        <div style={{ marginTop: 5, flex: 0.6 }}></div>
        <FormControl
          fullWidth
          style={{ marginTop: 5, flex: 4.2 }}
          variant="filled"
        >
          <InputLabel htmlFor="filled-adornment-amount" size="small">
            Max
          </InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={value[1]}
            startAdornment={
              <InputAdornment position="start">Rs.</InputAdornment>
            }
            size="small"
          />
        </FormControl>
      </div>
    </div>
  );
}