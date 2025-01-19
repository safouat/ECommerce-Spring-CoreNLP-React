package com.safouat.service;

import com.safouat.models.CommentAnalysisResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.safouat.models.Comment;
import com.safouat.repository.CommentDao;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentDao commentRepository;

    public List<Comment> getAllCommentsByPostId(int postId) {
        return commentRepository.findByProduct_ProductId(postId);
    }

    public Comment getCommentByIdAndPostId(int postId, int id) {
        Optional<Comment> comment = commentRepository.findByIdAndProduct_ProductId(id, postId);
        return comment.orElseThrow(() -> new RuntimeException("Comment not found for postId: " + postId + " and id: " + id));
    }

    public void saveComment(Comment comment) {
        commentRepository.save(comment);
    }

    public void updateComment(Comment comment) {
        if (commentRepository.existsById(comment.getId())) {
            commentRepository.save(comment);
        } else {
            throw new RuntimeException("Comment with ID " + comment.getId() + " does not exist.");
        }
    }

    public void deleteCommentById(int id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Comment with ID " + id + " does not exist.");
        }
    }
    public CommentAnalysisResponse analyzeComments(int productId) {
        List<Comment> comments = commentRepository.findByProduct_ProductId(productId);

        // Count sentiments
        Map<String, Long> sentimentCounts = comments.stream()
                .map(Comment::getSentiment)
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(sentiment -> sentiment, Collectors.counting()));

        // Count concepts
        Map<String, Long> conceptCounts = comments.stream()
                .map(Comment::getConcept)
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(concept -> concept, Collectors.counting()));

        // Get top 30 concepts
        List<Map.Entry<String, Long>> topConcepts = conceptCounts.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(30)
                .collect(Collectors.toList());

        // Prepare the response
        return new CommentAnalysisResponse(sentimentCounts, topConcepts);
    }
}
