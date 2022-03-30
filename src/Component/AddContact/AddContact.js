import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Add_Contact } from "../Redux/Action/contactAction";
import "./AddContact.css";
export const AddContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactReducer.contacts);
  const navigate = useNavigate();
  const NameRef = useRef();
  const EmailRef = useRef();
  const PhoneRef = useRef();
  const onAddUserHandler = (event) => {
    event.preventDefault();
    const contact = {
      id: contacts.length + 1,
      name: NameRef.current.value,
      email: EmailRef.current.value,
      phone: PhoneRef.current.value,
    };
    dispatch(Add_Contact(contact));
    fetch(
      "https://contact-app-da957-default-rtdb.firebaseio.com/contact.json",
      {
        method: "POST",
        body: JSON.stringify(contact),
      }
    );
    navigate("/displayPage");
  };
  const onShowContactHandler = () => {
    navigate("/displayPage");
  };
  return (
    <div className="add-container">
      <div className="add-container-top">
        <h1>Add-Contact</h1>
        <button onClick={onShowContactHandler}>Show-Contacts</button>
      </div>
      <div className="add-input-container">
        <form>
          <label>Name</label>
          <input type="text" ref={NameRef} />
          <label>Email</label>
          <input type="text" ref={EmailRef} />
          <label>Phone</label>
          <input type="text" ref={PhoneRef} />
          <button onClick={onAddUserHandler}>Add-Use</button>
        </form>
      </div>
    </div>
  );
};
