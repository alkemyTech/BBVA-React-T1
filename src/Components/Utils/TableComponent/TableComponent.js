import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableComponent = ({columnNames}) => {

    const slidesEndpoint = process.env.REACT_APP_URL_BASE_ENDPOINT + process.env.REACT_APP_URL_SLIDES;
    


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const deleteButton = (onClick) =>{
          return(
            <IconButton aria-label="delete" size="small">
                <DeleteIcon />
            </IconButton>
          )
      }

      const editIcon = (onClick) => {
        return(
            <IconButton aria-label="delete" size="small">
                <EditIcon />
            </IconButton>
          )
      }

      const rows = [
        createData('Super titulo', 159, 6.0, editIcon(), deleteButton()),
        createData('Ice cream sandwich', 237, 9.0, editIcon(), deleteButton()),
        createData('Eclair', 262, 16.0, editIcon(), deleteButton()),
        createData('Cupcake', 305, 3.7, editIcon(), deleteButton()),
        createData('Gingerbread', 356, 16.0, editIcon(), deleteButton()),
      ];



    return(
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        {columnNames.map(val => (<StyledTableCell >{val}</StyledTableCell>))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell >{row.calories}</StyledTableCell>
                            <StyledTableCell >{row.fat}</StyledTableCell>
                            <StyledTableCell >{row.carbs}</StyledTableCell>
                            <StyledTableCell >{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableComponent;