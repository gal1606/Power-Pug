import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Text as SvgText } from "react-native-svg";
import { BarChart, XAxis, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";

const GET_BABY_GROWTH_DATA_URL =
  "http://power-pag.cs.colman.ac.il/user/getMyBabyGrowthDataByUserId";

const fetchBabyGrowthData = (userId) => {
  const apiUrl = GET_BABY_GROWTH_DATA_URL + "/" + userId;
  return fetch(apiUrl).then((response) => response.json());
};

const Labels = ({ x, y, bandwidth, data, width, height }) => {
  const itemWidth = width / data.length;
  const itemHalfWidth = itemWidth / 2;
  const textsize = 22;
  return data.map((value, index) => (
    <SvgText
      key={index}
      x={x(index) + itemHalfWidth}
      y={height - textsize}
      fontSize={textsize}
      fill={"black"}
      alignmentBaseline={"middle"}
      textAnchor={"middle"}
    >
      {value}
    </SvgText>
  ));
};

const addLeadingZero = (number) => {
  if (parseInt(number) < 10) {
    return "0" + number;
  }
  return number;
};

const timeFromDateTime = (dateTimeString) => {
  const dateTimeObject = new Date(dateTimeString);
  var formatedTime =
    addLeadingZero(dateTimeObject.getUTCHours()) +
    ":" +
    addLeadingZero(dateTimeObject.getUTCMinutes());
  return formatedTime;
};

const dateFromDateTime = (dateTimeString) => {
  const dateTimeObject = new Date(dateTimeString);
  const formatedTime =
    dateTimeObject.getUTCDate() +
    "/" +
    (dateTimeObject.getUTCMonth() + 1) +
    "/" +
    dateTimeObject.getUTCFullYear();
  return formatedTime;
};

const DecoratedBarChart = ({ dataSeries, xAxisSeries, barColor }) => {
  return (
    <>
      <BarChart
        style={{ flex: 1 }}
        data={dataSeries}
        svg={{ fill: barColor }}
        contentInset={{ top: 20, bottom: 10 }}
        spacing={0.2}
        gridMin={0}
      >
        <Labels />
      </BarChart>
      <XAxis
        style={{ marginVertical: "2%", padding: 0, marginHorizontal: "2%" }}
        data={dataSeries}
        scale={scale.scaleBand}
        formatLabel={(value, index) => xAxisSeries[index]}
        svg={{ fill: "black", rotation: 0 }}
      />
    </>
  );
};

const Mesurments = () => {
  const userData = useSelector((state) => state.userData);
  const userId = userData.userId;

  const [dateSeries, setDateSeries] = useState([]);
  const [weightSeries, setWeightSeries] = useState([]);
  const [headCircumferenceSeries, setHeadCircumferenceSeries] = useState([]);

  const setupBabyGrowthData = async () => {
    const measurements = await fetchBabyGrowthData(userId);
    const babyMeasurements = measurements.myBabyGrowth;

    let tempDateSeries = [];
    let tempWeightSeries = [];
    let tempHeadCircumferenceSeries = [];

    babyMeasurements.map((measurementData) => {
      // MongoDb saves double values with extra filed: $numberDecimal
      // We remove it:
      tempDateSeries.push(dateFromDateTime(measurementData.measurementDate));
      tempWeightSeries.push(parseFloat(measurementData.weight.$numberDecimal));
      tempHeadCircumferenceSeries.push(
        parseFloat(measurementData.headCircumference.$numberDecimal)
      );
    });

    console.log(`tempDateSeries=${JSON.stringify(tempDateSeries)}`);
    console.log(`tempWeightSeries=${JSON.stringify(tempWeightSeries)}`);
    console.log(
      `tempHeadCircumferenceSeries=${JSON.stringify(
        tempHeadCircumferenceSeries
      )}`
    );

    setDateSeries(tempDateSeries);
    setWeightSeries(tempWeightSeries);
    setHeadCircumferenceSeries(tempHeadCircumferenceSeries);
  };

  useEffect(async () => {
    await setupBabyGrowthData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.barTitle}>משקל (בגרמים)</Text>
      <View
        style={{
          height: "35%",
          marginHorizontal: "5%",
        }}
      >
        <DecoratedBarChart
          dataSeries={weightSeries}
          xAxisSeries={dateSeries}
          barColor={"rgba(134, 65, 244, 0.2)"}
        />
      </View>
      <Text style={styles.barTitle}>היקף ראש</Text>
      <View
        style={{
          height: "35%",
          marginHorizontal: "5%",
        }}
      >
        <DecoratedBarChart
          dataSeries={headCircumferenceSeries}
          xAxisSeries={dateSeries}
          barColor={"#C7E8F9"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barTitle: {
    textAlign: "center",
    fontSize: 22,
    direction: "rtl",
    marginTop: "10%",
  },
});

export default Mesurments;
