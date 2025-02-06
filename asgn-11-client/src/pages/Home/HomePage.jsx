import React from 'react';
import Banner from './Banner';
import TopFoods from './TopFoods';
import Discount from './Discount';
import Faq from './Faq';
import AboutUs from './AboutUs';
import Explore from './Explore';
import JoinUs from './JoinUs';
import Feedback from './Feedback';

const Home = () => {
  return (
    <div>
      <Banner />
      
      <TopFoods />
      
      <Faq />
      <Discount />
      <Explore />
      <JoinUs />
      <AboutUs />
      <Feedback />

    </div>
  );
};

export default Home;