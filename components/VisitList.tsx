import React from 'react';
import type { Visit, Staff, Retailer, View } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface VisitListProps {
  visits: Visit[];
  staffList: Staff[];
  retailers: Retailer[];
  setView: (view: View) => void;
}

const StatusBadge: React.FC<{ status: Visit['status'] }> = ({ status }) => {
  const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
  const statusClasses = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

export const VisitList: React.FC<VisitListProps> = ({ visits, staffList, retailers, setView }) => {
  const getStaffName = (staffId: string) => staffList.find(s => s.id === staffId)?.name || 'Unknown Staff';
  const getRetailerName = (retailerId: string) => retailers.find(r => r.id === retailerId)?.businessName || 'Unknown Retailer';

  return (
    <div className="animate-fade-in">
      <button onClick={() => setView('DASHBOARD')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors">
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Dashboard
      </button>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">All Scheduled Visits</h2>
        <p className="text-slate-500 mb-6">A list of all planned visits to retail partners.</p>
        
        {visits.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff Member</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Retailer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {visits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{new Date(visit.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{getStaffName(visit.staffId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{getRetailerName(visit.retailerId)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <StatusBadge status={visit.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 px-6 border-2 border-dashed border-slate-200 rounded-lg">
            <h3 className="text-lg font-medium text-slate-800">No Visits Scheduled</h3>
            <p className="mt-1 text-sm text-slate-500">
              Get started by planning a new visit from the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};