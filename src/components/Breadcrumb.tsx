import React from "react";
import { default as BreadCrumb } from "react-bootstrap/Breadcrumb";

const Breadcrumb = () => (
  <BreadCrumb>
    <BreadCrumb.Item href="#">Home</BreadCrumb.Item>
    <BreadCrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
      Library
    </BreadCrumb.Item>
    <BreadCrumb.Item active>Data</BreadCrumb.Item>
  </BreadCrumb>
);

export default Breadcrumb;
