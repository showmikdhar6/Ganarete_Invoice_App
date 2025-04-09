import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../Store/InvoiceSlice";

const status = ["all", "paid", "pending", "draft"];
function Header({ onNewInvoice }) {

    const dispatch = useDispatch();


    const { invoices, filter } = useSelector((state) => state.invoices);
    // console.log(invoice);
    return (
        <header className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Invoice</h1>
                <p className="text-slate-400">
                    {console.log("Type of Invoice:", typeof invoice)}
                    {console.log("Type of invoices:", typeof invoices)}
                    {Array.isArray(invoices) && invoices.length === 0
                        ? "No Invoices"
                        : `There are ${Array.isArray(invoices) ? invoices.length : 0} Total Invoices`}
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <Menu as="div" className="realative">
                    <Menu.Button className="flex items-center space-x-2 text-white">
                        <FaFilter />
                        <span> Filter by Status</span>
                    </Menu.Button>

                    <Menu.Items className="absolute  mt-2 w-[140px] bg-[#0B192C] rounded-lg shadow-lg p-2 z-10">
                        {status.map((s) => (
                            <Menu.Item key={s}>
                                {({ active }) => (
                                    <button onClick={() => dispatch(setFilter(s))} className={`${active ? "bg-slate-700" : ""} w-full text-left px-4 py-2 rounded-lg capitalize ${filter === s ? "text-orange-500" : "text-white"}`}>
                                        {s}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Menu>

                <button type="button" onClick={onNewInvoice} className="bg-[#0B192C] hover:bg-[#6482AD] text-white py-1 px-3 rounded-full flex items-center space-x-2">
                    <div className="bg-[#1E3E62] rounded-full p-1">
                        <FaPlus className="text-white-500" />
                    </div>
                    <span className="mt-1"> New Invoice </span>
                </button>
            </div>
        </header>
    )
}

export default Header;