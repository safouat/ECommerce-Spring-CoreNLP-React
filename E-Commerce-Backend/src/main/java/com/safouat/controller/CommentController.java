package com.safouat.controller;


import com.safouat.exception.ResourceNotFoundException;
import com.safouat.models.Comment;
import com.safouat.models.CommentAnalysisResponse;
import com.safouat.models.Product;
import com.safouat.models.Customer;
import com.safouat.service.CommentService;
import com.safouat.service.CustomerService;
import com.safouat.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CustomerService cService;

    @GetMapping("/{postId}")
    public List<Comment> getAllComments(@PathVariable int postId) {
        return commentService.getAllCommentsByPostId(postId);
    }

    @GetMapping("/{postId}/{id}")
    public Comment getComment(@PathVariable int postId, @PathVariable int id) {
        return commentService.getCommentByIdAndPostId(postId, id);
    }
   @PostMapping("/{productId}")
    public void postComment(@RequestHeader("token") String token,@PathVariable int productId, @RequestBody Comment comment) {
        // Fetch the product by productId
        Product product = productService.getProductFromCatalogById(productId);
        Customer customer= cService.getCurrentlyLoggedInSeller(token);
       comment.setCustomer(customer);

        if (product == null) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        // Set the product in the comment
        comment.setProduct(product);

        // Save the comment
        commentService.saveComment(comment);
    }

    @GetMapping("/analysis/{productId}")
    public ResponseEntity<CommentAnalysisResponse> getCommentAnalysis(@PathVariable int productId) {

        CommentAnalysisResponse analysisResponse = commentService.analyzeComments(productId);
        return ResponseEntity.ok(analysisResponse);
    }

    @PutMapping("/{id}")
    public void modifyComment(@PathVariable int id, @RequestBody Comment comment) {
        // Set the ID of the comment before passing it to the service
        comment.setId(id);
        commentService.updateComment(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable int id) {
        commentService.deleteCommentById(id);
    }

}
