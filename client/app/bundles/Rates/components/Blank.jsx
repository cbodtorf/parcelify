import React, {Component} from 'react';
import {
  Layout,
  Page,
  Stack,
  FooterHelp,
  Card,
  Link,
  Button,
  Tag,
  Icon,
  Badge,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList,
  SettingToggle,
} from '@shopify/polaris';
import Rate from './Rate'

class Blank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      checkboxes: [],
      connected: false,
    };
  }

  render() {
    const breadcrumbs = [
      {content: 'Example apps'},
      {content: 'Apps'},
    ];
    const primaryAction = {content: 'Help', url: '/help'};
    const secondaryActions = [{content: 'Import', icon: 'import'}];

    const choiceListItems = [
      {label: 'I accept the Terms of Service', value: 'false'},
      {label: 'I consent to receiving emails', value: 'false2'},
    ];

    return (
      <Page
        title="Bamboo"
        breadcrumbs={breadcrumbs}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      >
        <Layout>
          <Layout.AnnotatedSection
            title="Dashboard"
            description="Up-to-date Order and Customer information."
          >
            <SettingToggle
              action={{
                content: 'Dashboard', url: '/dashboard',
              }}
            >
              Upload your store’s logo, change colors and fonts, and more.
            </SettingToggle>
          </Layout.AnnotatedSection>

         {this.renderAccount()}
         {this.renderBundles()}

          <Layout.Section>
            <FooterHelp>For more details on Bamboo, visit our site:<Link url="https://polaris.shopify.com"> E4 Consulting</Link>.</FooterHelp>
          </Layout.Section>

        </Layout>
      </Page>
    );
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }
  toggleRates() {
    this.setState(({rates}) => ({rates: !rates}));
  }
  toggleBundles() {
    this.setState(({bundles}) => ({bundles: !bundles}));
  }

  showRates() {
    return (
      <Layout.AnnotatedSection
        title="Delivery Rates"
        description="Create custom rules to simplify complex shipping requirements."
      >
        <AccountConnection
          action={{
            content: 'Add Rates',
            url: '/rates/new',
          }}
          details={<div><Badge status="info">0</Badge> Rates</div>}
          termsOfService={<p>Learn about adding custom Delivery Rates at <Link url="https://polaris.shopify.com">Bamboo Support</Link>.</p>}
        />
      </Layout.AnnotatedSection>
    );
  }

  hideRates() {

    return (
      <Layout.AnnotatedSection
          title="Delivery Rates"
          description="Create custom rules to simplify complex shipping requirements."
        >
        <AccountConnection
          action={{
            content: 'Hide Rates',
            onAction: this.toggleRates.bind(this, this.state),
          }}
          details={<div><Badge status="info">0</Badge> Rates</div>}
          termsOfService={<p>Learn about adding custom Delivery Rates at <Link url="https://polaris.shopify.com">Bamboo Support</Link>.</p>}
        />
      </Layout.AnnotatedSection>
    );
  }

  showBundles() {
    return (
      <Layout.AnnotatedSection
        title="Bundles"
        description="Curate and group product that belong together."
      >
        <AccountConnection
          action={{
            content: 'Manage Bundles',
            onAction: this.toggleBundles.bind(this, this.state),
          }}
          details={<div><Badge status="info">4</Badge> Bundles</div>}
          termsOfService={<p>Learn about adding custom Bundles at <Link url="https://polaris.shopify.com">Bamboo Support</Link>.</p>}
        />
      </Layout.AnnotatedSection>
    );
  }

  hideBundles() {
    return (

      <Layout.AnnotatedSection
        title="Bundles"
        description="Curate and group product that belong together."
        sectioned
        >
        <AccountConnection
          action={{
            content: 'Hide Bundles',
            onAction: this.toggleBundles.bind(this, this.state),
          }}
          details={<div><Badge status="info">4</Badge> Bundles</div>}
          termsOfService={<p>Learn about adding custom Bundles at <Link url="https://polaris.shopify.com">Bamboo Support</Link>.</p>}
        />
        <AccountConnection
          connected
          action={{
            content: 'Edit',
            onAction: this.toggleBundles.bind(this, this.state),
          }}
          accountName="Cleanse"
          title={<Link url="http://google.com">The Beginner - 3 Day Cleanse</Link>}
          termsOfService={
            <div>
              <Badge>Coconut Almond Milk</Badge>
              <Badge>Spinach Apple</Badge>
              <Badge>Lemon Ginger</Badge>
              <Badge>Beet Cucumber</Badge>
              <Badge>Cinnamon Yam</Badge>
              <Badge>Carrot Coconut</Badge>
              <Badge>Sweet Celery</Badge>
            </div>
          }
        />
        <AccountConnection
          connected
          action={{
            content: 'Edit',
            onAction: this.toggleBundles.bind(this, this.state),
          }}
          accountName="Cleanse"
          title={<Link url="http://google.com">The Organ Cleanse - 1 Day Cleanse</Link>}
          termsOfService={
            <div>
              <Badge>Psyllium Husk Apple</Badge>
              <Badge>Spinach Apple</Badge>
              <Badge>Seasonal Greens</Badge>
              <Badge>Spiced Yam</Badge>
              <Badge>Carrot Coconut</Badge>
              <Badge>Vanilla Mint Almond Milk</Badge>
            </div>
          }
        />
        <AccountConnection
          connected
          action={{
            content: 'Edit',
            onAction: this.toggleBundles.bind(this, this.state),
          }}
          accountName="Kit"
          title={<Link url="http://google.com">The Feel Better</Link>}
          termsOfService={
            <div>
              <Badge>Feel Better Elixir</Badge>
              <Badge>Lemon Ginger</Badge>
              <Badge>Dandelion</Badge>
              <Badge>Beet Cucumber</Badge>
            </div>
          }
        />
        <AccountConnection
          connected
          action={{
            content: 'Edit',
            onAction: this.toggleBundles.bind(this, this.state),
          }}
          accountName="Kit"
          title={<Link url="http://google.com">Energy</Link>}
          termsOfService={
            <div>
              <Badge>Deep Chocolate</Badge>
              <Badge>Coffee Almond</Badge>
              <Badge>Dandelion</Badge>
              <Badge>Feel Better Elixir</Badge>
            </div>
          }
        />
      </Layout.AnnotatedSection>

    );
  }

  renderAccount() {
    return this.state.rates
      ? this.hideRates()
      : this.showRates();
  }
  renderBundles() {
    return this.state.bundles
      ? this.hideBundles()
      : this.showBundles();
  }
}

export default Blank;
