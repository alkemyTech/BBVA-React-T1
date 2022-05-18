import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Get, Delete } from "../../../Services/privateApiService";
import { News } from "../../News/News";

const NewsBackoffice = () => {
  const [data, setData] = useState([]);

  const getNewsData = async () => {
    try {
      const res = await Get(
        `${
          process.env.REACT_APP_URL_BASE_ENDPOINT +
          process.env.REACT_APP_URL_NEWS_PATH
        }`
      );
      return res.data.data;
    } catch (err) {
      return [];
    }
  };

  const deleteNews = async (id) => {
    try {
      const res = await Delete(
        `${
          process.env.REACT_APP_URL_BASE_ENDPOINT +
          process.env.REACT_APP_URL_NEWS_PATH +
          "/" +
          id
        }`
      );
    } catch (e) {
      return e;
    }
  };

  const setNews = (news) => {
    console.log(news);
    const rows = news.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image,
        createdAt: e.created_at,
      };
    });
    setData(rows);
  };

  const handleRows = async () => {
    const newsData = await getNewsData();
    await setNews(newsData);
  };

  useEffect(() => {
    handleRows();
  }, []);

  return (
    <div className="news-bo-container">
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <h1>Listado de novedades</h1>
        <Button variant="contained" color="primary" className="button-news">
          <Link className="top-links" to="/backoffice/news/create">
            Agregar novedad
          </Link>
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Fecha de creación</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((news) => (
                <TableRow key={news.id}>
                  <TableCell>{news.name}</TableCell>
                  <TableCell>{news.image}</TableCell>
                  <TableCell>{news.createdAt}</TableCell>
                  <TableCell>
                    <Link to={"/backoffice/news/" + news.id}>
                      <IconButton aria-label="edit" size="small">
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => deleteNews(news.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledEngineProvider>
    </div>
  );
};

export default NewsBackoffice;
