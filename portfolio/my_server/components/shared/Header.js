import React, { useState } from 'react';
import Link from 'next/link';
import { isAuthorized } from '@/utils/auth0';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const BsNavLink = props => {
  const { href, title, className = '' } = props;
  return (
    <Link href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </Link>
  );
};

const BsNavBrand = () => (
  <Link href="/">
    <a className="navbar-brand port-navbar-brand">Denis Osipov</a>
  </Link>
);

const LoginLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/login">Login</a>
);

const LogoutLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/logout">Logout</a>
);

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        Admin
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/portfolios/new"
            title="Create Portfolio"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/blogs/editor"
            title="Blog Editor"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/dashboard"
            title="Dashboard"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const NewsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        News
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/news/"
            title="News"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/news/checkbox"
            title="News more"
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/news/technology"
            title="Technology"
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Header = ({ user, loading, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        className={`port-navbar port-default absolute ${className}`}
        dark
        expand="md">
        <BsNavBrand />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title="About" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/portfolios" title="Portfolios" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/blogs" title="Blogs" />
            </NavItem>  
            <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title="Cv" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <NewsDropdown />
            </NavItem>
          </Nav>
          <Nav navbar>
            {!loading &&
              <>
                {user &&
                  <>
                    {isAuthorized(user, 'admin') && <AdminMenu />}
                    <NavItem className="port-navbar-item">
                      <LogoutLink />
                    </NavItem>
                  </>
                }
                {!user &&
                  <NavItem className="port-navbar-item">
                    <LoginLink />
                  </NavItem>
                }
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
