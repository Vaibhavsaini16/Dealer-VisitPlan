import React from 'react';
import type { Staff, View } from '../types';

interface HeaderProps {
    staffList: Staff[];
    setViewingAsStaff: (staff: Staff | null) => void;
    setCurrentView: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ staffList, setViewingAsStaff, setCurrentView }) => {

    const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const staffId = e.target.value;
        if (staffId === 'dealer') {
            setViewingAsStaff(null);
            setCurrentView('DASHBOARD');
        } else {
            const selectedStaff = staffList.find(s => s.id === staffId);
            if (selectedStaff) {
                setViewingAsStaff(selectedStaff);
                setCurrentView('STAFF_VISITS');
            }
        }
    };

    return (
        <header className="bg-slate-800 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Dealer Management Portal
                    </h1>
                    <div className="flex items-center gap-4">
                        <label htmlFor="view-as" className="text-sm font-medium text-slate-300">Viewing As:</label>
                        <select
                            id="view-as"
                            onChange={handleViewChange}
                            className="bg-slate-700 text-white border border-slate-600 rounded-md py-1.5 pl-3 pr-8 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="dealer">Dealer</option>
                            {staffList.map(staff => (
                                <option key={staff.id} value={staff.id}>{staff.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};