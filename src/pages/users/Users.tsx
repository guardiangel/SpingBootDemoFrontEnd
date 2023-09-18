import { useState, useEffect } from "react";
import { UserMode } from "../../interfaces/commonInterfaces";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { colorTokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginState } from "../../reducers/LoginReducerSlice";
import { getAllUsers, deleteUserById } from "../../apis/ApiInterfaces";

const Users = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [users, setUsers] = useState<UserMode[]>([]);
  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "loginName",
      headerName: "LoginName",
      flex: 1,
      cellClassName: "name-column-cell",
    },
    {
      field: "userName",
      headerName: "UserName",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "createTime",
      headerName: "Create Time",
      flex: 1,
    },
    {
      field: "createBy",
      headerName: "Creator",
      flex: 1,
    },
    {
      field: "Detail", // this field doesn't exist in the PostsMode, just make it up for buttons.
      headerName: "Operate",
      flex: 1,
      renderCell: ({ row: { id } }: UserRow) => {
        const handleClick = (e: any) => {
          e.stopPropagation();
          //The path "/userDetail/*" defined in the MainPage. MainPage comes from "/mainPage" which comes frm App.tsx.
          //so we need to add the full path. Pay attention to that we use "/userDetail/:id" here.
          navigate(`/mainPage/userDetail/${id}`);
        };

        //delete record
        const handleDelete = (e: any) => {
          if (window.confirm("Make sure to delete?")) {
            e.stopPropagation();
            deleteUserById(loginStateObject.token, id)
              .then((res) => {
                if (res.data?.code === "0000") {
                  alert("Delete user successfully.");
                  setUsers(users.filter((user) => user.id !== id));
                } else {
                  alert(res.data?.data?.message);
                }
              })
              .catch((err) => {
                alert(err);
              });
          }
        };

        return (
          <div>
            <Button
              sx={{ width: "80px", backgroundColor: colors.grey[200] }}
              onClick={handleClick}
            >
              <Typography
                color={colors.greenAccent[400]}
                sx={{ ml: "5px", fontSize: "16px" }}
              >
                detail
              </Typography>
            </Button>
            <Button
              sx={{
                width: "80px",
                backgroundColor: colors.grey[200],
                marginLeft: "20px",
              }}
              onClick={handleDelete}
            >
              <Typography
                color={colors.greenAccent[400]}
                sx={{ ml: "5px", fontSize: "16px" }}
              >
                delete
              </Typography>
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    //acessToken is the third param, so put the empty object in the second position.
    getAllUsers(loginStateObject.token).then((res) => {
      if (res.data?.code === "0000") {
        setUsers(res.data?.data);
      } else {
        alert(res.data);
      }
    });
  }, [loginStateObject.token]);

  return (
    <Box m="5px">
      <Box
        m="40px 0 0 0 "
        height="90vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          //defined in the above columns
          "& .name-column-cell": {
            color: colors.redAccent[500],
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400], //400 or 900 works better
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.primary[400],
            borderTop: "none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[100]} !important`,
          },
          "& .MuiTablePagination-selectLabel": {
            fontSize: "16px",
            color: colors.blueAccent[400],
          },
          "& .MuiTablePagination-displayedRows": {
            fontSize: "16px",
            color: colors.blueAccent[400],
          },
          "& .MuiInputBase-input": {
            fontSize: "16px",
            color: colors.blueAccent[400],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.blueAccent[400]} !important`,
            fontSize: "18px",
          },
        }}
      >
        <DataGrid
          sx={{
            fontSize: "20px",
          }}
          checkboxSelection
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

interface UserRow {
  row: UserMode;
}

export default Users;
