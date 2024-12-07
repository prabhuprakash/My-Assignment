import java.util.*;
class Customer {
    private String customerName;
    private String customerId;
    private String address;
    private double initbalance;
    private String phone;
    

    public Customer(String customerName,String customerId,String address, String phone) {
        this.customerName=customerName;
        this.customerId=customerId;
        this.address = address;
        this.phone = phone;
    }
    public String getcustomerName(){
        return customerName;
    }
    public String getCustomerId(){
        return customerId;
    }
    public double getInitalBalance() {
        return initbalance;
    }
    public String address(){
        return address;
    }
    public String phone(){
        return phone;
    }
}
