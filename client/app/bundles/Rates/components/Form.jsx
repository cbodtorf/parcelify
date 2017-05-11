import React, {Component} from 'react';
import {
  Layout,
  Page,
  PageActions,
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
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
} from '@shopify/polaris';
import {EmbeddedApp, Alert, Modal} from '@shopify/polaris/embedded';

import Filter from './Filter'
import AdditionalCostPerItem from './AdditionalCostPerItem'

class Form extends Component {
  constructor(props, railsContext) {
    super(props)

    console.log('props', this.props);

    this.state = {
      open: false,
      name: '',
      description: '',
      code: '',
      notes: '',
      price: '',
      price_weight_modifier: '',
      price_weight_modifier_starter: '',
      min_weight: '',
      max_grams: '',
      min_price: '',
      max_price: '',
      conditions: [],
      productSpecificPrices: []
    };
  }

  componentWillMount() {
    /**
    * Need to iterate through props and reassign null values to undefined.
    * Then set state with updated props.
    */
    let newProps = {}
    for (var prop in this.props.rate) {
      if(this.props.rate[prop] === null) {
        newProps[prop] = undefined
      } else {
        newProps[prop] = this.props.rate[prop]
      }
    }
    this.setState({
      ...newProps,
      conditions: this.props.conditions,
      productSpecificPrices: this.props.productSpecificPrices
    })
  }

  render() {
    console.log('render?', this.state);
    const breadcrumbs = [
      {content: 'Home'}
    ];
    const primaryAction = {content: 'Save', url: '/save'};
    const secondaryActions = [
      {content: 'Help', onAction: () => this.setState({open: true})},
      {content: 'Cancel', url: '/rates'}
    ];

    const choiceListItems = [
      {label: 'I accept the Terms of Service', value: 'false'},
      {label: 'I consent to receiving emails', value: 'false2'},
    ];

    const self = this

    const conditions = this.state.conditions.map(function(data, i){
      return (
        <Filter key={i} id={i + 1} onDelete={(id) => self.deleteCondition(id)} condition={data} matcher={self.props.matcher}/>
      );
    })

    const productSpecificPrices = this.state.productSpecificPrices.map(function(data, i){
      return (
        <AdditionalCostPerItem key={i} id={i + 1} onDelete={(id) => self.deleteProductSpecificPrice(id)} productSpecificPrice={data} matcher={self.props.matcher}/>
      );
    })

    return (
      <Page
        title="Delivery Rate"
        breadcrumbs={breadcrumbs}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      >
        <Layout>
          <Layout.AnnotatedSection
            title="Public Details"
            description="Information shown in the cart regarding this shipping rate."
          >
            <Card sectioned>
              <FormLayout>
                <FormLayout>
                  <TextField
                    value={this.state.name}
                    label="Name"
                    placeholder="Bike Delivery"
                    {...(this.state.name === '' ? {error: "Name is required"} : {})}
                    onChange={this.valueUpdater('name')}
                  />
                  <TextField
                    multiline
                    value={this.state.description}
                    label="Description"
                    placeholder="I offer personal bike delivery in my neighborhood."
                    onChange={this.valueUpdater('description')}
                  />
                </FormLayout>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Advanced Settings"
            description="Optional settings for advanced users. Leave blank for default values."
          >
            <Card sectioned>
              <FormLayout>
                <FormLayout>
                  <TextField
                    value={this.state.code}
                    label="Code (optional, must be unique across all rates)"
                    placeholder="Bike Delivery"
                    onChange={this.valueUpdater('code')}
                  />
                  <TextField
                    multiline
                    value={this.state.notes}
                    label="Notes"
                    placeholder="Internal notes or description about this rate and what it is for."
                    onChange={this.valueUpdater('notes')}
                  />
                </FormLayout>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title={`Price (this.props.shop.currency)`}
            description={ this.priceDescription() }
          >
              <FormLayout>
                  <Card sectioned>
                    <TextField
                      value={this.state.price}
                      label="Base Price"
                      {...(this.state.price === '' ? {error: "Price is required"} : {})}
                      placeholder="0"
                      onChange={this.valueUpdater('price')}
                    />
                  </Card>
                  <FormLayout.Group>
                      <Card sectioned>
                          <TextField
                            value={this.state.price_weight_modifier}
                            label="Price Per Gram"
                            placeholder="0.0"
                            onChange={this.valueUpdater('price_weight_modifier')}
                          />
                      </Card>
                      <Card sectioned>
                          <TextField
                            value={this.state.price_weight_modifier_starter}
                            label="Starting after X gram(s)..."
                            placeholder="0"
                            onChange={this.valueUpdater('price_weight_modifier_starter')}
                          />
                      </Card>
                  </FormLayout.Group>
              </FormLayout>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Limits"
            description="Restrict availability of rates through price and weight."
          >
              <FormLayout>
                  <FormLayout.Group>
                      <Card sectioned>
                          <TextField
                            value={this.state.min_weight}
                            label="Minimum weight"
                            placeholder=""
                            onChange={this.valueUpdater('min_weight')}
                          />
                      </Card>
                      <Card sectioned>
                          <TextField
                            value={this.state.max_grams}
                            label="Maximum weight"
                            placeholder=""
                            onChange={this.valueUpdater('max_grams')}
                          />
                      </Card>
                  </FormLayout.Group>
                  <FormLayout.Group>
                      <Card sectioned>
                          <TextField
                            value={this.state.min_price}
                            label="Minimum Price"
                            placeholder=""
                            onChange={this.valueUpdater('min_price')}
                          />
                      </Card>
                      <Card sectioned>
                          <TextField
                            value={this.state.max_price}
                            label="Maximum Price"
                            placeholder=""
                            onChange={this.valueUpdater('max_price')}
                          />
                      </Card>
                  </FormLayout.Group>
              </FormLayout>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Additional cost per item"
            description={ this.productSpecificPrices() }
          >
            { productSpecificPrices }
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Filters"
            description={ this.conditions() }
          >
            { conditions }
          </Layout.AnnotatedSection>
          <Layout.Section>
            <PageActions
              primaryAction={primaryAction}
              secondaryActions={secondaryActions}
              />
          </Layout.Section>
          <Layout.Section>
            <FooterHelp>For more details on Bamboo, visit our site:<Link url="https://polaris.shopify.com"> E4 Consulting</Link>.</FooterHelp>
          </Layout.Section>
          <Modal
            src="/rates"
            open={this.state.open}
            title="Edit account information"
            primaryAction={{
              content: 'Update account',
              onAction: () => this.setState({open: false}),
            }}
            secondaryActions={[{
              content: 'Change account',
              onAction: () => this.setState({open: false}),
            }]}
            onClose={() => this.setState({open: false})}
          />

        </Layout>
      </Page>
    );
  }

