const PlanCard = ({ plan, onBook }) => {
  return (
    <div className="plan-card">
      <div className="media">
        {plan.mediaType === "image" ? (
          <img src={`${plan.mediaUrl}`} alt={plan.name} />
        ) : (
          <video src={`${plan.mediaUrl}`} controls />
        )}
        {plan.offer && (
          <span className="offer-badge" hidden>
            {plan.offer}
          </span>
        )}
      </div>

      <div className="plan-content">
        <h3>{plan.name}</h3>
        <p className="price">₹{plan.price}</p>

        <button onClick={() => onBook(plan)}>Book on WhatsApp</button>
      </div>
    </div>
  );
};

export default PlanCard;
