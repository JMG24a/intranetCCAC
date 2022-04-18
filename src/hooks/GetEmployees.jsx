import axios from "axios";
import { useEffect, useState } from "react";

const GetEmployees = () => {
  const [accounts, setAccounts] = useState([]);

  const getAcc = async () => {
    await axios
      .get("http://localhost:3001/api/v1/employees")
      .then((res) => setAccounts(res.data.employees))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAcc();
  }, []);
  return accounts;
};

export default GetEmployees;