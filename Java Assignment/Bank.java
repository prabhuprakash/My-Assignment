import java.util.*;
class Bank {
    private List<Customer> customerDetails;
    private Map<String, Double> loanDetails;

    public Bank() {
        customerDetails = new ArrayList<>();
        loanDetails = new HashMap<>();
    }

    public void addCustomer(Customer customer) {
        customerDetails.add(customer);
    }

    public void giveLoan(String customerName, double loanAmount) {
        boolean check=false;
        for(Customer c : customerDetails){
            if(c.getCustomerName().equals(customerName)){
                check=true;
                break;
            }
        }
        if(check) {
            loanDetails.put(customerName, loanAmount);
            System.out.println("Loan of " + loanAmount + " granted to " + customerName);
        }
        else {
            System.out.println("Create an account to get loan");
        }
    }

    public void payLoan(String customerName, double amount) {
        if (loanDetails.containsKey(customerName)) {
            double remainingLoan = loanDetails.get(customerName) - amount;
            if (remainingLoan <= 0) {
                loanDetails.remove(customerName);
                System.out.println("Loan fully repaid by " + customerName);
            } else {
                loanDetails.put(customerName, remainingLoan);
                System.out.println("Loan payment of " + amount + " collected. Remaining loan: " + remainingLoan);
            }
        } else {
            System.out.println("No loan found for " + customerName);
        }
    }

    public void transaction() {
        System.out.println("Displaying all customers and their loans:");
        for (Customer customer : customerDetails) {
            customer.displayAccounts();
        }
        System.out.println("Loan Details:");
        for (Map.Entry<String, Double> entry : loanDetails.entrySet()) {
            System.out.println("Customer: " + entry.getKey() + ", Loan: " + entry.getValue());
        }
    }
}
