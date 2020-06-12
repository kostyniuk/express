import React, { Fragment } from 'react';

const NavBar = () => {
  return (
    <Fragment>
      <nav
        class='navbar navbar-expand-sm navbar-light bg-light '
        data-toggle='affix'
      >
        <div class='mx-auto d-sm-flex'>
          <a class='navbar-brand' href='/'>
            Brand
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarsExample11'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <form class='ml-3 my-auto d-inline w-100 mr-5' >
              <div class='input-group ml-10'>
                <input
                  type='text'
                  class='form-control border-right-0 '
                />
                <div class='input-group-append'>
                  <button
                    class='btn btn btn-dark border-left-0'
                    type='button'
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          <div
            class='collapse navbar-collapse text-center'
            id='navbarsExample11'
          >
            
            <ul class='navbar-nav ml-5'>
              <li class='nav-item active'>
                <a class='nav-link' href='/'>
                  Home
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/d'>
                  Direct
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/activity'>
                  Activity
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/explore'>
                  Explore
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/link'>
                  Link
                </a>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
