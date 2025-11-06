import React, { useState, useEffect } from 'react';
import type { View, Retailer, Staff, Visit } from './types';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CreateRetailerForm } from './components/CreateRetailerForm';
import { CreateStaffForm } from './components/CreateStaffForm';
import { RetailerList } from './components/RetailerList';
import { StaffList } from './components/StaffList';
import { EditStaffForm } from './components/EditStaffForm';
import { EditRetailerForm } from './components/EditRetailerForm';
import { CreateVisitForm } from './components/CreateVisitForm';
import { VisitList } from './components/VisitList';
import { StaffVisitList } from './components/StaffVisitList';

const initialRetailers: Retailer[] = [
    {
        id: '1',
        name: 'John Doe',
        businessName: 'John\'s Gadgets',
        phone: '123-456-7890',
        email: 'john.d@example.com',
        address: '123 Main St, Anytown, USA 12345'
    },
    {
        id: '2',
        name: 'Jane Smith',
        businessName: 'Smith\'s Electronics',
        phone: '098-765-4321',
        email: 'jane.s@example.com',
        address: '456 Oak Ave, Sometown, USA 54321'
    },
    {
        id: '3',
        name: 'Sam Wilson',
        businessName: 'Innovate Solutions',
        phone: '555-123-4567',
        email: 'sam.w@example.com',
        address: '789 Pine Rd, Techville, USA 67890'
    }
];

const initialStaff: Staff[] = [
    { id: 's1', name: 'Alice Johnson', email: 'alice.j@dealer.com', phone: '555-111-2222', role: 'Manager' },
    { id: 's2', name: 'Bob Williams', email: 'bob.w@dealer.com', phone: '555-333-4444', role: 'Sales' },
    { id: 's3', name: 'Charlie Brown', email: 'charlie.b@dealer.com', phone: '555-555-6666', role: 'Support' },
];

const initialVisits: Visit[] = [
    { id: 'v1', staffId: 's2', retailerId: '1', date: '2024-08-15', status: 'Completed' },
    { id: 'v2', staffId: 's3', retailerId: '2', date: '2024-08-18', status: 'Pending' },
    { id: 'v3', staffId: 's2', retailerId: '3', date: '2024-08-22', status: 'Pending' },
];


const SuccessNotification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-20 right-4 sm:right-6 lg:right-8 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 animate-fade-in-down">
            <div className="flex items-center justify-between">
                <span className="font-medium">{message}</span>
                <button onClick={onClose} className="ml-4 font-bold text-2xl leading-none text-white hover:text-green-100 transition-colors">&times;</button>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('DASHBOARD');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [retailers, setRetailers] = useState<Retailer[]>(initialRetailers);
    const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
    const [visits, setVisits] = useState<Visit[]>(initialVisits);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [editingRetailer, setEditingRetailer] = useState<Retailer | null>(null);
    const [viewingAsStaff, setViewingAsStaff] = useState<Staff | null>(null);

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
    };

    const addRetailer = (retailer: Retailer) => {
        setRetailers(prevRetailers => [retailer, ...prevRetailers]);
    };

    const addStaff = (staffMember: Staff) => {
        setStaffList(prevStaff => [staffMember, ...prevStaff]);
    };
    
    const addVisit = (visit: Visit) => {
        setVisits(prev => [visit, ...prev].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    };

    const handleEditStaff = (staff: Staff) => {
        setEditingStaff(staff);
        setCurrentView('EDIT_STAFF');
    };
    
    const updateStaff = (updatedStaff: Staff) => {
        setStaffList(prevStaff => prevStaff.map(staff => staff.id === updatedStaff.id ? updatedStaff : staff));
        showSuccessMessage('Staff member updated successfully.');
        setCurrentView('VIEW_STAFF');
        setEditingStaff(null);
    };

    const handleEditRetailer = (retailer: Retailer) => {
        setEditingRetailer(retailer);
        setCurrentView('EDIT_RETAILER');
    };

    const updateRetailer = (updatedRetailer: Retailer) => {
        setRetailers(prevRetailers => prevRetailers.map(retailer => retailer.id === updatedRetailer.id ? updatedRetailer : retailer));
        showSuccessMessage('Retailer updated successfully.');
        setCurrentView('VIEW_RETAILERS');
        setEditingRetailer(null);
    };

    const updateVisitStatus = (visitId: string, status: Visit['status']) => {
        setVisits(prevVisits => 
            prevVisits.map(visit => 
                visit.id === visitId ? { ...visit, status } : visit
            )
        );
        showSuccessMessage('Visit status updated.');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'CREATE_RETAILER':
                return <CreateRetailerForm setView={setCurrentView} showSuccessMessage={showSuccessMessage} addRetailer={addRetailer} />;
            case 'CREATE_STAFF':
                return <CreateStaffForm setView={setCurrentView} showSuccessMessage={showSuccessMessage} addStaff={addStaff} />;
            case 'VIEW_RETAILERS':
                return <RetailerList retailers={retailers} setView={setCurrentView} handleEdit={handleEditRetailer} />;
            case 'VIEW_STAFF':
                return <StaffList staffList={staffList} setView={setCurrentView} handleEdit={handleEditStaff} />;
            case 'EDIT_STAFF':
                return editingStaff && <EditStaffForm staff={editingStaff} setView={setCurrentView} updateStaff={updateStaff} />;
            case 'EDIT_RETAILER':
                return editingRetailer && <EditRetailerForm retailer={editingRetailer} setView={setCurrentView} updateRetailer={updateRetailer} />;
            case 'CREATE_VISIT':
                return <CreateVisitForm setView={setCurrentView} showSuccessMessage={showSuccessMessage} addVisit={addVisit} staffList={staffList} retailers={retailers} />;
            case 'VIEW_VISITS':
                return <VisitList visits={visits} staffList={staffList} retailers={retailers} setView={setCurrentView} />;
            case 'STAFF_VISITS':
                return viewingAsStaff && <StaffVisitList staff={viewingAsStaff} visits={visits.filter(v => v.staffId === viewingAsStaff.id)} retailers={retailers} updateVisitStatus={updateVisitStatus} />;
            case 'DASHBOARD':
            default:
                return <Dashboard setView={setCurrentView} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Header staffList={staffList} setViewingAsStaff={setViewingAsStaff} setCurrentView={setCurrentView} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {successMessage && <SuccessNotification message={successMessage} onClose={() => setSuccessMessage(null)} />}
                {renderContent()}
            </main>
        </div>
    );
};

export default App;