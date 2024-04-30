import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link } from "react-router-dom";

import "./nav-bar.css";

const NavBar = () => {
  return (
    <Layout className="sider" hasSider>
      <Sider
        breakpoint="sm"
        collapsible
        defaultCollapsed={true}
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/user/dashboard">
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/user/team">Team</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default NavBar;
