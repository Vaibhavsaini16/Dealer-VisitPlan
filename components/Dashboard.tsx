import React from 'react';
import type { View } from '../types';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { StoreIcon } from './icons/StoreIcon';
import { ListBulletIcon } from './icons/ListBulletIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface DashboardProps {
  setView: (view: View) => void;
}

const ActionCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void; }> = ({ title, description, icon, onClick }) => (
    <div 
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-1 border border-slate-200"
        onClick={onClick}
    >
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h2>
      <p className="text-slate-600 mb-8">Select an action to get started.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ActionCard
          title="Create New Retailer"
          description="Onboard a new retail partner. They will receive credentials to log in via OTP."
          icon={<StoreIcon className="w-8 h-8" />}
          onClick={() => setView('CREATE_RETAILER')}
        />
        <ActionCard
          title="Create New Staff"
          description="Add a new member to your internal team and assign them a role."
          icon={<UserPlusIcon className="w-8 h-8" />}
          onClick={() => setView('CREATE_STAFF')}
        />
        <ActionCard
          title="View All Retailers"
          description="Browse and manage all of your existing retail partners."
          icon={<ListBulletIcon className="w-8 h-8" />}
          onClick={() => setView('VIEW_RETAILERS')}
        />
        <ActionCard
          title="View All Staff"
          description="Browse and manage all of your internal team members."
          icon={<UserGroupIcon className="w-8 h-8" />}
          onClick={() => setView('VIEW_STAFF')}
        />
        <ActionCard
          title="Plan a Visit"
          description="Schedule a staff member to visit a retail partner on a specific date."
          icon={<CalendarIcon className="w-8 h-8" />}
          onClick={() => setView('CREATE_VISIT')}
        />
        <ActionCard
          title="View All Visits"
          description="See all upcoming and past scheduled visits in one place."
          icon={<ListBulletIcon className="w-8 h-8" />}
          onClick={() => setView('VIEW_VISITS')}
        />
      </div>
    </div>
  );
};