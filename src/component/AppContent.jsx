import React from "react";
import Header from "./Header";
import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";
import InvoiceDetails from "./InvoiceDetails";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../Store/InvoiceSlice";

function AppContent() {

    const dispatch = useDispatch();
    const { isFormOpen, selectedInvoice } = useSelector((state) => state.invoices);


    const handleNewInvoice = () => {
        dispatch(toggleForm());
    }

    return (
        <div className="bg-[#1E3E62] text-white min-h-screen">
            <div className="w-full max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 md:w-[100%] lg:w-[90%] xl:w-[85%] 2xl:w-[55%]">
                <Header onNewInvoice={handleNewInvoice} />
                {selectedInvoice ? <InvoiceDetails invoice={selectedInvoice} /> : <InvoiceList />}
                {/* <InvoiceDetails /> */}
                {isFormOpen && <InvoiceForm invoice={selectedInvoice} />}
                {/* <InvoiceList /> */}

            </div>
        </div>
    );
}

export default AppContent;