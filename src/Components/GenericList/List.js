import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { create } from '@mui/material/styles/createTransitions';
import {StyledEngineProvider, CssBaseline } from '@mui/material';
import { GetAppContext } from '../../index';
import './GenericList.css';


/**
 * Componente "genérico" que crea una tabla con su header fixed:
 * 
 *  REQUISITOS:
 *    -columnsHeaders := Array de los nombres de cada columna -> {'header1', 'header2',...}
 *    -rows := Array de objeto row con los valores x fila -> {header1: val1-1,header2: val1-2,header3: val1-3,...}  
 *  
 * DEVUELVE:
 *    - Una tabla con los valores ingresados.
 * 
 */


const createList = col => {
    const columnsH = [];
    col.forEach(header =>{
      columnsH.push({id: header, label: header, minWidth: 'auto', align: 'center' })
    });
    return columnsH;
}

const List = ({columnsHeaders=[], rows=[]}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns, setColumns] = useState([]);
  const { appData, setAppData } = GetAppContext();

  const setSpinner = (open) => {
    setAppData((prevState) => ({
      ...prevState,
      spinner: {
        open: open,
      },
    }));
  };
  const setSnackBar = (message, severity) => {
    setAppData((prevState) => ({
      ...prevState,
      snackbar: {
        ...prevState.snackbar,
        message: message,
        severity: severity,
        open: true,
      },
    }));
  };

  const handleChangePage = (event, newPage) => { setPage(newPage); };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => { setColumns(createList(columnsHeaders)); }, []);
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell className="table-cell-header"
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </StyledEngineProvider>
  );
}



export default List;
