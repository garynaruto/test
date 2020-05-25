package example.rest;

import java.util.List;

public interface TodoImterface {

    
    int create(String title, Integer id);
    
    List<Todo> getById(Integer id);
        
    int deleteByID(int id);
    
    List<Todo> getAll();
    
    int deleteAll();
}