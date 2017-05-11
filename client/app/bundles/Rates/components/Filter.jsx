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

class Filter extends Component {
  constructor(props, railsContext) {
    super(props)

    this.state = {
      field: '',
      verb: '',
      value: ''
    }
  }

  componentDidMount() {
    this.setState(this.props.condition)
  }

  render() {
    const fields = [
      'Address line 1',
      'Address line 2',
      'City',
      'State / Province 2-letter code',
      'Country 2-letter code',
      'Zip / Postal code',
      'Company name',
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
        title={"Filter " + this.props.id}
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
              options={this.props.matcher.fields}
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
          </FormLayout>
        </FormLayout>
      </Card>
    );
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }
}

export default Filter
