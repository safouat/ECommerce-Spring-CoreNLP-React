package com.safouat.service;

import java.time.LocalDate;
import java.util.List;

import com.safouat.exception.LoginException;
import com.safouat.exception.OrderException;
import com.safouat.models.Customer;
import com.safouat.models.Order;
import com.safouat.models.OrderDTO;

public interface OrderService {
	Order saveOrder(OrderDTO odto, String token) throws LoginException, OrderException;
	
	Order getOrderByOrderId(Integer OrderId) throws OrderException;
	
	List<Order> getAllOrders() throws OrderException;
	
	Order cancelOrderByOrderId(Integer OrderId, String token) throws OrderException;
	
	Order updateOrderByOrder(OrderDTO order, Integer OrderId, String token) throws OrderException,LoginException;
	
	List<Order> getAllOrdersByDate(LocalDate date) throws OrderException;

	Customer getCustomerByOrderid(Integer orderId) throws OrderException;
	
	//public Customer getCustomerIdByToken(String token) throws CustomerNotFoundException;
	

	
}
