import React from "react";
import { useFormikContext } from "formik";
import { Text, View } from "react-native";
import { TextInput } from "react-native-web";

function FormField(size, placeholder, onChangeText, value, name) {
  const { handleChange } = useFormikContext();
  const [birthday, onChangeBirthDay] = React.useState(null);
  const [measureDate, onChangeMeasureDate] = React.useState(null);
  const [weight, onChangeWeight] = React.useState(null);
  const [headScope, onChangeHeadScope] = React.useState(null);

  return (
    <>
      <Text>תאריך לידה</Text>
      <TextInput value={birthday} onChangeBirthDay={handleChange("birthday")} />
      <Text>תאריך מדידה</Text>
      <TextInput
        value={measureDate}
        onChangeMeasureDate={handleChange("measureDate")}
      />
      <Text>משקל</Text>
      <TextInput value={weight} onChangeText={handleChange("weight")} />
      <Text>היקף הראש</Text>
      <TextInput
        value={headScope}
        onChangeHeadScope={handleChange("headScope")}
      />
    </>
  );
}

export default FormField;
