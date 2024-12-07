import java.util.Scanner;
public class Bankapp {
    public static void main(String[] args) {
        Bank bank = new Bank();
        int n;
        String customerName,customerId,address,phone,accno;
        double amount;
        Scanner s=new Scanner(System.in);
        boolean c=true;
        while(c) {
            for(int i=0;i<50;i++)
            System.out.print("*");
            System.out.println();
            System.out.println("Welcome to Banking services.\nPlease select the option you want to perform:\n1.Create Account\n2.Deposit\n3.Withdraw");
            System.out.print("4.Get Loan\n5.Pay Loan\n6.AccountDetails\n7.Delete Account\n8.End Banking Service\nEnter the option:");
            n=s.nextInt();
            switch(n) {
                case 1: {
                    System.out.println("*************************");
                    System.out.println("Creating account:");
                    System.out.print("Enter customer name:");
                    s.nextLine();
                    customerName=s.nextLine();
                    System.out.print("Enter customer Id:");
                    customerId=s.nextLine();
                    System.out.print("Enter customer address:");
                    address=s.nextLine();
                    System.out.print("Enter phone no:");
                    phone=s.nextLine();
                    System.out.print("Enter BankAccount number:");
                    accno=s.nextLine();
                    System.out.print("Enter the initial Deposit:");
                    amount=s.nextDouble();
                    //Customer customer = new Customer(customerName,customerId,accno,address,phone,d);
                    bank.createAccount(customerName, customerId, accno, address, phone, amount);
                    break;
                }
                case 2: {
                    System.out.println("Enter the account Number:");
                    s.nextLine();
                    accno=s.nextLine();
                    System.out.println("Enter the amount to deposit:");
                    amount=s.nextDouble();
                    bank.deposit(accno, amount);
                    break;
                }
                case 3: {
                    System.out.println("Enter account number:");
                    s.nextLine();
                    accno=s.nextLine();
                    System.out.println("Enter the amount to withdraw:");
                    amount=s.nextDouble();
                    bank.withdraw(accno,amount);
                    break;
                }
                case 4: {
                    System.out.println("Enter account number:");
                    s.nextLine();
                    accno=s.nextLine();
                    System.out.println("Enter the loan amount:");
                    amount=s.nextDouble();
                    bank.getLoan(accno,amount);
                    break;
                }
                case 5: {
                    System.out.println("Enter account number:");
                    s.nextLine();
                    accno=s.nextLine();
                    System.out.println("Enter the loan amount:");
                    amount=s.nextDouble();
                    bank.payLoan(accno,amount);
                    break;
                }
                case 6: {
                    System.out.println("Enter account number:");
                    s.nextLine();
                    accno=s.nextLine();
                    bank.accountDetails(accno);
                    break;
                }
                case 7: {
                    System.out.println("Enter account number:");
                    s.nextLine();
                    accno=s.nextLine();
                    bank.deleteAccount(accno);
                    break;
                }
                
                case 8: {
                    System.out.println("Thank You.Visit Again");
                    c=false;
                    break;
                }
                default: {
                    System.out.println("Enter an valid option.");
                }
            }
        }


    }
}
    