import React from 'react'
import './Product.css'
import DummyData from '../ProductData'

class Product extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            products: [...DummyData],
            priceRange: 0,
            companys: [...new Set(DummyData.map((e) => e.company))],
            pricemaxmin: {
                min: Math.min(...DummyData.map(ee => ee.price)),
                max: Math.max(...DummyData.map(ee => ee.price))
            },
            pricetemp:[...DummyData],
            temp:[...DummyData],
            
        }
    }


    fetchCategory = (event) => {
        var category = event.target.innerHTML.toLowerCase()
        let arr = DummyData.filter(prod => category == 'all' ? true : prod.category == category)
        this.setState({temp:arr})
        this.setState({products:arr})
        this.setState({pricetemp:arr})
        this.setState({companys:[...new Set(arr.map((e) => e.company))]})
        var price = arr.map((e) => e.price)
        this.setState({pricemaxmin:{
            min: Math.min(...price),
            max: Math.max(...price)
        }
        })
    }

    fetchCompany =(event) => {
        var company = event.target.innerHTML
        let arr = this.state.products.filter(prod => company == 'all' ? true : prod.company == company)
        this.setState({temp:arr})
        this.setState({pricetemp:arr})
        var price = arr.map((e) => e.price)
        this.setState({pricemaxmin:{
            min: Math.min(...price),
            max: Math.max(...price)
        }})
    }

    fetchprice=(event)=>{
        let pricevalue=event.target.value;
        let arr = this.state.pricetemp.filter(prod => pricevalue == 'all' ? true : prod.price <= pricevalue)
        this.setState({temp:arr})
    }

    // const addCart = (event)=>
    // {
    //     var pid = event.target.getAttribute('data-id');     
    //     props.addProductToCart(pid)   
    // }

    render() {
        return <div className='Product'>

            <div className='row'>
                <div className='col-lg-3 text-center filterdiv'>
                    <h2>All Category</h2>
                    <hr />
                    <h5 onClick={this.fetchCategory}>All</h5> <br />
                    <h5 onClick={this.fetchCategory}>TV</h5> <br />
                    <h5 onClick={this.fetchCategory}>AC</h5><br />
                    <h5 onClick={this.fetchCategory}>Fan</h5><br />

                    <h2>Company</h2>
                    {this.state.companys.map(e => {
                        return <h5 onClick={this.fetchCompany}>{e}</h5>
                    })}
                    <hr />

                    <h2>Price : <span style={{ color: 'red' }}>{this.state.priceRange}</span></h2>
                    <h4>Min: {this.state.pricemaxmin.min} &nbsp; Max : {this.state.pricemaxmin.max}</h4>
                    <hr />
                    <input type="range"
                        onMouseLeave={this.fetchprice} onChange={(event)=>this.setState({priceRange:event.target.value})} value={this.state.priceRange}
                        min={this.state.pricemaxmin.min} max={this.state.pricemaxmin.max} />
                </div>
                <div className='col-lg-9'>
                    <table className='table table-hovered'>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.temp.map((prod, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td><img src={prod.image} /></td>
                                    <td>{prod.name}</td>
                                    <td>{prod.company}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.discount}</td>
                                    <th>
                                        {/* <button onClick={addCart} 
                                    data-id={prod.pid}
                                    className='btn btn-success'>Add Cart</button> */}

                                        <button onClick={() => this.props.addProductToCart(prod.pid, true)} className='btn btn-success'>Add Cart</button>
                                    </th>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    }
}
export default Product