import "./AccountAndBilling.css"


const DummyAccount = {
    AccountName: "John Doe",
    AccountEmail: "johndoe@example.com",
    AccountID: 101,
    AccountStartDate: new Date("2022-01-15"),
    AccountBillingPeriod: "Monthly",
    AccountLastBillDate: new Date("2024-11-01"),
    AccountComingBillDate: new Date("2024-12-01"),
    AccountDiscrepencyCount: 2,
    AccountPriorBillings: 35
};


export default function AccountAndBilling(){

    return (
        <main className="AccountAndBilling">
            <section className="AccountContainer">
                <h1 className="AccountTitle">
                    Account: {DummyAccount.AccountName}
                </h1>
                <div className="AccountData">
                    <h3 className="AccountDataTitle">
                        Your Information
                    </h3>
                    <p className="AccountID">ID: {DummyAccount.AccountID}</p>
                    <p className="AccountEmail">EmailAddress:{DummyAccount.AccountEmail}</p>
                    <p className="AccountAge">Your account is {GetAge(DummyAccount.AccountStartDate)} Days old </p>
                </div>
            </section>
            <section className="BillingContainer">
                <h1 className="BillingTitle">
                    Billing
                </h1>
                <div className="BillingData">
                    <p className="BillingPeriod">{DummyAccount.AccountBillingPeriod} Billing period</p>
                    <p className="BillingLastBilled">{DummyAccount.AccountLastBillDate.getFullYear()}/{DummyAccount.AccountLastBillDate.getMonth() + 1}/{DummyAccount.AccountLastBillDate.getDate()} Date last billed</p>
                    <p className="BillingComingBill">{DummyAccount.AccountComingBillDate.getFullYear()}/{DummyAccount.AccountComingBillDate.getMonth() + 1}/{DummyAccount.AccountComingBillDate.getDate()} Coming Bill</p>
                    <p className="BillingDiscrepencies">{DummyAccount.AccountDiscrepencyCount} Discrepencies Noted</p>
                </div>
            </section>
        </main>
    )
}    
function GetAge(StartDate){
    const CurrDate = new Date();

    return ((CurrDate.getTime() - StartDate.getTime()) / 1000 / 60 / 60 / 24).toFixed(0);
}