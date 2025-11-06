export interface Retailer {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  address: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Sales' | 'Support' | 'Manager' | 'Technician';
}

export interface Visit {
  id: string;
  staffId: string;
  retailerId: string;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}

export type View = 'DASHBOARD' | 'CREATE_RETAILER' | 'CREATE_STAFF' | 'VIEW_RETAILERS' | 'VIEW_STAFF' | 'EDIT_STAFF' | 'EDIT_RETAILER' | 'CREATE_VISIT' | 'VIEW_VISITS' | 'STAFF_VISITS';