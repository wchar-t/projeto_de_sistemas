import Link from 'next/link';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import styles from '@/styles/components/Page.module.css';
import Api from '@/lib/api';

export default function TopBar() {
  const session = Api.getSession();

  if (!session) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.menu}>
        <Link href="/" className={styles.brand}>
          <div className={styles.logo}>
            <img src="/static/img/logo.svg" />
          </div>
        </Link>
        <div className={styles.mm}>
          <Link href="/totems">Totems</Link>
          <Link href="/spots">Pontos</Link>
          <Link href="/rooms">Vagas</Link>
        </div>
        <div className={styles.options}>
          <Menu>
            <MenuButton>
              <img src="/static/img/user.svg" className={styles.avatar} />
            </MenuButton>
            <MenuList>
              <div className={styles['dropdown-display-username']}>
                <img src="/static/img/user.svg" className={styles.avatar} />
                <span>{session!.name}</span>
              </div>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  Api.logout();
                  window.location.href = '/';
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
