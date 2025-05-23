import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./MobileRedirect.module.scss";

// If you have a logo component or SVG, import it here
// import Logo from "@components/Common/Logo"; // Uncomment if you have a Logo component

const MobileRedirect: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={s.mobilecontainer}>
      {/* Use your project logo */}
      {/* <Logo className={s.mobilelogo} /> */}
      {/* <img src="/img/logo.svg" alt="Ceriga Logo" className={s.mobilelogo} style={{ width: 60, height: 60, marginBottom: 16 }} /> */}
      <div className={s.mobileprojectname}>Ceriga <span className={s.mobileprojectnameDot}>.</span></div>
      <div className={s.mobilemessage}>Please switch to your PC</div>
      <div className={s.mobilenote}>
        We do not support mobile devices yet. Please use your computer to create
        and edit your projects.
      </div>
      <button className={s.mobilebackbtn} onClick={() => navigate(-1)}>
        {/* If you have a back icon, use it here */}
        {/* <BackIcon /> */}
        Go Back
      </button>
    </div>
  );
};

export default MobileRedirect;
