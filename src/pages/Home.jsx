import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	function getContact() {
		fetch("https://playground.4geeks.com/contact/agendas/garset")
			.then((response) => response.json())
			.then((data) => {
				console.log(data.contacts);
				// Envio los contactos al store 
				dispatch({
					type: "set_contacts",
					payload: data.contacts,
				});
			})
			.catch((error) => console.error("Error:", error));
	}
function createAgenda() {
		fetch("https://playground.4geeks.com/contact/agendas/garset", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error("Agenda might already exist");
			}
			return response.json();
		})
		.then(data => console.log("Agenda created:", data))
		.catch(error => console.log("Agenda creation note:", error.message));
	}
	useEffect(() => {
    createAgenda();
		getContact();
	}, []);

	return (
	<div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h1 className="h4 mb-0">Contact List</h1>
            </div>
            <div className="card-body">
              {/* Lista de contactos con Grid */}
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {store.contactos?.map((contact) => (
                  <div key={contact.id} className="col">
                    <div className="card h-100 border-light shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-primary">{contact.name}</h5>
                        <ul className="list-unstyled">
                          <li>
                            <i className="bi bi-geo-alt-fill me-2 text-muted"></i>
                            {contact.address}
                          </li>
                          <li>
                            <i className="bi bi-telephone-fill me-2 text-muted"></i>
                            {contact.phone}
                          </li>
                          <li>
                            <i className="bi bi-envelope-fill me-2 text-muted"></i>
                            {contact.email}
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-warning">
                            <i className="bi bi-pencil-square"></i> Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer bg-light">
              <Link to="/add-contact" className="btn btn-success">
                <i className="bi bi-plus-circle"></i> Add new contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
