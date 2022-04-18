import React, { useContext } from "react"
import { CustomerContext } from "../../Providers/CustomerProvider"


export const CustomerSearch = () => {
    //called in applicationviews

    //Changes state in provider.
    const { setCustomerSearchTerms } = useContext(CustomerContext)

    return (
        <>
            <div className="customerSearch">
                Customer search: <input type="text"
                    className="input--wide"
                    onKeyUp={(event) => setCustomerSearchTerms(event.target.value)}
                    placeholder="Search for an customer" />

            </div>
        </>
    )
}
