import java.util.*;
class Customer {
    private String customerName;
    private String customerId;
    private String address;
    private String phone;
    private Set<Account> accounts;

    public Customer(String customerName, String customerId, String address, String phone) {
        this.customerName = customerName;
        this.customerId = customerId;
        this.address = address;
        this.phone = phone;
        this.accounts = new HashSet<>();
    }

    public String getCustomerName(){
        return customerName;
    }
    public String address(){
        return address;
    }
    public String phone(){
        return phone;
    }
    public void createAccount(String accNo, double initialBalance) {
        Account newAccount = new Account(accNo, customerName, customerId, initialBalance);
        accounts.add(newAccount);
        System.out.println("Account created successfully for " + customerName);
    }

    public void deposit(String accNo, double amount) {
        for (Account account : accounts) {
            if (account.getAccNo().equals(accNo)) {
                account.deposit(amount);
                return;
            }
        }
        System.out.println("Account not found!");
    }

    public void withdraw(String accNo, double amount) {
        for (Account account : accounts) {
            if (account.getAccNo().equals(accNo)) {
                account.withdraw(amount);
                return;
            }
        }
        System.out.println("Account not found!");
    }

    public void displayAccounts() {
        System.out.println("Customer Name: " + customerName + ", Accounts: ");
        for (Account account : accounts) {
            System.out.println("Account No: " + account.getAccNo() + ", Customer Name: " + account.getCustomerName() + ", Balance: " + account.getBalance());
        }
    }
}
