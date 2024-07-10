import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BrandList = () => {
  const brandInfo = useSelector((state) => state.brand.items);
  return (
    <div>
      <table className="table text-start">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            if (brandInfo.length > 0) {
              return brandInfo.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <Link
                      to={`/brand/edit/${item._id}`}
                      className="btn btn-dark"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ));
            }
          })()}
        </tbody>
      </table>
    </div>
  );
};

export default BrandList;
