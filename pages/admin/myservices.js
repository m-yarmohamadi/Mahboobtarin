import MyServices from '@/components/admin/adminProfileSteps/myservices/MyServices';
import ExpertDashboard from '@/components/admin/ExpertDashboard';
import React from 'react';

const myservices = () => {
    return (
        <ExpertDashboard>
            <MyServices />
        </ExpertDashboard>
    );
};

export default myservices;