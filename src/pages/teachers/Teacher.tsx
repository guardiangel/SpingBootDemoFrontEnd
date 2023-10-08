import "./teacher.css";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { userColumns } from "./TeacherColumnHelper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginState } from "../../reducers/LoginReducerSlice";
import { getAllTeachers } from "../../apis/ApiInterfaces";

const Teacher = () => {
  const loginStateObject = useSelector(
    (state: LoginState) => state.loginStateObject
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    //acessToken is the third param, so put the empty object in the second position.
    getAllTeachers(loginStateObject.token).then((res) => {
      if (res.data?.code === "0000") {
        setData(res.data?.data);
      } else {
        alert(res.data);
      }
    });
  }, [loginStateObject.token]);

  const handleDelete = (id: any) => {
    //setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Teacher
        <Link to="/teacher/new" className="link">
          Add Teacher
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
};

export default Teacher;
