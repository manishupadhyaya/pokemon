import { useState, useEffect } from 'react';
import {Table, Image, Button, Form, Checkbox, Icon} from 'semantic-ui-react'
import NavBar from './NavBar'
import axios from 'axios'

function Profile() {
  const [userData, setUserData] = useState({})
  const [pokemons, setPokemons] = useState("")
  

  useEffect(()=>{
      setUserData(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")): {})
  },[])
  useEffect(()=>{
    if(Object.keys(userData).length!==0)
    {
        const token = localStorage.getItem("token")
        console.log("Token", token)
        const {id} = userData
        console.log("Id", id)
        axios.get(`/profile/${id}`,
        {
            headers: 
            {
                Authorization: `Bearer ${token}` 
            }
        })
        .then((res)=>{
            setPokemons(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  },[userData])

  return (
    <>
      <NavBar activeItem="profile"/>
      <Table definition color="black">
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Pokedex</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Height</Table.HeaderCell>
                        <Table.HeaderCell>Weight</Table.HeaderCell>
                        {/* <Table.HeaderCell>Avatar</Table.HeaderCell> */}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {
                              pokemons.length>0 && pokemons.map((poke, i) =>{
                                // console.log("href", poke.sprites.front_default)
                                return( 
                                  <Table.Row>
                                      <>
                                        <Table.Cell>{i+1}</Table.Cell>
                                        <Table.Cell>{poke.name}</Table.Cell>
                                        <Table.Cell>{poke.height}</Table.Cell>
                                        <Table.Cell>{poke.weight}</Table.Cell>
                                        <Table.Cell><Image src={poke.front_default}/></Table.Cell>
                                      </>
                                  </Table.Row>
                                )
                              })
                            }
                    </Table.Body>    
        </Table>
      </>
  );
}

export default Profile;
