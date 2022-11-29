import React, {useState} from "react";
import CVForm from "./CVForm";
import CVHeader from "./CVHeader";
import CVView from "./CVView";

//placeholder values filled by default
let defaultPersonal = {
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

let CvMaker = ()=>{
    let [personalData, setPersonalData]= useState(defaultPersonal);
    let [educationData, setEducationData]= useState(defaultEducation);
    let [workData, setWorkData]= useState(defaultWork);
    let [editMode, setEditMode]= useState(false)
    
    let toggleForm = ()=>{
        window.scrollTo(0,0) 
        if(editMode == true){
            setEditMode(false);
        }else{
            setEditMode(true);
        }
    }

   let handleFormInput = (e)=>{
        e.preventDefault();
        let type = e.target.getAttribute("input-type")
        if(type === "personal"){
            handlePersonalInput(e);
            return
        } else if (type === "education"){
            handleEducationInput(e);
        } else if (type === "work"){
            handleWorkInput(e);
        }
    } 
    
        let handleWorkInput = (e)=>{
        let group = e.target.getAttribute("input-group-index")
        let key = e.target.getAttribute("input-key")
        let value = e.target.value;
        let newState = [...workData];
        if(key === "remove"){
            newState = newState.filter((_, index) => index != group)
        } else if(key === "add"){
            newState = [{company: "", role: "", from: "", to:"", optional:""}].concat(newState)
        }else{
            newState[group][key] = value;
        }

        setWorkData(newState);
    }

    let handleEducationInput = (e)=>{
        let group = e.target.getAttribute("input-group-index")
        let key = e.target.getAttribute("input-key")
        let value = e.target.value;
        let newState = [...educationData];
        if(key === "remove"){
            newState = newState.filter((_, index) => index != group)
        } else if(key === "add"){
            newState = [{institue: "", degree: "", from: "", to:"", optional:""}].concat(newState)
        }else{
            newState[group][key] = value;
        }

        setEducationData(newState);
    }

    let handlePersonalInput = (e)=>{
        let key = e.target.getAttribute("input-key")
        let value = e.target.value;
        let newState = {...personalData};
        newState[key] = value;
        setPersonalData(newState)
    }
    
    return <div>
    <CVHeader></CVHeader>
    {editMode == true &&
    <CVForm
    personalData = {personalData} 
    educationData = {educationData}
    workData = {workData}
    changeHandler = {handleFormInput}
    ></CVForm>
    }
    {editMode == false &&
    <CVView
    personalData = {personalData} 
    educationData = {educationData}
    workData = {workData}
    >
    </CVView>
    }
    <div className="footer">
    <button className='footerButton' onClick={toggleForm}>{editMode ? 'Save' : 'Edit'}</button>
    </div>
</div>
}
export default CvMaker;