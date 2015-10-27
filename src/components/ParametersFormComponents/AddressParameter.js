import React from 'react';
import _ from 'lodash';
import {Account} from 'stellar-sdk';
import {ExplorerActions} from '../../actions/ExplorerActions';
import {ExplorerStore} from '../../stores/ExplorerStore';

export let AddressParameter = React.createClass({
  getInitialState: function() {
    let state = {value: '', error: null, hidden: false};
    if (this.props.param !== 'address') {
      state.hidden = true;
    }
    return state;
  },
  onChange: function(event) {
    let value = event.target.value;
    let error = null;
    if (value && !Account.isValidAddress(value)) {
      error = 'Address is invalid.';
    }

    this.setState({value, error});
    ExplorerActions.parameterSet(this.props.param, value, error);
  },
  onParameterChange({key, value}) {
    let hidden = value === 'native';
    if (this.props.param === 'selling_asset_issuer' && key === 'selling_asset_type') {
      this.setState(_.extend(this.state, {hidden}));
    } else if (this.props.param === 'buying_asset_issuer' && key === 'buying_asset_type') {
      this.setState(_.extend(this.state, {hidden}));
    }
  },
  componentDidMount: function() {
    ExplorerStore.addParameterChangeListener(this.onParameterChange);
  },
  componentWillUnmount: function() {
    ExplorerStore.removeParameterChangeListener(this.onParameterChange);
  },
  render: function() {
    let {value, error, hidden} = this.state;
    let text;
    switch (this.props.param) {
      case 'selling_asset_issuer':
        text = 'Selling Asset Issuer';
        break;
      case 'buying_asset_issuer':
        text = 'Buying Asset Issuer';
        break;
      default:
        text = 'Account ID';
    }
    return hidden ?
      <div></div>
      :
      <div className="optionsTable__pair">
        <div className="optionsTable__pair__title">
          {text}
        </div>
        <div className="optionsTable__pair__content">
          <input type="text" value={value} onChange={this.onChange}/>
          {error ? <p className="optionsTable__pair__content__alert">
            {error}
          </p> : ''}
        </div>
      </div>;
  }
});
