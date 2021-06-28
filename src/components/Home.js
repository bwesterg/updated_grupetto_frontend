import React from 'react' 
import PassForm from './PassForm'
import PassContainer from './PassContainer'


export default function Home(props) {
    return (
        <>
            <PassForm submitAction={props.submitAction}/>
            <PassContainer updatePass={props.updatePass} deletePass={props.deletePass} passes={props.passes}/>
        </>
    )
}