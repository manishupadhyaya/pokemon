import React from 'react'
import { Button, Form, Input, Label } from 'semantic-ui-react'
import {withRouter} from 'react-router'
import NavBar from './NavBar'
import axios from 'axios'


class SignUp extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name:"",
            userName:"",
            password:"",
            userData: {}
        }
    }

    componentDidMount(){
        this.setState({
            userData: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):{}
        })
    }

    handleChange = (value, field)=>{
        this.setState({
            [field]: value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const {name, userName, password} = this.state
        axios.post('/signUp', {name, userName, password})
        .then((res)=>{
            console.log(res)
            this.props.history.push("/signIn")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <>
                <NavBar activeItem="signUp" userData={this.state.userData}/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Label>Name</Label>
                        <Input 
                            placeholder='Enter Your Name' 
                            type="text"
                            value={this.state.name}
                            onChange={(e)=>{this.handleChange(e.target.value, "name")}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>UserName</Label>
                        <Input 
                            placeholder='Enter Your userName' 
                            type="text"
                            value={this.state.userName}
                            onChange={(e)=>{this.handleChange(e.target.value, "userName")}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>Password</Label>
                        <Input 
                            placeholder='Enter Your new Password' 
                            type="password"
                            value={this.state.password}
                            onChange={(e)=>{this.handleChange(e.target.value, "password")}}
                        />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </>
            )
        }
}

export default withRouter(SignUp)
