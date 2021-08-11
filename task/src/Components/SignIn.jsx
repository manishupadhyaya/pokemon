import React from 'react'
import { withRouter } from 'react-router'
import { Button, Form, Input, Label } from 'semantic-ui-react'
import jwt_decode from 'jwt-decode'
import NavBar from './NavBar'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class SignIn extends React.Component {

    constructor(props){
        super(props)
        this.state = {
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
        const {userName, password} = this.state
        axios.post('/signIn', {userName, password})
        .then((res)=>{
            console.log("Response", res)
            localStorage.setItem("token", res.data.token)
            var decoded = jwt_decode(res.data.token)
            const {userName, name, id} = decoded
            const payload = {userName, name, id}
            const payloadStringified = JSON.stringify(payload)
            localStorage.setItem("user", payloadStringified)
            this.props.history.push("/home")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <>
                <NavBar activeItem="signIn" userData={this.state.userData}/>
                <Form onSubmit={this.handleSubmit}>
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

export default withRouter(SignIn)
