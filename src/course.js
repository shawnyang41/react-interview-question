import React from 'react';
import ReactDOM from 'react-dom';
import db from './db'
import './css/course.css';
import { Divider, Input, Tooltip, Icon , Tag, Button} from 'antd';


const { TextArea } = Input;

class Course extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            id : '5b21ad27379f8020f47963bf',
            course: {
                courseTag: "Loading"
            },
            tagControl: {
                tags: [],
                inputVisible: false,
                inputValue: '',
            },
            loading: true
        }
      }

    componentDidMount(){
        var that = this;
        var control = this.state.tagControl;
        console.log('send');
        db.getCourse(this.state.id, function(course){
            console.log('hey');
            console.log(course);
            if (course.tags == undefined) control.tags = [];
            else control.tags = course.tags;
            that.setState({
                course: course,
                loading: false,
                tagControl: control
            })
            document.getElementById("desc").value = course.courseDesc;
        })
    
    }
    delete(){
        db.updateCourse(this.state.id, {deleted: true}, function(){
            console.log('got');
            that.setState({
                loading: false
            })
        })
    }

    save(){
        console.log(this);
        var that = this;
        this.setState({
            loading: true
        })
        var updateDetail = {
            courseDesc: document.getElementById("desc").value,
            tags: this.state.tagControl.tags
        }
        db.updateCourse(this.state.id, updateDetail, function(){
            console.log('got');
            that.setState({
                loading: false
            })
        })
    }



    //Tag handler
    handleClose = (removedTag) => {
        const tags = this.state.tagControl.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        var control = this.state.tagControl;
        control.tags = tags;
        this.setState({ tagControl: control });
      }
    
    showInput = () => {
        var control = this.state.tagControl;
        control.inputVisible = true;
        this.setState({ inputVisible: true }, () => this.input.focus());
    }
    
    handleInputChange = (e) => {
        var control = this.state.tagControl;
        control.inputValue = e.target.value;
        this.setState({ tagControl: control });
    }
    
    handleInputConfirm = () => {
        var control = this.state.tagControl;
        const inputValue = control.inputValue;
        let tags = control.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({tagControl:{
          tags,
          inputVisible: false,
          inputValue: '',
        }});
    }
    
    saveInputRef = input => this.input = input
    //
    
    render(){
        const { tags, inputVisible, inputValue } = this.state.tagControl;
        return(
            <div className='course'>
                <h1>{this.state.course.courseTag}</h1>
                <Divider />
                <span>Course Description:</span>
                <TextArea id='desc' rows={10}/>
                <Divider />
                <span>Tags:</span>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag className='tag' key={tag} closable='true' afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                    })}
                    {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                    )}
                    {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus" /> New Tag
                    </Tag>
                    )
                    }
                <Divider />
                <div className='footer'>
                    <Button className='btn' id='save' loading={this.state.loading} onClick={this.save.bind(this)} type="primary" size='large'>Save</Button>
                    <Button className='btn' id='back' size='large'>Back</Button>
                    <Button className='btn' id='back' type='danger' size='large' onClick={this.delete.bind(this)}>Delete</Button>
                </div>
            </div>
        )
    }
}

export default Course;