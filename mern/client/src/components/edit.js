import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { BootstrapErrorToast, BootstrapSuccessToast, BootstrapConfirmToast } from './Alerts';

export default function Edit() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    region: "",
    rating: "",
    sales: "",
    fee: "",
  });

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isConfirmToastVisible, setIsConfirmToastVisible] = useState(false);
  const [isUpdateConfirmed, setIsUpdateConfirmed] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:3001/agent/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        setShowErrorToast(true);
        setShowSuccessToast(false);
        console.log(message);
        return;
      }

      const agents = await response.json();
      if (!agents) {
        setShowErrorToast(true);
        window.alert(`Agent with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(agents);
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.first_name || !form.last_name || !form.region || !form.rating || !form.sales || !form.fee) {
      setShowErrorToast(true);
      return;
    }

    if (isUpdateConfirmed) {
      const editedPerson = {
        first_name: form.first_name,
        last_name: form.last_name,
        region: form.region,
        rating: form.rating,
        sales: form.sales,
        fee: form.fee,
      };

      await fetch(`http://localhost:3001/agent/update/${params.id}`, {
        method: "POST",
        body: JSON.stringify(editedPerson),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      setShowSuccessToast(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setIsConfirmToastVisible(true);
    }
  }

  function handleConfirm() {
    setIsUpdateConfirmed(true);
    setIsConfirmToastVisible(false); // Cerrar el mensaje de confirmación después de confirmar
    onSubmit(new Event("dummy")); // Enviar el formulario después de la confirmación
  }

  function handleCancel() {
    setIsUpdateConfirmed(false);
    setIsConfirmToastVisible(false);
  }

  return (
    <div>
      <h3>Update Agent</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            className="form-control"
            id="region"
            value={form.region}
            onChange={(e) => updateForm({ region: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={form.rating}
            onChange={(e) => updateForm({ rating: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sales">Sales:</label>
          <input
            type="text"
            className="form-control"
            id="sales"
            value={form.sales}
            onChange={(e) => updateForm({ sales: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fee">Fee:</label>
          <input
            type="text"
            className="form-control"
            id="fee"
            value={form.fee}
            onChange={(e) => updateForm({ fee: e.target.value })}
          />
        </div>

        <div className="form-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsConfirmToastVisible(true)}
          >
            Update Agent
          </button>
        </div>
      </form>
      {showErrorToast && <BootstrapErrorToast message="Please fill in all required fields." onClose={() => setShowErrorToast(false)} />}
      {showSuccessToast && <BootstrapSuccessToast message="Agent updated successfully." onClose={() => setShowSuccessToast(false)} />}
      {isConfirmToastVisible && (
        <BootstrapConfirmToast
          message="Are you sure you want to continue with the update?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
