declare module 'react-country-flag' {
  import * as React from 'react';
  export interface CountryFlagProps extends React.HTMLAttributes<HTMLElement> {
    countryCode: string;
    svg?: boolean;
    style?: React.CSSProperties;
    title?: string;
  }
  const CountryFlag: React.FC<CountryFlagProps>;
  export default CountryFlag;
}
