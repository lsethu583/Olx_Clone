import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import {FirebaseContext,AuthContext} from '../../store/FirebaseContext'

const Create = () => {
  const history=useHistory()
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)
  const date=new Date()

  const handleSubmit = () => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
  
    if (!image) {
      console.error("No image selected.");
      return;
    }
  
    firebase
      .storage()
      .ref(`/images/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase
            .firestore()
            .collection('products')
            .add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString()
            })
            .then(() => {
              history.push('/');
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
              
              
            <input className="input" type="number"  value={price}
              onChange={(e)=>setPrice(e.target.value)}  id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):""}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
