import React, {Component} from 'react';
import {
  Layout,
  Page,
  Stack,
  FooterHelp,
  Card,
  Link,
  Button,
  ButtonGroup,
  Tag,
  Icon,
  Badge,
  FormLayout,
  Select,
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
} from '@shopify/polaris';

class AdditionalCostPerItem extends Component {
  constructor(props, railsContext) {
    super(props)

    this.state = {
      field: '',
      verb: '',
      value: '',
      priceToAfdd: ''
    }
  }

  componentDidMount() {
    this.setState(this.props.productSpecificPrice)
  }

  render() {

    const fields = [
      'Product name',
      'Product SKU',
      'Vendor name'
    ]
    const verbs = [
      'Regular expression',
      'Include',
      'Exclude',
      'Equal',
      'Start with',
      'End with'
    ]
    return (
      <Card
        sectioned
        title={'Additional Cost Per Item ' + this.props.id}
        actions={[{
            icon: 'delete',
            onAction: console.log('click'),
        }]}
        >
        <FormLayout>
          <FormLayout>
            <Select
              value={this.state.field}
              label="Field"
              options={this.props.matcher.productFields}
              onChange={this.valueUpdater('field')}
            />
            <Select
              value={this.state.verb}
              label="Verb"
              options={this.props.matcher.verbs}
              onChange={this.valueUpdater('verb')}
            />
            <TextField
              value={this.state.value}
              label="Value"
              placeholder=""
              onChange={this.valueUpdater('value')}
            />
            <TextField
              value={this.state.priceToAfdd}
              label="Price to add"
              placeholder=""
              onChange={this.valueUpdater('priceToAfdd')}
            />
          </FormLayout>
        </FormLayout>
      </Card>
    );
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }
}

export default AdditionalCostPerItem
