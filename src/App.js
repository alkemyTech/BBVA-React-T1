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




function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
            <Route path="/backoffice/create-activity" component={ActivitiesForm} />
            <Route path="/backoffice/create-category" component={CategoriesForm} />
            <Route path="/backoffice/create-news" component={NewsForm} />
            <Route path="/backoffice/create-slide" component={SlidesForm} />
            <Route path="/backoffice/create-testimonials" component={TestimonialForm} />
            <Route path="/backoffice/create-user" component={UserForm} />
            <Route path="/backoffice/create-member" component={MembersForm} />
            <Route path="/backoffice/create-project" component={ProjectsForm} />

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
