import React from 'react';
import axios from 'axios';
import{Link} from 'react-router-dom'
import Update from './update';
class List extends React.Component{


    constructor(props){
        super(props);
        this.state={
            editdata:[]
        }
       this.deleteproduct=this.deleteproduct.bind(this);
    }
    componentDidMount = () => {
        this.getAll();
    }

getAll(){
    axios.get('http://localhost:2000/')
    .then(res=>{
        console.log(res.data)
        this.setState({
            editdata:res.data
        })
    })
    .catch(err=>{
        console.log(err)
    })
}


deleteproduct(id){
    console.log(id)
    axios.delete('http://localhost:2000/delete/'+id)
    .then(res=>{
        console.log('deleted');
        this.getAll();

    })
    
}
    render(){
        const {editdata}=this.state
        return(
        <div className="container mt-3">
            <table className="table table-striped">
            <thead>
              <tr>
                  <th>SNO</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Product Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
             {
                 editdata&&editdata.map((editdata_v,i)=>{
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                    <td>{editdata_v.Name}</td>
                    <td>{editdata_v.Price}</td>
                    <td><img src={`http://localhost:2000/uploads/${editdata_v.image}`} style={{width:"50px",height:"50px"}} />
                    </td>
                        <td>
                    <Link to={"product_edit/"+editdata_v._id} className='btn btn-danger'>Edit</Link>
                    </td>
                        <td>

                            <button type="button" onClick={()=>this.deleteproduct(editdata_v._id)}  className='btn btn-success'>Delete</button>    
                        </td>
                     
                        </tr>
                    )
                 })
             } 
            </tbody>
          </table>
          </div>
            )
    }

}
export default List