import { ChevronRight } from "lucide";
import { format, parseISO } from "date-fns";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedInvoice } from "../Store/InvoiceSlice";

function InvoiceList() {

    const dispatch = useDispatch();
    const { invoices, filter } = useSelector((state) => state.invoices) || [];

    const filteredInvoices = (invoices || []).filter((invoice) => {
        if (filter === "all") return true;
        return invoice.status === filter;
    });

    if (filteredInvoices.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-xl text-slate-400"> No Invoice Found</p>
            </div>
        )
    }

    const handleInvoiceClick = (invoice) => {
        dispatch(setSelectedInvoice(invoice));
    }

    const formatDate = (date) => {
        if (!date || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return "Invalid Date";
        }

        try {
            return format(parseISO(date), "dd MMM yyyy");
        } catch (error) {
            console.error("Date parsing error:", error);
            return "Invalid Date";
        }
    };

    return (
        <div className="space-y-4">
            {invoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        onClick={() => handleInvoiceClick(invoice)}
                        className="bg-[#0B192C] rounded-lg p-6 flex items-center justify-between hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
                    >
                        <div className="flex items-center space-x-6">
                            <span className="text-slate-400 text-sm sm:text-base">{invoice.id}</span>
                            <span className="text-slate-400 text-sm sm:text-base"> <span className="text-orange-400">Due</span> {formatDate(invoice.dueDate)}</span>
                            <span className="text-slate-300 text-sm sm:text-base">{invoice.clientName}</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <span className="text-[16px] sm:text-[18px] pl-3 font-bold">${invoice.amount?.toFixed(2) || "0.00"}</span>
                            <div
                                className={`px-3 py-1 rounded-lg flex item-center space-x-2 
                ${invoice.status === "paid"
                                        ? "bg-green-900/20 text-green-500 px-6"
                                        : invoice.status === "pending"
                                            ? "bg-red-900/20 text-red-500"
                                            : "bg-slate-700/50 text-slate-400"
                                    }`}
                            >
                                <div className={`mt-[10px] w-2 h-2 rounded-full ${invoice.status === "paid" ? "bg-green-500" : invoice.status === "pending" ? "bg-red-500" : "bg-slate-400"}`}></div>
                                <span className="capitalize mt-1 text-sm sm:text-base">{invoice.status}</span>
                            </div>
                            <FaChevronRight className="text-white-800 text-sm sm:text-base hover:text-white-500" />
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-slate-400 text-center">No invoices found.</p>
            )}
        </div>
    );
}

export default InvoiceList;