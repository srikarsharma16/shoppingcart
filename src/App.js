import React from 'react'
import './App.css'
import Product from './productComponent/Product'
import DummyData from './ProductData'

class App extends React.Component
{       
  
  constructor(){
    super()
    this.state={
      carts:[],
      isCartVisible:false
    }
}


  addProductToCart = (pid,isIncrement)=>
  {   
      var product = DummyData.find(ob=>ob.pid==pid)
      if(product!=undefined)
      {       
        var cartItem = this.state.carts.find(ct=>ct.pid==pid)
        if(cartItem==undefined)
            this.setState({carts:[...this.state.carts,{ ...product , qty:1}]})
        else
        {       
            if(cartItem.qty==1 && !isIncrement)            
              this.deleteCart(pid)
            else
              this.setState({carts:this.state.carts.map(ct=>ct==cartItem?{...ct,qty:isIncrement?ct.qty+1:ct.qty-1}:ct)})             
        }
      }      
  }

  deleteCart = (pid)=>{
    this.setState({carts:this.state.carts.filter(ct=>ct.pid!=pid)})
  }

  render(){

  return <div className='App'>
    <h1>My Shopping Cart</h1>
    <h4 style={{color:'red',textAlign:'right'}}>
      <span onClick={()=>this.setState({isCartVisible:true})}> Cart : {this.state.carts.reduce((x,ob)=>ob.qty+x,0)} &nbsp;&nbsp;&nbsp; </span>
    </h4>  

    <div style={{display:this.state.isCartVisible?"block":"none"}}>
      <h3>Cart Details</h3>
      <table className='table table-striped'>
        <thead>
          <tr>
                            <th>S.No.</th>
                            <th>Image</th>
                            <th>Product Name</th>                           
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {this.state.carts.map((prod, index)=>
          {
            return <tr>
                                <td>{index + 1}</td>
                                <td><img src={prod.image} /></td>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td>{prod.discount}</td>
                                <td>{prod.qty}</td>
                                <td>{(prod.price*prod.qty)-(prod.discount*prod.qty)}</td>
                                <th>
                                  <button onClick={()=>this.deleteCart(prod.pid)} className='btn btn-danger'>Delete</button>
                                  <br/><br/>
                                  <button onClick={()=>this.addProductToCart(prod.pid,false)} className='btn btn-info'>-</button>
                                  &nbsp;
                                  <button onClick={()=>this.addProductToCart(prod.pid,true)} className='btn btn-info'>+</button>
                                </th>
                    </tr>
          })}
        </tbody>
      </table>
      <button className='btn btn-primary'  onClick={()=>this.setState({isCartVisible:false})}>Close</button>
    </div>

    <hr/>

    <Product addProductToCart={this.addProductToCart}/>
  </div>
  }
}

export default App