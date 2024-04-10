import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useDateFormater from "../../../hooks/useDateFormater";
import { Customer } from "../../../store/type";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  tableRow: {
    borderBottom: "1px solid #e0e0e0",
    marginBottom: 40,
  },
  tableContainer: {
    width: "100%",
    border: "none",
  },
  accorionDetails: {
    padding: 0,
    margin: 0,
    zIndex: -1,
  },
  accordionSummary: {
    backgroundColor: "#f7f7f7",
    flexDirection: "row-reverse", // Aligns icon to the left
    marginTop: "72px",
  },
  tableCell: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: "4px 8px",
    textOverflow: "ellipsis",
    height: "50px",
  },
  tableCellNoEllipsis: {
    padding: "4px 8px",
  },
  accordion: {
    zIndex: 0,
  },
}));

interface Column {
  name: string;
  width: string;
}

const columns: Column[] = [
  { name: "NAME", width: "16%" },
  { name: "ADDRESS", width: "15%" },
  { name: "EMAIL", width: "25%" },
  { name: "CONTACT", width: "10%" },
  { name: "GST NO", width: "15%" },
  { name: "REGISTERED", width: "10%" },
  { name: "ACTION", width: "10%" },
];

const rowsPerPage: number = 25; // Number of records per page

const CutRecordTable: React.FC<{ records: Customer[] }> = ({ records }) => {
  const [page, setPage] = useState<number>(1);
  const [displayedRecords, setDisplayedRecords] = useState<JSX.Element[]>([]);

  const { dateFormater } = useDateFormater();
  const classes = useStyles();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const renderLogs = useCallback(() => {
    const startIndex: number = (page - 1) * rowsPerPage;
    const endIndex: number = startIndex + rowsPerPage;

    return records
      .slice(startIndex, endIndex)
      .map((row: Customer, rowIndex: number) => (
        <TableRow key={rowIndex}>
          <TableCell className={classes.tableCell}>
            <Link to={`/admin/customers/${row._id}`}>
              {row.name + " " + row.last_name}
            </Link>
          </TableCell>
          <TableCell className={classes.tableCellNoEllipsis}>
            {row.address}
          </TableCell>
          <TableCell className={classes.tableCellNoEllipsis}>
            {row.email}
          </TableCell>
          <TableCell className={classes.tableCell}>{row.contact}</TableCell>
          <TableCell className={classes.tableCell}>{row.gst_number}</TableCell>
          <TableCell className={classes.tableCell}>
            {dateFormater(row.createdAt ?? "")}
          </TableCell>
          <TableCell className={classes.tableCell}>Action</TableCell>
        </TableRow>
      ));
  }, [records, page, classes.tableCell, classes.tableCellNoEllipsis]);

  useEffect(() => {
    setDisplayedRecords(renderLogs());
  }, [renderLogs]);

  return (
    <div className="mr-10">
      <Grid container>
        <Grid item className={classes.tableContainer}>
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      style={{
                        maxWidth: column.width,
                        margin: 0,
                        padding: "8px",
                      }}
                      className={classes.tableCell}
                    >
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{displayedRecords}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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
    </div>
  );
};

export default CutRecordTable;
