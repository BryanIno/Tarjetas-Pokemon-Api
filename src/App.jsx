//Hooks
import { useEffect, useState } from 'react';

// Componentes
import Button from './components/Button'
import Card from './components/Card'

// Iconos
import {TiArrowLeftOutline} from "react-icons/ti";
import {TiArrowRightOutline} from "react-icons/ti";

const App = () => {

  const [pokemonId, SetPokemonId]=useState(1);
  const [pokemonEvoluciones, setPokemonEvoluciones]=useState([]);
  
  useEffect(()=>{
    getEvoluciones(pokemonId);
  },[pokemonId]);

  async function getEvoluciones(id){
    const respuesta = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const datos = await respuesta.json();
    // setPokemonEvoluciones(datos.chain.species.name);

    let pokemonEvoArray=[];

    let pokemonLv1 = datos.chain.species.name;
    let pokemonLv1Img = await getPokemonImg(pokemonLv1);
    pokemonEvoArray.push([pokemonLv1,pokemonLv1Img]);
    
    if(datos.chain.evolves_to.length !== 0){
      let pokemonLv2 = datos.chain.evolves_to[0].species.name;
      let pokemonLv2Img = await getPokemonImg(pokemonLv2);
      pokemonEvoArray.push([pokemonLv2,pokemonLv2Img]);
      console.log(pokemonEvoArray)
      
      if(datos.chain.evolves_to[0].evolves_to.length !== 0){
        let pokemonLv3 = datos.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLv3Img = await getPokemonImg(pokemonLv3);
        pokemonEvoArray.push([pokemonLv3,pokemonLv3Img]);
      }
    }
    setPokemonEvoluciones(pokemonEvoArray);
  }

  async function getPokemonImg(name){
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const datos=await respuesta.json();
    return (datos.sprites.other['official-artwork'].front_default);
  }

  const atras=()=>{pokemonId===1 ? SetPokemonId(1) : SetPokemonId(pokemonId-1)};
  const siguiente=()=>{SetPokemonId(pokemonId+1)};
  
  return (
  <main>
    <div className='contenido'>
      <div className='card-conteinter'>
        {pokemonEvoluciones.map(
          pokemon => 
          <Card
            key = {pokemon[0]} 
            name = {pokemon[0]}
            img = {pokemon[1]}
          />)}
      </div>
      
      <div className='contenedor-botones'>
        <Button 
          icon={<TiArrowLeftOutline/>} 
          handleClick={atras}
          />
        {pokemonId}
        <Button 
          icon={<TiArrowRightOutline/>}
          handleClick={siguiente}/>
      </div>
    </div>
  </main>  
  )
}

export default App