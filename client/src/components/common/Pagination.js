import React, { Component } from "react";

class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      pager: {},
      pageSize: 3
    };
  }

  componentWillMount() {
    if (this.props.products && this.props.products.length) {
      this.setPage(1);
    }
  }

  componentDidUpdate(prevProps) {
    const { products } = this.props;
    if (products !== prevProps.products) {
      this.setPage(1);
    }
  }

  setPage = page => {
    const { products } = this.props;
    var pager = this.state.pager;
    if (page < 1 || pager.totalItems > products.length) {
      return;
    }
    pager = this.getPager(page, products.length);
    this.setState({ pager: pager });
    var pageItems = products.slice(pager.startIndex, pager.endIndex + 1);
    this.props.change(pageItems);
  };

  getPager(page, totalItems) {
    const { pageSize } = this.state;
    const currentPage = page || 1;
    const lastPage = Math.ceil(totalItems / pageSize);
    var startIndex, endIndex;
    startIndex = pageSize * (currentPage - 1);
    if (currentPage == lastPage && totalItems % pageSize != 0) {
      endIndex = startIndex + totalItems - (currentPage - 1) * pageSize;
    } else {
      endIndex = startIndex + pageSize - 1;
    }

    var startPage, endPage;
    if (lastPage <= 4) {
      startPage = 1;
      endPage = lastPage;
    }

    var pages = [];
    for (var i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      currentPage: currentPage,
      lastPage: lastPage,
      startIndex: startIndex,
      endIndex: endIndex,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }

  render() {
    const { pager } = this.state;
    return (
      <div className="paginator">
        <ul className="pagination" style={{ cursor: "pointer" }}>
          <li className={pager.currentPage === 1 ? "disabled" : ""}>
            <a className="btn btn-info" onClick={() => this.setPage(1)}>
              First
            </a>
          </li>
          <li className={pager.currentPage === 1 ? "disabled" : ""}>
            <a
              className="btn btn-primary"
              onClick={() => this.setPage(pager.currentPage - 1)}
            >
              Prev
            </a>
          </li>
          {pager.pages?pager.pages.map((page,index) => (
            <li key={`${page.currentPage}_${index}`} className={pager.currentPage === page ? "active":'inactive'}>
              <a className="btn" onClick={() => this.setPage(page)}>{page}</a>
            </li>
          )):null}
          <li
            className={pager.currentPage === pager.lastPage ? "disabled" : ""}
          >
            <a
              className="btn btn-primary"
              onClick={() => this.setPage(pager.currentPage + 1)}
            >
              Next
            </a>
          </li>
          <li
            className={pager.currentPage === pager.lastPage ? "disabled" : ""}
          >
            <a
              className="btn btn-info"
              onClick={() => this.setPage(pager.lastPage)}
            >
              Last
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
