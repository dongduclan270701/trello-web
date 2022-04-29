import React from 'react'

const Childcomponent = (props) => {
    const { arrJobs, deleteJob } = props
    const hanldeDeleteJob = (job) => {
        deleteJob(job)
    }
    return (
        <div>
            <div className="job">
                {
                    arrJobs.map((item) => {
                        return (
                            <div key={item.id}>
                                {item.id} - {item.title} - {item.salary} - <button onClick={() => { hanldeDeleteJob(item) }}>Xoá</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Childcomponent
