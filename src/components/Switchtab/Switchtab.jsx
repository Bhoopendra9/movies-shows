import React, { useState } from "react";
import "./Switchtab.scss";

const Switchtab = ({ data, onTabchange }) => {
  const [selectedtab, setselectedtab] = useState(0);
  const [left, setleft] = useState(0);

  const activeTab = (tab, index) => {
    setleft(index * 100);
    setTimeout(() => {
      setselectedtab(index);
    }, 300);

    onTabchange(tab, index);
  };

  return (
    <div className="switchtabs">
      <div className="tabitems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabitem ${selectedtab === index ? "active" : " "} `}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default Switchtab;
