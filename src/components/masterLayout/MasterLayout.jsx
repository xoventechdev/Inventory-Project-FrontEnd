import React, { Fragment, useRef } from "react";
import { Accordion, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  AiOutlineBank,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";

import {
  BsBagPlus,
  BsBagX,
  BsBox,
  BsCartPlus,
  BsGraphUp,
  BsPeople,
} from "react-icons/bs";

import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

import logo from "../../assets/img/inventory.png";
import { getUserDetails, removeSessions } from "../../utility/SessionHelper";
import { useSelector } from "react-redux";
const MasterLayout = (props) => {
  let contentRef,
    sideNavRef,
    topNavRef = useRef();

  const userInfo = getUserDetails();

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    let topNav = topNavRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
      topNav.classList.remove("top-nav-open");
      topNav.classList.add("top-nav-close");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
      topNav.classList.add("top-nav-open");
      topNav.classList.remove("top-nav-close");
    }
  };

  const isSidebarAccordionActive = () => {
    let urlList = [];
    sidebarItems.map((item) => {
      urlList.push(
        item.subMenu.map((subItem) => {
          return subItem?.url;
        })
      );
    });
    return urlList.findIndex((items) =>
      items.includes(window.location.pathname)
    );
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <RiDashboardLine className="side-bar-item-icon" />,
      url: "/",
      subMenu: [],
    },
    {
      title: "Customer",
      icon: <BsPeople className="side-bar-item-icon" />,
      url: "/customer",
      subMenu: [
        {
          title: "Customer List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/customer",
        },
        {
          title: "New Customer",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/customer/new",
        },
      ],
    },
    {
      title: "Supplier",
      icon: <TbTruckDelivery className="side-bar-item-icon" />,
      url: "/supplier",
      subMenu: [
        {
          title: "Supplier List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/supplier",
        },
        {
          title: "New Supplier",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/supplier/new",
        },
      ],
    },
    {
      title: "Expense",
      icon: <AiOutlineBank className="side-bar-item-icon" />,
      url: "/expense",
      subMenu: [
        {
          title: "Expense List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/expense",
        },
        {
          title: "Expense Type List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/expenseType",
        },
        {
          title: "New Expense",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/expense/new",
        },
        {
          title: "New Expense Type",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/expenseType/new",
        },
      ],
    },
    {
      title: "Product",
      icon: <BsBox className="side-bar-item-icon" />,
      url: "/product",
      subMenu: [
        {
          title: "Product List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/product",
        },
        {
          title: "Brand List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/brand",
        },
        {
          title: "Category List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/category",
        },
        {
          title: "New Product",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/product/new",
        },
        {
          title: "New Brand",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/brand/new",
        },
        {
          title: "New Category",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/category/new",
        },
      ],
    },
    {
      title: "Purchase",
      icon: <BsBagPlus className="side-bar-item-icon" />,
      url: "/purchase",
      subMenu: [
        {
          title: "Purchase List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/purchase",
        },
        {
          title: "New Purchase",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/purchase/new",
        },
      ],
    },
    {
      title: "Sale",
      icon: <BsCartPlus className="side-bar-item-icon" />,
      url: "/sale",
      subMenu: [
        {
          title: "Sale List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/sale",
        },
        {
          title: "New Sale",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/sale/new",
        },
      ],
    },
    {
      title: "Return",
      icon: <BsBagX className="side-bar-item-icon" />,
      url: "/return",
      subMenu: [
        {
          title: "Return List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/return",
        },
        {
          title: "New Return",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/return/new",
        },
      ],
    },
    {
      title: "Report",
      icon: <BsGraphUp className="side-bar-item-icon" />,
      url: "/report",
      subMenu: [
        {
          title: "Sale Report",
          icon: <VscGraph size={16} className="side-bar-subitem-icon" />,
          url: "/report/sale",
        },
        {
          title: "Return Report",
          icon: <VscGraph size={16} className="side-bar-subitem-icon" />,
          url: "/report/return",
        },
        {
          title: "Purchase Report",
          icon: <VscGraph size={16} className="side-bar-subitem-icon" />,
          url: "/report/purchase",
        },
        {
          title: "Expense Report",
          icon: <VscGraph size={16} className="side-bar-subitem-icon" />,
          url: "/report/expense",
        },
      ],
    },
  ];

  const onLogout = () => {
    removeSessions();
  };
  return (
    <Fragment>
      <Navbar className="fixed-top px-0 ">
        <Container fluid={true}>
          <Navbar.Brand>
            <div
              ref={(div) => {
                topNavRef = div;
              }}
              className="top-nav-open"
            >
              <h4 className="text-white m-0 p-0">
                <a onClick={MenuBarClickHandler}>
                  <AiOutlineMenu />
                </a>
              </h4>
            </div>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex align-items-center">
            <div className="user-dropdown">
              <img
                className="icon-nav-img icon-nav"
                src={userInfo.photo}
                alt=""
              />
              <div className="user-dropdown-content ">
                <div className="mt-4 text-center">
                  <img className="icon-nav-img" src={userInfo.photo} alt="" />
                  <h6>{userInfo.firstName}</h6>
                  <hr className="user-dropdown-divider  p-0" />
                </div>
                <NavLink to="/Profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <a onClick={onLogout} className="side-bar-item">
                  <AiOutlineLogout className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open border-radius-0 card"
      >
        <NavLink
          to="/"
          end
          className="d-flex justify-content-center sticky-top bg-white"
        >
          <img src={logo} className="logo w-15" />
        </NavLink>

        <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
          {sidebarItems.map((item, index) => {
            return item.subMenu.length !== 0 ? (
              <Accordion.Item
                key={index.toString()}
                eventKey={`${index}`}
                className="mt-2"
              >
                <Accordion.Header>
                  <div className="side-bar-item">
                    {item.icon}
                    <span className="side-bar-item-caption">{item.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.subMenu.map((subItem, index) => (
                    <NavLink
                      key={index.toString()}
                      className={(navData) =>
                        navData.isActive
                          ? "side-bar-subitem-active side-bar-subitem "
                          : "side-bar-subitem"
                      }
                      to={subItem?.url}
                      end
                    >
                      {subItem?.icon}
                      <span className="side-bar-subitem-caption">
                        {subItem?.title}
                      </span>
                    </NavLink>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? "side-bar-item-active side-bar-item mt-2"
                    : "side-bar-item mt-2"
                }
                to={"/"}
                end
              >
                {item.icon}
                <span className="side-bar-item-caption">{item.title}</span>
              </NavLink>
            );
          })}
        </Accordion>
      </div>

      <div ref={(div) => (contentRef = div)} className="content">
        {props.children}
      </div>
    </Fragment>
  );
};

export default MasterLayout;
