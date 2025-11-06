import React, { useState } from 'react';
import type { View, Staff } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface CreateStaffFormProps {
  setView: (view: View) => void;
  showSuccessMessage: (message: string) => void;
  addStaff: (staffMember: Staff) => void;
}

export const CreateStaffForm: React.FC<CreateStaffFormProps> = ({ setView, showSuccessMessage, addStaff }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState<Staff['role']>('Sales');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', phone: '' });

    const validateForm = (): boolean => {
        const newErrors = { email: '', phone: '' };
        let isValid = true;

        // Email validation: checks for a basic email pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        // Phone validation: allows digits, spaces, (), +, - and length between 10-15
        const phoneRegex = /^[\d\s()+-]{10,15}$/;
        if (!phone.trim() || !phoneRegex.test(phone)) {
            newErrors.phone = 'Please enter a valid phone number (10-15 digits).';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }
        
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newStaff: Staff = {
                id: Date.now().toString(),
                name,
                email,
                phone,
                role,
            };
            addStaff(newStaff);
            console.log('Creating staff:', newStaff);
            // Reset form
            setName('');
            setEmail('');
            setPhone('');
            setRole('Sales');
            setIsLoading(false);
            showSuccessMessage(`Staff member "${name}" created successfully!`);
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
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Create New Staff Member</h2>
                <p className="text-slate-500 mb-6">Add a new person to your internal team.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="staffName" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input type="text" id="staffName" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="staffEmail" className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input 
                                type="email" 
                                id="staffEmail" 
                                value={email} 
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => ({...prev, email: ''}));
                                }} 
                                required 
                                className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-slate-400 focus:outline-none sm:text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="staffPhone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                            <input 
                                type="tel" 
                                id="staffPhone" 
                                value={phone} 
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    if (errors.phone) setErrors(prev => ({...prev, phone: ''}));
                                }} 
                                required 
                                className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-slate-400 focus:outline-none sm:text-sm ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>
                    </div>
                     <div>
                        <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value as Staff['role'])} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option>Sales</option>
                            <option>Support</option>
                            <option>Manager</option>
                            <option>Technician</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" disabled={isLoading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors">
                            {isLoading ? 'Creating...' : 'Create Staff Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
