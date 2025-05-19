import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const EditContact= () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la URL si existe
  
  // Estado para almacenar datos del contacto
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Verificar si estamos en modo edición
  const isEditMode = Boolean(id);

  // Cargar datos del contacto si estamos editando
  useEffect(() => {
    if (isEditMode) {
      const fetchContact = async () => {
        try {
          const response = await fetch(`https://playground.4geeks.com/contact/agendas/garset/contacts/${id}`);
          if (!response.ok) throw new Error('Contacto no encontrado');
          const data = await response.json();
          setContact(data);
        } catch (error) {
          console.error("Error al cargar el contacto:", error);
          navigate("/"); // Redirige si hay error
        }
      };
      fetchContact();
    }
  }, [id, isEditMode, navigate]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Envío del formulario (POST o PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isEditMode 
        ? `https://playground.4geeks.com/contact/agendas/garset/contacts/${id}`
        : "https://playground.4geeks.com/contact/agendas/garset/contacts";

      const method = isEditMode ? 'PUT' : 'POST';

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
      console.log(`Contacto ${isEditMode ? 'actualizado' : 'guardado'}:`, data);
      navigate("/");
    } catch (error) {
      console.error(`Error al ${isEditMode ? 'actualizar' : 'guardar'} el contacto:`, error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">
            {isEditMode ? 'Edit Contact' : 'Add Contact'}
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
                {isEditMode ? 'Update Contact' : 'Save new Contact'}
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
export default EditContact

// los id de la api son para saber q contacto abrir debe abrir edit-contact/9


