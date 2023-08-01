import "../index.css"

const Button = ({icon, handleClick}) => {
  return (
    <button 
      className="botones"
      onClick={handleClick}
      >{icon}
    </button>
  )
}

export default Button