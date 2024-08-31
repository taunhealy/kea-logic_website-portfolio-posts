import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab]?.content}</div>
    </div>
  );
};

const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="tabs-header">{children}</div>
);

const TabsTrigger: React.FC<{ value: string; active: boolean; children: React.ReactNode }> = ({ value, active, children }) => (
  <button className={`tab-button ${active ? "active" : ""}`}>{children}</button>
);

const TabsContent: React.FC<{ value: string; active: boolean; children: React.ReactNode }> = ({ value, active, children }) => (
  <div className="tab-content" hidden={!active}>{children}</div>
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
