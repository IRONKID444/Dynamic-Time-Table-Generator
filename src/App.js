import './App.css';
import React, { useState } from 'react';
function App() {
    const [nowd, setnowd] = useState(0);
    const [subjectPerDay, setSubjectPerDay] = useState(0);
    const [totalSubjects, setTotalSubjects] = useState(0);
    const [hours, sethours] = useState(0);
    const [subjects, setSubjects] = useState([]);
    const [inputList, setInputList] = useState([]);
    const [message, setMessage] = useState("");
    const [timeTable, setTimeTable] = useState([]);

    const handelSubmit = e => {
        e.preventDefault();
        sethours(nowd * subjectPerDay)
        setInputList([]);
        let tempInputList=[];
        for(let i=1; i<=totalSubjects; i++) {
            tempInputList.push(
                <div key={i+100}>
                    <label key={i+500}>Enter subject {i} : </label>
                    <input type="text" placeholder="Enter Subject" key={i} onChange={e => handleSubjectChange(e)}/>
                    <input type="number" placeholder="Hours of Subject" key={i+1000} onChange={e => handleSubjectChange(e)}/>
                </div>
            );
            setInputList(tempInputList);
        }
    }

    const handleSubjectChange = e => {
        let subject = {name : '', hours: 0};
        let tempSubjects = [];
        for(let i=0; i<e.target.form.length-1; i+=2) {
            subject = {name: e.target.form[i].value, hours: parseInt(e.target.form[i+1].value)};
            tempSubjects.push(subject);
            setSubjects(tempSubjects);
        }
    };

    const checkTotalHoursForSubjects = () => {
        let sum = 0;
        subjects.map(subject => {
            sum+=parseInt(subject.hours);
        });
        return sum===hours;
    };

    const handleInputSubmit = async e => {
        e.preventDefault();
        if(!checkTotalHoursForSubjects())
            setMessage("The total hours of subject must be equal to 'Total hours for week'");
        else {
            setMessage("The generated time-table is :")
            await generateTimeTable();    
        }
    };

    const generateTimeTable = async () => {
        let timeTableList = [];
        for(let i=0; i<nowd; i++) {
            let todaysTimeTable = [];
            while(todaysTimeTable.length<subjectPerDay) {
                let j=Math.floor(Math.random()*subjectPerDay);
                // console.log(j);
                if(parseInt(subjects[j].hours)>0 && todaysTimeTable.length<subjectPerDay) {
                    subjects[j].hours-=1;
                    todaysTimeTable.push(subjects[j].name);
                }
            }
            console.log(todaysTimeTable);
            timeTableList.push(todaysTimeTable);
        }
        let tempTimeTable = [];
        for(let i=0;i<subjectPerDay; i++) {
            let dayItem="";
            for(let j=0; j<nowd; j++) {
                dayItem+=timeTableList[j][i]+ " ";
            }
            tempTimeTable.push(<p>{dayItem}</p>);
            console.log(tempTimeTable);
        }
        setTimeTable(tempTimeTable);
    };

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <label>Number of working days : </label>
                <input id="Working" type="number" placeholder="Enter number" value={nowd} onChange={e => setnowd(e.target.value)} min="1" max="7"/>
                <br/>
                <label>Number of subjects per day : </label>
                <input id="Subject" type="number" placeholder="Enter number" min="0" max="9" value={subjectPerDay} onChange={e => setSubjectPerDay(e.target.value)}/>
                <br/>
                <label>Total number of subjects : </label>
                <input id="total" type="number" placeholder="Enter number" value={totalSubjects} min="0" onChange={e => setTotalSubjects(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <p>{hours}</p>
            <form onSubmit={handleInputSubmit}>
                {inputList}
                <button type="submit">Generate</button>
            </form>
            <p>{message}</p>
            <div className="table">
                {timeTable}
            </div>
        </div>
    );
}

export default App;