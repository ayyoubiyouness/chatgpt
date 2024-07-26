import ReactGA4 from "react-ga4";

const InitializeGoogleAnalytics = () => {
  const tracking_id = "G-81X574QNHP"; 
  ReactGA4.initialize(tracking_id);
  console.log("GA INITIALIZED");
};

const TrackGoogleAnalyticsEvent = (
  category,
  action,
) => {
  console.log("GA event = ", "category :" , category, ":", "action :", action);

  ReactGA4.event({
    category: category,
    action: action,
  });
};

export default InitializeGoogleAnalytics;
export { InitializeGoogleAnalytics, TrackGoogleAnalyticsEvent };