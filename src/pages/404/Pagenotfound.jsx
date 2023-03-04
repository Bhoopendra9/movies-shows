import React from "react";
import "./Pagenotfound.scss";

import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";

const Pagenotfound = () => {
  return (
    <div className="pagenotfound">
      <ContentWrapper>
        <span className="bigtext">404</span>
        <span className="smalltext">Page not found</span>
      </ContentWrapper>
    </div>
  );
};

export default Pagenotfound;
