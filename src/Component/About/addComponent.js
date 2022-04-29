import React, { useState } from 'react'

const Addcomponent = (props) => {
    const { addNewJob } = props
    const [job, setJob] = useState({ title: '', salary: '' })
    const handleChangeTitleJob = (event) => {
        const jobCopy = { ...job }
        jobCopy.title = event.target.value
        setJob(jobCopy)
    }
    const handleChangeSalary = (event) => {
        const jobCopy = { ...job }
        jobCopy.salary = event.target.value
        setJob(jobCopy)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!job.title || !job.salary) {

            alert('Missing required params')
            return
        }
        addNewJob({
            id: Math.floor(Math.random() * 1001),
            title: job.title,
            salary: job.salary
        })

        setJob({
            title: '',
            salary: ''
        })
    }
    return (
        <div>
            <form action="123">
                <label
                    htmlFor="fname">
                    Title Jobs:
                </label>
                <br />
                <input
                    type="text"
                    value={job.title}
                    onChange={(event) => handleChangeTitleJob(event)}
                    className="form-control"
                    placeholder="Title Job"
                    aria-describedby="helpId" />
                <br />
                <label
                    htmlFor="lname">
                    Salary
                </label>
                <br />
                <input
                    type="number"
                    value={job.salary}
                    onChange={(event) => handleChangeSalary(event)}
                    className="form-control"
                    placeholder="Salary"
                    aria-describedby="helpId" />
                <br />

                <button
                    onClick={(event) => handleSubmit(event)}
                    type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Addcomponent
