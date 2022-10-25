import "../styles/CvView.css"
const CVView = (props)=>{
    const personalData = props.personalData;
    const educationData = props.educationData;
    const workData = props.workData;

    return <div className="cvPrint">
    <div className="nameAndTitle">
    <div className="name">{personalData.name}</div>
    <div className="title">{personalData.title}</div>
    </div>
    <div className="contact">
    <div className="subHeading">{personalData.adress}</div>
    <div className="subHeading">{personalData.email} | {personalData.phone}</div>
    </div>
    <div className="section">
    <div className="heading">Bio</div>
    <div className="subsectionDetails">{personalData.bio}</div>
    </div>
    <div className="section">
    <div className="heading">Education</div>
    {educationData.map((education)=>{
        return <div className="subsection">
        <div className="subsectionTitle">{education.from}-{education.to} > {education.degree} | {education.institue}</div>
        <div className="subsectionDetails">{education.optional}</div>
        </div>
    })}
    </div>
    <div className="section">
    <div className="heading">Work Experience</div>
    {workData.map((work)=>{
        return <div className="subsection">
        <div className="subsectionTitle">{work.from}-{work.to} > {work.role} | {work.company}</div>
        <div className="subsectionDetails">{work.optional}</div>
        </div>
    })}
    </div>
    </div>
}
export default CVView;