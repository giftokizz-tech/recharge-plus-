import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const initialFormState = {
  serviceId: '',
  serviceName: '',
  planId: '',
  planName: '',
  duration: '',
  basePrice: ''
};

const AddPlan = () => {
  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPlans();
    fetchServices();
  }, []);

  const fetchPlans = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'plans'));
      const plansList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlans(plansList);
    } catch (err) {
      setError('Failed to fetch plans');
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const serviceList = querySnapshot.docs
        .map((serviceDoc) => ({ id: serviceDoc.id, ...serviceDoc.data() }))
        .filter((service) => service.isActive !== false);
      setServices(serviceList);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    }
  };

  const getServiceLabel = (service) => {
    if (!service) return '';
    if (service.displayName) return service.displayName;
    const network = service.network ? String(service.network).toUpperCase() : '';
    const category = service.category ? String(service.category) : '';
    return `${network} ${category}`.trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'serviceId') {
      const selectedService = services.find((service) => service.id === value);
      setFormData({
        ...formData,
        serviceId: value,
        serviceName: selectedService ? getServiceLabel(selectedService) : ''
      });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        serviceId: formData.serviceId,
        serviceName: formData.serviceName,
        planId: formData.planId,
        planName: formData.planName,
        duration: formData.duration,
        basePrice: Number(formData.basePrice),
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await updateDoc(doc(db, 'plans', editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'plans'), {
          ...payload,
          createdAt: new Date().toISOString()
        });
      }
      setFormData(initialFormState);
      setSuccess('Plan saved successfully.');
      fetchPlans();
    } catch (err) {
      setError('Failed to save plan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setFormData({
      serviceId: plan.serviceId || '',
      serviceName: plan.serviceName || '',
      planId: plan.planId || '',
      planName: plan.planName || '',
      duration: plan.duration || '',
      basePrice: plan.basePrice ?? plan.price ?? ''
    });
    setEditingId(plan.id);
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await deleteDoc(doc(db, 'plans', id));
        setSuccess('Plan deleted.');
        fetchPlans();
      } catch (err) {
        setError('Failed to delete plan');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setSuccess('');
  };

  return (
    <div>
      <h2>Plans Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>{editingId ? 'Edit Plan' : 'Add New Plan'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Service</label>
                  <select
                    className="form-control"
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {getServiceLabel(service)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Plan ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="planId"
                    value={formData.planId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 30 days"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="planName"
                    value={formData.planName}
                    onChange={handleChange}
                    placeholder="e.g., 500MB,1GB,2GB.."
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Plan Base Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5>Existing Plans</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Plan ID</th>
                    <th>Plan Name</th>
                    <th>Duration</th>
                    <th>Base Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map(plan => (
                    <tr key={plan.id}>
                      <td>{plan.serviceName || '-'}</td>
                      <td>{plan.planId}</td>
                      <td>{plan.planName}</td>
                      <td>{plan.duration}</td>
                      <td>{plan.basePrice ?? plan.price}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(plan)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(plan.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlan;