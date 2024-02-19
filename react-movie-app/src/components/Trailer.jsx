import React from "react";
function Trailer({ trailerUrl, setShowModal }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <button onClick={() => setShowModal(false)}>Close</button>
          <iframe
            src={trailerUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
          <h2>TRAILER</h2>
        </div>
      </div>
    );
  }
  
  
  export default Trailer;