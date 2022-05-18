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
import Nosotros from "./Components/About/Nosotros";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ContactForm from "./Components/Contact/ContactForm.js";
import ActivitiesList from "./Components/Activities/ActivitiesList.js";
import PublicLayout from "./Layout/PublicLayout";
import RegisterForm from "./Components/Auth/RegisterForm";
import LoginForm from "./Components/Auth/LoginForm";
import { News } from "./Components/News/News";
import UsersList from "./Components/Users/UsersList";
import ShowSlides from "./Components/Slides/Show/ShowSlides";
import Contact from "./Components/Contact/Contact";
import BackofficeLayout from './Layout/BackofficeLayout';


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Route exact path="/backoffice/*">
            <BackofficeLayout>
              <Switch>
                <Route exact path="/backoffice/slides" component={ShowSlides} />
                <Route
                  exact
                  path="/backoffice/slides/create"
                  component={SlidesForm}
                />
                <Route
                  exact
                  path="/backoffice/slides/:id"
                  component={SlidesForm}
                />
                <Route
                  exact
                  path="/create-activity"
                  component={ActivitiesForm}
                />

                <Route
                  exact
                  path="/backoffice/activity/:id"
                  component={ActivitiesForm}
                />
                <Route
                  exact
                  path="/backoffice/activity"
                  component={ActivitiesForm}
                />
                <Route exact path="/activities" component={ActivitiesList} />

                <Route
                  exact
                  path="/backoffice/create-category"
                  component={CategoriesForm}
                />
                <Route
                  exact
                  path="/backoffice/create-news"
                  component={NewsForm}
                />

                <Route
                  exact
                  path="/backoffice/testimonials/create"
                  component={TestimonialForm}
                />
                <Route
                  exact
                  path="/backoffice/testimonials/:id"
                  component={TestimonialForm}
                />

                <Route
                  exact
                  path="/backoffice/users/create"
                  component={UserForm}
                />
                <Route
                  exact
                  path="/backoffice/users/:id"
                  component={UserForm}
                />
                <Route exact path="/backoffice/users" component={UsersList} />
                <Route
                  exact
                  path="/backoffice/create-member"
                  component={MembersForm}
                />
                <Route
                  exact
                  path="/backoffice/create-project"
                  component={ProjectsForm}
                />
              </Switch>
            </BackofficeLayout>
          </Route>
          <Route exact path="/:path?">
            <PublicLayout>
              <Switch>
                {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/news" component={News} />
                <Route path="/nosotros" component={Nosotros} />
                <Route path="/news" />
                <Route path="/testimonials" />
                <Route path="/contact" component={Contact} />
                <Route path="/school-campaign" component={SchoolCampaign} />
                <Route path="/toys-campaign" component={ToysCampaign} />
                <Route path="/contact-form" component={ContactForm} />
              </Switch>
            </PublicLayout>
          </Route>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
