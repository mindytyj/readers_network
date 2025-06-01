export default function BookDiscoveryCard({ recommendations, index }) {
  return (
    <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
      <div className="card mb-3 me-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={recommendations.image_url}
              className="img-fluid rounded-start"
              alt={recommendations.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{recommendations.title}</h5>
              <p className="card-text">
                by {recommendations.first_name} {recommendations.last_name}
              </p>
              <p className="card-text">
                <small className="text-muted"></small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
