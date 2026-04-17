import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const ManagePricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlans();
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

  const handlePriceChange = (id, newPrice) => {
    setPlans(plans.map(plan => plan.id === id ? { ...plan, price: newPrice } : plan));
  };

  const handleUpdatePrice = async (id, newPrice) => {
    setLoading(true);
    setError('');
    try {
      await updateDoc(doc(db, 'plans', id), { price: newPrice });
      fetchPlans(); // Refresh to confirm
    } catch (err) {
      setError('Failed to update price');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Direct Pricing Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card">
        <div className="card-body">
          <h5>Set Custom Prices for Plans</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Plan ID</th>
                <th>Plan Name</th>
                <th>Current Price</th>
                <th>New Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.planId}</td>
                  <td>{plan.planName}</td>
                  <td>{plan.price}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={plan.price}
                      onChange={(e) => handlePriceChange(plan.id, e.target.value)}
                      step="0.01"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleUpdatePrice(plan.id, plan.price)}
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePricing;