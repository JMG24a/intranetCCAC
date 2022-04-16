import axios from "axios";
import React, { useEffect, useState } from "react";

const OwnerModal = ({ idDeal, deals }) => {
  const [employees, setEmployees] = useState([]);
  const [checked, setChecked] = useState([]);
  const getEmployees = () => {
    axios
      .get("http://localhost:3001/api/v1/employees")
      .then((res) => setEmployees(res.data.employees))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEmployees();

    // const newDeal = deals.filter((item) => {
    //   return item.id === idDeal;
    // });
    // setChecked(newDeal[0].owner);
  }, []);

  return (
    <div>
      <div className="fondoOwnerModal">
        <div className="bg-white rounded p-3">
          <h3 className="text-center">Seleccione los Owner</h3>

          <h3></h3>
          <table className="table">
            <tbody>
              {employees.map((item, index) => (
                <tr key={index}>
                  <td>{item.nameEmployee}</td>
                  <td>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(e) => {
                        // console.log(idDeal, item.id);
                      }}
                    />
                  </td>
                </tr>
              ))}

              <tr>
                {checked.map((item) =>
                  item.nameEmployee ? (
                    <tr>
                      <td> {item.nameEmployee}</td>
                      <td>
                        <input
                          type="checkbox"
                          name="test"
                          id="test"
                          checked
                          style={{ width: "20px" }}
                        />
                      </td>
                    </tr>
                  ) : (
                    <input type="checkbox" name="" id="" />
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerModal;
