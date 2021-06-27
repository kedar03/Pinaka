import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

/**
 * The autocomplete text box will display the location information according to 
 * the information you entered.
 * 
 * After selecting one of those, the lat lng will be pass to the "PharmacySelection" component for other used.
 */
class PharmacyAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };

    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleClickSearch() {
    this.handleSelect(this.state.address);
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.setLocation(latLng);
      })
      .catch(error => {
        alert("Error Input")
      });
  };
 
  render() {
    return (
      <div className="ps-pincode">
        <span id="ps-text-label">Select Pharmacy</span>
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        className="ps-pinBack"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter Pin Code',
                className: 'ps-autocomplete',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#e7e5e5', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion)}
                  key={i}
                  className="ps-autocomplete-list"
                  style={style}
                >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
              <button className="ps-autocomplete-button" onClick={this.handleClickSearch}>
                <img src="/assets/pharmacy/icon_search_zip.png" alt="search icon" id="ps-autocomplete-search-icon"/>
              </button>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </div>
    );
  }
}

export default PharmacyAutoComplete;