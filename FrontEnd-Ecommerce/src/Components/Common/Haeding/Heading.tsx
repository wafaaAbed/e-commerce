
function Heading({title}: {title:string}) {
  return (
    <h1 className='my-4 text-capitalize' style={{fontSize:"26px"}}>
      {title}
    </h1> 
  )
}

export default Heading
