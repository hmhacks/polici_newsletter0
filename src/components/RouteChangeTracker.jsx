import React from 'react'
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
const RouteChangeTracker = ({ history }) => {

  history.listen((location, action) => {
    // console.log("page view " + location.pathname);
    // // ReactGA.set({ page: location.pathname });
    // ReactGA.pageview(location.pathname);
  });

  return <div></div>;
};

export default withRouter(RouteChangeTracker);