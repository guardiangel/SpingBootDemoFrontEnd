import axios from "axios";

//Get image code for the login page
export const getImageCode = async (uuid: string) => {
  return await axios.get(
    `${process.env.REACT_APP_BACK_END_URL}/login/getLoginImgCode/${uuid}`
    /* {
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    } */
  );
};
//Submit the login form
export const submitLogin = async (data: any) => {
  return await axios.post(`${process.env.REACT_APP_BACK_END_URL}/login/login`, {
    loginName: data.loginName,
    password: data.password,
    imageCode: data.imageCode,
    uuid: data.uuid,
  });
};

//getAllUsers
export const getAllUsers = async (token: string) => {
  return await axios.post(
    `${process.env.REACT_APP_BACK_END_URL}/users/getAllUsers`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );
};

//Get single user
export const getUserById = async (token: string, id: number | undefined) => {
  return await axios.post(
    `${process.env.REACT_APP_BACK_END_URL}/users/getOnlineUserById`,
    {
      id: id,
    },
    {
      headers: {
        token: token,
      },
    }
  );
};

//update userInfo
export const updateUserInfo = async (token: string, data: any) => {
  return await axios.post(
    `${process.env.REACT_APP_BACK_END_URL}/users/updateSysUserInfo`,
    {
      id: data.id,
      userName: data.userName,
      phonenumber: data.phonenumber,
      sex: data.sex,
    },
    {
      headers: {
        token: token,
      },
    }
  );
};

//Delete user
export const deleteUserById = async (token: string, id: number) => {
  return await axios.post(
    `${process.env.REACT_APP_BACK_END_URL}/users/deleteSysUserById`,
    {
      id: id,
    },
    {
      headers: {
        token: token,
      },
    }
  );
};
