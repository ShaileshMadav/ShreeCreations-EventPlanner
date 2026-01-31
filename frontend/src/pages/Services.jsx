import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventPlans, getEventTypes } from "../services/api";
import PlanCard from "../components/PlanCard";

const Services = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventTypes, setEventTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getEventPlans(), getEventTypes()])
      .then(([plansData, typesData]) => {
        setPlans(plansData);
        setEventTypes(typesData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleBook = (plan) => {
    // navigate to booking page
    navigate("/book", { state: plan });
  };

  if (loading) return <p className="container">Loading services...</p>;

  const filteredPlans =
    selectedType === "All"
      ? plans
      : plans.filter((plan) => plan.eventType === selectedType);

  return (
    <div className="container">
      <h2 className="page-title">Our Event Decoration Services</h2>
      <div className="event-types">
        <button
          className={selectedType === "All" ? "active" : ""}
          onClick={() => setSelectedType("All")}
        >
          All
        </button>

        {eventTypes.map((type) => (
          <button
            key={type._id}
            className={selectedType === type.name ? "active" : ""}
            onClick={() => setSelectedType(type.name)}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="plans-grid">
        {filteredPlans.map((plan) => (
          <PlanCard key={plan._id} plan={plan} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
};

export default Services;
