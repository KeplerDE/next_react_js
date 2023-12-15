import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

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

const LoginLink = ({ t }) => (
  <a className="nav-link port-navbar-link" href="/api/v1/login">{t('login')}</a>
);

const LogoutLink = ({ t }) => (
  <a className="nav-link port-navbar-link" href="/api/v1/logout">{t('logout')}</a>
);

const AdminMenu = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        {t('admin')}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/portfolios/new"
            title={t('createPortfolio')}
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/blogs/editor"
            title={t('blogEditor')}
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/dashboard"
            title={t('dashboard')}
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const NewsDropdown = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown
      className="port-navbar-link port-dropdown-menu"
      nav
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle className="port-dropdown-toggle" nav caret>
        {t('news')}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/news/"
            title={t('news')}
          />
        </DropdownItem>
        <DropdownItem>
          <BsNavLink
            className="port-dropdown-item"
            href="/news/checkbox"
            title={t('newsMore')}
          />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const Header = ({ user, loading, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('Header');
  const toggle = () => setIsOpen(!isOpen);

  const switchLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  }

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
              <BsNavLink href="/" title={t('home')} />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title={t('about')} />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/portfolios" title={t('portfolios')} />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/blogs" title={t('blogs')} />
            </NavItem>  
            <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title={t('cv')} />
            </NavItem>
            <NavItem className="port-navbar-item">
              <NewsDropdown t={t} />
            </NavItem>
          </Nav>
          <Nav navbar>
            {/* Кнопки для переключения языков */}
            <NavItem className="port-navbar-item" onClick={() => switchLanguage('en')}>
              <span className="nav-link port-navbar-link">EN</span>
            </NavItem>
            <NavItem className="port-navbar-item" onClick={() => switchLanguage('de')}>
              <span className="nav-link port-navbar-link">DE</span>
            </NavItem>
            {!loading &&
              <>
                {user &&
                  <>
                    {isAuthorized(user, 'admin') && <AdminMenu t={t} />}
                    <NavItem className="port-navbar-item">
                      <LogoutLink t={t} />
                    </NavItem>
                  </>
                }
                {!user &&
                  <NavItem className="port-navbar-item">
                    <LoginLink t={t} />
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
