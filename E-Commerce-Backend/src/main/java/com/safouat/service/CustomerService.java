package com.safouat.service;

import java.util.List;

import com.safouat.exception.CustomerException;
import com.safouat.exception.CustomerNotFoundException;
import com.safouat.exception.SellerException;
import com.safouat.models.Address;
import com.safouat.models.CreditCard;
import com.safouat.models.Customer;
import com.safouat.models.CustomerDTO;
import com.safouat.models.CustomerUpdateDTO;
import com.safouat.models.Order;
import com.safouat.models.SessionDTO;

public interface CustomerService {
	
	Customer addCustomer(Customer customer) throws CustomerException;
	
	Customer getLoggedInCustomerDetails(String token) throws CustomerNotFoundException;
	
	List<Customer> getAllCustomers(String token) throws CustomerNotFoundException;
	
	Customer updateCustomer(CustomerUpdateDTO customer, String token) throws CustomerNotFoundException;
	
	Customer updateCustomerMobileNoOrEmailId(CustomerUpdateDTO customerUpdateDTO, String token) throws CustomerNotFoundException;
	
	Customer updateCreditCardDetails(String token, CreditCard card) throws CustomerException;
	
	SessionDTO updateCustomerPassword(CustomerDTO customerDTO, String token) throws CustomerNotFoundException;
	
	SessionDTO deleteCustomer(CustomerDTO customerDTO, String token) throws CustomerNotFoundException;
	
	Customer updateAddress(Address address, String type, String token) throws CustomerException;
	
	Customer deleteAddress(String type, String token) throws CustomerException, CustomerNotFoundException;

	List<Order> getCustomerOrders(String token) throws CustomerException;
	public Customer getCurrentlyLoggedInSeller(String token) throws SellerException;

}
