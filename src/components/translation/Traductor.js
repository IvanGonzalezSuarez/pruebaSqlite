import React, { Suspense } from 'react';
import { Translation } from 'react-i18next';
import i18n from '../../i18n';

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);
export default function Traductor(props) {
  return (
    <Suspense fallback={<Loader />}>
      <Translation>
        {
          (t, { i18n }) => <>{t(props.text)}</>
        }
      </Translation>
    </Suspense>
  )
}


