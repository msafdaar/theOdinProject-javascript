    let imageLoader = (fruitname)=>{
      return <img src={require(`../images/${fruitname}.png`)} />  
    }

    export default imageLoader;