import axios from "axios";

export default function GetEmployees() {

  const getEmpleados = async () => {
    try{
      const { data } = await axios.get(`${process.env.REACT_APP_SERVIDOR}/api/v1/employees`)
      return data;
    }catch(e){
      console.error(e)
    }
  };

  return {getEmpleados};
}
