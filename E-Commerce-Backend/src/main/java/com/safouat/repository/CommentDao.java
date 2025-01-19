package com.safouat.repository;

import com.safouat.models.Comment;
import com.safouat.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;



public interface CommentDao extends JpaRepository<Comment, Integer> {
    List<Comment> findByProduct_ProductId(int productId);
    Optional<Comment> findByIdAndProduct_ProductId(int id, int productId);
    void deleteByProduct(Product product);

}
