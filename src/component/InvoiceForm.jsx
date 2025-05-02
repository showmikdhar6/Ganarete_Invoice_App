import React, { useDebugValue, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addInvoice, toggleForm, updateInvoice } from "../Store/InvoiceSlice";
import { addDays, format } from "date-fns";
import { Fieldset } from "@headlessui/react";
import { CgOverflow } from "react-icons/cg";

function InvoiceForm({ invoice }) {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState(() => {

        if (invoice) {
            return { ...invoice };
        }

        return {
            id: `INV${Math.floor(Math.random() * 10000)}`,
            status: "pending",
            billFrom: {
                streetAddress: "",
                city: "",
                postCode: "",
                country: ""
            },
            billTo: {
                clientEmail: "",
                streetAddress: "",
                city: "",
                postCode: "",
                country: "",
            },
            clientName: "",
            items: [],
            paymentTerms: "Net 30 Days",
            description: "",
            projectDescription: "",
            invoiceDate: format(new Date(), "yyy-MM-dd"),
            dueDate: format(addDays(new Date(), 30), "yyy-mm-dd"),
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (invoice) {
            dispatch(updateInvoice(formData))
        } else {
            dispatch(addInvoice(formData));
        }
        console.log(formData);
    }

    useEffect(() => {
        if (invoice) {
            setFormData(invoice);
        }
    }, [invoice]);

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }] })
    }

    const updateItem = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;

        if (field === 'quantity' || field === 'price') {
            const qyt = field === 'quantity' ? value : newItems[index].quantity;
            const price = field === 'price' ? value : newItems[index].price;
            newItems[index].total = qyt * price;
        }
        setFormData({ ...formData, items: newItems });
    }

    const removeItem = (index) => {
        setFormData({
            ...formData,
            items: formData.items.filter((_, i) => i !== index),
        });
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="bg-[#0B192C] p-10 rounded-lg w-full max-w-2xl mt-5  overflow-y-scroll h-[70vh] scrollbar-hidden">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-bold text-2xl">New Invoice</h2>

                    <button type="button" onClick={() => dispatch(toggleForm())}>
                        <IoClose />
                    </button>

                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <h3 className="text-orange-500 font-bold">Bill From</h3>
                        <input
                            type="text"
                            placeholder="Company Name"
                            required
                            value={formData.billFrom.companyName}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, companyName: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3"
                        />
                        <input
                            type="text"
                            placeholder="Company Email"
                            required
                            value={formData.billFrom.companyEmail}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, companyEmail: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3"
                        />
                        {/* <input
                            type="text"
                            placeholder="City"
                            required
                            value={formData.billFrom.city}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, city: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3"
                        /> */}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={formData.billFrom.city}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, city: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={formData.billFrom.streetAddress}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, streetAddress: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="text"
                            placeholder="Post Code"
                            required
                            value={formData.billFrom.postCode}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, postCode: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            value={formData.billFrom.country}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, country: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                    </div>

                    {/* <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="State"
                            value={formData.billFrom.streetAddress}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, streetAddress: e.target.value,
                                },
                            })}
                            required
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="text"
                            placeholder="Post Code"
                            required
                            value={formData.billFrom.postCode}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, postCode: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            value={formData.billFrom.country}
                            onChange={(e) => setFormData({
                                ...formData, billFrom: {
                                    ...formData.billFrom, country: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                    </div> */}

                    <div className="space-y-2">
                        <h3 className="text-orange-500 font-bold">Bill To</h3>
                        <input
                            type="text"
                            placeholder="Customer Name"
                            required
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="email"
                            placeholder="Customer Email"
                            required
                            value={formData.billTo.clientEmail}
                            onChange={(e) => setFormData({
                                ...formData, billTo: {
                                    ...formData.billTo, clientEmail: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />


                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={formData.billTo.city}
                            onChange={(e) => setFormData({
                                ...formData, billTo: {
                                    ...formData.billTo, city: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={formData.billTo.streetAddress}
                            onChange={(e) => setFormData({
                                ...formData, billTo: {
                                    ...formData.billTo, streetAddress: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="text"
                            placeholder="Post Code"
                            required
                            value={formData.billTo.postCode}
                            onChange={(e) => setFormData({
                                ...formData, billTo: {
                                    ...formData.billTo, postCode: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            value={formData.billTo.country}
                            onChange={(e) => setFormData({
                                ...formData, billTo: {
                                    ...formData.billTo, country: e.target.value,
                                },
                            })}
                            className="w-full bg-[#1E3E62] rounded-lg p-3 mt-1"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                className="bg-[#1E3E62] rounded-lg p-3"
                                value={formData.invoiceDate}
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    setFormData({
                                        ...formData, invoiceDate: newDate,
                                        dueDate: format(addDays(new Date(new Date), 30), 'yyyy-mm-dd')
                                    })
                                }}
                            />
                            <select
                                className="bg-[#1E3E62] rounded-lg p-3"
                                required
                                value={formData.paymentTerms}
                                onChange={
                                    (e) => setFormData({ ...formData, paymentTerms: e.target.value })
                                }
                            >
                                <option>Net 30 Days</option>
                                <option>Net 60 Days</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            placeholder="Description"
                            required
                            value={formData.projectDescription}
                            onChange={
                                (e) => setFormData({ ...formData, projectDescription: e.target.value })
                            }
                            className="w-full bg-[#1E3E62] rounded-lg p-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-orange-500 font-bold">Item List</h3>
                        {formData.items.map((item, index) => (
                            <div className="grid grid-cols-12 gap-3 items-center" key={index}>
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    value={item.name}
                                    onChange={(e) => updateItem(index, "name", e.target.value)}
                                    className="bg-[#1E3E62] rounded-lg p-3 col-span-5"
                                />
                                <input 
                                    type="number" 
                                    className="bg-[#1E3E62] rounded-lg p-3 col-span-2"
                                    placeholder="Qty."
                                    min="0"
                                    step="1"
                                    required
                                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 0)}
                                    />
                                <input 
                                    type="number" 
                                    className="bg-[#1E3E62] rounded-lg p-3 col-span-2"
                                    placeholder="$"
                                    min="0"
                                    step="1"
                                    required
                                    onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
                                    />

                                <div className=" col-span-2 text-right text-[18px]">
                                    ${item.total.toFixed(2)}
                                </div>
                                <button type="button" onClick={(e) => removeItem(index)}>
                                    <IoClose className="text-slate-400 hover:text-red-500 text-[20px] font-bold" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-2 flex items-center justify-center space-x-2"
                            onClick={addItem}
                        >
                            <FaPlus className="m-2" />
                            Add New Item
                        </button>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={() => dispatch(toggleForm())} className="bg-red-700 hover:bg-red-600 text-white py-2 px-6 rounded-full">
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-700 hover:bg-green-600 text-white py-2 px-6 rounded-full">
                            {invoice ? "Save Changes" : "Create Invoice"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InvoiceForm;