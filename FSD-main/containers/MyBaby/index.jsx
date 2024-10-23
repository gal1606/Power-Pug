import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button } from "../../components";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import MyImagePicker from "../../components/ImagePicker";
import { ScrollView } from "react-native-gesture-handler";
import { DatePickerModal } from "react-native-paper-dates";
import { isLocaleHebrew } from "../../components/LanguageUtils";
import moment from "moment";
import "intl";
import "intl/locale-data/jsonp/he-IL";

const LOCALE = "en";

const ADD_BABY_GROWTH_DATA_URL =
  "http://power-pag.cs.colman.ac.il/user/addMyBabyGrowthDataByUserId";

const ADD_BABY_DATA_URL =
  "http://power-pag.cs.colman.ac.il/user/addMyBabyDataByUserId";

const GET_BABY_DATA_URL =
  "http://power-pag.cs.colman.ac.il/user/getMyBabyDataByUserId";

const addNewMeasurement = (measurementData) => {
  return fetch(ADD_BABY_GROWTH_DATA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(measurementData),
  })
    .catch(() =>
      Alert.alert("שגיאה", "אירעה שגיאה בעת שמירת הנתונים", [], {
        cancelable: true,
      })
    )
    .then(() =>
      Alert.alert("שמירת מדידה", "המידע נשמר בהצלחה", [], {
        cancelable: true,
      })
    );
};

const addNewBabyData = (babyData) => {
  return fetch(ADD_BABY_DATA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(babyData),
  })
    .catch(() =>
      Alert.alert("שגיאה", "אירעה שגיאה בעת שמירת הנתונים", [], {
        cancelable: true,
      })
    )
    .then(() =>
      Alert.alert("שמירת מידע התינוק", "המידע נשמר בהצלחה", [], {
        cancelable: true,
      })
    );
};

const getBayaData = async (userId) => {
  const getBabyDataUrl = GET_BABY_DATA_URL + "/" + userId;
  return fetch(getBabyDataUrl).then((response) => response.json());
};

const PressButton = ({ onPress, buttonStyle, value, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{value}</Text>
    </TouchableOpacity>
  );
};

const DateProperty = Object.freeze({
  MEASUREMENT: Symbol("MEASUREMENT"),
  DATE_OF_BIRTH: Symbol("DATE_OF_BIRTH"),
  FIRST_HOLD: Symbol("FIRST_HOLD"),
  FIRST_KANGAROO: Symbol("FIRST_JANGAROO"),
  ONE_KILO: Symbol("ONE_KIL"),
  TWO_KILO: Symbol("TWO_KILO"),
  INDEPENDENT_BREATHING: Symbol("INDEPENDENT_BREATHING"),
  FIRST_CRIB: Symbol("FIRST_CRIB"),
  FIRST_BOTTLE: Symbol("FIRST_BOTTLE"),
  FIRST_FEED: Symbol("FIRST_FEED"),
  NOT_NEED_ZONDA: Symbol("NOT_NEED_ZONDA"),
  RELEASE_HOME: Symbol("RELEASE_HOME"),
});

const getFormatedEventDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

