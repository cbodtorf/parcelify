import React, {Component} from 'react';
import {
  Card,
  Icon,
  FormLayout,
  Select,
  TextField,
} from '@shopify/polaris';

class Filter extends Component {
  constructor(props) {
    super(props)

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
        title={`Filter ${this.props.id}`}
        actions={[{
            icon: 'delete',
            onAction: () => this.props.onDelete(this.props.condition.id),
        }]}
        >
        <FormLayout>
          <FormLayout>
            <Select
              value={this.props.condition.field}
              label="Field"
              options={this.props.matcher.fields}
              onChange={this.props.conditionUpdate('field', this.props.condition.id)}
            />
            <Select
              value={this.props.condition.verb}
              label="Verb"
              options={this.props.matcher.verbs}
              onChange={this.props.conditionUpdate('verb', this.props.condition.id)}
            />
            <TextField
              value={this.props.condition.value}
              label="Value"
              placeholder=""
              onChange={this.props.conditionUpdate('value', this.props.condition.id)}
            />
          </FormLayout>
        </FormLayout>
      </Card>
    );
  }

}

export default Filter
