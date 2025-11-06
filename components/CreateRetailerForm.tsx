import React, { useState } from 'react';
import type { View, Retailer } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface CreateRetailerFormProps {
  setView: (view: View) => void;
  showSuccessMessage: (message: string) => void;
  addRetailer: (retailer: Retailer) => void;
}

export const CreateRetailerForm: React.FC<CreateRetailerFormProps> = ({ setView, showSuccessMessage, addRetailer }) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        const newRetailer: Retailer = {
            id: Date.now().toString(),
            name,
            businessName,
            phone,
            email,
            address,
        };
        addRetailer(newRetailer);
        console.log('Creating retailer:', newRetailer);
        
        // Reset form
        setName('');
        setBusinessName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setIsLoading(false);
        showSuccessMessage(`Retailer "${businessName}" created successfully!`);
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
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Create New Retailer</h2>
            <p className="text-slate-500 mb-6">Enter the details for the new retail partner.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-slate-700">Business Name</label>
                    <input type="text" id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Contact Person Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number (for OTP)</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700">Business Address</label>
                    <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={isLoading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors">
                        {isLoading ? 'Creating...' : 'Create Retailer'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};