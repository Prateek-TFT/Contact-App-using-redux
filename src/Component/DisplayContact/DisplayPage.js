import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { Contact } from "../Contacts/Contact";
import {
  Fetch_contact,
  Remove_Contact,
  Toggle_Spinner,
} from "../Redux/Action/contactAction";
import "./DisplayPage.css";
export const DisplayPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactReducer.contacts);
  const showSpinner = useSelector((state) => state.contactReducer.showSpinner);
  const navigate = useNavigate();
  const onDeleteHandler = (id, key) => {
    dispatch(Toggle_Spinner(true));
    dispatch(Remove_Contact(id));
    fetch(
      `https://contact-app-da957-default-rtdb.firebaseio.com/contact/${key}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok) {
        dispatch(Toggle_Spinner(false));
      }
    });
  };
  const onEditHandler = (data) => {
    navigate("/editcontact", { state: data });
    fetchcontacts();
  };
  useEffect(() => {
    fetchcontacts();
  }, []);
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
    <div className="display-container">
      <div className="showDetails">
        <header>
          <p id="Id">Id</p>
          <p id="Name">Name</p>
          <p id="Email">Email</p>
          <p id="Phone">Phone</p>
        </header>
        {contacts.length === 0 ? (
          <div id="spinnerDiv">
            <p>No Contact Found....</p>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="add-Contact-btn"
            >
              Add-Contact
            </button>
          </div>
        ) : showSpinner ? (
          <div id="spinnerDiv">
            <FadeLoader color={"deepskyblue"} loading={true} />
          </div>
        ) : (
          <div className="content-div">
            {contacts.map((item, index) => {
              return (
                <Contact
                  key={item.key}
                  uniqueId={item.key}
                  id={index + 1}
                  name={item.name}
                  email={item.email}
                  phone={item.phone}
                  onDelete={() => onDeleteHandler(item.id, item.key)}
                  onEdit={() => onEditHandler(item)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
