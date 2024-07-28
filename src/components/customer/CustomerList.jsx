import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomerDeleteRequest,
  CustomerListRequest,
} from "../../api_request/CustomerApiRequest";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";

const CustomerList = () => {
  const tableItem = useSelector((state) => state.customer.items);
  const totalItem = useSelector((state) => state.customer.totals);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState("0");
  const [textFilter, setTextFilter] = useState("");
  useEffect(() => {
    (async () => {
      await CustomerListRequest(page, perPage, searchKey);
    })();
  }, []);

  const filteredItem = React.useMemo(() => {
    if (textFilter === "") {
      return tableItem;
    } else {
      return tableItem.filter(
        (item) =>
          item.name.toLowerCase().includes(textFilter.toLowerCase()) ||
          item.mobile.toLowerCase().includes(textFilter.toLowerCase()) ||
          item.email.toLowerCase().includes(textFilter.toLowerCase())
      );
    }
  });

  const perPageChange = async (e) => {
    setPerPage(parseInt(e.target.value));
    await CustomerListRequest(page, e.target.value, searchKey);
  };

  const searchKeyChange = async () => {
    await CustomerListRequest(page, perPage, searchKey);
  };

  const searchOnChange = async (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
    }
  };

  const paginateOnChange = async (e) => {
    await CustomerListRequest(e.selected + 1, perPage, searchKey);
  };

  const deleteItem = (id) => {
    Swal.fire({
      title: "Delete Customer",
      text: "Do you want to delete this customer info?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this!",
    }).then((result) => {
      if (result.isConfirmed) {
        return CustomerDeleteRequest(id).then(async (res) => {
          if (res) {
            await CustomerListRequest(page, perPage, searchKey);
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
                    <h5>Customer List</h5>
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

export default CustomerList;
