import React from "react";

const Leads = () => {
  return (
    <div className="bg-white p-4">
      <h1>Leads</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Move</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pedro Perez</td>
            <td>
              <button className="btn btn-primary">Asignar</button>
            </td>
            <td>
              <select name="" id="" className="form-control">
                <option value="- Seleccione -">- Seleccione -</option>
              </select>
            </td>
            <td>
              <button className="btn btn-primary">Mover a Contactos</button>
            </td>
            <td>
              <input type="email" name="" id="" className="form-control" />
            </td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leads;
