import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './SectionGeneral.module.css';

export function SectionGeneral({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, 'section-events-wrapper')}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'padding-global')}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'container-large')}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'padding-section-medium')}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
