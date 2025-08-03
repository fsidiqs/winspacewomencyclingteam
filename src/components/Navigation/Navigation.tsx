import React, { useState } from 'react';
import HeaderTransparent from '../NavigationTransparent/NavigationTransparent';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import Header from '../NavigationDesktop/NavigationDesktop';
import NavigationDesktop from '../NavigationDesktop/NavigationDesktop';
// import styles from './MobileNavigation.module.css';

// Font Awesome CDN for icons
const fontAwesomeLink = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

export default function Navigation() {
  return (
    <>
      <NavigationDesktop />
      {/* <HeaderTransparent /> */}
      <MobileNavigation />
    </>
  )
}
