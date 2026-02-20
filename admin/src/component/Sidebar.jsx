import React, { useState } from "react";
import {
  Home,
  ShoppingBag,
  Package,
  Settings,
  UserX
} from "lucide-react";


import { IoBagAddOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ logOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
      onClick={onClick}
      className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition
        ${active
          ? "bg-slate-700/40 text-white shadow-md"
          : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
        }`}
      title={label}
    >
      <Icon size={20} className={`transition-colors ${active ? "text-white" : "text-slate-400"}`} />
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-2 right-4 z-50 md:hidden bg-black text-white p-2 rounded-md "
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-screen w-24 bg-gradient-to-b from-[#020617] to-[#020617] border-r border-slate-800 flex flex-col items-center py-6 gap-8 transition-transform
          md:left-0 md:translate-x-0
          ${mobileOpen ? "right-0 translate-x-0" : "right-0 translate-x-full"} md:translate-x-0 z-40`}
      >
        {/* Logo */}
        <div className="text-xl font-semibold text-white tracking-wide">
          V
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-6 mt-6">
          <SidebarItem
            onClick={() => navigate("/")}
            icon={Home}
            label="Home"
            active={location.pathname === "/"}
          />
          <SidebarItem
            onClick={() => navigate("/Add")}
            icon={IoBagAddOutline}
            label="Add Items"
            active={location.pathname === "/Add"}
          />
          <SidebarItem
            onClick={() => navigate("/Lists")}
            icon={ShoppingBag}
            label="View Products"
            active={location.pathname === "/Lists"}
          />
          <SidebarItem
            onClick={() => navigate("/Orders")}
            icon={Package}
            label="Orders"
            active={location.pathname === "/Orders"}
          />
         <SidebarItem
            onClick={() => navigate("/vanish")}
            icon={UserX}
            label="Vanish List"
            active={location.pathname === "/vanish"}
          />

          <SidebarItem
            onClick={() => navigate("/Settings")}
            icon={Settings}
            label="Settings"
            active={location.pathname === "/Settings"}
          />
        </nav>

      
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
