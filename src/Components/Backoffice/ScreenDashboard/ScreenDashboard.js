import React from "react";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MessageIcon from "@mui/icons-material/Message";
import FilterListIcon from "@mui/icons-material/FilterList";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import GroupIcon from "@mui/icons-material/Group";

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
  return <div>ScreenDashboard</div>;
};

export default ScreenDashboard;
