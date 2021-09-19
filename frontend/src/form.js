import React from 'react';
import axios from 'axios';
import keys from './config'

const url=keys.baseurl
const product_folder=keys.product_foldername;

class Form extends React.Component{
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
            editdata:[],
            change_image : "",
            file:''
        }
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
    this.setState({ change_image: URL.createObjectURL(e.target.files[0]) })
  this.setState({ image: e.target.files[0] })


//this.setState({ previewimage: <img src={URL.createObjectURL(e.target.files[0])} style={{width:"100px",height:"100px"}} />})

}
onsubmit=(e)=>{
    console.log(this.state.image)
    e.preventDefault();
    const formData=new FormData()
    formData.append('image',this.state.image);
    formData.append('Name',this.state.Name);
    formData.append('Price',this.state.Price)  
    console.log(formData)
    axios.post('http://localhost:2000/',formData)
    .then(res=>{
        console.log("inserted");
    })
    .catch(err=>{
        console.log(err);
    })
    this.setState({
        Name:'',
        Price:'',
        image:'',
        file:'',
        change_image:''
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
    <label>Image</label>
    {this.state.change_image!=''?
<img src={this.state.change_image} style={{width:"100px",height:"100px"}} />
:
''}
    <input type="file" className="form-control" placeholder="" id="image" name="image" 
    onChange={this.onChangeimage}
    value={this.state.file}
    />
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>

             </div>

         </div>
        )
    }
}
export default Form