import React from "react";

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ActivitiesForm from "./Components/Activities/ActivitiesForm";
import CategoriesForm from "./Components/Categories/CategoriesForm";
import NewsForm from "./Components/News/NewsForm";
import SlidesForm from "./Components/Slides/SlidesForm";
import TestimonialForm from "./Components/Testimonials/TestimonialsForm";
import UserForm from "./Components/Users/UsersForm";
import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";
import MembersForm from "./Components/Members/MembersForm";
import ProjectsForm from "./Components/Projects/ProjectsForm";
import PublicLayout from "./Layout/PublicLayout";
import RegisterForm from "./Components/Auth/RegisterForm";
import LoginForm from "./Components/Auth/LoginForm";
import UsersList from "./Components/Users/UsersList";
import ShowSlides from "./Components/Slides/Show/ShowSlides";
import Nosotros from './Components/About/Nosotros';

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
            <Route path="/backoffice/Slides" component={ShowSlides} />
            <Route path="/create-activity" component={ActivitiesForm} />
            <Route path="/create-category" component={CategoriesForm} />
            <Route path="/create-news" component={NewsForm} />
            <Route path="/backoffice/create-slide" component={SlidesForm} />
            <Route path="/create-testimonials" component={TestimonialForm} />
            <Route path="/backoffice/users/create" component={UserForm} />
            <Route path="/create-member" component={MembersForm} />
            <Route path="/create-project" component={ProjectsForm} />
            <Route path="/backoffice/users" component={UsersList} />

            <PublicLayout>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/nosotros" component={Nosotros} />
              <Route path="/news" />
              <Route path="/testimonials" />
              <Route path="/contact" />
              <Route path="/school-campaign" component={SchoolCampaign} />
              <Route path="/toys-campaign" component={ToysCampaign} />
            </PublicLayout>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;