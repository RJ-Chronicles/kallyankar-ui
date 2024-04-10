import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Customer } from "../../../store/type";
import { CUSTOMER_TABLE_COLUMN } from "./columns";
import useDateFormater from "../../../hooks/useDateFormater";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
  tableCell: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: "2px 4px",
    textOverflow: "ellipsis",
    height: "30px",
  },
  heading: {
    backgroundColor: "#600080",
    padding: "0px",
  },
  headingTableCell: {
    color: "#ffffff",
    padding: "6px 4px",
  },
  bodyRow: {
    padding: "2px 4px",
  },
});
const rowsPerPage: number = 5; // Number of records per page
const RecordTable: React.FC<{ records: Customer[] }> = ({ records }) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(1);
  const { dateFormater } = useDateFormater();

  const startIndex: number = (page - 1) * rowsPerPage;
  const endIndex: number = startIndex + rowsPerPage;

  const handleEdit = (id: string | undefined) => {
    // Implement edit functionality here
    console.log(`Editing record with ID: ${id}`);
  };

  const handleDelete = (id: string | undefined) => {
    // Implement delete functionality here
    console.log(`Deleting record with ID: ${id}`);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.heading}>
              {CUSTOMER_TABLE_COLUMN.map((col, index) => (
                <TableCell className={classes.headingTableCell} key={index}>
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {records.slice(startIndex, endIndex).map((record) => (
              <TableRow key={record._id} className={classes.bodyRow}>
                <TableCell className={classes.tableCell}>
                  <Link to={`/admin/customers/${record._id}`}>
                    {record.name + " " + record.last_name}
                  </Link>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {record.address}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {record.email}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {record.contact}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {record.gst_number}
                </TableCell>

                <TableCell className={classes.tableCell}>
                  {dateFormater(record?.createdAt ?? "")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton
                    onClick={() => handleEdit(record._id)}
                    color="primary"
                  >
                    {" "}
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(record._id)}
                    color="secondary"
                  >
                    {" "}
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {records.length > rowsPerPage && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={Math.ceil(records.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </>
  );
};

export default RecordTable;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Theme,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { Customer } from "../../../store/type";
// import { CUSTOMER_TABLE_COLUMN } from "./columns";
// import useDateFormater from "../../../hooks/useDateFormater";

// import { makeStyles } from "@mui/styles";
// interface RecordTableProps {
//   records: Customer[];
// }

// const useStyles = makeStyles((theme: Theme) => ({
//   table: {
//     minWidth: 300,
//   },
//   tableCell: {
//     padding: "4px",
//     [theme.breakpoints.down("sm")]: {
//       padding: "4px",
//     },
//   },
//   heading: {
//     backgroundColor: theme.palette.primary.main,
//   },
//   headingText: {
//     color: theme.palette.primary.contrastText,
//     fontWeight: "bold",
//   },
//   bodyRow: {
//     "&:hover": {
//       backgroundColor: "#f5f5f5",
//     },
//   },
// }));

// const RecordTable: React.FC<RecordTableProps> = ({ records }) => {
//   const classes = useStyles();
//   const { dateFormater } = useDateFormater();
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleEdit = (id: string | undefined) => {
//     // Implement edit functionality here
//     console.log(`Editing record with ID: ${id}`);
//   };

//   const handleDelete = (id: string | undefined) => {
//     // Implement delete functionality here
//     console.log(`Deleting record with ID: ${id}`);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow className={classes.heading}>
//             {CUSTOMER_TABLE_COLUMN.map((col, index) => (
//               <TableCell
//                 key={index}
//                 className={`${classes.tableCell} ${classes.headingText}`}
//               >
//                 {col}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {records.map((record) => (
//             <TableRow key={record._id} className={classes.bodyRow}>
//               <TableCell className={classes.tableCell}>
//                 <Link to={`/admin/customers/${record._id}`}>
//                   {isSmallScreen
//                     ? record.name[0] + record.last_name[0]
//                     : record.name + " " + record.last_name}
//                 </Link>
//               </TableCell>
//               <TableCell className={classes.tableCell}>
//                 {record.address}
//               </TableCell>
//               <TableCell className={classes.tableCell}>
//                 {record.email}
//               </TableCell>
//               <TableCell className={classes.tableCell}>
//                 {record.contact}
//               </TableCell>
//               <TableCell className={classes.tableCell}>
//                 {record.gst_number}
//               </TableCell>

//               <TableCell className={classes.tableCell}>
//                 {dateFormater(record?.createdAt ?? "")}
//               </TableCell>
//               <TableCell className={classes.tableCell}>
//                 <IconButton
//                   onClick={() => handleEdit(record._id)}
//                   color="primary"
//                 >
//                   {" "}
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={() => handleDelete(record._id)}
//                   color="secondary"
//                 >
//                   {" "}
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default RecordTable;
