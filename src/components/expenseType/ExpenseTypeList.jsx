import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import {
  ExpenseTypeDeleteRequest,
  ExpenseTypeListRequest,
  ExpenseTypeStatusChange,
} from "../../api_request/ExpenseTypeApiRequest";
import { ToastContainer } from "react-toastify";

const ExpenseTypeList = () => {
  const tableItem = useSelector((state) => state.expenseType.items);
  const totalItem = useSelector((state) => state.expenseType.totals);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState("0");
  const [textFilter, setTextFilter] = useState("");
  useEffect(() => {
    (async () => {
      await ExpenseTypeListRequest(1, perPage, searchKey);
    })();
  }, []);

  const filteredItem = React.useMemo(() => {
    if (textFilter === "") {
      return tableItem;
    } else {
      return tableItem.filter((item) =>
        item.name.toLowerCase().includes(textFilter.toLowerCase())
      );
    }
  });

  const perPageChange = async (e) => {
    setPerPage(parseInt(e.target.value));
    await ExpenseTypeListRequest(1, e.target.value, searchKey);
  };

  const searchKeyChange = async () => {
    await ExpenseTypeListRequest(1, perPage, searchKey);
  };

  const searchOnChange = async (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
    }
  };

  const paginateOnChange = async (e) => {
    await ExpenseTypeListRequest(e.selected + 1, perPage, searchKey);
  };

  const deleteItem = (id) => {
    Swal.fire({
      title: "Delete ExpenseType",
      text: "Do you want to delete this expenseType info?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this!",
    }).then((result) => {
      if (result.isConfirmed) {
        return ExpenseTypeDeleteRequest(id).then(async (res) => {
          if (res) {
            await ExpenseTypeListRequest(1, perPage, searchKey);
          }
        });
      }
    });
  };

  const changeStatus = (id) => {
    Swal.fire({
      title: "Change Status",
      text: "Do you want to change status?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change this!",
    }).then((result) => {
      if (result.isConfirmed) {
        return ExpenseTypeStatusChange(id).then(async (res) => {
          if (res) {
            await ExpenseTypeListRequest(1, perPage, searchKey);
          }
        });
      }
    });
  };

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4">
                    <ToastContainer />
                    <h5>ExpenseType List</h5>
                  </div>

                  <div className="col-2">
                    <input
                      onChange={(e) => setTextFilter(e.target.value)}
                      placeholder="Text Filter in page"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-2">
                    <select
                      onChange={perPageChange}
                      className="form-control mx-2 form-select-sm form-select form-control-sm"
                    >
                      <option value="5">5 Per Page</option>
                      <option value="10">10 Per Page</option>
                      <option value="20">20 Per Page</option>
                      <option value="50">50 Per Page</option>
                      <option value="100">100 Per Page</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <div className="input-group mb-3">
                      <input
                        onChange={(e) => searchOnChange(e)}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Search.."
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        onClick={searchKeyChange}
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
                              Status
                            </td>
                            <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Action
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            if (filteredItem.length > 0) {
                              return filteredItem.map((item, i) => (
                                <tr key={i}>
                                  <td>
                                    <p className="text-xs text-start">
                                      {i + 1}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-xs text-start">
                                      {item.name}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-xs text-start">
                                      {item.status === 0 ? (
                                        <a
                                          onClick={changeStatus.bind(
                                            this,
                                            item._id
                                          )}
                                          className="badge bg-danger"
                                        >
                                          Inactive
                                        </a>
                                      ) : (
                                        <a
                                          onClick={changeStatus.bind(
                                            this,
                                            item._id
                                          )}
                                          className="badge bg-dark"
                                        >
                                          Active
                                        </a>
                                      )}
                                    </p>
                                  </td>

                                  <td>
                                    <Link
                                      to={`/expenseType/edit/${item._id}`}
                                      className="btn text-primary btn-outline-light p-2 mb-0 btn-sm"
                                    >
                                      <AiOutlineEdit size={15} />
                                    </Link>
                                    <button
                                      onClick={deleteItem.bind(this, item._id)}
                                      className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"
                                    >
                                      <AiOutlineDelete size={15} />
                                    </button>
                                  </td>
                                </tr>
                              ));
                            } else {
                              return (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No Data Found
                                  </td>
                                </tr>
                              );
                            }
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    <nav aria-label="Page navigation example">
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
                        pageCount={totalItem / perPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={paginateOnChange}
                        containerClassName="pagination"
                        activeClassName="active"
                      />
                    </nav>
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

export default ExpenseTypeList;
