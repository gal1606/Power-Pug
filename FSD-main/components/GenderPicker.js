import RNPickerSelect from "react-native-picker-select";

const GenderPicker = () => {
  return (
    <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      items={[
        { label: "בן", value: "בן" },
        { label: "בת", value: "בת" },
      ]}
    />
  );
};
export default GenderPicker;
