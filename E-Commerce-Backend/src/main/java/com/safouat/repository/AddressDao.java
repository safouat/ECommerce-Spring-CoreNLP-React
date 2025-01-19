package com.safouat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.safouat.models.Address;

@Repository
public interface AddressDao extends JpaRepository<Address, Integer>{

}
