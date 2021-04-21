import Axios from "axios";
import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const [first_name, setFirstName] = useState([""]);
  const [last_name, setLastName] = useState([""]);
  const [age, setAge] = useState([0]);
  const [tel, setTel] = useState([""]);
  const [mail, setMail] = useState([""]);
  const [type, setType] = useState([""]);
  // const [resume, setResume] = useState([""]);
  const [address, setAddress] = useState([""]);
  const [newAddress, setNewAddress] = useState([""]);

  const [userList, setUserList] = useState([]);

  const getUser = () => {
    Axios.get("http://localhost:3001/user").then((Response) => {
      setUserList(Response.data);
    });
  };

  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      first_name: first_name,
      last_name: last_name,
      age: age,
      tel: tel,
      mail: mail,
      type: type,
      // resume: resume,
      address: address,
    }).then(() => {
      setUserList([
        ...userList,
        {
          first_name: first_name,
          last_name: last_name,
          age: age,
          tel: tel,
          mail: mail,
          type: type,
          // resume: resume,
          address: address,
        },
      ]);
    });
  };

  const updateUserData = (id) => {
    Axios.put("http://localhost:3001/update", {
      address: newAddress,
      id: id,
    }).then((Response) => {
      setUserList(
        userList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                first_name: val.first_name,
                last_name: val.last_name,
                age: val.age,
                tel: val.tel,
                mail: val.mail,
                type: val.type,
                // resume: resume,
                address: newAddress,
              }
            : val;
        })
      );
    });
  };

  const deleteUserData = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App container">
      <h1>กรอกประวัติส่วนตัว</h1>
      <hr />
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="title_name" className="formlabel col-2">
              คำนำหน้าชื่อ
            </label>
            <select
              className="form-control col-2"
              id="exampleFormControlSelect1"
            >
              <option>นาย</option>
              <option>นาง</option>
              <option>นางสาว</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="first_name" className="formlabel">
              ชื่อ
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="ชื่อ"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="formlabel">
              สกุล
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="สกุล"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="first_name" className="formlabel">
              อายุ
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="อายุ"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tel" className="formlabel">
              เบอร์โทร
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="09XXXXXXXX"
              onChange={(event) => {
                setTel(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mail" className="formlabel">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="sample@mail.com"
              onChange={(event) => {
                setMail(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type_job" className="formlabel">
              ประเภทงานที่ต้องการ
            </label>
            <input
              className="form-control"
              id=""
              onChange={(event) => {
                setType(event.target.value);
              }}
            ></input>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="resume" className="formlabel">
              Upload Resume
            </label>
            <input
              type="file"
              name="file"
              className="form-control"
              onChange={(e) => this.handleFile(e)}
            />
            <br />
            <button className="btn btn-success" onClick={addUser}>
              Upload
            </button>
          </div> */}
          <div className="mb-3">
            <label htmlFor="address" className="formlabel">
              ที่อยู่ที่สามารถติดต่อได้
            </label>
            <textarea
              type="text"
              className="form-control"
              rows="3"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addUser}>
            บันทึกข้อมูล
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="btn btn-primary" onClick={getUser}>
          แสดงข้อมูล
        </button>
        <br />
        <br />
        {userList.map((val, key) => {
          return (
            <div className="user card">
              <div className="card-body text-left">
                <p className="card-text">ชื่อ: {val.first_name}</p>
                <p className="card-text">นามสกุล: {val.last_name}</p>
                <p className="card-text">อายุ: {val.age}</p>
                <p className="card-text">เบอร์: {val.tel}</p>
                <p className="card-text">Email: {val.mail}</p>
                <p className="card-text">ประเภทงานที่ต้องการ: {val.type}</p>
                {/* <p className="card-text">resume: {val.resume}</p> */}
                <p className="card-text">ที่อยู่: {val.address}</p>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="แก้ไขที่อยู่"
                    className="from-control"
                    onChange={(event) => {
                      setNewAddress(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      updateUserData(val.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUserData(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
