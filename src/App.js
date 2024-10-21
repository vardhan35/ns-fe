import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [allStudents, setALlStudents] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [toDelete, setToDelete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    marks: "",
    id: uuidv4(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createStudents = async (e) => {
    e.preventDefault();
    console.log("LOG FOR E HERE----->", formData);
    const response = await axios.post(
      "http://localhost:3001/students",
      formData
    );
    console.log("LOG FOR RESPNSE HERE------>", response);
    clearForm();
    getAllStudents();
  };

  const handleUpdate = (student) => {
    setToDelete(true);
    setFormData(student);
  };

  const updateStudents = async (student) => {
    const response = await axios.put(
      "http://localhost:3001/students",
      formData
    );
    console.log("LOG FOR RESPNSE HERE------>", response);
    clearForm();
    getAllStudents();
    setToDelete(false);
  };

  const deleteStudents = async (id) => {
    console.log("id ehre----->", id);
    const response = await axios.post("http://localhost:3001/students/delete", {
      id: id,
    });
    console.log(" [ deleteStudents ] ", response);
    getAllStudents();
  };

  const getAllStudents = async () => {
    const response = await axios.get("http://localhost:3001/students");
    setALlStudents(response.data.data);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      marks: "",
      id: uuidv4(),
    });
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="App">
      <div style={{ width: "70%", margin: "2em auto" }}>
        <Form
          onSubmit={(e) => (toDelete ? updateStudents(e) : createStudents(e))}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Marks</Form.Label>
            <Form.Control
              required
              type="Name"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              placeholder="500"
            />
          </Form.Group>
          <Button type="submit" variant="success">
            {toDelete ? "Update Student" : "Create Student"}
          </Button>
        </Form>
      </div>

      <div style={{ width: "70%", margin: "2em auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Name</th>
              <th>Marks</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((student) => {
              return (
                <tr>
                  {/* // <td>{student.id}</td> deleteStudents */}
                  <td>{student.name}</td>
                  <td>{student.marks}</td>
                  <td onClick={() => handleUpdate(student)}>Edit</td>
                  <td onClick={() => deleteStudents(student.id)}>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
