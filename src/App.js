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
      <h1>??????????????????????????????????????????????????????</h1>
      <hr />
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="title_name" className="formlabel col-2">
              ????????????????????????????????????
            </label>
            <select
              className="form-control col-2"
              id="exampleFormControlSelect1"
            >
              <option>?????????</option>
              <option>?????????</option>
              <option>??????????????????</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="first_name" className="formlabel">
              ????????????
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="????????????"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="formlabel">
              ????????????
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="????????????"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="first_name" className="formlabel">
              ????????????
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="????????????"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tel" className="formlabel">
              ????????????????????????
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
              ?????????????????????????????????????????????????????????
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
              ???????????????????????????????????????????????????????????????????????????
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
            ????????????????????????????????????
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="btn btn-primary" onClick={getUser}>
          ??????????????????????????????
        </button>
        <br />
        <br />
        {userList.map((val, key) => {
          return (
            <div className="user card">
              <div className="card-body text-left">
                <p className="card-text">????????????: {val.first_name}</p>
                <p className="card-text">?????????????????????: {val.last_name}</p>
                <p className="card-text">????????????: {val.age}</p>
                <p className="card-text">???????????????: {val.tel}</p>
                <p className="card-text">Email: {val.mail}</p>
                <p className="card-text">?????????????????????????????????????????????????????????: {val.type}</p>
                {/* <p className="card-text">resume: {val.resume}</p> */}
                <p className="card-text">?????????????????????: {val.address}</p>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="????????????????????????????????????"
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
