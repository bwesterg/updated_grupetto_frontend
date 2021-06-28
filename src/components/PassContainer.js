import React from 'react' 
import PassItem from './PassItem'

export default function PassContainer({passes, deletePass, updatePass}){

    const showPasses = () => {
        return passes.map(pass => <PassItem key={pass.id} {...pass} updatePass={updatePass} deletePass={deletePass}/>)
    }

    return(
        <ul className="pass-list">
            {showPasses()}
        </ul>
    )
}