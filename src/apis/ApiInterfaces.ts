import axios from "axios";

//Get image code for the login page
export const getImageCode = async (uuid: string) => {
  console.log("uuid===" + uuid);
  return await axios.get(
    `${process.env.REACT_APP_BACK_END_URL}/login/getLoginImgCode/${uuid}`,
    {
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    }
  );
};
export const submitLogin = async (data: any) => {
  return await axios.post(`${process.env.REACT_APP_BACK_END_URL}/login/login`, {
    loginName: data.loginName,
    password: data.password,
    imageCode: data.imageCode,
    uuid: data.uuid,
  });
};