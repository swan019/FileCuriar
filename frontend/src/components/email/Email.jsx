import React from 'react';
import './Email.css'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Email({ id , cleanUp}) {
  const [emailTo, setEmailTo] = useState('');
  const [emailFrom, setEmailFrom] = useState('');
  const [loading, setLoading] = useState(false);

  const notify = () => toast('Email sent successfully!');

  const handleClick = () => {
    setTimeout(() => {
      cleanUp();
    }, 6000); // 3000 milliseconds = 3 seconds
  };

  const sendEmailHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/email/send', {
        id,
        emailTo,
        emailFrom
      });

      console.log(response);
      if (response.data.success) {
        notify();
        setLoading(false);
        handleClick();

      } else {
        alert('Error in sending email');
      }
    } catch (error) {
      alert('Something went wrong.');
      console.error(error);
    }



  }

  return (
    <div className='sendBox'>
      <div className='innerBox'>
        <div className='inputemail'>
          <div className="wave-group">
            <input required
              type="email"
              value={emailFrom}
              onChange={(e) => setEmailFrom(e.target.value)}
              className="input" />
            <span className="bar"></span>
            <label className="label">
              <span className="label-char" style={{ "--index": 0 }}>E</span>
              <span className="label-char" style={{ "--index": 1 }}>m</span>
              <span className="label-char" style={{ "--index": 2 }}>a</span>
              <span className="label-char" style={{ "--index": 3 }}>i</span>
              <span className="label-char" style={{ "--index": 4 }}>l</span>
              <span className="label-char th5" style={{ "--index": 5 }}></span>
              <span className="label-char" style={{ "--index": 6 }}>F</span>
              <span className="label-char" style={{ "--index": 7 }}>r</span>
              <span className="label-char" style={{ "--index": 8 }}>o</span>
              <span className="label-char" style={{ "--index": 9 }}>m</span>
            </label>
          </div>
          <div className="wave-group">
            <input required
              type="email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              className="input" />
            <span className="bar"></span>
            <label className="label">
              <span className="label-char" style={{ "--index": 0 }}>E</span>
              <span className="label-char" style={{ "--index": 1 }}>m</span>
              <span className="label-char" style={{ "--index": 2 }}>a</span>
              <span className="label-char" style={{ "--index": 3 }}>i</span>
              <span className="label-char" style={{ "--index": 4 }}>l</span>
              <span className="label-char th5" style={{ "--index": 5 }}></span>
              <span className="label-char" style={{ "--index": 6 }}>T</span>
              <span className="label-char" style={{ "--index": 7 }}>o</span>
            </label>
          </div>
        </div>
        <div className='postimg'>
          <img src="/images/2859817.jpg" draggable="false" alt="" />
        </div>
      </div>
      <button onClick={sendEmailHandler}>Send</button>
      <ToastContainer />
    </div>
  );
}

export default Email;
