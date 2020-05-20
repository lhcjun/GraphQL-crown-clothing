import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { sections } from './directory.data';
import './directory.styles.scss';

const Directory = () => (
  <div className='directory-menu'>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;