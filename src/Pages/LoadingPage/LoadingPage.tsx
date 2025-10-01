import React from "react";
import SpinnerPage from "../../Components/SpinnerPage/SpinnerPage";

const LoadingPage: React.FC = () => {
    return (
        <SpinnerPage duration={15000} navigateTo="/ApprovedProposal" />
    );
};

export default LoadingPage;
