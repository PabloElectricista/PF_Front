import { useState } from "react"
import './ContactUs.css'

export default function ContactUs() {
  const [input, setInput] = useState({
    subject: "",
    name: "",
    email: "",
    message: "",

  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()




    alert('Not implemented yet. We are working on this')
  }

  return (
    <div className="FormDiv">

      <h2>If you have any doubts, please let us know</h2>

      <form className="LogInForm" >
    
        <label className="FormLabel">Issue</label>
        <select className="FormInput" type="text" name="subject" value={input.name} onChange={(e) => handleChange(e)} >
          <option value="product" defaultValue>Product</option>
          <option value="service" >Service</option>
          <option value="other">Other</option>
        </select>
       
                
        <input className="FormInput" value={input.name} onChange={(e) => handleChange(e)}
                        
                        type='text' 
                        placeholder= "Your name"
                        required
                    />
                    <input
                        className="FormInput" value={input.name} onChange={(e) => handleChange(e)}
                        type='email'
                        placeholder="Your email"
                        name="email"
                        required
                    />
           
        <label className="FormLabel">Message</label>
        <textarea className="FormInput FormTextArea" type="textarea" name="message" value={input.name} onChange={(e) => handleChange(e)} cols="30" rows="10"></textarea>

        <button className="SubmitBtn" type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}