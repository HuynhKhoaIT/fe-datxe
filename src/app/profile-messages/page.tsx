import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
export default function ProfileFavorite() {
    return (
        <main className="main">
            <div className="user-profile py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar />
                        </div>
                        <div className="col-lg-9">
                            <div className="user-profile-wrapper">
                                <div className="user-profile-card profile-message">
                                    <div className="user-profile-card-header">
                                        <h4 className="user-profile-card-title">Messages</h4>
                                        <div className="user-profile-card-header-right">
                                            <div className="header-account">
                                                <div className="dropdown">
                                                    <div data-bs-toggle="dropdown" aria-expanded="false">
                                                        <img src="assets/img/account/01.jpg" alt="" />
                                                    </div>
                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="far fa-ban"></i> Block Chat
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="far fa-message-slash"></i> Mute Chat
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="far fa-trash-can"></i> Delete Chat
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="profile-message-wrapper">
                                                <div className="profile-message-inbox">
                                                    <ul className="profile-message-list">
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/01.jpg" alt="" />
                                                                    <span className="message-status online"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Angela Howe</h5>
                                                                        <span>just now</span>
                                                                    </div>
                                                                    <p>
                                                                        Hello, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/02.jpg" alt="" />
                                                                    <span className="message-status offline"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Roger Knight</h5>
                                                                        <span>15 min ago</span>
                                                                    </div>
                                                                    <p>
                                                                        Hi, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="message-active">
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/03.jpg" alt="" />
                                                                    <span className="message-status busy"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Rikki Hamby</h5>
                                                                        <span>5 hours ago</span>
                                                                    </div>
                                                                    <p>
                                                                        Hello, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/04.jpg" alt="" />
                                                                    <span className="message-status online"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Arlene Lawrence</h5>
                                                                        <span>Yesterday</span>
                                                                    </div>
                                                                    <p>
                                                                        Hi, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/05.jpg" alt="" />
                                                                    <span className="message-status busy"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Donald Ledoux</h5>
                                                                        <span>2 week ago</span>
                                                                    </div>
                                                                    <p>
                                                                        Hello, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/01.jpg" alt="" />
                                                                    <span className="message-status online"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Hope Stanley</h5>
                                                                        <span>1 months ago</span>
                                                                    </div>
                                                                    <p>
                                                                        Hi, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/02.jpg" alt="" />
                                                                    <span className="message-status offline"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Rob Madden</h5>
                                                                        <span>Sep 11, 2022</span>
                                                                    </div>
                                                                    <p>
                                                                        Hello, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/03.jpg" alt="" />
                                                                    <span className="message-status online"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Dawne Martin</h5>
                                                                        <span>Sep 15, 2022</span>
                                                                    </div>
                                                                    <p>
                                                                        Hi, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/04.jpg" alt="" />
                                                                    <span className="message-status busy"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Nicholas Diedrich</h5>
                                                                        <span>Sep 20, 2022</span>
                                                                    </div>
                                                                    <p>
                                                                        Hello, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/05.jpg" alt="" />
                                                                    <span className="message-status busy"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Denise Garrett</h5>
                                                                        <span>Sep 25, 2022</span>
                                                                    </div>
                                                                    <p>
                                                                        Hi, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/01.jpg" alt="" />
                                                                    <span className="message-status offline"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Justin Garza</h5>
                                                                        <span>Sep 26, 2022</span>
                                                                    </div>
                                                                    <p>
                                                                        Hello, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <div className="message-avatar">
                                                                    <img src="assets/img/account/02.jpg" alt="" />
                                                                    <span className="message-status online"></span>
                                                                </div>
                                                                <div className="message-by">
                                                                    <div className="message-by-content">
                                                                        <h5>Jenna Lemon</h5>
                                                                        <span>Sep 28, 2022</span>
                                                                    </div>
                                                                    <p>
                                                                        Hi, It is a long establish fact that a reader
                                                                        will distracted
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="message-content">
                                                    <div className="message-content-info">
                                                        <div className="message-item">
                                                            <div className="message-avatar">
                                                                <img src="assets/img/account/01.jpg" alt="" />
                                                            </div>
                                                            <div className="message-description">
                                                                <p>
                                                                    Hello, It is a long established fact that a reader
                                                                    will be distracted by the readable content of a page
                                                                    when looking at its layout.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="message-item me">
                                                            <div className="message-avatar">
                                                                <img src="assets/img/account/02.jpg" alt="" />
                                                            </div>
                                                            <div className="message-description">
                                                                <p>
                                                                    There are many variations of passages available but
                                                                    the majority have suffered alteration in some form
                                                                    by injected humour.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="message-item">
                                                            <div className="message-avatar">
                                                                <img src="assets/img/account/01.jpg" alt="" />
                                                            </div>
                                                            <div className="message-description">
                                                                <p>
                                                                    We denounce with righteous indignation and dislike
                                                                    men who are so beguiled and demoralized by the
                                                                    charms of pleasure of the moment.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="message-item me">
                                                            <div className="message-avatar">
                                                                <img src="assets/img/account/02.jpg" alt="" />
                                                            </div>
                                                            <div className="message-description">
                                                                <p>
                                                                    So blinded by desire that they cannot foresee the
                                                                    pain and trouble that are bound to ensue.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="message-item">
                                                            <div className="message-avatar">
                                                                <img src="assets/img/account/01.jpg" alt="" />
                                                            </div>
                                                            <div className="message-description">
                                                                <p>
                                                                    In a free hour when our power of choice is untra and
                                                                    when nothing prevents our being able.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="message-item me">
                                                            <div className="message-avatar">
                                                                <img src="assets/img/account/02.jpg" alt="" />
                                                            </div>
                                                            <div className="message-description">
                                                                <p>
                                                                    We like best every pleasure is to be welcomed and
                                                                    every pain avoided in certain circums and owing to
                                                                    the claims of duty.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="message-item">
                                                            <div className="message-avatar">
                                                                <img src="assets/img/account/01.jpg" alt="" />
                                                            </div>
                                                            <div className="message-description">
                                                                <p>
                                                                    The obligations of business it will frequently occur
                                                                    that pleasures have to be repudiated and annoyances
                                                                    accepted.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="message-reply">
                                                        <textarea
                                                            cols={40}
                                                            rows={3}
                                                            className="form-control"
                                                            placeholder="Your Message"
                                                        ></textarea>
                                                        <button type="submit" className="theme-btn">
                                                            <span className="far fa-paper-plane"></span> Send Message
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
