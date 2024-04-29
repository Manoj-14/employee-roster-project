import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
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
            <Link to="/admin/dashboard">
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/team">Team</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin/employee/operation">Manage Employees</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/admin/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default AdminNav;
