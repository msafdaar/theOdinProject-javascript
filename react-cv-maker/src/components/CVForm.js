import '../styles/CVForm.css';
const CVForm = (props)=>{
    const personalData = props.personalData;
    const educationData = props.educationData;
    const workData = props.workData;
    const changeHandler = props.changeHandler;
 return <div>
    <form className="CVForm">
    <Personal data = {personalData} changeHandler = {changeHandler}></Personal>
    <Education data = {educationData} changeHandler = {changeHandler}></Education>
    <Work data = {workData} changeHandler = {changeHandler}></Work>
    </form>
      </div>
}
export default CVForm;

const Work = (props)=>{
   const groups = props.data;
   const changeHandler = props.changeHandler;

   return <div className='section'>
            <h2>Work Experience
      <button onClick={changeHandler} input-type = "work" input-group-index = {-1} input-key = "add" className='greenButton'>+ New Work</button>
            </h2>
      {groups.map((work, index) =>{
         return <div key={index} className='subSection'>
            <label>Company: <input value={work.company} onChange= {changeHandler} input-type = "work" input-group-index = {index} input-key = "company"></input></label>
            <label>Position/Role: <input value={work.role} onChange= {changeHandler} input-type = "work" input-group-index = {index} input-key = "role"></input></label>
            <label>From: <input value={work.from} onChange= {changeHandler} input-type = "work" input-group-index = {index} input-key = "from"></input></label>
            <label>To: <input value={work.to} onChange= {changeHandler} input-type = "work" input-group-index = {index} input-key = "to"></input></label>
            <label>Optional Note: <input value={work.optional} onChange= {changeHandler} input-type = "work" input-group-index = {index} input-key = "optional"></input></label>
            <button onClick={changeHandler} input-type = "work" input-group-index = {index} input-key = "remove" className='redButton'>Remove</button>
         </div>
      })}
      <hr></hr>
   </div>
}

const Education = (props)=>{
   const groups = props.data;
   const changeHandler = props.changeHandler;

   return <div className='section'>
            <h2>Education History
      <button onClick={changeHandler} input-type = "education" input-group-index = {-1} input-key = "add" className='greenButton'>+ New Education</button>
            </h2>
      {groups.map((education, index) =>{
         return <div key={index} className='subSection'>
            <label>Institue: <input value={education.institue} onChange= {changeHandler} input-type = "education" input-group-index = {index} input-key = "institue"></input></label>
            <label>Degree: <input value={education.degree} onChange= {changeHandler} input-type = "education" input-group-index = {index} input-key = "degree"></input></label>
            <label>From: <input value={education.from} onChange= {changeHandler} input-type = "education" input-group-index = {index} input-key = "from"></input></label>
            <label>To: <input value={education.to} onChange= {changeHandler} input-type = "education" input-group-index = {index} input-key = "to"></input></label>
            <label>Optional Note: <input value={education.optional} onChange= {changeHandler} input-type = "education" input-group-index = {index} input-key = "optional"></input></label>
            <button onClick={changeHandler} input-type = "education" input-group-index = {index} input-key = "remove" className='redButton'>Remove</button>
         </div>
      })}
      <hr></hr>
   </div>
}

const Personal = (props)=>{
const data = props.data;
const changeHandler = props.changeHandler;
   return <div className='section'>
            <h2>Personal Details</h2>
   <div className='subSection'>
    <label>Name: <input value={data.name} onChange= {changeHandler} input-type = "personal" input-key = "name"></input></label>
    <label>Title: <input value={data.title} onChange= {changeHandler} input-type = "personal" input-key = "title"></input></label>
    <label>Bio: <input value={data.bio} onChange= {changeHandler} input-type = "personal" input-key = "bio"></input></label>
    </div>
    <hr></hr>
    <div className='subSection'>
    <label>Phone: <input value={data.phone} onChange= {changeHandler} input-type = "personal" input-key = "phone"></input></label>
    <label>Email: <input value={data.email} onChange= {changeHandler} input-type = "personal" input-key = "email"></input></label>
    <label>Adress: <input value={data.adress} onChange= {changeHandler} input-type = "personal" input-key = "adress"></input></label>
</div>
<hr></hr>
   </div>
}