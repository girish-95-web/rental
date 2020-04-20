import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
class AutoCompleteSearch extends React.Component {
  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address && this.props.address.where}
        onChange={this.props.onChangeSetAddress}
        onSelect={this.props.onSelectSetAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{position:'relative'}}>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
              {...getInputProps({
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default AutoCompleteSearch;