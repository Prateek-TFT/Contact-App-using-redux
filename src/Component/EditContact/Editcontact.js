import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Fetch_contact, Toggle_Spinner } from "../Redux/Action/contactAction";
import "./EditContact.css";
export const Editcontact = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.name);
  const [email, setEmail] = useState(location.state.email);
  const [phone, setPhone] = useState(location.state.phone);
  const onUpdateHandler = () => {
    const updateData = {
      key: location.state.key,
      id: location.state.id,
      name: name,
      email: email,
      phone: phone,
    };
    fetch(
      `https://contact-app-da957-default-rtdb.firebaseio.com/contact/${location.state.key}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updateData),
      }
    );

    navigate("/displayPage");
    fetchcontacts();
  };
  const onCancelHandler = () => {
    navigate("/displayPage");
  };
  const fetchcontacts = async () => {
    dispatch(Toggle_Spinner(true));
    const response = await fetch(
      "https://contact-app-da957-default-rtdb.firebaseio.com/contact.json"
    );
    const responseData = await response.json();

    const loadedContacts = [];

    for (const key in responseData) {
      loadedContacts.push({
        key: key,
        id: responseData[key].id,
        name: responseData[key].name,
        email: responseData[key].email,
        phone: responseData[key].phone,
      });
    }
    dispatch(Fetch_contact(loadedContacts));
    if (response.ok) {
      dispatch(Toggle_Spinner(false));
    }
  };

  return (
    <div className="add-container">
      <h1>Edit-Contact</h1>
      <div className="add-input-container">
        <form>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div>
            <button id="btn-update" onClick={onUpdateHandler}>
              Update Contact
            </button>
            <button id="btn-cancel" onClick={onCancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
