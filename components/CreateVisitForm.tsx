import React, { useState } from 'react';
import type { View, Visit, Staff, Retailer } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface CreateVisitFormProps {
  setView: (view: View) => void;
  showSuccessMessage: (message: string) => void;
  addVisit: (visit: Visit) => void;
  staffList: Staff[];
  retailers: Retailer[];
}

export const CreateVisitForm: React.FC<CreateVisitFormProps> = ({ setView, showSuccessMessage, addVisit, staffList, retailers }) => {
  const [staffId, setStaffId] = useState('');
  const [retailerId, setRetailerId] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId || !retailerId || !date) {
        setError('All fields are required.');
        return;
    }
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
        const newVisit: Visit = {
            id: Date.now().toString(),
            staffId,
            retailerId,
            date,
            status: 'Pending',
        };
        addVisit(newVisit);
        
        const staffName = staffList.find(s => s.id === staffId)?.name;
        const retailerName = retailers.find(r => r.id === retailerId)?.businessName;

        setIsLoading(false);
        showSuccessMessage(`Visit scheduled for ${staffName} to ${retailerName}.`);
        setView('DASHBOARD');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
        <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
        </button>
        <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Plan a New Visit</h2>
            <p className="text-slate-500 mb-6">Schedule a staff member to visit a retailer.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="staff" className="block text-sm font-medium text-slate-700">Select Staff Member</label>
                    <select id="staff" value={staffId} onChange={(e) => setStaffId(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="" disabled>Choose a staff member...</option>
                        {staffList.map(staff => (
                            <option key={staff.id} value={staff.id}>{staff.name} ({staff.role})</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="retailer" className="block text-sm font-medium text-slate-700">Select Retailer</label>
                    <select id="retailer" value={retailerId} onChange={(e) => setRetailerId(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="" disabled>Choose a retailer...</option>
                        {retailers.map(retailer => (
                            <option key={retailer.id} value={retailer.id}>{retailer.businessName}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-slate-700">Visit Date</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min={new Date().toISOString().split("T")[0]} />
                </div>
                
                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end">
                    <button type="submit" disabled={isLoading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors">
                        {isLoading ? 'Scheduling...' : 'Schedule Visit'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};