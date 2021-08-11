import { useState, useEffect } from 'react';
import {Table, Image, Button, Form, Checkbox, Icon} from 'semantic-ui-react'
import NavBar from './NavBar'
import axios from 'axios'

function Home() {
  const [userData, setUserData] = useState({})
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [pokemons, setPokemons] = useState("")
  const [searchPokemon,setSearchPokemon] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [checkboxNumber, setCheckboxNumber] = useState(10)
  const handleChange = (e)=>{
    setSearchPokemon(e.target.value)
  }

  const handleFavorite = (e, index, poke) =>{
      const {name, height, weight} = poke
      const {front_default} = poke.sprites
      const payload = {name, height, weight, front_default}
      axios.post(`/pokemon/${userData.id}`, payload,
      {
          headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      })
      .then((res)=>{
          console.log("Response", res)
      })
      .catch(err=>{
          console.log("Unable to save pokemon", err)
      })
  }

  const handleClick = (e, checking)=>{
    if(checking === "prev")
    { 
      setOffset(offset-limit)
      fetchPoke()
    }
    else if(checking === "next")
    {
      setOffset(offset+limit)
      fetchPoke()
    }
  }
  const handleCheckBox = (e, {value})=>{
    console.log("Value", value)
    setCheckboxNumber(value)
    setLimit(value)
    console.log("After changing limit", limit)
  }

  const fetchPoke = async () => {
    const promises = []
    console.log("Offset:", offset, " limit: ", limit)
    for(let i = offset+1; i <= offset + limit ; i++){
         let a = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((res)=> res.data)
        .catch(err=>console.log(err))
        promises.push(a)
    }
    Promise.all(promises).then(res=>{
      setPokemons(res)
    })
  }

  useEffect(()=>{
    setUserData(localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):{})
  },[])

  useEffect(()=>{
    fetchPoke()
  },[limit, offset])

  useEffect(()=>{
    if(pokemons.length>0){
      let a = pokemons
      const results = a.filter(pokemon=>pokemon.name.toLowerCase().includes(searchPokemon))
      console.log("Results", results)
      setSearchResults(results)
    }
  },[searchPokemon])

  console.log("Pokemons", pokemons)
  return (
    <>
      <NavBar activeItem="home"/>
      <Table definition color="black">
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Pokedex</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Height</Table.HeaderCell>
                        <Table.HeaderCell>Weight</Table.HeaderCell>
                        <Table.HeaderCell>Avatar</Table.HeaderCell>
                        {Object.keys(userData).length!==0?
                          <Table.HeaderCell>Add to Favorites</Table.HeaderCell>
                          :null
                        }
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            {
                              pokemons.length>0 && pokemons.map((poke, i) =>{
                                console.log("href", poke.sprites.front_default)
                                return( 
                                  <Table.Row>
                                      <>
                                        <Table.Cell>{i+offset+1}</Table.Cell>
                                        <Table.Cell>{poke.name}</Table.Cell>
                                        <Table.Cell>{poke.height}</Table.Cell>
                                        <Table.Cell>{poke.weight}</Table.Cell>
                                        <Table.Cell><Image src={poke.sprites.front_default}/></Table.Cell>
                                        {Object.keys(userData).length!==0?
                                        <Table.Cell><Icon name="favorite" size="large" color="yellow" 
                                        onClick={(e)=> handleFavorite(e, i+1, poke)}/></Table.Cell>
                                        :null
                                        }
                                      </>
                                  </Table.Row>
                                )
                              })
                            }
                    </Table.Body>    
        </Table>
        {offset !==0?(
            <Button onClick={(e)=>handleClick(e, "prev")}>Prev</Button>
        )
        :null}
        <Button onClick={(e)=>handleClick(e, "next")}>Next</Button>

          <Form>
            <Form.Field>
              <Checkbox
                radio
                label='Choose 10'
                name='checkboxRadioGroup'
                value={10}
                checked={checkboxNumber === 10}
                onChange={handleCheckBox}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Choose 20'
                name='checkboxRadioGroup'
                value={20}
                checked={checkboxNumber === 20}
                onChange={handleCheckBox}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Choose 50'
                name='checkboxRadioGroup'
                value={50}
                checked={checkboxNumber === 50}
                onChange={handleCheckBox}
              />
            </Form.Field>
          </Form>


        Search For Pokemons<input onChange={handleChange} value={searchPokemon} placeholder="search"/>
        {searchResults.length>0?
            (
              <>
                <h1>Search Results</h1>
                <div>{searchResults.length>0 && searchResults.map((res)=>{
                  return <p>{res.name}</p>
                })}</div>
              </>
            )
        :null
        }
      </>
  );
}

export default Home;
