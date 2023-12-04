// @path: @/components/layout/Header.tsx
import React from "react";
// відповідає за верхню частину сторінки (навігаційний блок)
const Header = () => {
  return (
    <nav className="navbar sticky-top py-2">
      <div className="container">
        {/* ліва частина нав.блоку - логотип з посиланням на головну сторінку */}
        <div className="col-6 col-lg-3 p-0">
          <div className="navbar-brand">
            <a href="/">
              <img src="images/bookit_logo.png"
                style={{ cursor: "pointer" }}
                alt="BookIT"
              />
            </a>
          </div>
        </div>
        {/* права частина нав.блоку - інфо про користувача та випадаюче меню  */}
        <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">
          <div className="ml-4 dropdown d-line">
            {/* кнопка, що викликає випадаюче меню */}
            <button type="button"
              className="btn dropdown-toggle"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* зображення та ім'я користувача в кнопці */}
              <figure className="avatar avatar-nav">
                <img src="/images/default_avatar.jpg"
                  height="50" width="50"
                  alt="John Doe"
                  className="rounded-circle placeholder-glow"        
                />
              </figure>
              <span className="placeholder-glow ps-1"> John Doe</span>
            </button>
            {/* випадаюче меню з різними пунктами для користувача */}
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton1"
            >
              <a href="/admin/dashboard" className="dropdown-item">
                Dashboard
              </a>
              <a href="/bookings/me" className="dropdown-item">
                My Bookings
              </a>
              <a href="/me/update" className="dropdown-item">
                Profile
              </a>
              <a href="/" className="dropdown-item text-danger">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
