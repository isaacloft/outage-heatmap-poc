import React from "react";
import ReactDOM from "react-dom";
import Map from "./map";

function App() {
  return (
    <div>
      <div className="header">
        BELONG <i class="fas fa-broadcast-tower"></i>
      </div>
      <div className="flex-container">
        <div className="flex-row">
          <div className="flex-item">
            <Map center={{ lat: -24.9923319, lng: 135.2252427 }} />
          </div>
        </div>
      </div>
      <footer className="footer">
        Belong is a division of Telstra Corporation Limited ABN 33 051 775 556.
        nbn™ is a trademark of NBN Co Limited and is used under licence.
      </footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
