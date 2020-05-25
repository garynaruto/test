package example.rest;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


@Service
public class TodoService implements TodoImterface {
	
	
	private JdbcTemplate jdbcTemplate;
	TodoService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

	@Override
	public int create(String title, Integer id) {
		// TODO Auto-generated method stub
		return jdbcTemplate.update("insert into todo(id, title) values(?, ?)", id, title);
	}

	@Override
	public List<Todo> getById(Integer id) {
        List<Todo> TodoList = jdbcTemplate.query("select title, AGE from todo where id = ?", (resultSet, i) -> {
        	Todo t = new Todo();
            t.id = resultSet.getInt("id");
            t.title = resultSet.getString("title");
            return t;
        }, id);
        return TodoList;
    }

	
	@Override
	public int deleteByID(int id) {
		// TODO Auto-generated method stub
		return  jdbcTemplate.update("delete from todo where id = ?", id);
	}

	@Override
	public List<Todo> getAll() {
		 List<Todo> TodoList = jdbcTemplate.query("select * from todo", (resultSet, i) -> {
	        	Todo t = new Todo();
	            t.id = resultSet.getInt("id");
	            t.title = resultSet.getString("title");
	            return t;
	        });
	        return TodoList;
	}

	@Override
	public int deleteAll() {
		// TODO Auto-generated method stub
		return jdbcTemplate.update("delete from USER");
	}

}
