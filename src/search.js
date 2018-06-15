import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Radio, Icon, Input, Collapse} from 'antd';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import './css/index.css';
import db from './db';
import Course from './course'

const Search = Input.Search;
const Panel = Collapse.Panel;



class SearchPage extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        courses : [],
        loading : 'false'
      }
    }
    search(target){
      var that = this;
      var newState = this.state
      newState.loading = 'true';
      this.setState(newState);
      console.log(db.search(target.trim(), function(courses){
        that.setState({
          courses: courses,
          loading : 'false'
        })
        console.log('from frontend');
        console.log(that.state.courses);
      }));
    }
    render(){
  
      var courses = this.state.courses.map((item, index) => {
        
        return( 
          <Panel header={item.courseTag + " " + item.courseName}  key={index} disabled={item.deleted}>
            <p>
              {item.courseDesc}
            </p>
            <Button className='btn' type="primary" size='large'><Link to={"/edit/" + item._id}>Edit</Link></Button>
          </Panel>
        )
      })
  
      return (
        <div id='app-container'>
          <h1>Course Pool</h1>
          <hr /><br />
          <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => this.search(value)}
          />
          <hr /><br />
          <Collapse accordion>
            {courses}
          </Collapse>
          
        </div>
      );
    }
    
  }

export default SearchPage;