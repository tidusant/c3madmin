import Link from 'next/link'

export default function Sidebar() {
    return <aside className="al-sidebar" >
    <ul className="al-sidebar-list" >
        <li  className="al-sidebar-list-item">
            <Link href="/" >
                <a className="al-sidebar-list-link"><i className="ion-android-home"></i><span>Dashboard</span></a>
            </Link>
        </li>
        <li className="al-sidebar-list-item">
            <Link href="/orders" >
                <a className="al-sidebar-list-link"><i className="ion-android-home"></i><span>Orders</span></a>
            </Link>

        </li>
    </ul>
    <div className="sidebar-hover-elem"

         ></div>

    </aside>
  }