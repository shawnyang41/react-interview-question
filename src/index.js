import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Input } from 'antd';
import db from './db';
import { Collapse } from 'antd';
const Search = Input.Search;
const Panel = Collapse.Panel;
import { Button, Radio, Icon } from 'antd';
import Course from './course'
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import SearchPage from './search'

class Main extends React.Component{
  render(){
    return(
      
        <BrowserRouter>
          <Switch>
            <Route exact path='/edit' component={Course}></Route>
            <Route exact path='/' component={SearchPage}></Route>
          </Switch>
        </BrowserRouter>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'));