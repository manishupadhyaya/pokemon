import React, {Component} from 'react'
// import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

class NavBar extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            activeItem : this.props.activeItem,
            userData: this.props.userData? this.props.userData: {}
        }
    }


    handleLogout = (e=>{
        localStorage.removeItem("user")
        this.setState({
            userData: {}
        })
    })
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render()
    {
        const {activeItem} = this.state
        console.log("active", activeItem)
        return(
            <div>
                <Menu pointing>
                    <Menu.Item as={NavLink} to='/home'
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    >
                    Home
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/signUp'
                    name='signUp'
                    active={activeItem === 'signUp'}
                    onClick={this.handleItemClick}
                    >
                    SignUp
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/signIn'
                    name='signIn'
                    active={activeItem === 'signIn'}
                    onClick={this.handleItemClick}
                    >
                    SignIn
                    </Menu.Item>
                    <Menu.Item>
                        <Button onClick={this.handleLogout}>LogOut</Button>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/profile'
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick}
                    >
                    Profile
                    </Menu.Item>
                </Menu>
                
            </div>
        )
    }
}

export default NavBar