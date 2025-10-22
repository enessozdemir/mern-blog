import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDashboardTab = () => {
  const location = useLocation();
  const [tab, setTab] = useState("dash");

  useEffect(() => {
    const currentTab = new URLSearchParams(location.search);
    const tabFromUrl = currentTab.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return {
    tab,
    setTab,
  };
};
