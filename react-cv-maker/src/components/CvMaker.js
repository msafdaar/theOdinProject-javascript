import React from "react";
import { Component } from "react";
import CVForm from "./CVForm";
import CVHeader from "./CVHeader";
import CVView from "./CVView";


class CvMaker extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: true,
            personalData: {name:"Imran Khan", title:"politician ", bio:"Imran Ahmed Khan Niazi HI(M) PP (Pashto, Punjabi, Urdu: عمران احمد خان نیازی; born 5 October 1952) is a Pakistani politician and former cricketer. Born to a Niazi Pashtun family in Lahore, Khan graduated from England's Keble College in 1975. He began his international cricket career at age 18, in a 1971 Test series against England. Khan played until 1992, served as the team's captain intermittently between 1982 and 1992,[5] and won the 1992 Cricket World Cup, in what is Pakistan's first and only victory in the competition.", email:"imrankhan@undefined.com", phone:"+92 3001234567", adress:"Bani Gala, Islamabad, Pakistan"},
            educationData: [{institue: "Keble College, Oxford", degree: "Philosophy, Politics and Economics", from: "1972", to:"1975", optional:"He enrolled in Keble College, Oxford where he studied Philosophy, Politics and Economics, graduating in 1975.An enthusiast for college cricket at Keble, Paul Hayes, was instrumental in securing the admission of Khan, after he had been turned down by Cambridge."},],
            workData: [{company: "International Player", role: "Cricket", from: "1970", to:"1992", optional:"In 1987 in India, Khan led Pakistan in its first-ever Test series win and this was followed by Pakistan's first series victory in England during the same year. Khan's career-high as a captain and cricketer came when he led Pakistan to victory in the 1992 Cricket World Cup."},
                     {company: "Pakistan", role: "Prime Minister", from: "2018", to:"2022", optional:"Served as the 22nd prime minister of Pakistan from August 2018 until April 2022, when he was ousted through a no-confidence motion. He is the founder and chairman of the Pakistan Tehreek-e-Insaf (PTI), one of the largest political parties in the country."},],
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