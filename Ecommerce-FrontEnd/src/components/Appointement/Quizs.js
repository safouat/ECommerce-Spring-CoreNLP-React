import React, { useState, useEffect } from "react";
import quizData from "./Quizs.json";
import Header from "../comps/header";
import { useLocation } from "react-router-dom";

export default function Quizs() {
  const { state } = useLocation();
  const { diseaseName, quizType, index1 } = state;

  const gad7Questions = quizData[index1]?.[diseaseName]?.[quizType];
  const [indexs, setIndexs] = useState(1);
  const [choice, setChoice] = useState("");
  const [array, setArray] = useState([]);
  const [length, setLength] = useState(Object.keys(gad7Questions).length);
  const [Modal, setModal] = useState(true);
  const [Modal2, setModal2] = useState(false);
  const [da, setda] = useState("");
  const [des, setDes] = useState("");
  const [data12, setData12] = useState("next");

  console.log(length);
  console.log(indexs);
  let sum = 0;
  let score;

  const firstQuestion = gad7Questions[indexs]["question"];
  const firstResponses = gad7Questions[indexs]["responses"];

  const arr = firstResponses.map((item, index) => ({ index, item }));

  const responseItems = firstResponses.map((item, index) => (
    <div key={index} className="radio-wrapper-46">
      <input
        type="radio"
        id={`cbx-${index}`}
        name="response"
        className="inp-radio"
        onChange={() => setChoice(item)}
        checked={choice === item}
        value={item}
      />
      <label htmlFor={`cbx-${index}`} className="cbx">
        <span></span>
        <span>{item}</span>
      </label>
    </div>
  ));

  console.log("Current GAD7 Question Index:", indexs);
  console.log("Current GAD7 Question:", firstQuestion);
  console.log("Responses:", firstResponses);
  console.log(arr);
  console.log(choice);

  return (
    <div>
      <Header />
      <div className="card1">
        {Modal && (
          <div style={{ width: "700px" }}>
            <div className="p-5 bg-light border rounded">
              <div className="container mb-2">
                {indexs}.{firstQuestion}
              </div>
              <div className="ms-4">{responseItems}</div>
              <button
                className="btn btn-primary mt-4 ms-4"
                onClick={() => {
                  if (indexs < length) {
                    setIndexs((prevIndex) => prevIndex + 1);
                    setArray((prevArray) => [...prevArray, choice]);
                    setChoice("");
                  } else if (indexs === length) {
                    setArray((prevArray) => [...prevArray, choice]);
                    setChoice("");
                    setLength(1);
                    setData12("Check My Score Now");
                  } else {
                    let sum = 0; // Initialize sum variable
                    array.forEach((item) => {
                      arr.forEach((dic) => {
                        if (dic.item === item) {
                          sum += dic.index; // Add the index to sum
                        }
                      });
                    });
                    console.log(sum);
                    console.log(
                      quizData[0]["Anxiety"]["Score"]["PTSD_CHILDREN_AND_YOUTH"]
                    );
                    setModal(false);
                    setModal2(true);
                    setda(sum);
                    setDes(quizData[index1][diseaseName]["Score"][quizType]);
                  }
                }}
              >
                {data12}
              </button>
            </div>
          </div>
        )}
        {Modal2 && (
          <div style={{ width: "1010px" }}>
            <div className="p-5 bg-light border rounded">
              <div className="container mb-2">Your Scale is: {da}</div>
              <div>{des}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
