import Dashboard from '@/components/admin/adminProfileSteps/Dashboard';
import ExpertDashboard from '@/components/admin/ExpertDashboard';
import React from 'react';

const DashboardPage = () => {
    return (
        <ExpertDashboard>
            <Dashboard />
        </ExpertDashboard>
    );
};

export default DashboardPage;