import ProgressBar from 'react-bootstrap/ProgressBar';

const Bar = ({hp = 20, maxHp = 20, block = 0}) =>{
  return(
    <div className='health'>
      <p className='label' > {`${hp}/${maxHp}`} </p>
      <ProgressBar now={(hp/maxHp) * 100} variant="danger" className={block > 0 ? "bar blockActive" : "bar"} /> 
      <p className={block > 0 ? "block" : "hide"}>🔒 {block}</p>
    </div>
  )
}
export default Bar