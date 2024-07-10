import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomerListRequest } from "../../api_request/CustomerApiRequest";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CustomerList = () => {
  const tableItem = useSelector((state) => state.customer.items);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState("0");
  useEffect(() => {
    (async () => {
      await CustomerListRequest(page, perPage, searchKey);
    })();
  }, []);

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4">
                    <h5>Customer List</h5>
                  </div>

                  <div className="col-2">
                    <input
                      placeholder="Text Filter"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-2">
                    <select className="form-control mx-2 form-select-sm form-select form-control-sm">
                      <option value="20">20 Per Page</option>
                      <option value="30">30 Per Page</option>
                      <option value="50">50 Per Page</option>
                      <option value="100">100 Per Page</option>
                      <option value="100">200 Per Page</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search.."
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn  btn-success btn-sm mb-0"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive table-section">
                      <table className="table ">
                        <thead className="sticky-top bg-white">
                          <tr>
                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              No
                            </td>
                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Name
                            </td>
                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Phone
                            </td>
                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Email
                            </td>
                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Action
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {tableItem.map((item, i) => (
                            <tr key={i}>
                              <td>
                                <p className="text-xs text-start">{i + 1}</p>
                              </td>
                              <td>
                                <p className="text-xs text-start">
                                  {item.name}
                                </p>
                              </td>
                              <td>
                                <p className="text-xs text-start">
                                  {item.mobile}
                                </p>
                              </td>
                              <td>
                                <p className="text-xs text-start">
                                  {item.email}
                                </p>
                              </td>

                              <td>
                                <Link
                                  to={`/customer/edit/${item._id}`}
                                  className="btn text-info btn-outline-light p-2 mb-0 btn-sm"
                                >
                                  <AiOutlineEdit size={15} />
                                </Link>
                                <button className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                  <AiOutlineDelete size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    {/* <nav aria-label="Page navigation example">
                      <ReactPaginate
                        previousLabel="<"
                        nextLabel=">"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={Total / perPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        activeClassName="active"
                      />
                    </nav> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
