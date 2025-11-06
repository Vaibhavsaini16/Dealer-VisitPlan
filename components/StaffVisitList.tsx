import React from 'react';
import type { Visit, Staff, Retailer } from '../types';

interface StaffVisitListProps {
  staff: Staff;
  visits: Visit[];
  retailers: Retailer[];
  updateVisitStatus: (visitId: string, status: Visit['status']) => void;
}

export const StaffVisitList: React.FC<StaffVisitListProps> = ({ staff, visits, retailers, updateVisitStatus }) => {
  const getRetailerInfo = (retailerId: string) => retailers.find(r => r.id === retailerId) || { businessName: 'Unknown', address: 'N/A' };

  const sortedVisits = [...visits].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="animate-fade-in">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome, {staff.name}!</h2>
        <p className="text-slate-600 mb-8">Here are your scheduled visits. Please update the status as you complete them.</p>
        
        {sortedVisits.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Retailer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Update Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedVisits.map((visit) => {
                  const retailer = getRetailerInfo(visit.retailerId);
                  return (
                    <tr key={visit.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{new Date(visit.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{retailer.businessName}</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-slate-600 max-w-xs">{retailer.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={visit.status}
                          onChange={(e) => updateVisitStatus(visit.id, e.target.value as Visit['status'])}
                          className={`w-full max-w-xs p-1.5 border rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                              visit.status === 'Pending' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                              visit.status === 'Completed' ? 'bg-green-100 border-green-300 text-green-800' :
                              'bg-red-100 border-red-300 text-red-800'
                          }`}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 px-6 border-2 border-dashed border-slate-200 rounded-lg">
            <h3 className="text-lg font-medium text-slate-800">No Visits Scheduled</h3>
            <p className="mt-1 text-sm text-slate-500">
              You currently have no visits assigned to you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};