import React, { Component } from 'react' 

const initialState = {
    title: "",
    description: "",
    distance: "",
    hm: "",
    wishlist: false,
    done: false
}


export default class PassForm extends Component{
    
    state = initialState

    componentDidMount(){
        const {pass} = this.props
        if(this.props.pass){
            const {id, title, description, distance, hm, wishlist, done} = pass
            this.setState({
                id,
                title,
                description,
                distance,
                hm,
                wishlist,
                done
            })
        }
    }

    handleChange = (event) => {
        let {name, value, checked} = event.target

        value = (name === "wishlist") || (name === "done") ? checked : value
        this.setState({
            [name]: value
        })
    }
    

    handleSubmit = (event) => {
        let {submitAction, handleToggle} = this.props
        event.preventDefault()
        submitAction(this.state)
        if(handleToggle){
            handleToggle()
        }
    }
    
    showDoneCheckbox = () => {
        return this.props.pass 
            ? (
                <div className="input-group">
                    <label>Done</label>
                    <input 
                        type="checkbox" 
                        name="done" 
                        checked={this.state.done}
                        onChange={this.handleChange}
                    />
                </div>
            ) : null
    }

    showCloseButton = () => {
        return this.props.pass
         ? <button className="close-button" onClick={this.props.handleToggle}>Never mind/no edits</button>
         : null
    }

    render(){
        const {id, title, description, distance, hm, wishlist, done} = this.state
        return(

            <form className="pass-form" onSubmit={this.handleSubmit}>
                {this.props.pass ? <h2>Edit Pass</h2> : <h2>Create a new Pass</h2>}
                <label>Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={title} 
                    onChange={this.handleChange}
                />
                <label>Description</label>
                <input 
                    type="text" 
                    name="description" 
                    value={description}
                    onChange={this.handleChange}
                />
                <label>Distance</label>
                <input 
                    type="number" 
                    name="distance" 
                    value={distance}
                    onChange={this.handleChange} 
                />
                <label>Height Meters</label>
                <input 
                    type="number"
                    name="hm" 
                    value={hm}
                    onChange={this.handleChange}
                />
                <div className="input-group">
                    <label>Wishlist</label>
                    <input 
                        type="checkbox" 
                        name="wishlist" 
                        checked={wishlist}
                        onChange={this.handleChange}
                    />
                </div>
              
                {this.showDoneCheckbox()}
                <input type="submit" />
                {this.showCloseButton()}
            </form>


        )
    }
}