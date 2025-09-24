import React from 'react';
import SpinnerPage from '../../Components/SpinnerPage/SpinnerPage';

const LoadingPage: React.FC = () => {
    return (
        <SpinnerPage duration={10000} navigateTo="/CheckFormUserPage" />
    );
};

export default LoadingPage;
