import React from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MessageIcon from "@mui/icons-material/Message";
import FilterListIcon from "@mui/icons-material/FilterList";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import GroupIcon from "@mui/icons-material/Group";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink as Link } from "react-router-dom";
import "./ScreenDashboard.css";

const ScreenDashboard = () => {
  const navMenu = [
    { name: "Novedades", link: "/backoffice/news", icono: NewspaperIcon },
    {
      name: "Actividades",
      link: "/backoffice/activities",
      icono: FormatListNumberedIcon,
    },
    {
      name: "Categorias",
      link: "/backoffice/categories",
      icono: FormatListBulletedIcon,
    },
    {
      name: "Testimonios",
      link: "/backoffice/testimonials",
      icono: MessageIcon,
    },
    {
      name: "Organización",
      link: "/backoffice/organization",
      icono: FilterListIcon,
    },
    { name: "Slides", link: "/backoffice/slides", icono: DriveFileMoveIcon },
    { name: "Usuarios", link: "/backoffice/users", icono: GroupIcon },
    { name: "Miembros", link: "/backoffice/members", icono: GroupIcon },
  ];

  return (
    <div className="dashboard-container">
      {navMenu.map((item) => (
        <div key={item.name} className="dashboard-card">
          <Card variant="outlined" sx={{ maxWidth: 275, minWidth: 100 }}>
            <div className="card-contents">
              <CardContent>
                <div className="card-title">
                  <Typography>{item.name}</Typography>
                </div>
                <Typography>
                  <item.icono className="card-icon" />
                </Typography>
              </CardContent>
              <CardActions>
                <div className="card-actions-contents">
                  <Button className="card-button">
                    <Link className={"card-link"} to={item.link}>
                      Ir
                    </Link>
                  </Button>
                </div>
              </CardActions>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ScreenDashboard;
