import ReactOnRails from 'react-on-rails';

import Blank from '../Rates/components/Blank';
import Index from '../Rates/components/Index';
import Form from '../Rates/components/Form';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Blank,
  Index,
  Form
});
