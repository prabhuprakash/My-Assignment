import java.util.*;
class Bank {
    private List<Customer> customers=new ArrayList<>();
    private Set<Account> accounts=new HashSet<>();
    private Map<String,String> linkAccountToCustomer=new HashMap<>();
    
    public void createAccount(String customerName,String customerId,String accountNo,String address,String phone,double initialBalance) {
        boolean t=false;
        /*for(Account acc :accounts){
            if(acc.getAccNo().equals(accountNo)){
                t=true;
                break;
            }
        }*/
        if(linkAccountToCustomer.containsKey(accountNo)){
            System.out.println("Account already exists ");
        }
        else {
            Customer newCustomer=new Customer(customerName,customerId,address,phone);
            Account newAccount=new  Account(accountNo, initialBalance);
            customers.add(newCustomer);
            accounts.add(newAccount);
            linkAccountToCustomer.put(accountNo,customerId);
            System.out.println("Account created successfully for " + customerName+" with account number: "+accountNo);
        }
        return;
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
        if (amount > 1000) {
            System.out.println("You can only withdraw 1000"); 
            return;   
        }
        else {
            for (Account account : accounts) {
                if (account.getAccNo().equals(accNo)) {
                    account.withdraw(amount);
                    return;
                }
            }
        }
        System.out.println("Account not found!");
        return;
    }
    public void getLoan(String accountNo,double amount){
        if(amount>5000) {
            System.out.println("Max Loan you can get is 5000");
            return;
        }
        for (Account account : accounts) {
            if (account.getAccNo().equals(accountNo)) {
                if(account.getLoan()>0)
                    System.out.println("You already took a loan.Clear it first");
                else {
                    account.setGetLoan(amount);
                    System.out.println("The loan amount has been added to your account ("+accountNo+"). New Balance:"+account.getBalance());
                }
                return;
            }
            else {
                System.out.println("Account not found.");
            }
        }
    }
    public void payLoan(String accountNo,double amount){
        for (Account account : accounts) {
            if (account.getAccNo().equals(accountNo)) {
                if(account.getLoan()==0)
                    System.out.println("You have no loans to be cleared.");
                else {
                    account.setPayLoan(amount);
                }
                return;
            }
            else {
                System.out.println("Account not found.");
            }
        }
    }
    public void deleteAccount(String accountNo){
        for (Account account : accounts) {
            if (account.getAccNo().equals(accountNo)) {
                accounts.remove(account);
                String s=linkAccountToCustomer.get(accountNo);
                System.out.println("Account no:"+accountNo+", Customer Id:"+s+" is deleted successfully");
                return;
            }
        }
        System.out.println("Account not found.");
    }   
    public void accountDetails(String accountNo) {
        String customerId=linkAccountToCustomer.get(accountNo);
        System.out.println(customerId);
        boolean check=false;
        Customer c=null;
        Account a=null;
        for (Account account : accounts) {
            if (account.getAccNo().equals(accountNo)) {
                a=account;
                check=true;
                break;
            }
        }
        if(!check){
            System.out.println("Account not found");
            return;
        }
        for(Customer customer : customers){
            if(customer.getCustomerId().equals(customerId) ){
                c=customer;
                break;
            }
        }
        System.out.println("Customer Name : "+c.getcustomerName()+"\nCustomer Id : "+c.getCustomerId()+"\nAddress : "+c.getAddress()+"\nPhone number : "+c.getPhone()+"\nAccount number : "+a.getAccNo()+"\nAccount Balance : "+a.getBalance()+"\nLoan amount:"+a.getLoan());

    } 
}
