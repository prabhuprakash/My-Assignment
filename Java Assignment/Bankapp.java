public class Bankapp {
    public static void main(String[] args) {
        Bank bank = new Bank();
        Customer customer1 = new Customer("prabhu", "ap34c102", "palakollu", "9031996309");
        Customer customer2 = new Customer("prakash", "apc40369", "hyderabad", "9987966566");
        bank.addCustomer(customer1);
        bank.addCustomer(customer2);
        customer1.createAccount("BOI452AP", 1100.0);
        customer2.createAccount("BOI501XG", 1500.0);
        customer1.deposit("BOI452AP", 500.0);
        customer1.deposit("BOI452AP", 5000.0);
        customer1.withdraw("BOI345TY", 1000.0);
        customer2.withdraw("BOI501XG", 2000.0); 
        customer1.withdraw("BOI452AP", 3000.0);
        bank.giveLoan("cherry", 5000.0);
        bank.giveLoan("prabhu",6400);
        bank.giveLoan("prakash", 3000.0);
        bank.payLoan("cherry", 2000.0);
        bank.payLoan("prakash", 3000.0);
        bank.transaction();
    }
}
    