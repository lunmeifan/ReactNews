import React,{Component} from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import MediaQuery from 'react-responsive';
import App from './components/App';
import NewsContainer from './components/news_contanier';
import NewsDetail from './components/news_detail';
import UserCenter from './components/user_center';
import MobileApp from './components/MobileApp';
import MobileNewsContainer from './components/MobileNewsContainer';
import MobileNewsDetail from './components/MobileNewsDetail';
import MobileUserCenter from './components/MobileUserCenter'


render((
  <div>
    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={NewsContainer}></IndexRoute>
          <Route path='/news_detail/:xx/:type' component={NewsDetail}></Route>
          <Route path='/user_center' component={UserCenter}></Route>
        </Route>
    </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history ={hashHistory}>
        <Route path='/' component={MobileApp}>
          {/*<IndexRoute component={MobileNewsContainer}></IndexRoute>*/}
          {/*<Route path='/news_detail/:xx' component={MobileNewsDetail}></Route>*/}
          {/*<Route path='/user_center' component={MobileUserCenter}></Route>*/}
        </Route>
      </Router>
    </MediaQuery>
  </div>
),document.getElementById('root'))

