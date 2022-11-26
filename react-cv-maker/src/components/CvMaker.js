import React from "react";
import { Component } from "react";
import CVForm from "./CVForm";
import CVHeader from "./CVHeader";
import CVView from "./CVView";

//placeholder values filled by default
let defaultPresonal = {
        name:"Lorem ipsum ",
        title:"dolor sit amet ",
        bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        email:"adipiscing@eiusmod.com",
        phone:"+2 300 123 4567",
        adress:"Magni dolores eos qui ratione voluptatem sequi nesciunt."};

let defaultEducation = [
    {
        institue: "Eiusmod tempor incididunt ut labore",
        degree: "Commodo consequat",
        from: "1972",
        to:"1975",
        optional:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    }
    ];

let defaultWork = [
    {
        company: "Cillum dolore", 
        role: "Est laborum", 
        from: "1970", 
        to:"1992", 
        optional:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur"
    }
    ]

class CvMaker extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: true,
            personalData: defaultPresonal,
            educationData: defaultEducation,
            workData: defaultWork,
            editMode: false,
        }
    }

    render(){
        return <div>
            <CVHeader></CVHeader>
            {this.state.editMode == true &&
            <CVForm
            personalData = {this.state.personalData} 
            educationData = {this.state.educationData}
            workData = {this.state.workData}
            changeHandler = {this.handleFormInput}
            ></CVForm>
            }
            {this.state.editMode == false &&
            <CVView
            personalData = {this.state.personalData} 
            educationData = {this.state.educationData}
            workData = {this.state.workData}
            >
            </CVView>
            }
            <div className="footer">
            <button className='footerButton' onClick={this.toggleForm}>{this.state.editMode ? 'Save' : 'Edit'}</button>
            </div>
        </div>
    }
    toggleForm = ()=>{
        window. scrollTo(0,0) 
        if(this.state.editMode == true){
            this.setState({editMode: false});
        }else{
            this.setState({editMode: true});
        }
    }
    handleFormInput = (e)=>{
        e.preventDefault();
        let type = e.target.getAttribute("input-type")
        if(type === "personal"){
            this.handlePersonalInput(e);
            return
        } else if (type === "education"){
            this.handleEducationInput(e);
        } else if (type === "work"){
            this.handleWorkInput(e);
        }
    }
    handleWorkInput = (e)=>{
        let group = e.target.getAttribute("input-group-index")
        let key = e.target.getAttribute("input-key")
        let value = e.target.value;
        let newState = [...this.state.workData];
        if(key === "remove"){
            newState = newState.filter((_, index) => index != group)
        } else if(key === "add"){
            newState = [{company: "", role: "", from: "", to:"", optional:""}].concat(newState)
        }else{
            newState[group][key] = value;
        }

        this.setState({workData: newState})
    }

    handleEducationInput = (e)=>{
        let group = e.target.getAttribute("input-group-index")
        let key = e.target.getAttribute("input-key")
        let value = e.target.value;
        let newState = [...this.state.educationData];
        if(key === "remove"){
            newState = newState.filter((_, index) => index != group)
        } else if(key === "add"){
            newState = [{institue: "", degree: "", from: "", to:"", optional:""}].concat(newState)
        }else{
            newState[group][key] = value;
        }

        this.setState({educationData: newState})
    }

    handlePersonalInput = (e)=>{
        let key = e.target.getAttribute("input-key")
        let value = e.target.value;
        let newState = {...this.state.personalData};
        newState[key] = value;
        this.setState({personalData: newState})
    }
    
}

export default CvMaker;