import React, { useState } from 'react'
import ChildComponent from './childComponent'
import FormComponent from './addComponent'

const About = () => {
    const [ arrJobs, setArrJobs ] = useState([
        { id: '1', title: 'developer', salary: 500 },
        { id: '2', title: 'designer', salary: 300 },
        { id: '3', title: 'tester', salary: 400 }
    ])
    const addNewJob = (job) => {
        setArrJobs([...arrJobs, job])
    }
    const deleteJob = (job) => {
        let currentJobs = arrJobs
        currentJobs = currentJobs.filter(item => item.id !== job.id)
        setArrJobs(currentJobs)
    }
    return (
        <div>
            <FormComponent
                addNewJob={addNewJob}
            />
            <hr />
            <div className="form-group">

                <ChildComponent
                    arrJobs={arrJobs}
                    deleteJob={deleteJob}
                />

            </div>
        </div>
    )
}

export default About
