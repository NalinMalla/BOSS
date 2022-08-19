import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import axios from "axios";

import Icons from "../res/icons";
import { Button } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const TabbedPane = (props) => {
  const [value, setValue] = React.useState(0);
  const userId = localStorage.getItem("userId");
  const [question, setQuestion] = React.useState("");
  let userName;
  if (localStorage.getItem("userMiddleName") === "") {
    userName =
      localStorage.getItem("userFirstName") +
      " " +
      localStorage.getItem("userLastName");
  } else {
    userName =
      localStorage.getItem("userFirstName") +
      " " +
      localStorage.getItem("userMiddleName") +
      " " +
      localStorage.getItem("userLastName");
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  let reviewsRating5 = (props.reviewsRating5 / props.reviews) * 100;
  let reviewsRating4 = (props.reviewsRating4 / props.reviews) * 100;
  let reviewsRating3 = (props.reviewsRating3 / props.reviews) * 100;
  let reviewsRating2 = (props.reviewsRating2 / props.reviews) * 100;
  let reviewsRating1 = (props.reviewsRating1 / props.reviews) * 100;

  const handleSubmit = (event) => {
    event.preventDefault();
    const questionAnswerData = {
      userName: userName,
      userId: userId,
      question: question,
    };
    if (props.questionAnswerData.length !== 0) {
      axios
        .put(
          `http://localhost:5000/products/addQuestion/${props.productId}`,
          questionAnswerData
        )
        .then(
          (res) => {
            window.location.reload();
            console.log(res.data);
          },
          (err) => {
            alert("Question was not submitted.\nError: " + err);
          }
        );
    } else {
      axios
        .post(
          `http://localhost:5000/products/createQuestionAnswer/${props.productId}`,
          questionAnswerData
        )
        .then(
          (res) => {
            window.location.reload();
            console.log(res.data);
          },
          (err) => {
            alert("Question was not submitted.\nError: " + err);
          }
        );
    }
  };

  return (
    <Box style={props.style}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ style: { background: "brown" } }}
        >
          <Tab style={{ fontSize: 20 }} label="Details & Overview" index={0} />
          <Tab style={{ fontSize: 20 }} label="Product Reviews" index={1} />
          <Tab style={{ fontSize: 20 }} label="Product Questions" index={2} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={styles.root}>
          <div
            style={{
              ...styles.container,
              width: "48%",
              backgroundColor: "#F5F5F5",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 550 }}>Description</div>
            <ul>
              {props.description.map((element) => (
                <li style={{ textAlign: "justify" }}>{element}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              ...styles.container,
              width: "40%",
              backgroundColor: "#F5F5F5",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 550 }}>Specification</div>
            <ul>
              {props.specification.map((element) => (
                <li style={{ textAlign: "justify" }}>{element}</li>
              ))}
            </ul>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={styles.root}>
          <div style={styles.container}>
            <div
              style={{
                ...styles.wrapper,
              }}
            >
              <div style={styles.container}>
                <div>
                  <span style={{ fontSize: 30, color: "rgba(0,0,0,0.5)" }}>
                    <span style={{ fontSize: 45, color: "rgba(0,0,0,1)" }}>
                      {props.rating}
                    </span>
                    /5
                  </span>
                </div>
                <Rating
                  name="half-rating-read"
                  defaultValue={0}
                  value={props.rating}
                  precision={0.5}
                  size={"large"}
                  readOnly
                />
                <span style={{ fontSize: 16, color: "rgba(0,0,0,0.7)" }}>
                  {"\u00A0"}
                  {props.reviews} Reviews
                </span>
              </div>
              <div style={{ ...styles.container, marginTop: 10 }}>
                <div style={styles.wrapper}>
                  <Rating name="read-only" value={5} readOnly size={"small"} />
                  <div style={styles.ratingBar}>
                    <div
                      style={{
                        ...styles.ratingIndicator,
                        width: reviewsRating5,
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: 12, marginLeft: 15 }}>
                    {props.reviewsRating5}
                  </span>
                </div>
                <div style={styles.wrapper}>
                  <Rating name="read-only" value={4} readOnly size={"small"} />
                  <div style={styles.ratingBar}>
                    <div
                      style={{
                        ...styles.ratingIndicator,
                        width: reviewsRating4,
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: 12, marginLeft: 15 }}>
                    {props.reviewsRating4}
                  </span>
                </div>
                <div style={styles.wrapper}>
                  <Rating name="read-only" value={3} readOnly size={"small"} />
                  <div style={styles.ratingBar}>
                    <div
                      style={{
                        ...styles.ratingIndicator,
                        width: reviewsRating3,
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: 12, marginLeft: 15 }}>
                    {props.reviewsRating3}
                  </span>
                </div>
                <div style={styles.wrapper}>
                  <Rating name="read-only" value={2} readOnly size={"small"} />
                  <div style={styles.ratingBar}>
                    <div
                      style={{
                        ...styles.ratingIndicator,
                        width: reviewsRating2,
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: 12, marginLeft: 15 }}>
                    {props.reviewsRating2}
                  </span>
                </div>
                <div style={styles.wrapper}>
                  <Rating name="read-only" value={1} readOnly size={"small"} />
                  <div style={styles.ratingBar}>
                    <div
                      style={{
                        ...styles.ratingIndicator,
                        width: reviewsRating1,
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: 12, marginLeft: 15 }}>
                    {props.reviewsRating1}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                borderBottom: "1px solid rgb(0,0,0,0.2)",
              }}
            >
              Other users reviews ({props.answers})
            </div>
            <div style={styles.container}>
              {props.reviewData.map((element) => (
                <div
                  style={{
                    ...styles.container,
                    borderBottom: "1px solid rgb(0,0,0,0.2)",
                  }}
                >
                  <Rating
                    name="read-only"
                    value={element.rating}
                    precision={0.5}
                    readOnly
                  />
                  <div style={{ textAlign: "justify" }}>
                    By {element.reviewer},
                  </div>
                  <div style={{ textAlign: "justify" }}>{element.review}</div>
                  <span
                    style={{
                      marginTop: 10,
                      ...styles.wrapper,
                      fontSize: 14,
                      color: "#40aa40",
                    }}
                  >
                    <img
                      src={Icons.Verified}
                      style={{ width: 20, height: 20, marginRight: 5 }}
                      alt="Verified Icon"
                    />
                    Verified Purchase
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div style={styles.root}>
          <div style={styles.container}>
            <TextField
              id="filled-textarea"
              label="Do you have any queries?"
              placeholder="Ask product related questions here."
              multiline
              variant="filled"
              rows="3"
              style={{ width: "70vw" }}
              value={question}
              onChange={handleQuestionChange}
            />
            <div style={{ ...styles.wrapper, justifyContent: "space-between" }}>
              <span style={{ fontSize: 14 }}>
                Before asking a question please check to see if the question you
                intend to ask has already been answered.
              </span>
              <Button
                size="large"
                variant="contained"
                sx={{
                  borderRadius: "0px 0px 5px 5px",
                }}
                onClick={handleSubmit}
              >
                ASK QUESTION
              </Button>
            </div>
            <div
              style={{
                marginTop: 20,
                borderBottom: "1px solid rgb(0,0,0,0.2)",
              }}
            >
              Other questions which have been answered ({props.answers})
            </div>
            {console.log(props.questionAnswerData)}
            {props.questionAnswerData.length !== 0 ? (
              props.questionAnswerData.map((element) => (
                <div
                  style={{
                    ...styles.container,
                    borderBottom: "1px solid rgb(0,0,0,0.2)",
                  }}
                >
                  <span
                    style={{
                      ...styles.wrapper,
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      src={Icons.Question}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 20,
                        marginTop: 5,
                      }}
                      alt="Question Icon"
                    />
                    <div style={{ textAlign: "justify" }}>
                      {element.question}
                      <span
                        style={{
                          ...styles.wrapper,
                          fontSize: 14,
                          color: "rgba(0,0,0, 0.5)",
                        }}
                      >
                        {element.questioner} asked on {element.date.slice(0,10)}.
                      </span>
                    </div>
                  </span>
                  <span
                    style={{
                      ...styles.wrapper,
                      alignItems: "flex-start",
                      marginTop: 10,
                      display: element.answer === undefined ? "none" : "flex",
                    }}
                  >
                    <img
                      src={Icons.Answer}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 20,
                        marginTop: 5,
                      }}
                      alt="Answer Icon"
                    />
                    <div style={{ textAlign: "justify" }}>
                      {element.answer}
                      <br></br>
                      <span
                        style={{
                          ...styles.wrapper,
                          fontSize: 14,
                          color: "rgba(0,0,0, 0.5)",
                        }}
                      >
                        BIRA Builders & Suppliers
                      </span>
                    </div>
                  </span>
                </div>
              ))
            ) : (
              <span style={{ marginTop: 20 }}>
                No question has been asked yet.
              </span>
            )}
          </div>
        </div>
      </TabPanel>
    </Box>
  );
};

const styles = {
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
    borderRadius: 5,
    // background: '#f5f5f5',
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // background: '#f5f5c5',
    width: "100%",
  },
  container: {
    padding: 20,
    borderRadius: 3,
    fontSize: 18,
    display: "flex",
    flexDirection: "column",
    // background: '#c5f5f5',
  },
  ratingBar: {
    width: 100,
    height: 10,
    // border: '1px solid black',
    marginLeft: 15,
    display: "flex",
    justifyContent: "flex-start",
    background: "rgba(0,0,0, 0.15)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
  },
  ratingIndicator: {
    height: "100%",
    background: "#FAAF20",
  },
};

TabbedPane.defaultProps = {
  description: [],
  specification: [],
  reviews: 0,
  reviewsRating5: 0,
  reviewsRating4: 0,
  reviewsRating3: 0,
  reviewsRating2: 0,
  reviewsRating1: 0,
  questionAnswerData: [],
  rating: 0,
  reviewData: [],
  answers: 0,
};

export { TabPanel, TabbedPane };
