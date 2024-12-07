class Customer {
    private String customerName;
    private String customerId;
    private String address;
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
    public String getAddress(){
        return address;
    }
    public String getPhone(){
        return phone;
    }
}
