import React, {useState} from 'react' 
import PassForm from './PassForm'

export default function PassItem({id, title, description, distance, hm, wishlist, done, deletePass, updatePass}){
    
    const pass = {id, title, description, distance, hm, wishlist, done}
    const [isToggled, setIsToggled] = useState(false)
    const handleClick =(event) => deletePass(id)
    const handleToggle = (event) => setIsToggled(!isToggled)
    const passCard = () => (
        <li className="pass-item">
            <h2>{title}</h2>
            <h4>{description}</h4>
            <h3>{distance}</h3>
            <h3>{hm}</h3>
            <h3>{wishlist}</h3>
            <h3>{done}</h3>
            <button onClick={handleClick} className="delete-button">DELETE</button>
            <button  onClick={handleToggle} className="edit-button">EDIT</button>
        </li>
    )
    return isToggled 
    ? <PassForm 
        handleToggle={handleToggle} 
        submitAction={updatePass} 
        pass={pass} /> 
    : passCard()
}