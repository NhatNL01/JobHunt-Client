import React from "react";
import SkeletonPostList from "../Skeleton/SkeletonPostList";
import "./CompanyList.css";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import { FaCalendarPlus } from "@react-icons/all-files/fa/FaCalendarPlus";

const CompanyList = (props) => {
  return (
    <div className="container container-posts">
      {props.isLoading && <SkeletonPostList type={!props.cover && "mini"} />}
      {!props.isLoading && (
        <ul>
          {props.items &&
            props.items.map((company, i) => {
              return (
                <div className="preview flow-content">
                  <div className="preview__author">
                    <div className={`author__image `}>
                      <Link to={`/companies/${company.id}`}>
                        <img src={company.avatar} alt={"avatar"} />
                      </Link>
                    </div>
                    <div className="author__details">
                      <Link
                        to={`/companies/${company.id}`}
                        className="title-link">
                        <h2>{company.name}</h2>
                      </Link>
                    </div>
                  </div>
                  <div className="preview__details flow-content">
                    <div className="preview__info">
                      <div className="flex preview__info-item">
                        <FaCalendarPlus />
                        {"Founded year: "}
                        {company.foundedYear}
                      </div>
                      <div className="flex preview__info-item">
                        <FaRegUserCircle />
                        {company.scale}
                        {" members"}
                      </div>
                      <div className="flex preview__info-item">
                        <FaLocationArrow />
                        {company.address}
                      </div>
                      <div className="flex preview__info-item">
                        <FaPhoneAlt />
                        {company.contact}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default CompanyList;
