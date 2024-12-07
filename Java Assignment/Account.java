class Account {
    private String accNo;
    private double balance;
    private double loan;

    public Account(String accNo, double initialBalance) {
        this.accNo = accNo;
        this.balance = initialBalance;
        this.loan=0;
    }
    
    public String getAccNo() {
        return accNo;
    }
    public double getBalance() {
        return balance;
    }
    public double getLoan(){
        return loan;
    }
    public void setGetLoan(double amount){
        loan+=amount;
        balance+=loan;
    }
    public void setPayLoan(double amount){
            loan-=amount;
            balance-=amount;
            if(loan==0){
                System.out.println("Loan has been cleared. New balance:"+balance);
            }
            else{
                System.out.println("You paid "+amount+" of loan.You still have pending loan of "+loan+". New Balance:"+balance);
            }
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