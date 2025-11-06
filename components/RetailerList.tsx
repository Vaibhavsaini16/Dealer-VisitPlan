import React from 'react';
import type { Retailer, View } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PencilIcon } from './icons/PencilIcon';

interface RetailerListProps {
  retailers: Retailer[];
  setView: (view: View) => void;
  handleEdit: (retailer: Retailer) => void;
}

export const RetailerList: React.FC<RetailerListProps> = ({ retailers, setView, handleEdit }) => {
  return (
    <div className="animate-fade-in">
      <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors">
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Dashboard
      </button>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">All Retailers</h2>
        <p className="text-slate-500 mb-6">A list of all your registered retail partners.</p>
        
        {retailers.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Business Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact Person</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {retailers.map((retailer) => (
                  <tr key={retailer.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{retailer.businessName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{retailer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{retailer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{retailer.email}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-slate-600 max-w-xs">{retailer.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                            onClick={() => handleEdit(retailer)}
                            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                            aria-label={`Edit ${retailer.businessName}`}
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
            <h3 className="text-lg font-medium text-slate-800">No Retailers Found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Get started by creating a new retailer from the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};