import { useParams } from "react-router-dom";
import "./AccountAndBilling.css"
import { useEffect } from "react";
import { useState } from "react";
import Login from "../../GlobalComponents/Login/Login";


const DummyAccount = {
    AccountName: "John Doe",
    AccountEmail: "johndoe@example.com",
    AccountID: 101,
    AccountStartDate: new Date("2022-01-15"),
    AccountBillingPeriod: "Monthly",
    AccountLastBillDate: new Date("2024-11-01"),
    AccountComingBillDate: new Date("2024-12-01"),
    AccountDiscrepency: {
        Count: 7,
        DiscrepencyDates: [
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/01/2001"),
            new Date("1/12/2015"),
        ]
    },
    AccountPriorBillings: 35
};


export default function AccountAndBilling(){
    const UserID = useParams();
    const [AccountData, setAccountData] = useState({
        AccountName: "",
        AccountEmail: "",
        AccountID: -1,
        AccountStartDate: new Date("2000-01-00"),
        AccountBillingPeriod: "Monthly",
        AccountLastBillDate: new Date("2000-01-00"),
        AccountComingBillDate: new Date("2000-01-00"),
        AccountDiscrepency: {
            Count: 0,
            DiscrepencyDates: []
        },
        AccountPriorBillings: -1
    })
    useEffect(() => {
        console.log(UserID)
    },[])
    
    if (!AccountData || AccountData.AccountID === -1){
        return(
            <main>
                <Login />
            </main>
        )
    }
    return (
        <main className="AccountAndBilling">
            <section className="AccountContainer">
                <h1 className="AccountTitle">
                    Account: {AccountData.AccountName}
                </h1>
                <div className="AccountData">
                    <h3 className="AccountDataTitle">
                        Your Information
                    </h3>
                    <p className="AccountID">ID: {AccountData.AccountID}</p>
                    <p className="AccountEmail">EmailAddress: {AccountData.AccountEmail}</p>
                    <p className="AccountAge">Your account is {GetAge(AccountData.AccountStartDate)} Days old </p>
                </div>
            </section>
            <section className="BillingContainer">
                <h1 className="BillingTitle">
                    Billing
                </h1>
                <div className="BillingData">
                    <p className="BillingPeriod">{AccountData.AccountBillingPeriod} Billing period</p>
                    <p className="BillingLastBilled">{AccountData.AccountLastBillDate.getFullYear()}/{AccountData.AccountLastBillDate.getMonth() + 1}/{AccountData.AccountLastBillDate.getDate()} Date last billed</p>
                    <p className="BillingComingBill">{AccountData.AccountComingBillDate.getFullYear()}/{AccountData.AccountComingBillDate.getMonth() + 1}/{AccountData.AccountComingBillDate.getDate()} Coming Bill</p>
                    <p className="BillingDiscrepenciesCount">{AccountData.AccountDiscrepency.Count} Discrepencies Noted</p>
                    <ul className="BillingDiscrepenciesDateList">
                        {AccountData.AccountDiscrepency.DiscrepencyDates.map((Date, index) => (
                            <li className="BillingDiscrepencies"
                                key={index}
                            >   
                                {Date.toISOString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    )
}    
function GetAge(StartDate){
    const CurrDate = new Date();

    return ((CurrDate.getTime() - StartDate.getTime()) / 1000 / 60 / 60 / 24).toFixed(0);
}