  addProductSpecificPrice() {
    let arr = this.state.productSpecificPrices.slice()
    arr.push({id: this.state.productSpecificPrices.length + 1})

    return () => this.setState({productSpecificPrices: arr});
  }

  addCondition() {
    let arr = this.state.conditions.slice()
    arr.push({id: this.state.conditions.length + 1})

    return () => this.setState({conditions: arr});
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }

  priceDescription() {
    return (
      <div>
        "Prices are in sub-units, i.e. cents, pennies, pence, etc."
        <br />
        <br />
        "Total Price = Base price + (Price per gram * (grams - starting grams) + extras per item"
      </div>
    );
  }
  productSpecificPrices() {
    return (
      <div>
        Add per-product price to rates. They're added once per item matching criterias.
        <br />
        <br />
        <Button onClick={ this.addProductSpecificPrice() } primary>Add an Extra</Button>
      </div>
    );
  }
  conditions() {
    return (
      <div>
        Filters decide whether or not a rate is available. Countries and provinces use the
        <Link url="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"> ISO 3166-1 alpha-2 </Link>
        standard code. Filters are additive and compounded as ANDs. If you want ORs, use the | character to separate values.
        <Link url="https://github.com/christianblais/parcelify/blob/master/README.md">See our help for more details</Link>.
        <br />
        <br />
        <Button onClick={ this.addCondition() } primary>Add a filter</Button>
      </div>
    );
  }
  deleteCondition(id) {

    console.log('heuh', id);
    let conditions = this.state.conditions.map(function(condition, i) {
      console.log('cid', condition.id);

      if (condition.id !== id) {
        // removed
        return condition
        console.log('returned condition', id);
      }
    })
    // TODO: need to figure out why it is returning undefined?
    if (conditions[0] === undefined) { conditions = []}
    this.setState({conditions: conditions})
  }

  deleteProductSpecificPrice(id) {

    console.log('heuh', id);
    let productSpecificPrices = this.state.productSpecificPrices.map(function(productSpecificPrice, i) {
      console.log('cid', productSpecificPrice.id);

      if (productSpecificPrice.id !== id) {
        // removed
        return productSpecificPrice
        console.log('returned productSpecificPrice', id);
      }
    })
    // TODO: need to figure out why it is returning undefined?
    if (productSpecificPrices[0] === undefined) { productSpecificPrices = []}
    this.setState({productSpecificPrices: productSpecificPrices})
  }
}


export default Form
