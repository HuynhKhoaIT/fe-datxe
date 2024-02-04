import Typo from "@/app/components/elements/Typo";
import { RangeSlider } from "@mantine/core";
import styles from "./FilterBox.module.scss";
function valueLabelFormat(value: number) {
  let scaledValue = value;

  return `${scaledValue.toLocaleString()} đ`;
}

const SliderRange = ({
  step = 1,
  label,
  min,
  max,
  labelAlwaysOn = false,
}: any) => {
  return (
    <div>
      <Typo size="sub" type="semi-bold" className={styles.name}>
        {label}
      </Typo>
      <RangeSlider
        color="var(--yellow-btn)"
        minRange={0}
        max={max}
        min={min}
        step={step}
        label={valueLabelFormat}
        labelAlwaysOn={labelAlwaysOn}
      />
    </div>
  );
};
export default SliderRange;
