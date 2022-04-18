import axios from "axios";
import { useEffect, useState } from "react";

const GetAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  const getAcc = async () => {
    await axios
      .get("http://localhost:3001/api/v1/accounts")
      .then((res) => setAccounts(res.data.accounts))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAcc();
  }, []);
  return accounts;
};

export default GetAccounts;
