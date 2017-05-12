import React, {Component} from 'react';
import {
  Card,
  Icon,
  FormLayout,
  Select,
  TextField,
} from '@shopify/polaris';

class AdditionalCostPerItem extends Component {
  constructor(props) {
    super(props)

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
        title={`Additional Cost Per Item ${this.props.id}`}
        actions={[{
            icon: 'delete',
            onAction: () => this.props.onDelete(this.props.productSpecificPrice.id),
        }]}
        >
        <FormLayout>
          <FormLayout>
            <Select
              value={this.props.productSpecificPrice.field}
              label="Field"
              options={this.props.matcher.productFields}
              onChange={this.props.productSpecificPriceUpdate('field', this.props.productSpecificPrice.id)}
            />
            <Select
              value={this.props.productSpecificPrice.verb}
              label="Verb"
              options={this.props.matcher.verbs}
              onChange={this.props.productSpecificPriceUpdate('verb', this.props.productSpecificPrice.id)}
            />
            <TextField
              value={this.props.productSpecificPrice.value}
              label="Value"
              placeholder=""
              onChange={this.props.productSpecificPriceUpdate('value', this.props.productSpecificPrice.id)}
            />
            <TextField
              value={this.props.productSpecificPrice.price}
              label="Price to add"
              placeholder=""
              onChange={this.props.productSpecificPriceUpdate('price', this.props.productSpecificPrice.id)}
            />
          </FormLayout>
        </FormLayout>
      </Card>
    );
  }

}

export default AdditionalCostPerItem
