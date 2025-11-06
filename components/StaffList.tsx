import React from 'react';
import type { Staff, View } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PencilIcon } from './icons/PencilIcon';

interface StaffListProps {
  staffList: Staff[];
  setView: (view: View) => void;
  handleEdit: (staff: Staff) => void;
}

export const StaffList: React.FC<StaffListProps> = ({ staffList, setView, handleEdit }) => {

  return (
    <div className="animate-fade-in">
      <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors">
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Dashboard
      </button>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">All Staff</h2>
        <p className="text-slate-500 mb-6">A list of all your internal team members.</p>
        
        {staffList.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {staffList.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{staff.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{staff.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{staff.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            staff.role === 'Manager' ? 'bg-purple-100 text-purple-800' :
                            staff.role === 'Sales' ? 'bg-green-100 text-green-800' :
                            staff.role === 'Support' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800' // Technician
                        }`}>
                            {staff.role}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                            onClick={() => handleEdit(staff)}
                            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                            aria-label={`Edit ${staff.name}`}
                        >
                            <PencilIcon className="w-4 h-4" />
                            Edit
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 px-6 border-2 border-dashed border-slate-200 rounded-lg">
            <h3 className="text-lg font-medium text-slate-800">No Staff Members Found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Get started by creating a new staff member from the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};