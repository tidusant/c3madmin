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
                <a className="al-sidebar-list-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
  <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
</svg>
                    <span>Orders</span></a>
            </Link>

        </li>
    </ul>
    <div className="sidebar-hover-elem"

         ></div>

    </aside>
  }