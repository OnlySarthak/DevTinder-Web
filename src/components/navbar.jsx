import { useSelector } from "react-redux";

const navbar = () => {
  const user = useSelector((store)=>store.user);
  

  return (
    <div className="navbar bg-base-300 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">🐦‍🔥 DevTinder</a>
          </div>
          <div className="flex gap-2">
            { user && 
              <div className="dropdown dropdown-end mx-5 flex gap-10">
                <div className="my-1">Welcome</div>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.data?.photourl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8RUsn6j48H1JTCJ2tOUblet51HESdVS6XkQ&s"} />
                    </div>
                  </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
          }
          </div>
        </div>
  )
}

export default navbar;