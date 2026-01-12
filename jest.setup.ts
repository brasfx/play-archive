import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const React = require('react');
    return React.createElement('img', props);
  },
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => {
    const React = require('react');
    return React.createElement('a', { href, ...props }, children);
  },
}));
