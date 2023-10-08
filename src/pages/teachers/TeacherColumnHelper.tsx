export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "createUserName",
    headerName: "Respectful Name",
    width: 150,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },

  {
    field: "createTime",
    headerName: "Create Time",
    width: 150,
  },

  {
    field: "updateTime",
    headerName: "updateTime",
    width: 150,
  },

  {
    field: "teaNo",
    headerName: "Teacher Number",
    width: 150,
  },

  {
    field: "teaName",
    headerName: "Teacher Name",
    width: 150,
  },

  {
    field: "teaPhone",
    headerName: "Phone",
    width: 150,
  },

  {
    field: "teaDesc",
    headerName: "Description",
    width: 100,
  },
  // {
  //   field: "teaStatus",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params: any) => {
  //     return (
  //       <div className={`cellWithStatus active`}>{params.row.teaStatus}</div>
  //     );
  //   },
  // },
];

//temporary data
// export const userRows = [
//   {
//     id: 1,
//     username: "Snow",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     status: "active",
//     email: "1snow@gmail.com",
//     age: 35,
//   },
// ];
