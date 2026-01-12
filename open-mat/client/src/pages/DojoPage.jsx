import { useState, useEffect } from "react";
import axios from "axios";
import beltsImage from "../assets/Belts.png";

function DojoPage() {
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTechniques();
  }, [categoryFilter, difficultyFilter, positionFilter, searchQuery]);

  const fetchTechniques = async () => {
    setLoading(true);
    try {
      let url = "http://127.0.0.1:8000/api/dojo/techniques/";
      const params = new URLSearchParams();

      if (categoryFilter) params.append("category", categoryFilter);
      if (difficultyFilter) params.append("difficulty", difficultyFilter);
      if (positionFilter) params.append("position", positionFilter);
      if (searchQuery) params.append("search", searchQuery);

      if (params.toString()) url += "?" + params.toString();

      const response = await axios.get(url);
      setTechniques(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load techniques");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechniqueDetail = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/dojo/techniques/${id}/`
      );
      setSelectedTechnique(response.data);
    } catch (err) {
      console.error("Failed to load technique details", err);
    }
  };

  const handleReset = () => {
    setCategoryFilter("");
    setDifficultyFilter("");
    setPositionFilter("");
    setSearchQuery("");
  };

  const closeModal = () => {
    setSelectedTechnique(null);
  };

  if (loading)
    return (
      <div className="container mt-5">
        <p>Loading techniques...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <p className="text-danger">{error}</p>
      </div>
    );

  return (
    <div className="container mt-4">
      {/* Header with centered DOJO and belts */}
      <div className="text-center mb-5">
        <h1
          className="display-1 fw-bold mb-3"
          style={{
            letterSpacing: "0.3em",
            background: "linear-gradient(to right, #e31c37, #555555)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          DOJO
        </h1>
        <img
          src={beltsImage}
          alt="BJJ Belt Progression"
          className="img-fluid"
          style={{ maxWidth: "600px" }}
        />
        <p className="text-center mb-6">BJJ Technique Library</p>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            {/* Category Filter */}
            <div className="col-md-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="submissions">Submissions</option>
                <option value="escapes">Escapes</option>
                <option value="sweeps">Sweeps</option>
                <option value="passes">Guard Passes</option>
                <option value="takedowns">Takedowns</option>
                <option value="positions">Positions</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="col-md-3">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Position Filter */}
            <div className="col-md-3">
              <label className="form-label">Position</label>
              <select
                className="form-select"
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
              >
                <option value="">All Positions</option>
                <option value="guard">Guard</option>
                <option value="closed_guard">Closed Guard</option>
                <option value="open_guard">Open Guard</option>
                <option value="half_guard">Half Guard</option>
                <option value="mount">Mount</option>
                <option value="side_control">Side Control</option>
                <option value="back_control">Back Control</option>
                <option value="standing">Standing</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            {/* Search */}
            <div className="col-md-3">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search techniques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-3">
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-muted">Showing {techniques.length} technique(s)</p>

      {/* Technique Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {techniques.map((technique) => (
          <div key={technique.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{technique.name}</h5>
                <p className="card-text">
                  <span className="badge bg-danger me-2">
                    {technique.category_display}
                  </span>
                  <span className="badge bg-secondary">
                    {technique.difficulty_display}
                  </span>
                </p>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => fetchTechniqueDetail(technique.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {techniques.length === 0 && (
        <div className="alert alert-info mt-4">
          No techniques found. Try adjusting your filters.
        </div>
      )}

      {/* Modal */}
      {selectedTechnique && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "#555555" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTechnique.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* YouTube Iframe */}
                <div className="ratio ratio-16x9 mb-3">
                  <iframe
                    src={selectedTechnique.youtube_embed_url}
                    title={selectedTechnique.name}
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Technique Details */}
                <p>
                  <strong>Category:</strong>{" "}
                  {selectedTechnique.category_display}
                </p>
                <p>
                  <strong>Difficulty:</strong>{" "}
                  {selectedTechnique.difficulty_display}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  {selectedTechnique.position_display}
                </p>
                <p>
                  <strong>Description:</strong>
                  <br />
                  {selectedTechnique.description}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DojoPage;
