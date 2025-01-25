import axios from "axios";

export const AxiosConfig = async (url, method, ReqHeader, ReqBody) => {
  const reqConfig = {
    url,
    method: method,
    headers: ReqHeader ? ReqHeader : { "Content-Type": "application/json" },
    data: ReqBody,
  };
  console.log("Request Config:", reqConfig);
  try {
    const res = await axios(reqConfig);
    return res;
  } catch (err) {
    console.log("Error:", err);
    
    return err;
  }
};
