import React from "react";
import { format, isValid, parseISO } from "date-fns";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"



const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: "#ffffff",
        BiFontFamily: "Helevetica"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb"
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        width: 200,
        textAlign: "right"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1e1e1e",
        marginBottom: 8
    },
    subtitle: {
        fontSize: 14,
        color: "#6b7280"
    },
    status: {
        fontSize: 14,
        padding: "8 16",
        borderRadius: 6,
        backgroundColor: "#f3f4f6",
        color: "#1e1e1e",
        textTransform: "uppercase",
        fontWeight: "bold",
        alignSelf: "flex-start"
    },
    statusPaid: {
        backgroundColor: "#dcfce7",
        color: "#15803d"
    },
    statusPending: {
        backgroundColor: "#fff7ed",
        color: "#9a3412"
    },
    section: {
        marginBottom: 30
    },
    grid: {
        flexDirection: "row",
        gap: 30,
    },
    column: {
        flex: 1
    },
    label: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 8,
        textTransform: "uppercase",
    },
    value: {
        fontSize: 14,
        color: "#1e1e1e",
        marginBottom: 4,
    },
    table: {
        marginTop: 30,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f9fafb",
        padding: "12 16",
        borderRadius: 8,
        marginBottom: 8,
    },
    tableHeaderText: {
        fontSize: 12,
        color: "#6b7280",
        fontWeight: "bold"
    },
    tableRow: {
        flexDirection: "row",
        padding: "12 16",
        marginBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    tableCell: {
        fontSize: 12,
        marginBottom: 2,
        color: "#1e1e1e"
    },
    col1: { width: "40%" },
    col2: { width: "20%", textAlign: "center" },
    col3: { width: "20%", textAlign: "right" },
    col4: { width: "20%", textAlign: "right" },
    totalSection: {
        marginTop: 30,
        backgroundColor: "#1e1e1e",
        padding: 24,
        borderRadius: 8,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalLabel: {
        fontSize: 14,
        color: "#ffffff",
        opacity: 0.7,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 50,
        right: 50,
        textAlign: "center",
        color: "#cb7280",
        fontSize: 10,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "e5e7eb"
    },
});

export const InvoicePDF = ({ invoice }) => {

    const formatDate = (dateString) => {
        try {
            return format(parseISO(dateString), "dd MMM yyyy");
        } catch (error) {
            // console.log(error);
            return "Invalid Date";
        }
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case "paid":
                return styles.statusPaid;
            case "pending":
                return styles.statusPending;
            default:
                return {};
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header  */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>INVOICE #{invoice.id}</Text>
                        <Text style={styles.subtitle}>{invoice.projectDescription}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={[styles.status, getStatusStyle(invoice.status)]}>{invoice.status}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.grid}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Bill From</Text>
                            <Text style={styles.value}>{invoice.billFrom.companyName}</Text>
                            <Text style={styles.value}>{invoice.billFrom.companyEmail}</Text>
                            <Text style={styles.value}>{invoice.billFrom.city}</Text>
                            <Text style={styles.value}>{invoice.billFrom.streetAddress}</Text>
                            <Text style={styles.value}>{invoice.billFrom.postCode}</Text>
                            <Text style={styles.value}>{invoice.billFrom.country}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Bill To</Text>
                            <Text style={styles.value}>{invoice.clientName}</Text>
                            <Text style={styles.value}>{invoice.billTo.clientEmail}</Text>
                            <Text style={styles.value}>{invoice.billTo.streetAddress}</Text>
                            <Text style={styles.value}>{invoice.billTo.city}</Text>
                            <Text style={styles.value}>{invoice.billTo.postCode}</Text>
                            <Text style={styles.value}>{invoice.billTo.country}</Text>
                        </View>
                        {/* <View style={styles.column}>
                            <Text style={styles.label}>Ship To</Text>
                            <Text style={styles.value}>{invoice.billTo.clientEmail}</Text>
                        </View> */}
                    </View>
                </View>

                {/* Invoice Details  */}
                <View style={styles.section}>
                    <View style={styles.grid}>
                        <View style={styles.column}>
                            <Text style={styles.label}> Invoice Date </Text>
                            <Text style={styles.value}> {format(new Date(invoice.invoiceDate), "dd MMM yyyy")} </Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}> Due Date </Text>
                            <Text style={styles.value}>
                                {formatDate(invoice.dueDate)}
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}> Payment Terms </Text>
                            <Text style={styles.value}> {invoice.paymentTerms} </Text>
                        </View>
                    </View>

                    {/* Items Table  */}
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, styles.col1]}>Item Name</Text>
                            <Text style={[styles.tableHeaderText, styles.col2]}>QTY.</Text>
                            <Text style={[styles.tableHeaderText, styles.col3]}>Price</Text>
                            <Text style={[styles.tableHeaderText, styles.col4]}>Total</Text>
                        </View>
                        {invoice.items.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.col1]}>{item.name}</Text>
                                <Text style={[styles.tableCell, styles.col2]}>{item.quantity}</Text>
                                <Text style={[styles.tableCell, styles.col3]}>${item.price.toFixed(2)}</Text>
                                <Text style={[styles.tableCell, styles.col4]}>${item.total.toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Total  */}
                    <View style={styles.totalSection}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Amount Due</Text>
                            <Text style={styles.totalAmount}>${invoice.amount.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Footer  */}
                </View>
                <Text style={styles.footer}>
                    This is a Invoice App Generated Document. No signature is required.
                </Text>
            </Page>
        </Document>
    );
}