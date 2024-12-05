class Account {
    private String accNo;
    private String customerName;
    private String customerId;
    private double balance;

    public Account(String accNo, String customerName, String customerId, double initialBalance) {
        this.accNo = accNo;
        this.customerName = customerName;
        this.customerId = customerId;
        this.balance = initialBalance;
    }

    public String getAccNo() {
        return accNo;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public double getBalance() {
        return balance;
    }

    public void updateAcc(String accNo) {
        this.accNo = accNo;
    }
    
    public void deposit(double amount) {
            balance += amount;
            System.out.println("Deposit successful! New balance: " + balance);
    }

    public boolean withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println("Withdrawal successful! New balance: " + balance);
            return true;
        } else {
            System.out.println("Insufficient balance");
            return false;
        }
    }
}