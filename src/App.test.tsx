import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './layouts/home/Home';
import { Form } from './components/Form/Form';

test('render App', () => {
  const app = render(<Home />);

  expect(app).not.toBeNull();
});

//
//
// test('render App', () => {
//   let state = Form.;
//
//   expect(app).not.toBeNull();
// });
