import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFilesDb } from "../../redux/slices/FileSlice";
import { accent, border } from "../variables/Colors";
import { Grid, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Text, Pressable } from "react-native";

export default function Chart() {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.allFiles.value);
  const [scrollAmount, setScrollAmount] = useState(7);
  const [dateScroll, setDateScroll] = useState(7);
  const [daysAmount, setDaysAmount] = useState(7);

  useEffect(() => {
    dispatch(fetchFilesDb());
  }, [dispatch]);

  const getUploadedFilesByDate = () => {
    let startDate = files?.reduce((oldestDate, file) => {
      const fileDate = new Date(file.created_at);
      return fileDate < oldestDate ? fileDate : oldestDate;
    }, new Date());
    let endDate = new Date();

    let noUploadDay = {};
    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      let date = day.toISOString().slice(0, 10);
      noUploadDay[date] = 0;
    }

    let uploadedFilesDate = files?.reduce((dateObj, file) => {
      const date = new Date(file.created_at).toISOString().slice(0, 10);
      dateObj[date] = (dateObj[date] || 0) + 1;
      return dateObj;
    }, {});

    return { ...noUploadDay, ...uploadedFilesDate };
  };

  const mergedData = getUploadedFilesByDate();
  const labels = Object.keys(mergedData);
  const data = Object.values(mergedData);

  const updateDateScroll = (newVal) => {
    // console.log(dateScroll);
    if (newVal <= data.length && newVal >= daysAmount) {
      setDateScroll(newVal);
    } else if (newVal >= data.length) {
      setDateScroll(data.length);
    } else if (newVal < daysAmount) {
      setDateScroll(daysAmount);
    }
  };

  const updateZoom = (newVal) => {
    if (newVal <= data.length && newVal >= 1) {
      updateDateScroll(dateScroll + daysAmount - newVal);
      // setDateScroll(newVal - daysAmount + dateScroll);
      setDaysAmount(newVal);
    } else if (newVal > data.length) {
      setDaysAmount(data.length);
    } else if (newVal < 1) {
      setDaysAmount(daysAmount);
    }
  };

  if (files) {
    return (
      <React.Fragment>
        <Grid container style={{ justifyContent: "space-between" }}>
          <Text style={{ color: "lightgray", padding: 5, fontSize: "1.5em" }}>
            File caricati
          </Text>
          <form>
            <label
              style={{
                color: "lightgray",
                padding: 10,
              }}
              htmlFor="scrollAmount"
            >
              <Text style={{ color: "lightgray", fontSize: "1em" }}>
                Quantita' scorrimento
              </Text>
            </label>
            <select
              defaultValue={7}
              name="scrollAmount"
              onChange={(e) => setScrollAmount(parseInt(e.target.value))}
              style={{
                backgroundColor: border,
                color: "lightgray",
                padding: 5,
                borderRadius: 5,
                border: `1px solid ${border}`,
              }}
            >
              {[1, 2, 5, 7, 14, 30, 90, 180, 365].map((days) => (
                <option key={days} value={days}>
                  {days} giorni
                </option>
              ))}
            </select>
          </form>
        </Grid>
        <Grid container style={{ width: "100%" }}>
          <Grid
            item
            xs={1}
            style={{ display: "flex", justifyContent: "right" }}
          >
            <Grid
              item
              style={{
                display: "flex",
                backgroundColor: border,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: "100%",
                maxWidth: 50,
              }}
            >
              <IconButton
                style={{
                  transform: "rotate(180deg)",
                  color: accent,
                  width: "100%",
                  borderRadius: 0,
                }}
                onClick={() => updateDateScroll(dateScroll + scrollAmount)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          </Grid>
          {data.length > 0 && (
            <Grid
              item
              xs={10}
              style={{
                width: "100%",
                border: `1px solid ${border}`,
              }}
            >
              <LineChart
                series={[
                  {
                    data: data.slice(
                      data.length - dateScroll || 0,
                      data.length - dateScroll + daysAmount
                    ),
                    color: accent,
                    backgroundColor: accent,
                  },
                ]}
                height={290}
                xAxis={[
                  {
                    data: labels.slice(
                      data.length - dateScroll || 0,
                      data.length - dateScroll + daysAmount
                    ),
                    scaleType: "band",
                  },
                ]}
                sx={{
                  width: "100%",
                  color: "lightgray",
                  [`.${axisClasses.top} text`]: { fill: "lightgray" },
                  [`.${axisClasses.right} text`]: { fill: "lightgray" },
                  [`.${axisClasses.bottom} text`]: { fill: "lightgray" },
                  [`.${axisClasses.left} text`]: { fill: "lightgray" },
                  [`.${axisClasses.top} line`]: { stroke: "lightgray" },
                  [`.${axisClasses.right} line`]: { stroke: "lightgray" },
                  [`.${axisClasses.bottom} line`]: { stroke: "lightgray" },
                  [`.${axisClasses.left} line`]: { stroke: "lightgray" },
                }}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                getDotColor={() => accent}
              />
              <Grid
                container
                style={{
                  justifyContent: "right",
                }}
              >
                <Grid item xs={2} md={1}>
                  <Pressable
                    onPress={() => {
                      // updateDateScroll(dateScroll + 1);
                      updateZoom(daysAmount + 1);
                      console.log(daysAmount);
                    }}
                    style={{
                      border: "1px solid" + border,
                      borderRadius: 5,
                      margin: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        color: "lightgray",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>
                </Grid>
                <Grid item xs={2} md={1}>
                  <Pressable
                    onPress={() => {
                      // updateDateScroll(dateScroll - 1);
                      updateZoom(daysAmount - 1);
                      console.log(daysAmount);
                    }}
                    style={{
                      border: "1px solid" + border,
                      borderRadius: 5,
                      margin: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        color: "lightgray",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            <Grid
              style={{
                display: "flex",
                backgroundColor: border,
                justifyContent: "center",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: "100%",
                maxWidth: 50,
              }}
            >
              <IconButton
                style={{
                  color: accent,
                  width: "100%",
                  borderRadius: 0,
                }}
                onClick={() => updateDateScroll(dateScroll - scrollAmount)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return null;
}
