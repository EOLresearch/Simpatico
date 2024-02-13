import React from 'react';
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { IconContext } from 'react-icons';

function calculateAge(dateString) {
  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}


function ContactsList() {
  return (
    <IconContext.Provider value={{ className: "react-icons-contacts" }}>
      <div className="contacts-list">
        {/* <h3>Contacts List</h3> */}
        <div className="contact" >
          <div className='img-container'>
            <img className='profile-image' alt={`Profile of `} src='{contact.photoURL}' />
          </div>
          <div className="contact-body">
            <h5>Brian Crenshaw</h5>
            <p></p>
            <div className='convo-starter'>
            <h6>You have an active conversation with</h6>
            <RxCaretRight />
            </div>
          </div>
        </div>
        <div className="contact" >
          <div className='img-container'>
            <img className='profile-image' alt={`Profile of `} src="https://as1.ftcdn.net/v2/jpg/05/61/85/98/1000_F_561859826_zgMyHNg9tYqL7vhzQyCbX51zwruqcwV6.jpg" />
          </div>
          <div className="contact-body">
            <h5>Joe Miller </h5>
            <p>Web Developer, Study Support</p>
            <div className='convo-starter'>
            <h6>You have an active conversation with Joe Miller</h6>
            <RxCaretRight />
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default ContactsList;

