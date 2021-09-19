import React from 'react';
import axios from 'axios'
import keys from './config'
const url=keys.baseurl
const product_folder=keys.product_foldername;
console.log(url+product_folder)
class Update extends React.Component{
constructor(props){
    super(props)
    this.onChangeName=this.onChangeName.bind(this);
    this.onChangePrice=this.onChangePrice.bind(this);
    this.onChangePrice=this.onChangePrice.bind(this);
    this.onChangeimage=this.onChangeimage.bind(this);
    this.onsubmit=this.onsubmit.bind(this);
    this.state={
            Name:'',
            Price:'',
            image:'',
            change_image:'',
            editdata:[]
        
        }
}
componentDidMount(){
    this.getValues()
}
getValues(){

    axios.get(url+"product_edit/"+this.props.match.params.id)
    .then(res=>{
        console.log("update",res.data)
        this.setState({
            Name:res.data[0].Name,
            Price:res.data[0].Price,
            image:res.data[0].image
        })
    })
}

onChangeName=(e)=>{
    this.setState({
        Name:e.target.value

    })
}
onChangePrice=(e)=>{
    this.setState({
        Price:e.target.value

    })
}

onChangeimage(e) {
    console.log(this.state.image)
 this.setState({ image: e.target.files[0] })
  this.setState({ change_image: URL.createObjectURL(e.target.files[0]) })
}

getAll(){
    axios.get('http://localhost:2000/')
    .then(res=>{
        console.log("getdata",res.data)
        this.setState({
        })
    })
    .catch(err=>{
        console.log(err)
    })
}
onsubmit=(e)=>{
    e.preventDefault();
    console.log(this.state.image,this.state.Name,this.state.Price);

    const formData=new FormData()
    formData.append('image',this.state.image);
    formData.append('Name',this.state.Name);
    formData.append('Price',this.state.Price)  
    console.log(formData)
    axios.put(`http://localhost:2000/update/${this.props.match.params.id}`,formData)
    .then(res=>{
        console.log("updated data",res.data);
        console.log("updated");
        this.props.history.push('/list');

        
    })
    .catch(err=>{
        console.log(err);
    })

  
    
}

    render(){
        return(
         <div className="container mt-3">
             <div className="jumbotron">
             <form  onSubmit={this.onsubmit} enctype="multipart/form-data" >
  <div className="form-group"  >
    <label>Product Name</label>
    <input type="text" className="form-control" placeholder="Product Name" id="Name" name="Name" 
    value={this.state.Name}
    onChange={this.onChangeName}
    />
  </div>
  <div>
    <label>Price</label>
    <input type="text" className="form-control" placeholder="Enter Price" id="Price" name="Price"
    value={this.state.Price}
    onChange={this.onChangePrice}
    />
  </div>
  <div>
  <label>Select Image</label>
      {
          this.state.change_image!='' ?
  <img src={this.state.change_image} style={{width:"50px",height:"50px"}}/>
          
  :
    <img src={url+product_folder+this.state.image} style={{width:"50px",height:"50px"}}/>
      }
    <input type="file" className="form-control" placeholder="" id="image" name="image" 
    onChange={this.onChangeimage} 
    />
  </div>
  <button type="submit"  className="btn btn-primary">Update</button>
</form>

             </div>

         </div>
        )
    }
}
export default Update