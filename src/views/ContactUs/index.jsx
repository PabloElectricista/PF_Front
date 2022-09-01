import { useState } from "react"
import { useDispatch } from "react-redux"
import { createContact} from '../../redux/actions'

import './ContactUs.css'

export default function ContactUs() {
  const dispatch= useDispatch();
  const [input, setInput] = useState({
    subject: "",
    name: "",
    email: "",
    message: "",

  })
  


  function handleChange (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    e.preventDefault();
    dispatch(createContact(input))
    setInput({ 
      subject: "",
      name: "",
      email: "",
      message: "",
    })
  
    alert("Your questions are be answered in a few moments.")
  }




  

  return (
    <div className="FormDiv">

      <h2>If you have any doubts, please let us know</h2>

      <form className="LogInForm" >
    
        <label className="FormLabel">Issue</label>
        <select className="FormInput" type="text" name="subject" value={input.subject} onChange={(e) => handleChange(e)} >
          <option value="product" defaultValue>Product</option>
          <option value="service" >Service</option>
          <option value="other">Other</option>
        </select>
       
                
        <input className="FormInput" value={input.name} onChange={(e) => handleChange(e)}
                        type='text' 
                        placeholder= "Your name"
                        name="name"
                        required
                    />
                    <input
                        className="FormInput" value={input.email} onChange={(e) => handleChange(e)}
                        type='email'
                        placeholder="Your email"
                        name="email"
                        required
                    />
           
        <label className="FormLabel">Message</label>
        <textarea className="FormInput FormTextArea" type="textarea" name="message" value={input.message} onChange={(e) => handleChange(e)} cols="30" rows="10"></textarea>

        <button className="SubmitBtn" type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}