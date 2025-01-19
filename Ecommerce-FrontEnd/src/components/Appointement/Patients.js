import React, { useEffect, useState, useRef } from "react";
import Header from "../comps/header";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [display, setDisplay] = useState("none");
  const [message, setMessage] = useState("");
  const [classNameList, setClassNameList] = useState([]);
  const [sendList, setSendList] = useState([]);

  const refTime = useRef(null);
  const refDate = useRef(null);

  useEffect(() => {
    const id = JSON.parse(JSON.parse(sessionStorage.getItem("user"))).id;
    const link = `http://localhost:8080/http://localhost:8016/DoctorAI/Patients?id=${id}`;

    fetch(link, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPatients(data);
        // Initialize state for each button
        const initialClassNameList = Array(data.length).fill(
          "btn btn-dark ok19 btn-sm btn-rounded ok15"
        );
        const initialSendList = Array(data.length).fill("Accept");
        setClassNameList(initialClassNameList);
        setSendList(initialSendList);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  const onHandleClick = (e, email, index) => {
    const time = refTime.current.value;
    const date = refDate.current.value;
    const doctorName = JSON.parse(
      JSON.parse(sessionStorage.getItem("user"))
    ).username;
    const recipient = email;

    const link = `http://localhost:8080/http://localhost:8016/DoctorAI/Mail?time=${time}&date=${date}&doctor=${doctorName}&recipient=${recipient}`;

    fetch(link, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        setDisplay("block");
        setMessage("Email Was Sent Successfully");
        setTimeout(() => {
          setDisplay("none");
        }, 2000);
        // Update state for the specific button clicked
        const updatedClassNameList = [...classNameList];
        const updatedSendList = [...sendList];
        updatedSendList[index] = "sent";
        updatedClassNameList[index] =
          "btn btn-dark ok19 btn-sm btn-rounded ok15 ok16";
        setSendList(updatedSendList);
        setClassNameList(updatedClassNameList);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Email Failed"); // Log any errors that occur
      });
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
              Check Your Recent Patients
            </h5>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div
            className="alert alert-danger ok129"
            role="alert"
            style={{ display: display }}
          >
            {message}
          </div>
        </div>
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>
                <h7>Patients</h7>
              </th>
              <th>Addresse</th>
              <th>Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((Unit, index) => (
              <tr key={Unit.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`http://localhost:8016/DoctorAI/Image?fileName=/${Unit.imagePath}`}
                      alt=""
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                      }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1 ">{Unit.username}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1 ">{Unit.email}</p>
                </td>
                <td>
                  <input type="time" ref={refTime} />
                </td>
                <td>
                  <input type="date" ref={refDate} />
                </td>

                <td>
                  <button
                    type="button"
                    className={classNameList[index]}
                    onClick={(e) => onHandleClick(e, Unit.email, index)}
                  >
                    {sendList[index]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
