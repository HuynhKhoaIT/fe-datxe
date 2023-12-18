import { BlogItem } from "../components/elements/blog/blogItem";
export default async function Blog() {
  return (
    <main className="main">
      {/* <!-- blog area --> */}
      <div className="blog-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center">
                <span className="site-title-tagline">
                  <i className="flaticon-drive"></i> Our Blog
                </span>
                <h2 className="site-title">
                  Latest News & <span>Blog</span>
                </h2>
                <div className="heading-divider"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                <div className="blog-item-img">
                  <img src="assets/img/blog/01.jpg" alt="Thumb" />
                </div>
                <div className="blog-item-info">
                  <div className="blog-item-meta">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="far fa-user-circle"></i> By Alicia Davis
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="far fa-calendar-alt"></i> January 29,
                          2023
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h4 className="blog-title">
                    <a href="#">
                      There are many variations of passage available.
                    </a>
                  </h4>
                  <a className="theme-btn" href="#">
                    Read More<i className="fas fa-arrow-right-long"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <BlogItem />
            </div>
            <div className="col-md-6 col-lg-4">
              <BlogItem />
            </div>
            <div className="col-md-6 col-lg-4">
              <BlogItem />
            </div>
            <div className="col-md-6 col-lg-4">
              <BlogItem />
            </div>
            <div className="col-md-6 col-lg-4">
              <BlogItem />
            </div>
          </div>
          {/* <!-- pagination --> */}
          <div className="pagination-area">
            <div aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">
                      <i className="far fa-arrow-left"></i>
                    </span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">
                      <i className="far fa-arrow-right"></i>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- pagination end --> */}
        </div>
      </div>
      {/* <!-- blog area end --> */}
    </main>
  );
}
