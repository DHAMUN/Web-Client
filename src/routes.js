import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { HomeApp } from 'containers/HomeApp';
import { DelegateDashboardApp } from 'containers/DelegateDashboardApp';
import { ChairDashboardApp } from 'containers/ChairDashboardApp';

import { Home } from 'containers/Home';
import { Login } from 'containers/Login';
import { Logout } from 'containers/Logout';
import { SignUp } from 'containers/SignUp';
import { Vote } from 'containers/Vote';
import { Attendance } from 'containers/Attendance';
import { ChairVote } from 'containers/ChairVote';

import { VoteAction } from 'containers/VoteAction';
import { Resolutions } from 'containers/Resolutions';
import { ResolutionsAction } from 'containers/ResolutionsAction';


import { DelegateDashboardHome } from 'containers/DelegateDashboardHome';
import { ChairDashboardHome } from 'containers/ChairDashboardHome';

import { requireAuthentication } from 'components/AuthenticatedComponent';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/home"/>

    <Route path="/home" component={HomeApp}>
      <IndexRoute component={Home}/>
      <Route path="/home/login" component={Login}/>
      <Route path="/home/signup/:hash/" component={SignUp}/>


    </Route>

    <Route path="/dashboard">
      <IndexRedirect to="/home"/>

      <Route path="/dashboard/attendance" component={Attendance}/>

      <Route path="/dashboard/delegate" component={requireAuthentication(DelegateDashboardApp, "Delegate")}>
        <IndexRoute component={DelegateDashboardHome}/>
        <Route path="/dashboard/delegate/attendance" component={Attendance}/>
        <Route path="/dashboard/delegate/vote" component={Vote}/>
        <Route path="/dashboard/delegate/vote/:name" component={VoteAction}/>
        <Route path="/dashboard/delegate/resolutions" component={Resolutions}/>
        <Route path="/dashboard/delegate/resolutions/:name" component={ResolutionsAction}/>
      </Route>

      <Route path="/dashboard/chair" component={requireAuthentication(ChairDashboardApp, "Chair")}>
        <IndexRoute component={ChairDashboardHome}/>
        <Route path="/dashboard/chair/attendance" component={Attendance}/>
        <Route path="/dashboard/chair/vote" component={ChairVote}/>
        <Route path="/dashboard/chair/vote/:name" component={VoteAction}/>
        <Route path="/dashboard/chair/resolutions" component={Resolutions}/>
        <Route path="/dashboard/chair/resolutions/:name" component={ResolutionsAction}/>
      </Route>
      
      <Route path="/dashboard/logout" component={Logout}/>

    </Route>


    <Route status={404} path="*" component={HomeApp} />
  </Route>

);