const MyBaby = ({ navigation }) => {
  const [measurementDate, setMeasurementDate] = useState("");
  const [headCircumference, setHeadCircumference] = useState();
  const [weight, setWeight] = useState();

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthWeek, setBirthWeek] = useState("");
  const [birthWeight, setBirthWeight] = useState("");
  const [firstHoldDate, setFirstHoldDate] = useState("");
  const [firstKangarooDate, setFirstKangarooDate] = useState("");
  const [oneKiloDate, setOneKiloDate] = useState("");
  const [twoKiloDate, setTwoKiloDate] = useState("");
  const [independentBreathingDate, setIndependentBreathingDate] = useState("");
  const [firstCribDate, setFirstCribDate] = useState("");
  const [firstBottleDate, setFirstBottleDate] = useState("");
  const [firstFeedDate, setFirstFeedDate] = useState("");
  const [notNeedZondaDate, setNotNeedZondaDate] = useState("");
  const [releaseHomeDate, setReleaseHomeDate] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEventDate, setSelectedEventDate] = useState();
  const [currentDateProperty, setCurrentDateProperty] = useState();

  const userData = useSelector((state) => state.userData);
  const userId = userData.userId;

  const displayDatePicker = (propertyType) => {
    setCurrentDateProperty(propertyType);
    setShowDatePicker(true);
  };

  const onDismissSingle = () => {
    setShowDatePicker(false);
  };

  const onConfirmSingle = (params) => {
    setShowDatePicker(false);

    const formatedDate = getFormatedEventDate(params.date);

    switch (currentDateProperty) {
      case DateProperty.MEASUREMENT: {
        setMeasurementDate(formatedDate);
        break;
      }
      case DateProperty.DATE_OF_BIRTH: {
        setDateOfBirth(formatedDate);
        break;
      }
      case DateProperty.FIRST_HOLD: {
        setFirstHoldDate(formatedDate);
        break;
      }
      case DateProperty.FIRST_KANGAROO: {
        setFirstKangarooDate(formatedDate);
        break;
      }
      case DateProperty.ONE_KILO: {
        setOneKiloDate(formatedDate);
        break;
      }
      case DateProperty.TWO_KILO: {
        setTwoKiloDate(formatedDate);
        break;
      }
      case DateProperty.INDEPENDENT_BREATHING: {
        setIndependentBreathingDate(formatedDate);
        break;
      }
      case DateProperty.FIRST_CRIB: {
        setFirstCribDate(formatedDate);
        break;
      }
      case DateProperty.FIRST_BOTTLE: {
        setFirstBottleDate(formatedDate);
        break;
      }
      case DateProperty.FIRST_FEED: {
        setFirstFeedDate(formatedDate);
        break;
      }
      case DateProperty.NOT_NEED_ZONDA: {
        setNotNeedZondaDate(formatedDate);
        break;
      }
      case DateProperty.RELEASE_HOME: {
        setReleaseHomeDate(formatedDate);
        break;
      }
    }
  };

  const handleSaveMeasurement = async () => {
    if ((!measurementDate && !headCircumference) || !weight) {
      Alert.alert("שגיאה", "אנא הזן את כל פרטי המדידה", [], {
        cancealable: true,
      });
      return;
    }

    const newMeasurement = {
      userObjectId: userId,
      measurementDate,
      headCircumference,
      weight,
    };

    console.log(`Add new measurement data: ${JSON.stringify(newMeasurement)}`);

    await addNewMeasurement(newMeasurement);
  };

  const handleSaveBabyData = async () => {
    let babyData = { userObjectId: userId };

    if (dateOfBirth) {
      babyData.dateOfBirth = dateOfBirth;
    }
    if (birthWeek) {
      babyData.birthWeek = parseFloat(birthWeek);
    }
    if (birthWeight) {
      babyData.birthWeight = parseFloat(birthWeight);
    }
    if (firstHoldDate) {
      babyData.firstHoldDate = firstHoldDate;
    }
    if (firstKangarooDate) {
      babyData.firstKangarooDate = firstKangarooDate;
    }
    if (oneKiloDate) {
      babyData.oneKiloDate = oneKiloDate;
    }
    if (twoKiloDate) {
      babyData.twoKiloDate = twoKiloDate;
    }
    if (independentBreathingDate) {
      babyData.independentBreathingDate = independentBreathingDate;
    }
    if (firstCribDate) {
      babyData.firstCribDate = firstCribDate;
    }
    if (firstBottleDate) {
      babyData.firstBottleDate = firstBottleDate;
    }
    if (firstFeedDate) {
      babyData.firstFeedDate = firstFeedDate;
    }
    if (notNeedZondaDate) {
      babyData.notNeedZondaDate = notNeedZondaDate;
    }
    if (releaseHomeDate) {
      babyData.releaseHomeDate = releaseHomeDate;
    }

    console.log(`Add new measurement data: ${JSON.stringify(babyData)}`);

    await addNewBabyData(babyData);
  };

  const fetchAndSetBabyData = async (userId) => {
    let babyData = await getBayaData(userId);
    babyData = babyData.myBabyData;
    console.log(`babyData=${JSON.stringify(babyData)}`);

    if (babyData.dateOfBirth) {
      setDateOfBirth(getFormatedEventDate(babyData.dateOfBirth));
    }
    if (babyData.birthWeek) {
      setBirthWeek(babyData.birthWeek.$numberDecimal);
    }
    if (babyData.birthWeight) {
      setBirthWeight(babyData.birthWeight.$numberDecimal);
    }
    if (babyData.firstHoldDate) {
      setFirstHoldDate(getFormatedEventDate(babyData.firstHoldDate));
    }
    if (babyData.firstKangarooDate) {
      setFirstKangarooDate(getFormatedEventDate(babyData.firstKangarooDate));
    }
    if (babyData.oneKiloDate)
      setOneKiloDate(getFormatedEventDate(babyData.oneKiloDate));
    if (babyData.twoKiloDate)
      setTwoKiloDate(getFormatedEventDate(babyData.twoKiloDate));
    if (babyData.independentBreathingDate)
      setIndependentBreathingDate(
        getFormatedEventDate(babyData.independentBreathingDate)
      );
    if (babyData.firstCribDate)
      setFirstCribDate(getFormatedEventDate(babyData.firstCribDate));
    if (babyData.firstBottleDate)
      setFirstBottleDate(getFormatedEventDate(babyData.firstBottleDate));
    if (babyData.firstFeedDate)
      setFirstFeedDate(getFormatedEventDate(babyData.firstFeedDate));
    if (babyData.notNeedZondaDate)
      setNotNeedZondaDate(getFormatedEventDate(babyData.notNeedZondaDate));
    if (babyData.releaseHomeDate)
      setReleaseHomeDate(getFormatedEventDate(babyData.releaseHomeDate));
  };

  useEffect(async () => {
    await fetchAndSetBabyData(userId);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <MyImagePicker /> */}
        <View style={styles.box}>
          <View style={[styles.headerBox]}>
            <Text style={styles.header}>{"מדידה חדשה"}</Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.MEASUREMENT)}
              value={measurementDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              תאריך מדידה
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onChangeText={(value) => {
                setHeadCircumference(value);
              }}
              value={headCircumference}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              היקף ראש
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onChangeText={(value) => {
                setWeight(value);
              }}
              value={weight}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              {" "}
              משקל נוכחי
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PressButton
              buttonStyle={styles.pressButton}
              textStyle={styles.pressButtonText}
              value={"שמור מדידה"}
              onPress={handleSaveMeasurement}
            />

            <PressButton
              buttonStyle={styles.pressButton}
              textStyle={styles.pressButtonText}
              value={"מדידות קודמות"}
              onPress={() => navigation.navigate("Measurements")}
            />
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>אבני דרך</Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.DATE_OF_BIRTH)}
              value={dateOfBirth}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              נולדתי בתאריך
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onChangeText={(value) => {
                setBirthWeek(value);
              }}
              value={birthWeek}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              בשבוע
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onChangeText={(value) => {
                setBirthWeight(value);
              }}
              value={birthWeight}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              במשקל
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.FIRST_HOLD)}
              value={firstHoldDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              הוריי החזיקו אותי לראשונה
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.FIRST_KANGAROO)}
              value={firstKangarooDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              הוריי עשו לי קנגרו
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.ONE_KILO)}
              value={oneKiloDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              הגעתי למשקל 1 ק"ג
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.TWO_KILO)}
              value={twoKiloDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              הגעתי למשקל 2 ק"ג
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() =>
                displayDatePicker(DateProperty.INDEPENDENT_BREATHING)
              }
              value={independentBreathingDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              התחלתי לנשום בכוחות עצמי
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.FIRST_CRIB)}
              value={firstCribDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              עברתי לעריסה
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.FIRST_BOTTLE)}
              value={firstBottleDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              עברתי לאכול מבקבוק
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.FIRST_FEED)}
              value={firstFeedDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              הוריי מאכילים אותי
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.NOT_NEED_ZONDA)}
              value={notNeedZondaDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              אני לא צריך זונדה
            </Text>
          </View>
          <View style={[styles.boxContent, rowDesign()]}>
            <TextInput
              style={[styles.input, styles.formColumn]}
              onFocus={() => displayDatePicker(DateProperty.RELEASE_HOME)}
              value={releaseHomeDate}
            />
            <Text style={[styles.label, styles.formColumn, alignToRight()]}>
              השתחררתי הביתה
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSaveBabyData} title={"שמור"} />
          </View>
        </View>
      </ScrollView>
      {showDatePicker ? (
        <DatePickerModal
          locale={LOCALE}
          mode="single"
          visible={showDatePicker}
          onDismiss={onDismissSingle}
          date={selectedEventDate}
          onConfirm={onConfirmSingle}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "black",
    fontSize: 19,
  },
  forceAlignToRight: {
    textAlign: "right",
  },
  button: {
    color: "white",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    shadowRadius: 12,
    shadowOpacity: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  input: {
    paddingHorizontal: "5%",
    borderRadius: 4,
    marginBottom: "5%",
    fontSize: 19,
    borderBottomColor: "#79CEFA",
    borderBottomWidth: 2,
  },
  field: {
    flexDirection: "row",
  },
  header: {
    fontSize: 24,
    color: "black",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBox: {
    borderBottomColor: "black",
    alignItems: "center",
  },
  boxContent: {
    flexDirection: "row-reverse",
    // borderBottomWidth: 1,
    margin: 10,
  },
  formReverseRow: {
    flexDirection: "row-reverse",
  },
  formRow: {
    flexDirection: "row",
  },
  formColumn: {
    flexDirection: "column",
    width: "50%",
  },
  box: {
    margin: 10,
    justifyContent: "space-between",
  },
  pressButton: {
    margin: 1,
    padding: "2%",
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#2E338C",
  },
  pressButtonText: {
    margin: "2%",
    color: "white",
    fontSize: 18,
  },
});

/**
  Return UI style for cross platform & cross language environment.
  MUST have styles variable with two fields: formRow, formReverseRow.
*/
const rowDesign = () => {
  const lang = isLocaleHebrew();
  if (lang) {
    return styles.formReverseRow;
  } else {
    return styles.formRow;
  }
};

const alignToRight = () => {
  const lang = isLocaleHebrew();
  if (!lang) {
    return styles.forceAlignToRight;
  }
};

export default MyBaby;
