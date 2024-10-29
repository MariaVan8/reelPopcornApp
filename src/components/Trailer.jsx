import React from "react";
function Trailer({ trailerUrl, setShowModal }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <button onClick={() => setShowModal(false)}>X</button>
          <iframe
            src={trailerUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </div>
      </div>
    );
  }
  
  
  export default Trailer;