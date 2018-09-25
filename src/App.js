import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const apiAddress = 'http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages'

class App extends Component {
  state = {
    data:[],
    // idOfMessageToEdit:null,
    // bodyOfMessageToEdit:''
    messageToEdit:null
  }

  componentDidMount() {
    fetch(apiAddress)
    .then(r=>r.json())
    .then(data=>this.setState({data}))
  }

  handleForm = (event) => {
    //debugger
    this.setState({
      messageToEdit: {
        ...this.state.messageToEdit,
        message:event.target.value
      }
    })
  }

  handleEdit = (id) => {
    // this.setState({
    //   idOfMessageToEdit:id
    // },()=>{
    //   this.setState({
    //     bodyOfMessageToEdit:this.state.data.find(m=>m.id===this.state.idOfMessageToEdit).message
    //   })
    // })

    const message = this.state.data.find(m=>m.id === id)
    //debugger
    const messageToEdit = {
      real_name:message.real_name,
      id:message.id,
      message:message.message
    }
    //debugger
    this.setState({
      messageToEdit:messageToEdit
    })

    // this.setState({
    //   idOfMessageToEdit:id
    // },()=>{
    //   this.setState({
    //     bodyOfMessageToEdit:this.state.data.find(m=>m.id===this.state.idOfMessageToEdit).message
    //   })
    // })

    
  }

  updateMessage = event => {
    //const message = this.state.data.find(m=>m.id===this.state.idOfMessageToEdit)
    // const updatedMessageBody = {
    //   message: {
    //     message:this.state.bodyOfMessageToEdit,
    //     real_name:message.real_name
    //   }
    // }

    const body = JSON.stringify({
      message:this.state.messageToEdit
    })
    const config = {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:body
    }

    fetch(`${apiAddress}/${this.state.messageToEdit.id}`,config).then(r=>r.json()).then(data=>{
      
      const newData = [...this.state.data]
      
      const messageToUpdate = newData.find(m=>m.id===data.id)
      
      messageToUpdate.message = data.message
      
      this.setState({
        data:newData,
        messageToEdit:null
      })
    })
  }
  // this.state.idOfMessageToEdit ? <div><input onChange={this.handleForm} type="text" value={this.state.bodyOfMessageToEdit} /><button onClick={this.updateMessage}>Edit Message</button></div> : null
  render() {
    return (
      <React.Fragment>
        {this.state.messageToEdit ? <div><input onChange={this.handleForm} type="text" value={this.state.messageToEdit.message} /><button onClick={this.updateMessage}>Edit Message</button></div> : null}
        {this.state.data.map(m=><p onClick={(event)=>{this.handleEdit(m.id)}} key={m.id} >{m.message}</p>)}
      </React.Fragment>
    );
  }
}

export default App;
