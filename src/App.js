import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ActivitiesForm from './Components/Activities/ActivitiesForm';
import CategoriesForm from './Components/Categories/CategoriesForm';
import NewsForm from './Components/News/NewsForm';
import SlidesForm from './Components/Slides/SlidesForm';
import TestimonialForm from './Components/Testimonials/TestimonialsForm';
import UserForm from './Components/Users/UsersForm';
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';
import MembersForm from './Components/Members/MembersForm';
import ProjectsForm from './Components/Projects/ProjectsForm';
import Nosotros from './Components/About/Nosotros';
import ContactForm from './Components/Contact/ContactForm.js';
import { BackofficeLayout } from './Layout/BackofficeLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
          <Route path="/create-user" component={UserForm} />
          <Route path="/school-campaign" component={SchoolCampaign} />
          <Route path="/toys-campaign" component={ToysCampaign} />
          <Route path="/Nosotros" component={Nosotros} />
          <Route path="/contact-form" component={ContactForm} />
          <BackofficeLayout>
            <Route path="/create-project" component={ProjectsForm} />
            <Route path="/create-member" component={MembersForm} />
            <Route path="/create-activity" component={ActivitiesForm} />
            <Route path="/create-category" component={CategoriesForm} />
            <Route path="/create-news" component={NewsForm} />
            <Route path="/backoffice/create-slide" component={SlidesForm} />
            <Route path="/create-testimonials" component={TestimonialForm} />
          </BackofficeLayout>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;