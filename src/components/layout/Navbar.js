import styles from './Navbar.module.css';
import logo from '../../img/logo.png';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <a href="/">
        <img src={logo} alt="logo" height="70px" />
      </a>
    </div>
  );
}

export default Navbar;
