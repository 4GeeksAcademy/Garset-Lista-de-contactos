import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (id) {
      const fetchAndFilterContacts = async () => {
        try {
          const response = await fetch('https://playground.4geeks.com/contact/agendas/garset');
          if (!response.ok) throw new Error('Error al cargar contactos');
          
          const data = await response.json();
          const foundContact = data.contacts.find(c => c.id === parseInt(id));
          
          if (foundContact) {
            setContact(foundContact);
          } else {
            throw new Error('Contacto no encontrado');
          }
        } catch (error) {
          console.error("Error:", error);
          navigate("/");
        }
      };
      
      fetchAndFilterContacts();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = id 
        ? `https://playground.4geeks.com/contact/agendas/garset/contacts/${id}`
        : "https://playground.4geeks.com/contact/agendas/garset/contacts";

      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: JSON.stringify(contact),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(`Contacto ${id ? 'actualizado' : 'guardado'}:`, data);
      navigate("/");
    } catch (error) {
      console.error(`Error al ${id ? 'actualizar' : 'guardar'} el contacto:`, error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">
            {id ? 'Edit Contact' : 'Add Contact'}
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">Nombre y Apellido</label>
              <input 
                type="text" 
                className="form-control" 
                id="nameInput" 
                name="name"
                placeholder="Elena María Mistretta Rodríguez" 
                value={contact.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="emailInput" className="form-label mt-3">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="emailInput" 
                name="email"
                placeholder="name@example.com" 
                value={contact.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="phoneInput" className="form-label mt-3">Teléfono</label>
              <input 
                type="tel" 
                className="form-control" 
                id="phoneInput" 
                name="phone"
                placeholder="+34XXXXXXXXX" 
                value={contact.phone}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="addressInput" className="form-label mt-3">Dirección</label>
              <input 
                type="text" 
                className="form-control" 
                id="addressInput" 
                name="address"
                placeholder="Madrid, España" 
                value={contact.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary px-4">
                {id ? 'Update Contact' : 'Save new Contact'}
              </button>

              <Link to="/">
                <button type="button" className="btn btn-outline-secondary">
                  Go back to Home
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditContact;