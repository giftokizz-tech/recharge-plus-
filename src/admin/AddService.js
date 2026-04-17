import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const NETWORKS = ['mtn', 'airtel', 'glo', '9mobile'];
const CATEGORIES = ['airtime', 'data'];

const initialFormState = {
  category: '',
  network: '',
  displayName: '',
  providerName: '',
  apiBaseUrl: '',
  apiEndpoint: '',
  apiKey: '',
  apiSecret: '',
  authScheme: 'Bearer',
  isActive: true
};

const AddService = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesList);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const buildDisplayName = (category, network) => {
    if (!category || !network) return '';
    return `${network.toUpperCase()} ${category.charAt(0).toUpperCase()}${category.slice(1)}`;
  };

  const ensureDisplayName = (data) => {
    if (data.displayName.trim()) return data.displayName.trim();
    return buildDisplayName(data.category, data.network);
  };

  const buildServicePayload = (data) => ({
    category: data.category,
    network: data.network,
    displayName: ensureDisplayName(data),
    providerName: data.providerName,
    isActive: data.isActive,
    apiConfig: {
      baseUrl: data.apiBaseUrl,
      endpoint: data.apiEndpoint,
      key: data.apiKey,
      secret: data.apiSecret,
      authScheme: data.authScheme
    },
    updatedAt: new Date().toISOString()
  });

  const populateDefaultServices = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const existingKeys = new Set(
        services.map((service) => `${service.category || ''}:${service.network || ''}`)
      );

      const toCreate = [];
      CATEGORIES.forEach((category) => {
        NETWORKS.forEach((network) => {
          const key = `${category}:${network}`;
          if (!existingKeys.has(key)) {
            toCreate.push({
              category,
              network,
              displayName: buildDisplayName(category, network),
              providerName: '',
              isActive: true,
              apiConfig: {
                baseUrl: '',
                endpoint: '',
                key: '',
                secret: '',
                authScheme: 'Bearer'
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          }
        });
      });

      if (!toCreate.length) {
        setSuccess('All default Airtime/Data services already exist.');
        return;
      }

      await Promise.all(toCreate.map((item) => addDoc(collection(db, 'services'), item)));
      setSuccess(`Created ${toCreate.length} default services.`);
      fetchServices();
    } catch (err) {
      setError('Failed to create default services.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = buildServicePayload(formData);
      if (editingId) {
        await updateDoc(doc(db, 'services', editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'services'), {
          ...payload,
          createdAt: new Date().toISOString()
        });
      }
      setFormData(initialFormState);
      setSuccess('Service saved successfully.');
      fetchServices();
    } catch (err) {
      setError('Failed to save service');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      category: service.category || '',
      network: service.network || '',
      displayName: service.displayName || '',
      providerName: service.providerName || '',
      apiBaseUrl: service.apiConfig?.baseUrl || '',
      apiEndpoint: service.apiConfig?.endpoint || '',
      apiKey: service.apiConfig?.key || '',
      apiSecret: service.apiConfig?.secret || '',
      authScheme: service.apiConfig?.authScheme || 'Bearer',
      isActive: service.isActive !== false
    });
    setEditingId(service.id);
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDoc(doc(db, 'services', id));
        setSuccess('Service deleted.');
        fetchServices();
      } catch (err) {
        setError('Failed to delete service');
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
      <h2>Services Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card mb-3">
        <div className="card-body">
          <h5>Quick Setup</h5>
          <p className="mb-2">
            Create default services for Airtime/Data on MTN, Airtel, Glo, and 9mobile.
          </p>
          <button className="btn btn-outline-primary" onClick={populateDefaultServices} disabled={loading}>
            {loading ? 'Processing...' : 'Create Default Airtime/Data Services'}
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5>{editingId ? 'Edit Service' : 'Add New Service'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="airtime">Airtime</option>
                    <option value="data">Data</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Network</label>
                  <select
                    className="form-control"
                    name="network"
                    value={formData.network}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Network</option>
                    {NETWORKS.map((network) => (
                      <option key={network} value={network}>
                        {network.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Display Name (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder={buildDisplayName(formData.category, formData.network)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Provider Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="providerName"
                    value={formData.providerName}
                    onChange={handleChange}
                    placeholder="e.g. SMEPlug, ClubKonnect, VTpass"
                  />
                </div>
                <h6 className="mt-4">API Setup</h6>
                <div className="mb-3">
                  <label className="form-label">API Base URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="apiBaseUrl"
                    value={formData.apiBaseUrl}
                    onChange={handleChange}
                    placeholder="https://api.provider.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Service Endpoint</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apiEndpoint"
                    value={formData.apiEndpoint}
                    onChange={handleChange}
                    placeholder="/v1/airtime/purchase"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">API Key</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apiKey"
                    value={formData.apiKey}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">API Secret / Token</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apiSecret"
                    value={formData.apiSecret}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Auth Scheme</label>
                  <select
                    className="form-control"
                    name="authScheme"
                    value={formData.authScheme}
                    onChange={handleChange}
                  >
                    <option value="Bearer">Bearer</option>
                    <option value="Basic">Basic</option>
                    <option value="ApiKey">ApiKey</option>
                    <option value="Custom">Custom Header</option>
                  </select>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isActive">Service is active</label>
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
        <div className="col-md-7">
          <div className="card mb-3">
            <div className="card-body">
              <h5>Admin API Implementation Guide</h5>
              <ol className="mb-0">
                <li>Create defaults with the quick setup button (8 services total).</li>
                <li>Edit each service and fill provider + API config fields now or later.</li>
                <li>Set your provider endpoint (Airtime/Data endpoint can differ by network).</li>
                <li>Set authentication scheme and credentials from provider dashboard.</li>
                <li>Use <code>isActive</code> to enable/disable a service without deleting it.</li>
                <li>From your backend/Cloud Functions, read the service doc and call the stored endpoint for purchases.</li>
              </ol>
              <p className="text-muted mt-3 mb-0">
                Security note: avoid exposing provider secrets in frontend responses. Use backend proxy/Cloud Functions for live transactions.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5>Existing Services</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Provider</th>
                    <th>API</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.id}>
                      <td>{service.displayName || buildDisplayName(service.category, service.network)}</td>
                      <td>{service.providerName || '-'}</td>
                      <td>
                        <small>{service.apiConfig?.baseUrl || '-'}</small>
                      </td>
                      <td>
                        <span className={`badge ${service.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {service.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(service)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(service.id)}>
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

export default AddService;