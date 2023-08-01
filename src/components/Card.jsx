const Card = ({name, img}) => {
  return (
    <div className="card">
        <p className="card-nombre"> {name} </p>
        <div className="card-circulo"></div>
        <img src={img} alt=" imagen jpg" className="card-img"/>
    </div>
  )
}

export default Card