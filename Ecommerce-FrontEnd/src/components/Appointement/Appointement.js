import React, { useEffect, useState, useRef } from "react";
import Header from "../comps/header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Footer from "../comps/Footer";

export default function Appointement() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#e8e8e8e8" }}>
        <div
          className="container d-flex align-items-center justify-content-center"
          style={{ height: "354px" }}
        >
          <div className="content__inner">
            <h2 className="content__title">MedicalAI</h2>
            <h5 className="content__subtitle d-flex justify-content-center">
              Check Your Mental Health
            </h5>
          </div>
        </div>
      </div>
      <div>
        <div className="container mt-4 ">
          <div className="col-lg-6 ">
            <ul className="accordion-box">
              {faqData.map((faq, index) => (
                <li
                  className={`accordion block ${
                    index === activeIndex ? "active-block" : ""
                  }`}
                  key={index}
                >
                  <div
                    className={`acc-btn ${
                      index === activeIndex ? "active" : ""
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <h4>{faq.question}</h4>
                  </div>
                  <div
                    className={`acc-content ${
                      index === activeIndex ? "current" : ""
                    }`}
                  >
                    <div className="text">
                      <p>{faq.answer}</p>

                      {faq.index.map((item, i) => (
                        <div>
                          <Link
                            key={i}
                            to={{
                              pathname: "/Quiz",
                            }}
                            state={{
                              diseaseName: item.diseaseName,
                              quizType: item.quizType,
                              index1: item.index1,
                            }}
                          >
                            {item.quizType} Quiz
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const faqData = [
  {
    question: "Anxiety",
    answer:
      "The GAD-7 questionnaire efficiently assesses generalized anxiety disorder symptoms, guiding clinicians in treatment planning and tracking symptom severity over time. PTSD, marked by persistent anxiety after trauma, necessitates comprehensive evaluation and targeted interventions like therapy and medication to alleviate symptoms and enhance overall well-being",
    index: [
      {
        diseaseName: "Anxiety",
        quizType: "GAD7",
        index1: "0",
      },
      {
        diseaseName: "Anxiety",
        quizType: "PTSD_CHILDREN_AND_YOUTH",
        index1: "0",
      },
      {
        diseaseName: "Anxiety",
        quizType: "PTSD_Adults",
        index1: "0",
      },
    ],
  },
  {
    question: "Schizophrenia and Psychosis",
    answer:
      "The PRIME Screening Test developed by Dr. McGlashan et al. is a valuable tool for identifying individuals at risk for psychosis, aiding in early intervention and prevention efforts. It offers a concise and systematic approach to assessing key risk factors, enabling clinicians to intervene proactively and potentially mitigate the onset or progression of psychotic disorders.",
    index: [
      {
        diseaseName: "Schizophrenia_and_Psychosis",
        quizType: "PRIME_Screening_Test_by_Dr_McGlashan_et_al",
        index1: "1",
      },
    ],
  },
  {
    question: "Obsessive Compulsive Disorder OCD",
    answer:
      "The Zohar-Fineberg Obsessive-Compulsive Screen and the OCD Screen by Drs. Uher, Heyman, and others at King's College London are both valuable instruments for identifying symptoms of obsessive-compulsive disorder (OCD), facilitating early detection and appropriate intervention. These screening tools offer a structured and efficient means of assessing OCD symptoms, aiding clinicians in treatment planning and improving outcomes for individuals affected by the disorder.",
    index: [
      {
        diseaseName: "Obsessive_Compulsive_Disorder_OCD",
        quizType: "Zohar-Fineberg_obsessive_compulsive_screen",
        index1: "2",
      },
      {
        diseaseName: "Obsessive_Compulsive_Disorder_OCD",
        quizType: "OCD_Screen_by_Drs_Uher_Heyman",
        index1: "2",
      },
    ],
  },
  {
    question: "Depression",
    answer:
      "The PHQ-9 (Patient Health Questionnaire-9) is a widely used tool for screening and measuring the severity of depression. It provides a quick and reliable assessment of key depressive symptoms, guiding clinicians in diagnosis, treatment planning, and monitoring progress over time.",
    index: [
      {
        diseaseName: "Depression",
        quizType: "PHQ9",
        index1: "3",
      },
    ],
  },
  {
    question: "Bipolar Disorder",
    answer:
      "The Goldberg Bipolar Screening Quiz is a self-reported questionnaire designed to identify potential symptoms of bipolar disorder. It assists clinicians in flagging individuals who may benefit from further evaluation and treatment for bipolar disorder, enabling early intervention and management of this complex mood disorder.",
    index: [
      {
        diseaseName: "Bipolar_Disorder",
        quizType: "Goldberg_Bipolar_Screening_Quiz",
        index1: "4",
      },
    ],
  },
  {
    question: "Sensory Processing Disorders and Self Regulation Problems",
    answer:
      "This survey is designed to provide a quick assessment of whether you show signs and symptoms of sensory processing problems. However, no test is 100% accurate. No matter what your score is, you should seek help if you have any concerns about yourself or your loved ones",
    index: [
      {
        diseaseName:
          "Sensory_Processing_Disorders_and_Self_Regulation_Problems",
        quizType: "Screening_Tool",
        index1: "5",
      },
    ],
  },
];
