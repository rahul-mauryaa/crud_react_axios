import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { FiTrash2, FiEdit } from "react-icons/fi";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Student = () => {
  const [studentData, setStudentData] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [student, setStudent] = useState({
    rollno: "",
    name: "",
    last_name: "",
    city: "",
  });


  const studentList = () => {
    axios
      .get("http://localhost:8080/students")
      .then((response) => setStudentData(response.data));
  };

  const handeleDelete = (id) => {
    console.log("id", id);
    axios
      .delete(`http://localhost:8080/students/${id}`)
      .then((response) =>
        setStudentData(
          studentData.filter((stud) => stud.rollno !== response.data.rollno)
        )
      );
  };

  const handeleUpdate = (id) => {
    setUpdateStatus(true);
    axios
      .get(`http://localhost:8080/students/${id}`)
      .then((response) => setStudent(response.data[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student, "student");
    try {
      await axios.post("http://localhost:8080/students", {
        rollno: student.rollno,
        name: student.name,
        last_name: student.last_name,
        city: student.city,
      });
    } catch (error) {
      console.error(error);
    }
    studentList();
    setStudent({ name: "", last_name: "", city: "" });
  };

  const handleSubmitupdate = async (e,id) => {
    e.preventDefault();
    console.log(student, "student");
    try {
      await axios.patch(`http://localhost:8080/students/${id}`, {
        rollno: student.rollno,
        name: student.name,
        last_name: student.last_name,
        city: student.city,
      });
    } catch (error) {
      console.error(error);
    }
    setUpdateStatus(false);
    studentList();
    setStudent({ name: "", last_name: "", city: "" });
  };

  useEffect(() => {
    studentList();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 10,
          width: "auto",
        }}
      >
        {updateStatus === false ? (
          <h2>Add Student</h2>
        ) : (
          <h2>Update Student</h2>
        )}

        <Form style={{ width: "80%" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Roll No</Form.Label>
            
              <Form.Control
                type="number"
                disabled={updateStatus}
                value={student.rollno || ""}
                onChange={(e) =>
                  setStudent({ ...student, rollno: Number(e.target.value) })
                }
                placeholder="Enter Rollno"
              />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            
              <Form.Control
                type="text"
                value={student.name}
                onChange={(e) =>
                  setStudent({ ...student, name: e.target.value })
                }
                placeholder="Enter Your Name"
              />
           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Last Name</Form.Label>
           
              <Form.Control
                type="text"
                value={student.last_name}
                onChange={(e) =>
                  setStudent({ ...student, last_name: e.target.value })
                }
                placeholder="Enter Your Last Name"
              />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>City</Form.Label>
            
              <Form.Control
                type="text"
                value={student.city}
                onChange={(e) =>
                  setStudent({ ...student, city: e.target.value })
                }
                placeholder="Enter Your City"
              />
         
          </Form.Group>

          {updateStatus === false ? (
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                handleSubmitupdate(e,student.rollno);
              }}
            >
              Update
            </Button>
          )}
        </Form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "auto",
          marginTop: 10,
          paddingBottom: 25,
        }}
      >
        <h2>Student List</h2>
        <Table striped bordered hover style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentData &&
              studentData?.map((items, i) => {
                return (
                  <tr key={i}>
                    <td>{items.rollno}</td>
                    <td>{items.name}</td>
                    <td>{items.last_name}</td>
                    <td>{items.city}</td>
                    <td>
                      <span
                        onClick={() => handeleDelete(items.rollno)}
                        style={{ cursor: "pointer", marginRight: 10 }}
                      >
                        <FiTrash2 />
                      </span>
                      <span
                        onClick={() => handeleUpdate(items.rollno)}
                        style={{ cursor: "pointer" }}
                      >
                        <FiEdit />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Student;
