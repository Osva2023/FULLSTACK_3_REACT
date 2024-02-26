import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Create() {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        region: '',
        rating: '',
        fee: '',
        sales: '',
    });
    const navigate = useNavigate();
    // These methods will update the state properties
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    // this function will handle the submission
    async function onSubmit(e) {
        e.preventDefault();
        // When a post request is sent to the create url, we'll add a new record to the database
        const newPerson = { ...form };
        try {
            const response = await fetch(`http://localhost:3001/agent/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPerson),
            });
    
            if (!response.ok) {
                const errorMessage = await response.json();
                window.alert(`Please provide all required fields. ${errorMessage.error}`);
                return;
            }
    
            setForm({ first_name: '', last_name: '', email: '', region: '', rating: '', fee: '', sales: ''});
            navigate('/');
        } catch (error) {
            console.error(`Unexpected error: ${error}`);
            window.alert('An unexpected error occurred while creating the agent.');
        }
    }
    
    // This following section will display the form that takes the input from the user.
    return (
            <div className="content-box create-box" >
                <h3>Create New Agent</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="first_name">First_Name <span className="required">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            value={form.first_name}
                            onChange={(e) => updateForm({ first_name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last_Name <span className="required">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            value={form.last_name}
                            onChange={(e) => updateForm({ last_name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={form.email}
                            onChange={(e) => updateForm({ email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="region">Region <span className="required">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="region"
                            value={form.region}
                            onChange={(e) => updateForm({ region: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating <span className="required">*</span></label>
                        <input
                            type="number"
                            className="form-control"
                            id="rating"
                            value={form.rating}
                            onChange={(e) => updateForm({ rating: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fee">Fee <span className="required">*</span></label>
                        <input
                            type="number"
                            className="form-control"
                            id="fee"
                            value={form.fee}
                            onChange={(e) => updateForm({ fee: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sales">Sales <span className="required">*</span></label>
                        <input
                            type="number"
                            className="form-control"
                            id="sales"
                            value={form.sales}
                            onChange={(e) => updateForm({ sales: e.target.value })}
                        />
                    </div>

                    
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Agent"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
    );
}
                                
            