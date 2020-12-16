// NSW https://run.mocky.io/v3/1ac552a6-7520-4d37-9e19-883ad2a23c6c
// VIC https://run.mocky.io/v3/7f6ff602-368f-4199-93a3-a99832c8c299
// ramdom1 https://run.mocky.io/v3/c6ce576a-72ea-4f3d-9507-2507fca176b0
// ramdom2 https://run.mocky.io/v3/5d44450a-bc9a-40a7-9bd6-1d0bc1b4b560
// ramdom3 https://run.mocky.io/v3/0454d5a6-c5c2-4e1e-a1b2-e121f0d5c063
// ramdom4 https://run.mocky.io/v3/1cfffba9-c461-46d4-b6e5-fece85b1e645
// ramdom5 https://run.mocky.io/v3/91382a6f-6b6b-4c70-ac40-e95217aac224
import React from "react";

import { Map, GoogleApiWrapper, HeatMap } from "google-maps-react";
import axios from "axios";
import { debounce } from "lodash";

import "./styles.css";

class MapContainer extends React.Component {
  DATA_SOURCE = [
    "https://run.mocky.io/v3/1ac552a6-7520-4d37-9e19-883ad2a23c6c",
    "https://run.mocky.io/v3/7f6ff602-368f-4199-93a3-a99832c8c299",
    "https://run.mocky.io/v3/c6ce576a-72ea-4f3d-9507-2507fca176b0",
    "https://run.mocky.io/v3/5d44450a-bc9a-40a7-9bd6-1d0bc1b4b560",
    "https://run.mocky.io/v3/0454d5a6-c5c2-4e1e-a1b2-e121f0d5c063",
    "https://run.mocky.io/v3/1cfffba9-c461-46d4-b6e5-fece85b1e645",
    "https://run.mocky.io/v3/91382a6f-6b6b-4c70-ac40-e95217aac224"
  ];
  state = {
    data: [
      {
        city: "Sydney",
        lat: "-33.8650",
        lng: "151.2094"
      },
      {
        city: "Melbourne",
        lat: "-37.8136",
        lng: "144.9631"
      },
      {
        city: "Brisbane",
        lat: "-27.4678",
        lng: "153.0281"
      }
    ],
    key: 1,
    center: { lat: "-28.700552", lng: "133.882675" }
  };
  constructor(props) {
    super(props);
    this.onClickFetch = this.onClickFetch.bind(this);
    this.onSearchFetch = this.onSearchFetch.bind(this);
  }

  componentWillUnmount() {
    google.maps.event.clearInstanceListeners(this.searchBox);
  }

  handleKeyDown = (e) => {
    // this.props.onPlacesChanged(this.searchBox.getPlaces());
    if (e.key === "Enter") {
      this.onSearchFetch();
    }
  };

  async onSearchFetch() {
    // fetch data from a url endpoint
    const ramdomKey = Math.floor(Math.random() * Math.floor(99));
    const ramdomDataIndex = Math.floor(
      Math.random() * Math.floor(this.DATA_SOURCE.length)
    );
    const result = await axios.get(this.DATA_SOURCE[ramdomDataIndex]);
    this.setState({
      data: result.data,
      key: ramdomKey
    });
  }

  async onClickFetch(state) {
    // fetch data from a url endpoint
    const ramdomKey = Math.floor(Math.random() * Math.floor(99));
    let url = "https://run.mocky.io/v3/1ac552a6-7520-4d37-9e19-883ad2a23c6c";
    if (state === "VIC") {
      url = "https://run.mocky.io/v3/7f6ff602-368f-4199-93a3-a99832c8c299";
    }
    await axios.get(url).then((result) => {
      this.setState({
        data: result.data,
        key: ramdomKey
      });
    });
  }
  render() {
    console.log("-- render");

    const mapTheme = [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#000000"
          },
          {
            lightness: 13
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#144b53"
          },
          {
            lightness: 14
          },
          {
            weight: 1.4
          }
        ]
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#08304b"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#0c4152"
          },
          {
            lightness: 5
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#0b434f"
          },
          {
            lightness: 25
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#0b3d51"
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            color: "#146474"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#021019"
          }
        ]
      }
    ];
    const gradient = [
      "rgba(0, 255, 255, 0)",
      "rgba(0, 255, 255, 1)",
      "rgba(0, 191, 255, 1)",
      "rgba(0, 127, 255, 1)",
      "rgba(0, 63, 255, 1)",
      "rgba(0, 0, 255, 1)",
      "rgba(0, 0, 223, 1)",
      "rgba(0, 0, 191, 1)",
      "rgba(0, 0, 159, 1)",
      "rgba(0, 0, 127, 1)",
      "rgba(63, 0, 91, 1)",
      "rgba(127, 0, 63, 1)",
      "rgba(191, 0, 31, 1)",
      "rgba(255, 0, 0, 1)"
    ];
    return (
      <div>
        <div className="mapConfigSection">
          <div>
            <input
              ref="input"
              type="text"
              placeholder="Type your address"
              id="pac-input"
              onKeyDown={this.handleKeyDown}
              onChange={debounce(this.onSearchFetch, 1000)}
              list="addressSearch"
            />
            <datalist id="addressSearch">
              <option value="Level 12 11 Exhibition Street, MELBOURNE VIC 3000" />
              <option value="Level 12 41 Exhibition Street, MELBOURNE VIC 3000" />
              <option value="12 Abbott Street, COOGEE NSW 2034" />
              <option value="8-12 Acacia Avenue, PORT MACQUARIE NSW 2444" />
              <option value="12 Archer Street, BURWOOD NSW 2134" />
              <option value="..." />
            </datalist>
          </div>
          <div>
            <a className="mapButton" onClick={() => this.onClickFetch("VIC")}>
              Victoria
            </a>
          </div>
          <div>
            <a className="mapButton" onClick={() => this.onClickFetch("NSW")}>
              NSW
            </a>
          </div>
        </div>

        <div className="map-container" key={this.state.key}>
          <Map
            google={this.props.google}
            className="map"
            zoom={5}
            initialCenter={this.state.center}
            onReady={this.handleMapReady}
            styles={mapTheme}
            id="testMap"
          >
            <HeatMap
              gradient={gradient}
              positions={this.state.data}
              opacity={1}
              radius={20}
            />
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso",
  libraries: ["visualization"]
})(MapContainer);
